import { Outlet } from 'react-router-dom';
import NavLandlord from '../components/NavLandlord';

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
