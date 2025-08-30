import React from 'react';


const LoginHeader = () => {
  return (
    <div className="text-center space-y-4 mb-8">
      {/* Platform Logo */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center elevation-moderate">
          <svg
            width="32"
            height="32"
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
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">
          Welcome to AI Agent Sandbox
        </h1>
        <p className="text-muted-foreground">
          Sign in to your account to access the platform
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;