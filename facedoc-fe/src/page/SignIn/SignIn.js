import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Box,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  InputLabel,
  Grid,
  MenuItem,
  FormControl,
  Select,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import home from '../../assets/home.png';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import './SignIn.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const theme = createTheme();

export default function SignIn() {
  const history = useHistory();
  const initialFormData = Object.freeze({
    email: '',
    password: '',
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`login/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem('access_token', res.data.token.access);
        localStorage.setItem('refresh_token', res.data.token.refresh);
        axiosInstance.defaults.headers['Authorization'] =
          'Bearer ' + localStorage.getItem('access_token');
        history.push('/dashboard');
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <img
              src={home}
              alt='home'
              style={{ width: '70%' }}
              className='img-anim'
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={8} md={5}>
          <Box
            sx={{
              mx: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100vh',
              justifyContent: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'black' }}></Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <FormControl fullWidth sx={{ margin: 5 }}>
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                onChange={handleChange}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                onChange={handleChange}
              />
              {/* <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              /> */}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                className='button-submit'
                sx={{ mt: 3, mb: 2, bgcolor: 'black' }}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
            </FormControl>
            <Grid container>
              <Grid item>
                <Link href='/signup' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
