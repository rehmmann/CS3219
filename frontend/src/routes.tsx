import { Navigate, Outlet } from 'react-router-dom';
import { User } from './utils/types';

import Dashboard from './pages/Dashboard/Dashboard';
import DashboardLayout from './components/DashboardLayout/DashboardLayout';
import Login from './pages/Login/Login';

const routes = (isLoggedIn: boolean) => [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      // { path: '', element: <>app</> },
      { path: 'dashboard', element: <Dashboard />},
      {
        path: 'member',
        children: [
          { path: '', element: <>membergrid</> },
          { path: 'add', element: <>AddMember</> },
        ],
      },
    ],
  },
  {
    path: 'login',
    element: !isLoggedIn ? <Login /> : <Navigate to="/app/dashboard" />,
  },
  {
    path: '',
    element: !isLoggedIn ? <Navigate to="/login" />: <Navigate to="/app/dashboard" />,
    children: [
      { path: 'login', element: <>Logasdin</> },
      { path: '', element: <Navigate to="/login" /> },
    ],
  },
];

export default routes;