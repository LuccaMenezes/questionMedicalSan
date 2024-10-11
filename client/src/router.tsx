import { createBrowserRouter } from 'react-router-dom';
import GeneralError from './pages/errors/general-error';
import NotFoundError from './pages/errors/not-found-error';
import MaintenanceError from './pages/errors/maintenance-error';
import UnauthorisedError from './pages/errors/unauthorised-error';
import ProtectedRoute from './protectedRoute';

const router = createBrowserRouter([

  {
    path: '/login',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in')).default,
    }),
  },  
  {    
    lazy: async () => {
      const AppShell = await import('./components/app-shell');
      return { Component: AppShell.default };
    },
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        path: 'primeiraPergunta',
        element: <ProtectedRoute component={(await import('@/pages/primeiraPergunta')).default} />,
      },      
      {
        index: true,
        path: 'segundaPergunta',
        element: <ProtectedRoute component={(await import('@/pages/segundaPergunta')).default} />,
      },      
    ],
  },
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },
  { path: '*', Component: NotFoundError },
]);

export default router;
