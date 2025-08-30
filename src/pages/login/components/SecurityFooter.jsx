import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityFooter = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      text: 'SSL Encrypted'
    },
    {
      icon: 'Lock',
      text: 'SOC 2 Compliant'
    },
    {
      icon: 'CheckCircle',
      text: 'Enterprise Grade'
    }
  ];

  const currentYear = new Date()?.getFullYear();

  return (
    <div className="mt-8 space-y-6">
      {/* Security Indicators */}
      <div className="flex justify-center items-center space-x-6">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2 text-muted-foreground">
            <Icon name={feature?.icon} size={16} className="text-success" />
            <span className="text-xs font-medium">{feature?.text}</span>
          </div>
        ))}
      </div>
      {/* Footer Links */}
      <div className="text-center space-y-2">
        <div className="flex justify-center items-center space-x-4 text-xs text-muted-foreground">
          <button className="hover:text-foreground transition-colors">
            Privacy Policy
          </button>
          <span>•</span>
          <button className="hover:text-foreground transition-colors">
            Terms of Service
          </button>
          <span>•</span>
          <button className="hover:text-foreground transition-colors">
            Support
          </button>
        </div>
        
        <p className="text-xs text-muted-foreground">
          © {currentYear} AI Agent Sandbox. All rights reserved.
        </p>
      </div>
      {/* Registration Link */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button 
            onClick={() => window.location.href = '/register'}
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Sign up for free
          </button>
        </p>
      </div>
    </div>
  );
};

export default SecurityFooter;