import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const workspaces = [
    {
      label: 'Overview',
      path: '/executive-overview-dashboard',
      icon: 'BarChart3',
      tooltip: 'Executive strategic insights'
    },
    {
      label: 'Campaigns',
      path: '/campaign-performance-analytics',
      icon: 'TrendingUp',
      tooltip: 'Campaign analysis and optimization'
    },
    {
      label: 'Live Monitor',
      path: '/real-time-operations-monitor',
      icon: 'Activity',
      tooltip: 'Real-time operational tracking'
    },
    
  ];

  const handleWorkspaceChange = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveWorkspace = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
             <img
  src="https://play-lh.googleusercontent.com/xe2oYtyWM0oJmO5MfdWmfV91j2zXkDaJ7GX-W3zHGwHfzAEmUqyYNHnvb0UakTf3qQ"
  alt="ADmyBRAND Logo"
  className="w-8 h-8 rounded-lg"
/>

            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground leading-none">
                ADmyBRAND
              </span>
              <span className="text-xs text-muted-foreground leading-none">
                Insights
              </span>
            </div>
          </div>
        </div>

        
        <nav className="hidden md:flex items-center space-x-1" role="tablist">
          {workspaces?.map((workspace) => (
            <button
              key={workspace?.path}
              onClick={() => handleWorkspaceChange(workspace?.path)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-micro
                ${
                  isActiveWorkspace(workspace?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
              role="tab"
              aria-selected={isActiveWorkspace(workspace?.path)}
              title={workspace?.tooltip}
            >
              <Icon name={workspace?.icon} size={16} />
              <span>{workspace?.label}</span>
            </button>
          ))}
        </nav>

        
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-micro"
          aria-label="Toggle navigation menu"
        >
          <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
        </button>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border animate-slide-up">
          <nav className="px-6 py-4 space-y-2" role="tablist">
            {workspaces?.map((workspace) => (
              <button
                key={workspace?.path}
                onClick={() => handleWorkspaceChange(workspace?.path)}
                className={`
                  flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-micro
                  ${
                    isActiveWorkspace(workspace?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
                role="tab"
                aria-selected={isActiveWorkspace(workspace?.path)}
              >
                <Icon name={workspace?.icon} size={18} />
                <div className="flex flex-col items-start">
                  <span>{workspace?.label}</span>
                  <span className="text-xs opacity-75">{workspace?.tooltip}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavigationHeader;
