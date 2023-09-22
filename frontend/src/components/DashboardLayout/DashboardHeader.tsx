// Import react
import React, {useState} from 'react';

// Import MUI
import {
  AppBar,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

// Import style
import './Dashboard.scss';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const DashboardHeader = () => {
  //----------------------------------------------------------------//
  //                          HOOKS                                 //
  //----------------------------------------------------------------//
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  //----------------------------------------------------------------//
  //                         HANDLERS                               //
  //----------------------------------------------------------------//
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //----------------------------------------------------------------//
  //                          RENDER                                //
  //----------------------------------------------------------------//
  return (
    <AppBar position='sticky' className="dashboard_header">
      <Container maxWidth="xl">
        <Toolbar sx={{mr: 10, ml: 10}} disableGutters className='dashboard_header__toolbar'>
          <Typography variant="h6" noWrap component="a" href="/"
            sx={{
              mr: 2,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            Peer Prep
          </Typography>
          <Stack
            direction={'row'}
            spacing={5}
          >
            <IconButton
              sx={{
                color: 'black',
                backgroundColor: 'white',
                height: 53,
                borderRadius: 14,
                border: '3px solid black',
                "&:hover": {
                  color: 'black',
                  border: '3px solid black',
                },
                width: '140px',
                fontFamily: 'Poppins',
                fontWeight: 600,
                fontSize: 13,
              }}
              disableRipple
            >
              Quick Match
            </IconButton>
          </Stack>
          {/* <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="User" />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default DashboardHeader;