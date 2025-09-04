import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Icon from '../AppIcon';

const UserProfile = () => {
  const { user, signOut } = useAuth();
  
  if (!user) return null;
  
  const getProviderIcon = () => {
    if (user.app_metadata?.provider === 'google') return 'Chrome';
    if (user.app_metadata?.provider === 'github') return 'Github';
    return 'User';
  };
  
  const getDisplayName = () => {
    return user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User';
  };
  
  const getAvatarUrl = () => {
    return user.user_metadata?.avatar_url || user.user_metadata?.picture || `https://ui-avatars.com/api/?name=${getDisplayName()}&background=random`;
  };
  
  return (
    <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg border">
      <img 
        src={getAvatarUrl()} 
        alt={getDisplayName()}
        className="w-10 h-10 rounded-full"
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${getDisplayName()}&background=random`;
        }}
      />
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{getDisplayName()}</p>
        <p className="text-xs text-muted-foreground flex items-center">
          <Icon name={getProviderIcon()} size={12} className="mr-1" />
          {user.app_metadata?.provider ? `Signed in with ${user.app_metadata.provider}` : user.email}
        </p>
      </div>
      <button
        onClick={async () => {
          try {
            await signOut();
            // Clear any local storage
            localStorage.removeItem('mockUser');
            // Force redirect to login
            window.location.href = '/login';
          } catch (error) {
            console.error('Logout error:', error);
            // Force logout anyway
            localStorage.clear();
            window.location.href = '/login';
          }
        }}
        className="text-xs text-muted-foreground hover:text-foreground"
      >
        Sign out
      </button>
    </div>
  );
};

export default UserProfile;