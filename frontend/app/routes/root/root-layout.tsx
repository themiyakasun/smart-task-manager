import Navbar from 'components/home/Navbar';
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
