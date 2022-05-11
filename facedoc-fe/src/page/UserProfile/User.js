import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Button,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Typography,
  Box,
  TextField,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useHistory } from 'react-router-dom';
import axios from '../../axios';
import Navbar from '../../components/Navbar';
import './User.css';

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

function User() {
  const history = useHistory();
  const [loadProfile, setLoadProfile] = useState(true);
  const [profile, setProfile] = useState({});

  // State variable and functions to change tabs
  const [value, setValue] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const initialFormData = Object.freeze({
    fname: profile.fname,
    mname: profile.mname,
    lname: profile.lname,
    phone: profile.phone,
  });
  const [formData, updateFormData] = useState(initialFormData);
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  // useEffect fetches profile data whenever user profile gets updated
  useEffect(() => {
    console.log('Profile.');
    axios
      .get('http://localhost:8000/user/profile', {
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      })
      .then((res) => {
        localStorage.setItem('profile', res.data.name);
        console.log(res.data);
        setProfile(res.data);
      })
      .catch((err) => console.log(err));
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    // console.log(roleId, roleValue)

    axios
      .post(`edit/`, {
        fname: formData.firstName,
        mname: formData.middleName,
        lname: formData.lastName,
        phone: formData.PhoneNumber,
      })
      .then((res) => {
        history.push('/user');
        // console.log(res);
        // console.log(res.data);
      });
  };

  return (
    <>
      <Navbar />
      <div className='home-container'>
        <Grid container sx={{ marginTop: '50px' }}>
          <Grid item xs={12} sm={5} className='home-column-left'>
            <div className='home-column'>
              {loadProfile ? (
                <Avatar sx={{ m: 3, width: 150, height: 150 }}></Avatar>
              ) : (
                <Avatar
                  sx={{ m: 3, width: 150, height: 150 }}
                  src={profile.picture}
                ></Avatar>
              )}
              <p className='name'>{profile.fname + ' ' + profile.lname}</p>

              <p>
                {profile.role} | {profile.id}
              </p>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            className='home-column-right'
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleTabChange}
                  aria-label='basic tabs example'
                >
                  <Tab label='My Profile' {...a11yProps(0)} />
                  <Tab label='Edit Profile' {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <TableContainer
                  component={Paper}
                  sx={{ maxWidth: 500, margin: 3 }}
                  elevation={5}
                >
                  <Table aria-label='simple table'>
                    <TableBody>
                      <TableRow>
                        <TableCell align='left'>Role</TableCell>
                        <TableCell align='left'>{profile.role}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align='left'>First Name</TableCell>
                        <TableCell align='left'>{profile.fname}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align='left'>Middle Name</TableCell>
                        <TableCell align='left'>{profile.mname}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align='left'>Last Name</TableCell>
                        <TableCell align='left'>{profile.lname}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align='left'>Email</TableCell>
                        <TableCell align='left'>{profile.email}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align='left'>Phone Number</TableCell>
                        <TableCell align='left'>{profile.phone}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel value={value} index={1}>
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
                    height: '100%',
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
                  {/* <TextField
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
                  /> */}
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
                    Save
                  </Button>
                </Box>
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default User;

/*
<TableContainer
              component={Paper}
              sx={{ maxWidth: 600 }}
              elevation={5}
            >
              <Table aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>
                      <IconButton sx={{ fontSize: 20, color: 'gray' }}>
                        My Profile &ensp; <AccountBoxIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton sx={{ fontSize: 20, color: 'gray' }}>
                        Edit Profile &ensp;
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align='center'>Role</TableCell>
                    <TableCell align='center'>{profile.role}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='center'>First Name</TableCell>
                    <TableCell align='center'>{profile.fname}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='center'>Middle Name</TableCell>
                    <TableCell align='center'>{profile.mname}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='center'>Last Name</TableCell>
                    <TableCell align='center'>{profile.lname}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='center'>Email</TableCell>
                    <TableCell align='center'>{profile.email}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
*/
