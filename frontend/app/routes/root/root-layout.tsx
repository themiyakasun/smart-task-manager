import Navbar from 'components/home/Navbar';
import React from 'react';
import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
};

export default RootLayout;
