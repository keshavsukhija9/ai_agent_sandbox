// Production security utilities
class SecurityManager {
  constructor() {
    this.isProduction = import.meta.env.VITE_APP_ENV === 'production';
    this.setupSecurityHeaders();
  }

  setupSecurityHeaders() {
    // Content Security Policy
    if (this.isProduction) {
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Security-Policy';
      meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://zmkkmdtojnlbyuusrfak.supabase.co https://api-inference.huggingface.co;";
      document.head.appendChild(meta);
    }
  }

  // Sanitize user input
  sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocols
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim();
  }

  // Validate email format
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate agent name
  validateAgentName(name) {
    if (!name || typeof name !== 'string') return false;
    if (name.length < 2 || name.length > 50) return false;
    // Allow letters, numbers, spaces, hyphens, underscores
    const nameRegex = /^[a-zA-Z0-9\s\-_]+$/;
    return nameRegex.test(name);
  }

  // Validate task input
  validateTaskInput(task) {
    if (!task || typeof task !== 'string') return false;
    if (task.length < 10 || task.length > 1000) return false;
    // Check for potentially malicious content
    const maliciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+=/i,
      /eval\(/i,
      /function\(/i
    ];
    return !maliciousPatterns.some(pattern => pattern.test(task));
  }

  // Rate limiting for API calls
  createRateLimiter(maxRequests = 10, windowMs = 60000) {
    const requests = new Map();
    
    return (userId = 'anonymous') => {
      const now = Date.now();
      const userRequests = requests.get(userId) || [];
      
      // Remove old requests outside the window
      const validRequests = userRequests.filter(time => now - time < windowMs);
      
      if (validRequests.length >= maxRequests) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      
      validRequests.push(now);
      requests.set(userId, validRequests);
      
      return true;
    };
  }

  // Secure local storage operations
  secureStorage = {
    set: (key, value) => {
      try {
        const encrypted = btoa(JSON.stringify(value));
        localStorage.setItem(key, encrypted);
      } catch (error) {
        console.error('Failed to store data securely:', error);
      }
    },
    
    get: (key) => {
      try {
        const encrypted = localStorage.getItem(key);
        if (!encrypted) return null;
        return JSON.parse(atob(encrypted));
      } catch (error) {
        console.error('Failed to retrieve data securely:', error);
        return null;
      }
    },
    
    remove: (key) => {
      localStorage.removeItem(key);
    }
  };

  // Check for suspicious activity
  detectSuspiciousActivity(action, context = {}) {
    const suspiciousPatterns = [
      { pattern: /(.)\1{10,}/, description: 'Repeated characters' },
      { pattern: /<script|javascript:|on\w+=/i, description: 'Potential XSS' },
      { pattern: /union\s+select|drop\s+table/i, description: 'Potential SQL injection' }
    ];

    for (const { pattern, description } of suspiciousPatterns) {
      if (pattern.test(JSON.stringify(context))) {
        this.logSecurityEvent('suspicious_activity', {
          action,
          description,
          context,
          timestamp: new Date().toISOString()
        });
        return true;
      }
    }
    return false;
  }

  logSecurityEvent(type, data) {
    const event = {
      type,
      data,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };

    if (this.isProduction) {
      // Send to security monitoring service
      fetch('/api/security-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      }).catch(console.error);
    } else {
      console.warn('[Security Event]', event);
    }
  }
}

export const security = new SecurityManager();