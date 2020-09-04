import describeAll from '../../api/instance/describeAll';

const buildLegacy = ({ extantTablePermissions, attributes, showAttributes }) => ({
  read: extantTablePermissions ? extantTablePermissions.read : true,
  insert: extantTablePermissions ? extantTablePermissions.insert : true,
  update: extantTablePermissions ? extantTablePermissions.update : true,
  delete: extantTablePermissions ? extantTablePermissions.delete : true,
  attribute_restrictions: attributes
    .filter((a) => showAttributes || extantTablePermissions?.attribute_restrictions?.find((att) => att.attribute_name === a))
    .map((a) => {
      const extantAttributePermissions = extantTablePermissions?.attribute_restrictions?.find((att) => att.attribute_name === a);

      return {
        attribute_name: a,
        read: extantAttributePermissions ? extantAttributePermissions.read : extantTablePermissions ? extantTablePermissions.read : true,
        insert: extantAttributePermissions ? extantAttributePermissions.insert : extantTablePermissions ? extantTablePermissions.insert : true,
        update: extantAttributePermissions ? extantAttributePermissions.update : extantTablePermissions ? extantTablePermissions.update : true,
        delete: extantAttributePermissions ? extantAttributePermissions.delete : extantTablePermissions ? extantTablePermissions.delete : true,
      };
    }),
});

const buildCurrent = ({ extantTablePermissions, attributes, showAttributes }) => ({
  read: extantTablePermissions ? extantTablePermissions.read : true,
  insert: extantTablePermissions ? extantTablePermissions.insert : true,
  update: extantTablePermissions ? extantTablePermissions.update : true,
  delete: extantTablePermissions ? extantTablePermissions.delete : true,
  attribute_permissions: attributes
    .filter((a) => showAttributes || extantTablePermissions?.attribute_permissions?.find((att) => att.attribute_name === a))
    .map((a) => {
      const extantAttributePermissions = extantTablePermissions?.attribute_permissions?.find((att) => att.attribute_name === a);

      return {
        attribute_name: a,
        read: extantAttributePermissions ? extantAttributePermissions.read : extantTablePermissions.attribute_permissions.length ? false : extantTablePermissions?.read,
        insert: extantAttributePermissions ? extantAttributePermissions.insert : extantTablePermissions.attribute_permissions.length ? false : extantTablePermissions?.insert,
        update: extantAttributePermissions ? extantAttributePermissions.update : extantTablePermissions.attribute_permissions.length ? false : extantTablePermissions?.update,
      };
    }),
});

export default async ({ auth, url, currentRolePermissions, version, is_local, compute_stack_id, customer_id, showAttributes }) => {
  const dbResponse = await describeAll({ auth, url, is_local, compute_stack_id, customer_id });
  const permissionStructure = {};
  const [major, minor, patch] = version.split('.');
  const legacy = version !== '2.0.000' && major <= 2 && minor <= 1 && patch <= 2;

  if (dbResponse.error) {
    return permissionStructure;
  }

  Object.keys(dbResponse).map((schema) => {
    permissionStructure[schema] = {
      tables: {},
    };
    return Object.keys(dbResponse[schema]).map((table) => {
      const thisTable = dbResponse[schema][table];
      const extantTablePermissions = currentRolePermissions && currentRolePermissions[schema] && currentRolePermissions[schema].tables[table];
      const attributes = thisTable.attributes.map((a) => a.attribute).sort();
      permissionStructure[schema].tables[table] = legacy
        ? buildLegacy({ extantTablePermissions, attributes, showAttributes })
        : buildCurrent({ extantTablePermissions, attributes, showAttributes });
      return true;
    });
  });

  return permissionStructure;
};
