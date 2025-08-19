import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div className='container mx-auto min-h-screen flex-center'>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
