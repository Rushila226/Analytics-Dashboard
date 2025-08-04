import React from 'react';
import Icon from '../AppIcon';

const WorkspaceIndicator = ({ 
  workspace, 
  isActive = false, 
  onClick, 
  className = '',
  showTooltip = true 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(workspace?.path);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-micro
        ${
          isActive
            ? 'bg-accent text-accent-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        }
        ${className}
      `}
      title={showTooltip ? workspace?.tooltip : undefined}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon 
        name={workspace?.icon} 
        size={14} 
        className={isActive ? 'text-accent-foreground' : 'text-current'}
      />
      <span className="truncate">{workspace?.label}</span>
      {isActive && (
        <div className="w-1.5 h-1.5 bg-accent-foreground rounded-full flex-shrink-0" />
      )}
    </button>
  );
};

export default WorkspaceIndicator;