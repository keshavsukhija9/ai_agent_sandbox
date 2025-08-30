import React from 'react';
import { Helmet } from 'react-helmet';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import OAuthButtons from './components/OAuthButtons';
import SecurityFooter from './components/SecurityFooter';

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Sign In - AI Agent Sandbox</title>
        <meta name="description" content="Sign in to AI Agent Sandbox - Advanced platform for creating and managing autonomous AI agents" />
      </Helmet>

      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        
        {/* Login Card */}
        <div className="relative w-full max-w-md">
          <div className="bg-card border border-border rounded-xl elevation-strong p-8">
            {/* Header */}
            <LoginHeader />

            {/* Login Form */}
            <LoginForm />

            {/* OAuth Buttons */}
            <div className="mt-6">
              <OAuthButtons />
            </div>

            {/* Security Footer */}
            <SecurityFooter />
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/10 rounded-full blur-lg" />
      </div>
    </>
  );
};

export default Login;