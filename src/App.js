import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import NavbarMobile from './components/Navbar/NavbarMobile.js';
import NavbarDesktop from './components/Navbar/NavbarDesktop.js';
import Header from './components/Header/Header';
import Test from './Test.js';

const App = () => {
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (location?.pathname === '/') {
      navigate('islemler');
    }
  }, [location?.pathname, navigate]);

  const appStyles = {
    wrapper: {
      display: 'flex',
      minHeight: '100vh',
      flexDirection: { xs: 'column', sm: 'row', ms: 'row' },
    },
    row: {
      width: '100%',
      height: '100%',
      backgroundColor: '#f5f5f5',
    },
  };

  //return <Test />;

  return (
    <Box sx={appStyles.wrapper}>
      <NavbarDesktop />
      <Box sx={appStyles.row}>
        <Header />
        <NavbarMobile path={location?.pathname} />
        <Outlet />
      </Box>
    </Box>
  );
};

export default App;
