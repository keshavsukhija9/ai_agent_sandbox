import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CaptchaWidget = ({ onVerify, error }) => {
  const [captchaData, setCaptchaData] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const generateCaptcha = () => {
    const operations = ['+', '-', '×'];
    const operation = operations?.[Math.floor(Math.random() * operations?.length)];
    let num1, num2, answer;

    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        answer = num1 + num2;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 50) + 25;
        num2 = Math.floor(Math.random() * 25) + 1;
        answer = num1 - num2;
        break;
      case '×':
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        answer = num1 * num2;
        break;
      default:
        num1 = 5;
        num2 = 3;
        answer = 8;
    }

    setCaptchaData({
      question: `${num1} ${operation} ${num2} = ?`,
      answer: answer?.toString()
    });
    setUserInput('');
    setIsVerified(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleVerify = () => {
    if (userInput?.trim() === captchaData?.answer) {
      setIsVerified(true);
      onVerify(true);
    } else {
      setAttempts(prev => prev + 1);
      onVerify(false);
      if (attempts >= 2) {
        generateCaptcha();
        setAttempts(0);
      }
    }
  };

  const handleRefresh = () => {
    generateCaptcha();
    setAttempts(0);
  };

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 rounded-lg p-4 border border-border">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-foreground">Security Verification</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isVerified}
          >
            <Icon name="RotateCcw" size={16} />
          </Button>
        </div>

        <div className="space-y-3">
          {/* Math Problem Display */}
          <div className="bg-card border border-border rounded-md p-4 text-center">
            <div className="text-2xl font-mono font-bold text-foreground mb-2">
              {captchaData?.question}
            </div>
            <p className="text-xs text-muted-foreground">
              Solve this math problem to verify you're human
            </p>
          </div>

          {/* Input and Verify */}
          <div className="flex space-x-2">
            <input
              type="number"
              value={userInput}
              onChange={(e) => setUserInput(e?.target?.value)}
              placeholder="Enter answer"
              disabled={isVerified}
              className="flex-1 px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              onKeyPress={(e) => {
                if (e?.key === 'Enter' && !isVerified) {
                  handleVerify();
                }
              }}
            />
            <Button
              variant={isVerified ? "success" : "default"}
              size="sm"
              onClick={handleVerify}
              disabled={isVerified || !userInput?.trim()}
            >
              {isVerified ? (
                <>
                  <Icon name="CheckCircle" size={16} />
                  Verified
                </>
              ) : (
                'Verify'
              )}
            </Button>
          </div>

          {/* Status Messages */}
          {error && !isVerified && (
            <div className="flex items-center space-x-2 text-sm text-error">
              <Icon name="AlertCircle" size={16} />
              <span>Incorrect answer. Please try again.</span>
            </div>
          )}

          {isVerified && (
            <div className="flex items-center space-x-2 text-sm text-success">
              <Icon name="CheckCircle" size={16} />
              <span>Verification successful!</span>
            </div>
          )}

          {attempts > 0 && !isVerified && (
            <div className="text-xs text-muted-foreground">
              Attempts: {attempts}/3 {attempts >= 2 && "(New problem generated)"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaptchaWidget;