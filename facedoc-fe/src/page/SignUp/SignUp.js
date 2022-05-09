import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
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
        // console.log(data)
        // data.forEach((item) => {
        //   console.log(item.name);
        // });
      });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='sm'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'black' }}></Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id='middleName'
                  label='Middle Name'
                  name='middleName'
                  autoComplete='family-name'
                  onChange={handleChange}
                />
              </Grid>{' '}
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='family-name'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel id='demo-simple-select-label'>Role</InputLabel>
                <Select
                  variant='outlined'
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label=''
                  defaultValue=''
                  onChange={(event) => {
                    setRoleValue(event.target.value);
                  }}
                  placeholder='Role'
                  style={{ width: 550 }}
                >
                  {roles.map((data) => (
                    <MenuItem key={data.name} value={data.name}>
                      {data.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id='number'
                  label='Phone Number'
                  name='PhoneNumber'
                  autoComplete='family-name'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='ConfirmPassword'
                  label='Confirm Password'
                  type='password'
                  id='confirmPassword'
                  autoComplete='new-password'
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, backgroundColor: 'black' }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
