import { Outlet } from 'react-router-dom';
import NavLandlord from '../Lanlord_Pages/Lanlord_NavBar';

const LandlordLayout = () => {
  return (
    <>
      <NavLandlord />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default LandlordLayout;
