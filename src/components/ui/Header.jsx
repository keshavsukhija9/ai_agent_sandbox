import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ onSidebarToggle, isSidebarCollapsed = false }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsNotificationsOpen(false);
  };

  const handleNotificationsToggle = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
    setIsUserMenuOpen(false);
  };

  const handleProfileClick = () => {
    setIsUserMenuOpen(false);
  };

  const handleSettingsClick = () => {
    setIsUserMenuOpen(false);
  };

  const notifications = [
    { id: 1, title: 'Agent "DataProcessor" completed task', time: '2 min ago', type: 'success' },
    { id: 2, title: 'System maintenance scheduled', time: '1 hour ago', type: 'warning' },
    { id: 3, title: 'New agent deployment available', time: '3 hours ago', type: 'info' },
  ];

  const unreadCount = notifications?.length;

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-1000">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left Section - Logo and Sidebar Toggle */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSidebarToggle}
            className="lg:hidden"
          >
            <Icon name="Menu" size={20} />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <svg
                width="20"
                height="20"
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
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">AI Agent Sandbox</h1>
            </div>
          </div>
        </div>

        {/* Right Section - Actions and User Menu */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search agents..."
                className="w-64 pl-10 pr-4 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>

          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
          >
            <Icon name="Search" size={20} />
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotificationsToggle}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-md elevation-strong z-1200">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium text-popover-foreground">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications?.map((notification) => (
                    <div key={notification?.id} className="p-4 border-b border-border last:border-b-0 hover:bg-muted/50">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification?.type === 'success' ? 'bg-success' :
                          notification?.type === 'warning' ? 'bg-warning' : 'bg-primary'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-popover-foreground">{notification?.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification?.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full">
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleUserMenuToggle}
              className="relative"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary-foreground" />
              </div>
            </Button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-md elevation-strong z-1200">
                <div className="p-4 border-b border-border">
                  <p className="font-medium text-popover-foreground">John Doe</p>
                  <p className="text-sm text-muted-foreground">john.doe@company.com</p>
                </div>
                <div className="py-2">
                  <button
                    onClick={handleProfileClick}
                    className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted/50 flex items-center space-x-3"
                  >
                    <Icon name="User" size={16} />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={handleSettingsClick}
                    className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted/50 flex items-center space-x-3"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <div className="border-t border-border my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted/50 flex items-center space-x-3"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Click outside handlers */}
      {(isUserMenuOpen || isNotificationsOpen) && (
        <div
          className="fixed inset-0 z-1100"
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsNotificationsOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;