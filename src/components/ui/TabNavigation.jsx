import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const TabNavigation = ({ workspaces, className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleTabChange = (path) => {
    navigate(path);
  };

  const isActiveTab = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`} role="tablist">
      {workspaces?.map((workspace) => (
        <button
          key={workspace?.path}
          onClick={() => handleTabChange(workspace?.path)}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-micro
            ${
              isActiveTab(workspace?.path)
                ? 'bg-primary text-primary-foreground shadow-card'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }
          `}
          role="tab"
          aria-selected={isActiveTab(workspace?.path)}
          title={workspace?.tooltip}
        >
          <Icon 
            name={workspace?.icon} 
            size={16} 
            className={isActiveTab(workspace?.path) ? 'text-primary-foreground' : 'text-current'}
          />
          <span>{workspace?.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;