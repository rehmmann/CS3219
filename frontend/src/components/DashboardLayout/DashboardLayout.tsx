// src/components/DashboardLayout.tsx
import { Outlet } from 'react-router-dom';

import DashboardHeader from './DashboardHeader';

const DashboardLayout = () => {
  return (
    <>
      <DashboardHeader />
      <Outlet />
    </>
  );
};

export default DashboardLayout;
