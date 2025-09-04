// Production performance monitoring
class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.isProduction = import.meta.env.VITE_APP_ENV === 'production';
    this.setupPerformanceObserver();
  }

  setupPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric(entry.name, entry.value, entry.entryType);
        }
      });

      try {
        observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
      } catch (error) {
        console.warn('Performance Observer not supported:', error);
      }
    }
  }

  // Start timing an operation
  startTiming(label) {
    const startTime = performance.now();
    this.metrics.set(label, { startTime, endTime: null });
    return startTime;
  }

  // End timing an operation
  endTiming(label) {
    const metric = this.metrics.get(label);
    if (metric) {
      metric.endTime = performance.now();
      const duration = metric.endTime - metric.startTime;
      this.recordMetric(label, duration, 'custom');
      return duration;
    }
    return null;
  }

  // Record a custom metric
  recordMetric(name, value, type = 'custom') {
    const metric = {
      name,
      value,
      type,
      timestamp: Date.now(),
      url: window.location.pathname
    };

    if (this.isProduction) {
      this.sendMetricToAnalytics(metric);
    } else {
      console.log(`[Performance] ${name}: ${value}ms`);
    }
  }

  async sendMetricToAnalytics(metric) {
    try {
      // Send to analytics service (Google Analytics, Mixpanel, etc.)
      await fetch('/api/metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metric)
      });
    } catch (error) {
      console.warn('Failed to send metric:', error);
    }
  }

  // Monitor component render times
  measureComponent(componentName, renderFunction) {
    const startTime = this.startTiming(`${componentName}_render`);
    const result = renderFunction();
    this.endTiming(`${componentName}_render`);
    return result;
  }

  // Monitor API call performance
  async measureApiCall(apiName, apiCall) {
    const startTime = this.startTiming(`api_${apiName}`);
    try {
      const result = await apiCall();
      this.endTiming(`api_${apiName}`);
      return result;
    } catch (error) {
      this.endTiming(`api_${apiName}`);
      throw error;
    }
  }

  // Get performance summary
  getPerformanceSummary() {
    const navigation = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');

    return {
      pageLoad: navigation?.loadEventEnd - navigation?.loadEventStart,
      domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
      firstPaint: paint.find(p => p.name === 'first-paint')?.startTime,
      firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
      customMetrics: Array.from(this.metrics.entries())
    };
  }
}

export const performanceMonitor = new PerformanceMonitor();