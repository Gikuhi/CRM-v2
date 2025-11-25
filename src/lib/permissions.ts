
export type Permission = 
  // Campaigns
  | 'campaign:create'
  | 'campaign:view'
  | 'campaign:edit'
  | 'campaign:delete'
  // Users & Roles
  | 'user:manage'
  | 'role:manage'
  // System
  | 'settings:access'
  // Reporting
  | 'report:view'
  | 'report:export'
  // Agent-specific
  | 'debtor:view'
  | 'debtor:update'
  | 'ptp:create'
  | 'ptp:update'
  | 'wrapup:create';

export interface Role {
  description: string;
  permissions: Set<Permission>;
}

export const roles: Record<string, Role> = {
  'Admin': {
    description: 'Full system access',
    permissions: new Set([
      'campaign:create',
      'campaign:view',
      'campaign:edit',
      'campaign:delete',
      'user:manage',
      'role:manage',
      'settings:access',
      'report:view',
      'report:export',
      // Admins can also do agent actions
      'debtor:view',
      'debtor:update',
      'ptp:create',
      'ptp:update',
      'wrapup:create',
    ]),
  },
  'Supervisor': {
    description: 'Manages teams and campaigns',
    permissions: new Set([
      'campaign:view',
      'campaign:create',
      'campaign:edit',
      'user:manage', // Can manage agents only (logic to be enforced in components)
      'report:view',
      // Supervisors can also do agent actions
      'debtor:view',
      'debtor:update',
      'ptp:create',
      'ptp:update',
      'wrapup:create',
    ]),
  },
  'Agent': {
    description: 'Handles debtor interactions',
    permissions: new Set([
      'campaign:view', // Assigned campaigns only
      'debtor:view',
      'debtor:update',
      'ptp:create',
      'ptp:update',
      'wrapup:create',
    ]),
  },
};
