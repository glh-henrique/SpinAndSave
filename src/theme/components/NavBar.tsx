import React, { useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import SwitchCustom from '../../components/Switch';
import { Avatar, styled } from '@mui/material';


const CustomDiv = styled('div')(() => ({
  flexGrow: 1,
  justifyContent: 'flex-start',
}));

const CustomNav = styled('nav')(() => ({
  display: 'flex',
  justifyContent: 'center',
}));

const CustomAvatar = styled(Avatar)(() => ({
  cursor: 'pointer'
}));

const CustomToolbar = styled(Toolbar)(() => ({
  width: '100%',
  maxWidth: '1600px'
}));

const CustomAppBar = styled(AppBar)(() => ({}));

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const navItems = ['Home', 'Laundry Status'];


  const navigateTo = useCallback((item: string) => {
    navigate(`/${item.replace(' ', '-').toLowerCase()}`);
  }, [])

  // const handleLogout = async () => {
  //   try {
  //     await account.deleteSession('current');
  //     navigate('/'); // Redireciona para a página de login após logout
  //   } catch (error) {
  //     console.error('Erro ao encerrar a sessão:', error);
  //     alert('Erro ao encerrar a sessão. Por favor, tente novamente.');
  //   }
  // };

  return (
    <>

      <CssBaseline />
      <CustomAppBar>
        <CustomNav>

          <CustomToolbar>

            <CustomDiv>
              <CustomAvatar onClick={() => navigateTo(navItems[0])} alt="Home Spin adn Save" src="/img/spin-and-save.png" />
            </CustomDiv>

            <Box>
              {navItems.map((item) => (
                <Button onClick={() => navigateTo(item)} key={item} sx={{ color: '#fff' }}>
                  <Typography>
                    {item}
                  </Typography>
                </Button>
              ))}

              <IconButton
                onClick={() => navigateTo('Profile')}
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <SwitchCustom />
            </Box>

          </CustomToolbar>
        </CustomNav>
      </CustomAppBar>

    </>
  );
};

export default NavBar;

