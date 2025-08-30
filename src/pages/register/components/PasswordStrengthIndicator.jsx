import React from 'react';
import Icon from '../../../components/AppIcon';

const PasswordStrengthIndicator = ({ password }) => {
  const calculateStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', color: '' };

    let score = 0;
    const checks = {
      length: pwd?.length >= 8,
      lowercase: /[a-z]/?.test(pwd),
      uppercase: /[A-Z]/?.test(pwd),
      numbers: /\d/?.test(pwd),
      symbols: /[!@#$%^&*(),.?":{}|<>]/?.test(pwd)
    };

    score = Object.values(checks)?.filter(Boolean)?.length;

    const strengthLevels = {
      0: { label: '', color: '', bgColor: '' },
      1: { label: 'Very Weak', color: 'text-red-600', bgColor: 'bg-red-200' },
      2: { label: 'Weak', color: 'text-orange-600', bgColor: 'bg-orange-200' },
      3: { label: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-200' },
      4: { label: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-200' },
      5: { label: 'Strong', color: 'text-green-600', bgColor: 'bg-green-200' }
    };

    return {
      score,
      checks,
      ...strengthLevels?.[score]
    };
  };

  const strength = calculateStrength(password);

  if (!password) return null;

  return (
    <div className="space-y-3">
      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Password Strength</span>
          <span className={`text-sm font-medium ${strength?.color}`}>
            {strength?.label}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${strength?.bgColor}`}
            style={{ width: `${(strength?.score / 5) * 100}%` }}
          />
        </div>
      </div>
      {/* Requirements Checklist */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-foreground">Password Requirements:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <Icon
              name={strength?.checks?.length ? "CheckCircle" : "Circle"}
              size={16}
              className={strength?.checks?.length ? "text-success" : "text-muted-foreground"}
            />
            <span className={`text-sm ${strength?.checks?.length ? "text-success" : "text-muted-foreground"}`}>
              At least 8 characters
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon
              name={strength?.checks?.lowercase ? "CheckCircle" : "Circle"}
              size={16}
              className={strength?.checks?.lowercase ? "text-success" : "text-muted-foreground"}
            />
            <span className={`text-sm ${strength?.checks?.lowercase ? "text-success" : "text-muted-foreground"}`}>
              Lowercase letter
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon
              name={strength?.checks?.uppercase ? "CheckCircle" : "Circle"}
              size={16}
              className={strength?.checks?.uppercase ? "text-success" : "text-muted-foreground"}
            />
            <span className={`text-sm ${strength?.checks?.uppercase ? "text-success" : "text-muted-foreground"}`}>
              Uppercase letter
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon
              name={strength?.checks?.numbers ? "CheckCircle" : "Circle"}
              size={16}
              className={strength?.checks?.numbers ? "text-success" : "text-muted-foreground"}
            />
            <span className={`text-sm ${strength?.checks?.numbers ? "text-success" : "text-muted-foreground"}`}>
              Number
            </span>
          </div>
          <div className="flex items-center space-x-2 sm:col-span-2">
            <Icon
              name={strength?.checks?.symbols ? "CheckCircle" : "Circle"}
              size={16}
              className={strength?.checks?.symbols ? "text-success" : "text-muted-foreground"}
            />
            <span className={`text-sm ${strength?.checks?.symbols ? "text-success" : "text-muted-foreground"}`}>
              Special character (!@#$%^&*)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;