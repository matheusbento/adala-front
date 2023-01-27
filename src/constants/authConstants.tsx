export const permissions: Record<string, any> = {
  admin: {
    access: 'access_admin',
  },
  baslake: {
    access: 'baslake_access',
  },
  cubes: {
    see: 'baslake_cubes_access',
    manage: 'baslake_cubes_manage',
  },
  silos: {
    see: 'baslake_datasets_access',
    manage: 'baslake_datasets_manage',
  },
  organization: {
    see: 'baslake_organizations_access',
    manage: 'baslake_organizations_manage',
  },
};

export default permissions;
