import React, { useEffect, useState } from 'react';
import '../../Header/header.css'


import {
  styled,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  Divider,
  IconButton,
  Box,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  
} from '@mui/icons-material';
import NestedList from './MyList';
import { jwtDecode } from 'jwt-decode';
import { clearTokenFromLocalStorage, getTokenFromLocalStorage } from '../Auth/authUtils';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header/Header';



const drawerWidth = 250;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringcreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

export default function Base({ dynamicComponent: DynamicComponent }) {
  const navigate = useNavigate();
  
  const [open, setOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const token =getTokenFromLocalStorage();

const [myuser,setMyuser] =useState("Moi")

  useEffect(() => {
    if(token){
      const decode = jwtDecode(token);
      setMyuser(decode.sub);
    }
  }, [token]);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleLogout = () => {
    clearTokenFromLocalStorage();
    navigate('/');
  };




  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" style={{ top: 0 }} open={open} sx={{ background: '#148C8A' }} >
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            {/* <Typography
              component="h1"
              variant="h6"
              color="inherit"
              width="50%"
              //noWrap
              sx={{ flexGrow: 1 }}
            >
              Back Office ABELA
            </Typography> */}

            <Header/>

       </Toolbar>
       
        </AppBar>
        <Drawer variant="permanent" open={open}  >
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List >
            <NestedList/>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            width:drawerWidth,
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            marginTop: 1,
            
          }}
          
        >
          <Toolbar />
          {DynamicComponent && <DynamicComponent />}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
