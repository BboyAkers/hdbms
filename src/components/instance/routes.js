import Browse from './browse';
import Query from './query';
import Clustering from './clustering';
import Config from './config';
import Users from './users';
import Roles from './roles';

export default [
  {
    component: Browse,
    path: '/instance/:compute_stack_id/browse/:schema?/:table?/:action?/:hash?',
    link: 'browse',
    icon: 'list',
    iconCode: 'f03a',
  },
  {
    component: Query,
    path: '/instance/:compute_stack_id/query',
    link: 'query',
    icon: 'code',
    iconCode: 'f121',
  },
  {
    component: Clustering,
    path: '/instance/:compute_stack_id/clustering',
    link: 'clustering',
    icon: 'share-alt',
    iconCode: 'f1e0',
  },
  {
    component: Users,
    path: '/instance/:compute_stack_id/users',
    link: 'users',
    icon: 'users',
    iconCode: 'f0c0',
  },
  {
    component: Roles,
    path: '/instance/:compute_stack_id/roles/:role_id?',
    link: 'roles',
    icon: 'check-square',
    iconCode: 'f14a',
  },
  {
    component: Config,
    path: '/instance/:compute_stack_id/config',
    link: 'config',
    icon: 'wrench',
    iconCode: 'f0ad',
  },
];
