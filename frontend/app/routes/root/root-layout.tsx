import Navbar from 'components/home/Navbar';
import { useAuth } from 'contexts/useAuth';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { toast } from 'react-toastify';

const RootLayout = () => {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
};

export default RootLayout;
