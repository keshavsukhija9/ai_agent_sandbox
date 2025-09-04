const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');
const { logger } = require('../utils/logger');

class EnterpriseWebScraper {
  constructor() {
    this.browser = null;
    this.userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    ];
  }

  async initBrowser() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: 'new',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ]
      });
    }
    return this.browser;
  }

  async scrapeWebsite(url, options = {}) {
    try {
      logger.info(`🕷️ Scraping website: ${url}`);
      
      const browser = await this.initBrowser();
      const page = await browser.newPage();
      
      // Set random user agent
      const userAgent = this.userAgents[Math.floor(Math.random() * this.userAgents.length)];
      await page.setUserAgent(userAgent);
      
      // Set viewport
      await page.setViewport({ width: 1920, height: 1080 });
      
      // Navigate to page
      await page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: 30000
      });
      
      // Wait for content to load
      if (options.waitForSelector) {
        await page.waitForSelector(options.waitForSelector, { timeout: 10000 });
      } else {
        await page.waitForTimeout(2000);
      }
      
      // Extract data based on selectors
      const data = await page.evaluate((selectors) => {
        const result = {};
        
        if (selectors) {
          Object.keys(selectors).forEach(key => {
            const elements = document.querySelectorAll(selectors[key]);
            result[key] = Array.from(elements).map(el => ({
              text: el.textContent?.trim(),
              html: el.innerHTML,
              href: el.href || null,
              src: el.src || null
            }));
          });
        } else {
          // Default extraction
          result.title = document.title;
          result.description = document.querySelector('meta[name="description"]')?.content || '';
          result.headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.textContent?.trim());
          result.links = Array.from(document.querySelectorAll('a[href]')).slice(0, 20).map(a => ({
            text: a.textContent?.trim(),
            href: a.href
          }));
          result.images = Array.from(document.querySelectorAll('img[src]')).slice(0, 10).map(img => ({
            alt: img.alt,
            src: img.src
          }));
        }
        
        return result;
      }, options.selectors);
      
      await page.close();
      
      logger.info(`✅ Successfully scraped ${url}`);
      return {
        success: true,
        url,
        data,
        timestamp: new Date().toISOString(),
        userAgent
      };
      
    } catch (error) {
      logger.error(`❌ Scraping failed for ${url}:`, error.message);
      return {
        success: false,
        url,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async scrapeMultiplePages(urls, options = {}) {
    const results = [];
    const concurrency = options.concurrency || 3;
    
    for (let i = 0; i < urls.length; i += concurrency) {
      const batch = urls.slice(i, i + concurrency);
      const batchPromises = batch.map(url => this.scrapeWebsite(url, options));
      const batchResults = await Promise.allSettled(batchPromises);
      
      batchResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          results.push(result.value);
        } else {
          results.push({
            success: false,
            url: batch[index],
            error: result.reason?.message || 'Unknown error'
          });
        }
      });
      
      // Delay between batches to be respectful
      if (i + concurrency < urls.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    return results;
  }

  async extractCompetitorPrices(competitorUrls) {
    const priceSelectors = {
      prices: '.price, .cost, .amount, [class*="price"], [class*="cost"]',
      products: '.product-title, .item-name, h1, h2, [class*="product"], [class*="item"]'
    };
    
    const results = await this.scrapeMultiplePages(competitorUrls, {
      selectors: priceSelectors,
      waitForSelector: '.price, .cost, .amount'
    });
    
    return results.map(result => ({
      ...result,
      extractedPrices: this.extractPriceNumbers(result.data?.prices || [])
    }));
  }

  extractPriceNumbers(priceElements) {
    return priceElements
      .map(el => el.text)
      .filter(text => text)
      .map(text => {
        const priceMatch = text.match(/[\$£€¥]?[\d,]+\.?\d*/);
        return priceMatch ? {
          original: text,
          numeric: parseFloat(priceMatch[0].replace(/[^\d.]/g, '')),
          currency: text.match(/[\$£€¥]/)?.[0] || '$'
        } : null;
      })
      .filter(price => price && price.numeric > 0);
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

module.exports = new EnterpriseWebScraper();