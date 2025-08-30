import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const RoleSelectionCard = ({ selectedRole, onRoleChange, error }) => {
  const roleOptions = [
    {
      value: 'ai-researcher',
      label: 'AI Researcher',
      description: 'Research and experiment with autonomous agent systems'
    },
    {
      value: 'software-engineer',
      label: 'Software Engineer',
      description: 'Build AI-powered automation solutions'
    },
    {
      value: 'data-scientist',
      label: 'Data Scientist',
      description: 'Web scraping and information extraction capabilities'
    },
    {
      value: 'product-manager',
      label: 'Product Manager',
      description: 'Oversee AI integration projects'
    },
    {
      value: 'enterprise-user',
      label: 'Enterprise User',
      description: 'Secure AI agent deployment for organizations'
    }
  ];

  const getRoleIcon = (role) => {
    const iconMap = {
      'ai-researcher': 'Brain',
      'software-engineer': 'Code',
      'data-scientist': 'Database',
      'product-manager': 'Users',
      'enterprise-user': 'Building'
    };
    return iconMap?.[role] || 'User';
  };

  const getRoleFeatures = (role) => {
    const featureMap = {
      'ai-researcher': [
        'Advanced agent experimentation tools',
        'Research collaboration features',
        'Academic publication support'
      ],
      'software-engineer': [
        'Code integration capabilities',
        'API development tools',
        'Deployment automation'
      ],
      'data-scientist': [
        'Data extraction workflows',
        'Analytics dashboard access',
        'ML model integration'
      ],
      'product-manager': [
        'Project management tools',
        'Team collaboration features',
        'Performance analytics'
      ],
      'enterprise-user': [
        'Enhanced security controls',
        'Compliance reporting',
        'Multi-user management'
      ]
    };
    return featureMap?.[role] || [];
  };

  return (
    <div className="space-y-4">
      <Select
        label="Select Your Role"
        description="Choose the role that best describes your intended use of the AI Agent Sandbox"
        options={roleOptions}
        value={selectedRole}
        onChange={onRoleChange}
        error={error}
        required
        searchable
        placeholder="Choose your role..."
      />
      {selectedRole && (
        <div className="bg-muted/30 rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={getRoleIcon(selectedRole)} size={20} className="text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">
                {roleOptions?.find(r => r?.value === selectedRole)?.label}
              </h4>
              <p className="text-sm text-muted-foreground">
                {roleOptions?.find(r => r?.value === selectedRole)?.description}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h5 className="text-sm font-medium text-foreground">Role-specific features:</h5>
            <ul className="space-y-1">
              {getRoleFeatures(selectedRole)?.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Check" size={14} className="text-success" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleSelectionCard;