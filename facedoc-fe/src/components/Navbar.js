import { react, useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  TextField,
  MenuItem,
} from '@mui/material';
import { AccountCircle, MenuIcon } from '@mui/icons-material';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../axios';
import axios from 'axios';

export default function MenuAppBar() {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    axiosInstance.defaults.headers['Authorization'] = null;
    history.push('/signin');
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [name, setName] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/user/profile', {
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      })
      .then((res) => {
        console.log(res.data);

        const { fname, lname } = res.data;
        setName(fname + ' ' + lname);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position='fixed'
          sx={{
            backgroundColor: '#363636',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            boxShadow: '10px 10px 30px #bfbfbf',
          }}
        >
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              <Link
                to='/dashboard'
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                FaceDoc
              </Link>
            </Typography>
            {auth && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Link to='/user' style={{ color: 'white', p: 1 }}>
                  {name}
                </Link>
                <IconButton
                  size='large'
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleMenu}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem>
                    <Link
                      style={{ color: 'black', textDecoration: 'none' }}
                      to='/user'
                    >
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      style={{ color: 'black', textDecoration: 'none' }}
                      to='/add-info'
                    >
                      Add Person Info
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={logout}>
                    <Link
                      style={{ color: 'black', textDecoration: 'none' }}
                      to='/signin'
                    >
                      Logout
                    </Link>
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
