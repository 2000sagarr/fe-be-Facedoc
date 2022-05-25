import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';

const theme = createTheme();

export default function SignUp() {
  const history = useHistory();
  const initialFormData = Object.freeze({
    email: '',
    fname: '',
    mname: '',
    lname: '',
    phone: '',
    role: '',
    tc: '',
    password: '',
    password2: '',
  });

  const [roleId, setRoleId] = React.useState();
  const [roles, setRoles] = React.useState([]);

  const [roleValue, setRoleValue] = React.useState('');

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    // console.log(roleId, roleValue)

    roles.forEach((item) => {
      if (item.name === roleValue) {
        setRoleId(item.id);
      }
    });

    console.log(roleId);

    axiosInstance
      .post(`register/`, {
        email: formData.email,
        fname: formData.firstName,
        mname: formData.middleName,
        lname: formData.lastName,
        phone: formData.PhoneNumber,
        role: roleId,
        password: formData.password,
        password2: formData.ConfirmPassword,
      })
      .then((res) => {
        history.push('/signin');
        // console.log(res);
        // console.log(res.data);
      });
  };

  React.useEffect(() => {
    fetch('http://localhost:8000/user/roles')
      .then((resp) => resp.json())
      .then((data) => {
        setRoles(data);
      });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
              backgroundColor: 'black',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                height: '100vh'
              }}
            >
              <Typography
                component='h1'
                variant='h1'
                sx={{ fontFamily: 'Roboto' }}
              >
                Register
              </Typography>
              <Typography component='h3' variant='h1' sx={{ fontWeight: 500 }}>
                With Us.
              </Typography>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
            }}
          >
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              elevate={5}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
              }}
            >
              <TextField
                variant='filled'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                onChange={handleChange}
                sx={{ width: '50vh', marginBottom: 1 }}
              />
              <TextField
                variant='filled'
                autoComplete='given-name'
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                onChange={handleChange}
                sx={{ width: '50vh', marginBottom: 1 }}
              />
              <TextField
                variant='filled'
                required
                fullWidth
                id='middleName'
                label='Middle Name'
                name='middleName'
                autoComplete='family-name'
                onChange={handleChange}
                sx={{ width: '50vh', marginBottom: 1 }}
              />
              <TextField
                variant='filled'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='family-name'
                onChange={handleChange}
                sx={{ width: '50vh', marginBottom: 1 }}
              />
              <FormControl>
                <InputLabel id='demo-simple-select-label'>Role</InputLabel>
                <Select
                  variant='filled'
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label=''
                  defaultValue=''
                  onChange={(event) => {
                    setRoleValue(event.target.value);
                  }}
                  placeholder='Role'
                  sx={{ width: '50vh', marginBottom: 1 }}
                >
                  {roles.map((data) => (
                    <MenuItem key={data.name} value={data.name}>
                      {data.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                required
                fullWidth
                id='number'
                label='Phone Number'
                name='PhoneNumber'
                autoComplete='family-name'
                onChange={handleChange}
                sx={{ width: '50vh', marginBottom: 1 }}
                variant='filled'
              />
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
                onChange={handleChange}
                sx={{ width: '50vh', marginBottom: 1 }}
                variant='filled'
              />
              <span style={{"width" : "50vh", "color" : "red", "font-size" : "15px"}}>Password must Contain 1 Uppercase character, 1 Lowercase character, 1 digit, 1 symbol</span>
              <TextField
                required
                fullWidth
                name='ConfirmPassword'
                label='Confirm Password'
                type='password'
                id='confirmPassword'
                autoComplete='new-password'
                onChange={handleChange}
                sx={{ width: '50vh', marginBottom: 1 }}
                variant='filled'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: 'black',
                  width: '50vh',
                  marginBottom: 1,
                }}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
