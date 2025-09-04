const express = require('express');
const axios = require('axios');
const router = express.Router();

// Scrape single website
router.post('/website', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL is required'
      });
    }
    
    console.log(`Scraping request for: ${url}`);
    
    const result = await scrapeUrl(url);
    
    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Scrape multiple websites
router.post('/multiple', async (req, res) => {
  try {
    const { urls } = req.body;
    
    if (!Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'URLs array is required'
      });
    }
    
    if (urls.length > 10) {
      return res.status(400).json({
        success: false,
        error: 'Maximum 10 URLs allowed'
      });
    }
    
    console.log(`Scraping ${urls.length} websites`);
    
    const results = await Promise.all(
      urls.map(url => scrapeUrl(url))
    );
    
    res.json({
      success: true,
      data: results,
      summary: {
        total: results.length,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Multiple scraping error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Competitor price monitoring
router.post('/competitor-prices', async (req, res) => {
  try {
    const { urls } = req.body;
    
    if (!Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'URLs array is required'
      });
    }
    
    console.log(`Monitoring competitor prices for ${urls.length} websites`);
    
    const results = await Promise.all(
      urls.map(async (url) => {
        const data = await scrapeUrl(url);
        return {
          ...data,
          extractedPrices: data.success ? extractPrices(data.data.content) : []
        };
      })
    );
    
    // Analyze prices
    const allPrices = results
      .filter(r => r.success && r.extractedPrices.length > 0)
      .flatMap(r => r.extractedPrices.map(p => p.numeric));
    
    const analysis = {
      totalPricesFound: allPrices.length,
      averagePrice: allPrices.length > 0 ? allPrices.reduce((a, b) => a + b, 0) / allPrices.length : 0,
      minPrice: allPrices.length > 0 ? Math.min(...allPrices) : 0,
      maxPrice: allPrices.length > 0 ? Math.max(...allPrices) : 0
    };
    
    const recommendations = generatePriceRecommendations(analysis);
    
    res.json({
      success: true,
      data: results,
      analysis,
      recommendations,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Price monitoring error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Scraping function using axios (bypasses CORS)
async function scrapeUrl(url) {
  try {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const content = response.data;
    const title = extractTitle(content);
    const description = extractDescription(content);
    
    return {
      success: true,
      url,
      data: {
        title,
        description,
        content: content.substring(0, 2000), // First 2000 chars
        status: response.status,
        contentLength: content.length
      },
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      success: false,
      url,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

// Extract title from HTML
function extractTitle(html) {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return titleMatch ? titleMatch[1].trim() : 'No title found';
}

// Extract description from HTML
function extractDescription(html) {
  const descMatch = html.match(/<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']+)["\'][^>]*>/i);
  return descMatch ? descMatch[1].trim() : 'No description found';
}

// Extract prices from content
function extractPrices(content) {
  const priceRegex = /\$[\d,]+\.?\d*/g;
  const matches = content.match(priceRegex) || [];
  
  return matches
    .map(match => ({
      original: match,
      numeric: parseFloat(match.replace(/[^\d.]/g, '')),
      currency: '$'
    }))
    .filter(price => price.numeric > 0 && price.numeric < 1000000) // Reasonable price range
    .slice(0, 10); // Limit to 10 prices
}

// Generate pricing recommendations
function generatePriceRecommendations(analysis) {
  const recommendations = [];
  
  if (analysis.totalPricesFound === 0) {
    recommendations.push('No competitor prices found. Consider adjusting target websites.');
    return recommendations;
  }
  
  const { averagePrice, minPrice, maxPrice } = analysis;
  
  recommendations.push(`Market average price: $${averagePrice.toFixed(2)}`);
  recommendations.push(`Price range: $${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`);
  
  const competitiveHigh = averagePrice * 1.1;
  const competitiveLow = averagePrice * 0.9;
  
  recommendations.push(`Competitive pricing range: $${competitiveLow.toFixed(2)} - $${competitiveHigh.toFixed(2)}`);
  
  if (maxPrice - minPrice > averagePrice * 0.5) {
    recommendations.push('High price variance detected - opportunity for competitive positioning');
  }
  
  return recommendations;
}

module.exports = router;