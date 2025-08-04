import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClientHealthScorecard = ({ clients }) => {
  const getHealthColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getHealthBgColor = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  const getHealthIcon = (score) => {
    if (score >= 80) return 'CheckCircle';
    if (score >= 60) return 'AlertTriangle';
    return 'XCircle';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-success/10 text-success border-success/20';
      case 'At Risk': return 'bg-warning/10 text-warning border-warning/20';
      case 'Inactive': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 sm:p-6 shadow-card h-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
        <h3 className="text-lg font-semibold text-foreground">Client Health Scorecard</h3>
        <Button variant="outline" size="sm" iconName="MoreHorizontal" iconPosition="right">
          <span className="hidden sm:inline">View All</span>
          <span className="sm:hidden">All</span>
        </Button>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        {clients?.map((client) => (
          <div key={client?.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-muted/30 rounded-lg space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getHealthBgColor(client?.healthScore)}`}>
                <Icon 
                  name={getHealthIcon(client?.healthScore)} 
                  size={16} 
                  className={getHealthColor(client?.healthScore)}
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-foreground truncate">{client?.name}</h4>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-sm text-muted-foreground">
                  <span>{client?.industry}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(client?.status)} sm:ml-2`}>
                    {client?.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
              <div className="flex space-x-4 sm:space-x-6">
                <div className="text-center sm:text-right">
                  <div className={`text-sm font-medium ${getHealthColor(client?.healthScore)}`}>
                    {client?.healthScore}%
                  </div>
                  <div className="text-xs text-muted-foreground">Health</div>
                </div>
                
                <div className="text-center sm:text-right">
                  <div className="text-sm font-medium text-foreground">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    })?.format(client?.monthlyRevenue)}
                  </div>
                  <div className="text-xs text-muted-foreground">Revenue</div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                
                <Button variant="ghost" size="sm" iconName="ExternalLink" className="sm:hidden p-2">
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientHealthScorecard;