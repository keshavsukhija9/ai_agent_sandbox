import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import Icon from '../../components/AppIcon';
import RoleSelectionCard from './components/RoleSelectionCard';
import PasswordStrengthIndicator from './components/PasswordStrengthIndicator';
import { LegalAgreementModal, TermsOfServiceContent, PrivacyPolicyContent } from './components/LegalAgreementModal';
import CaptchaWidget from './components/CaptchaWidget';
import EmailVerificationNotice from './components/EmailVerificationNotice';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    organizationName: '',
    role: ''
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false
  });

  // Captcha state
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAgreementChange = (type, checked) => {
    setAgreements(prev => ({
      ...prev,
      [type]: checked
    }));
  };

  const handleCaptchaVerify = (isVerified) => {
    setCaptchaVerified(isVerified);
    setCaptchaError(!isVerified);
  };

  const validateForm = () => {
    const newErrors = {};

    // Full name validation
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Organization name validation (optional but if provided, must be valid)
    if (formData?.organizationName?.trim() && formData?.organizationName?.trim()?.length < 2) {
      newErrors.organizationName = 'Organization name must be at least 2 characters';
    }

    // Role validation
    if (!formData?.role) {
      newErrors.role = 'Please select your role';
    }

    // Agreement validation
    if (!agreements?.terms) {
      newErrors.terms = 'You must accept the Terms of Service';
    }
    if (!agreements?.privacy) {
      newErrors.privacy = 'You must accept the Privacy Policy';
    }

    // Captcha validation
    if (!captchaVerified) {
      newErrors.captcha = 'Please complete the security verification';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show email verification notice
      setShowEmailVerification(true);
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailVerificationClose = () => {
    setShowEmailVerification(false);
    navigate('/login');
  };

  const handleResendVerification = () => {
    // Simulate resend logic
    console.log('Resending verification email to:', formData?.email);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-foreground"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-foreground"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-foreground"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-foreground">AI Agent Sandbox</h1>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Create Your Account</h2>
          <p className="text-muted-foreground">
            Join the future of AI agent development and collaboration
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-card border border-border rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={formData?.fullName}
                onChange={(e) => handleInputChange('fullName', e?.target?.value)}
                error={errors?.fullName}
                required
              />
              
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                error={errors?.email}
                required
              />
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  label="Password"
                  type="password"
                  placeholder="Create a strong password"
                  value={formData?.password}
                  onChange={(e) => handleInputChange('password', e?.target?.value)}
                  error={errors?.password}
                  required
                />
              </div>
              
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={formData?.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
                error={errors?.confirmPassword}
                required
              />
            </div>

            {/* Password Strength Indicator */}
            {formData?.password && (
              <PasswordStrengthIndicator password={formData?.password} />
            )}

            {/* Organization Name */}
            <Input
              label="Organization Name"
              type="text"
              placeholder="Enter your organization (optional)"
              description="This helps us understand your use case better"
              value={formData?.organizationName}
              onChange={(e) => handleInputChange('organizationName', e?.target?.value)}
              error={errors?.organizationName}
            />

            {/* Role Selection */}
            <RoleSelectionCard
              selectedRole={formData?.role}
              onRoleChange={(value) => handleInputChange('role', value)}
              error={errors?.role}
            />

            {/* Captcha */}
            <CaptchaWidget
              onVerify={handleCaptchaVerify}
              error={captchaError}
            />
            {errors?.captcha && (
              <p className="text-sm text-error">{errors?.captcha}</p>
            )}

            {/* Legal Agreements */}
            <div className="space-y-3">
              <Checkbox
                label={
                  <span>
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={() => setShowTermsModal(true)}
                      className="text-primary hover:underline"
                    >
                      Terms of Service
                    </button>
                  </span>
                }
                checked={agreements?.terms}
                onChange={(e) => handleAgreementChange('terms', e?.target?.checked)}
                error={errors?.terms}
                required
              />
              
              <Checkbox
                label={
                  <span>
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={() => setShowPrivacyModal(true)}
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </button>
                  </span>
                }
                checked={agreements?.privacy}
                onChange={(e) => handleAgreementChange('privacy', e?.target?.checked)}
                error={errors?.privacy}
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>

            {/* Submit Error */}
            {errors?.submit && (
              <div className="flex items-center space-x-2 text-sm text-error">
                <Icon name="AlertCircle" size={16} />
                <span>{errors?.submit}</span>
              </div>
            )}
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 bg-muted/30 rounded-lg p-4 border border-border">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-primary mt-0.5" />
            <div className="text-sm">
              <h4 className="font-medium text-foreground mb-1">Enterprise-Grade Security</h4>
              <p className="text-muted-foreground">
                Your data is protected with end-to-end encryption, secure sandboxed environments, 
                and compliance with industry security standards. All AI agent activities are logged and auditable.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Legal Agreement Modals */}
      <LegalAgreementModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        type="terms"
        title="Terms of Service"
        content={<TermsOfServiceContent />}
      />
      <LegalAgreementModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        type="privacy"
        title="Privacy Policy"
        content={<PrivacyPolicyContent />}
      />
      {/* Email Verification Notice */}
      {showEmailVerification && (
        <EmailVerificationNotice
          email={formData?.email}
          onResend={handleResendVerification}
          onClose={handleEmailVerificationClose}
        />
      )}
    </div>
  );
};

export default Register;