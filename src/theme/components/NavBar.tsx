import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Home from '@mui/icons-material/Home';
import LocalLaundryService from '@mui/icons-material/LocalLaundryService';
import Logout from '@mui/icons-material/Logout';
import { useLocation, useNavigate } from 'react-router-dom';
import SwitchCustom from '../../components/Switch';
import { Avatar, styled } from '@mui/material';
import { account } from '../../appwrite';

const CustomDiv = styled('div')({
  flexGrow: 1,
  justifyContent: 'flex-start',
});

const CustomNav = styled('nav')({
  display: 'flex',
  justifyContent: 'center',
});

const CustomAvatar = styled(Avatar)({
  cursor: 'pointer'
});

const CustomToolbar = styled(Toolbar)({
  width: '100%',
  maxWidth: '1024px'
});

const CustomAppBar = styled(AppBar)(() => ({}));

const NavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    {
      label: 'Home',
      icon: <Home sx={{ fontSize: { sm: 30, md: 33 } }} />,
      route: '/home'
    },
    {
      label: 'Laundry Status',
      icon: <LocalLaundryService sx={{ fontSize: { sm: 30, md: 33 } }} />,
      route: '/laundry-status'
    },
    {
      label: 'Profile',
      icon: <AccountCircle sx={{ fontSize: { sm: 30, md: 33 } }} />,
      route: '/profile'
    }
  ];

  const getLinkStyle = (path: string) => {
    return location.pathname === path ? "info" : "default";
  };


  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      navigate('/'); // Redireciona para a página de login após logout
    } catch (error) {
      console.error('Erro ao encerrar a sessão:', error);
      alert('Erro ao encerrar a sessão. Por favor, tente novamente.');
    }
  };

  return (
    <>
      <CssBaseline />
      <CustomAppBar>
        <CustomNav >
          <CustomToolbar>
            <CustomDiv>
              <CustomAvatar onClick={() => navigate(navItems[0].route)} alt="Logo Spin and Save" src="/android-chrome-512x512.png" />
            </CustomDiv>
            <Box >
              {navItems.map((item) => (
                <IconButton
                  key={item.route}
                  onClick={() => navigate(item.route)}
                  size="large"

                  color={getLinkStyle(item.route)}
                  aria-label={item.label}
                >
                  {item.icon}
                </IconButton>
              ))}
              <SwitchCustom />
              <IconButton
                onClick={handleLogout}
                size="large"
                aria-label="account logout"
              >
                <Logout />
              </IconButton>
            </Box>
          </CustomToolbar>
        </CustomNav>
      </CustomAppBar>

    </>
  );
};

export default NavBar;

