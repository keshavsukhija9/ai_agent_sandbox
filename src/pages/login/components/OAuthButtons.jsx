import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { supabase } from '../../../utils/supabase';
import { mockOAuthService } from '../../../services/mockOAuth';

const OAuthButtons = () => {
  const navigate = useNavigate();
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleOAuthLogin = async (provider) => {
    setLoadingProvider(provider);
    
    try {
      console.log(`Starting ${provider} OAuth...`);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        console.error('OAuth error:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        alert(`${provider} OAuth error: ${error.message}\n\nCheck console for details.`);
      } else {
        console.log('OAuth initiated successfully');
      }
    } catch (error) {
      console.error('OAuth failed:', error);
      alert(`OAuth failed: ${error.message}`);
    } finally {
      setLoadingProvider(null);
    }
  };

  const oauthProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: 'Github',
      bgColor: 'bg-gray-900 hover:bg-gray-800',
      textColor: 'text-white',
      borderColor: 'border-gray-900'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="space-y-3">
        {oauthProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => handleOAuthLogin(provider?.id)}
            loading={loadingProvider === provider?.id}
            disabled={loadingProvider !== null}
            className={`${provider?.bgColor} ${provider?.textColor} ${provider?.borderColor} border`}
          >
            <div className="flex items-center justify-center space-x-3">
              <Icon name={provider?.icon} size={18} />
              <span>Continue with {provider?.name}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default OAuthButtons;