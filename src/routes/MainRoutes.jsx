import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import UserManagement from 'pages/user';
import AssignUserToRole from 'pages/roles';
const Recherche = Loadable(
  lazy(() => import('pages/component-overview/recherche'))
);

const Center = Loadable(lazy(() => import('pages/component-overview/center')));
const Scan = Loadable(lazy(() => import('pages/component-overview/scan')));
const Workflow = Loadable(
  lazy(() => import('pages/component-overview/workflow'))
);
const Typography = Loadable(
  lazy(() => import('pages/component-overview/typography'))
);
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const Decharge = Loadable(
  lazy(() => import('pages/component-overview/decharge'))
);

// render - sample page
const SamplePage = Loadable(
  lazy(() => import('pages/extra-pages/sample-page'))
);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />,
    },
    {
      path: 'recherche',
      element: <Recherche />,
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />,
        },
      ],
    },
    {
      path: 'sample-page',
      element: <SamplePage />,
    },
    {
      path: 'shadow',
      element: <Shadow />,
    },
    {
      path: 'workflow',
      element: <Workflow />,
    },
    {
      path: 'scan',
      element: <Scan />,
    },
    {
      path: 'decharge',
      element: <Decharge />,
    },

    {
      path: 'user',
      element: <UserManagement />,
    },

    {
      path: 'roles',
      element: <AssignUserToRole />,
    },

    {
      path: 'center',
      element: <Center />,
    },
  ],
};

export default MainRoutes;
