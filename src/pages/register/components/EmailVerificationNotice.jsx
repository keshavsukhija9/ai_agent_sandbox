import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmailVerificationNotice = ({ email, onResend, onClose }) => {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResend = () => {
    onResend();
    setCountdown(60);
    setCanResend(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Mail" size={20} className="text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Check Your Email</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Account Created Successfully!
              </h3>
              <p className="text-muted-foreground">
                We've sent a verification email to:
              </p>
              <p className="font-medium text-foreground mt-1">
                {email}
              </p>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <h4 className="font-medium text-foreground">Next Steps:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <Icon name="Mail" size={16} className="mt-0.5 text-primary" />
                <span>Check your email inbox (and spam folder)</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="MousePointer" size={16} className="mt-0.5 text-primary" />
                <span>Click the verification link in the email</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="LogIn" size={16} className="mt-0.5 text-primary" />
                <span>Return to login and access your account</span>
              </li>
            </ul>
          </div>

          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Didn't receive the email?
            </p>
            
            <Button
              variant="outline"
              onClick={handleResend}
              disabled={!canResend}
              className="w-full"
            >
              {canResend ? (
                <>
                  <Icon name="RotateCcw" size={16} />
                  Resend Verification Email
                </>
              ) : (
                `Resend in ${countdown}s`
              )}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/20">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Shield" size={16} />
            <span>
              Email verification helps keep your account secure and ensures you receive important updates.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationNotice;