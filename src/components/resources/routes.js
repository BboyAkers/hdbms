import { lazy } from 'react';

const Links = lazy(() => import(/* webpackChunkName: "support-links" */ './links'));
const Installation = lazy(() => import(/* webpackChunkName: "support-installation" */ './installation'));
const Drivers = lazy(() => import(/* webpackChunkName: "support-drivers" */ './drivers'));
const Marketplace = lazy(() => import(/* webpackChunkName: "support-marketplace" */ './marketplace'));
const Tutorials = lazy(() => import(/* webpackChunkName: "support-tutorials" */ './tutorials'));
const Examples = lazy(() => import(/* webpackChunkName: "support-examples" */ './examples'));
const DBMigrator = lazy(() => import(/* webpackChunkName: "support-dbmigrator" */ './dbmigrator'));

export default [
  {
    component: Installation,
    path: '/resources/installation',
    link: '/resources/installation',
    label: 'installation',
    icon: 'wrench',
    iconCode: 'f0ad',
  },
  {
    component: Marketplace,
    path: '/resources/marketplace/:type?',
    link: '/resources/marketplace/active',
    label: 'marketplace',
    icon: 'shopping-cart',
    iconCode: 'f07a',
  },
  {
    component: DBMigrator,
    path: '/resources/dbmigrator',
    link: '/resources/dbmigrator',
    label: 'dbmigrator',
    icon: 'coins',
    iconCode: 'f51e',
  },
  {
    component: Drivers,
    path: '/resources/drivers',
    link: '/resources/drivers',
    label: 'drivers',
    icon: 'cubes',
    iconCode: 'f1b3',
  },
  {
    component: Tutorials,
    path: '/resources/tutorials/:video_id?',
    link: '/resources/tutorials',
    label: 'tutorials',
    icon: 'video-camera',
    iconCode: 'f03d',
  },
  {
    component: Links,
    path: '/resources/links',
    link: '/resources/links',
    label: 'links',
    icon: 'external-link-square',
    iconCode: 'f14c',
  },
  {
    component: Examples,
    path: '/resources/examples/:folder?/:method?',
    link: '/resources/examples',
    label: 'example code',
    icon: 'code',
    iconCode: 'f121',
  },
];
