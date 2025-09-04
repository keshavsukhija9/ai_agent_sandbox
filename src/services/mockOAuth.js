// Mock OAuth service that simulates Google/GitHub login without external setup
export const mockOAuthService = {
  async signInWithProvider(provider) {
    return new Promise((resolve) => {
      // Simulate OAuth flow
      setTimeout(() => {
        const mockUser = {
          id: `mock-${provider}-${Date.now()}`,
          email: `user@${provider}.com`,
          name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
          avatar_url: `https://ui-avatars.com/api/?name=${provider}&background=random`,
          provider: provider
        };
        
        resolve({
          data: { user: mockUser, session: { access_token: 'mock-token' } },
          error: null
        });
      }, 1500);
    });
  }
};