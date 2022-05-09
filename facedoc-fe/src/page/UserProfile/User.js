import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import './User.css';
import Navbar from '../../components/Navbar';
function User() {
  const [loadProfile, setLoadProfile] = useState(true);
  const [profile, setProfile] = useState({
    firstName: 'John',
    middleName: 'Suresh',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
    dob: '19/07/2001',
    role: 'Traffic Police',
  });

  useEffect(() => {
    fetch('')
      .then((resp) => resp.json())
      .then((data) => setProfile(data));
  }, [profile]);

  return (
    <>
      <Navbar />
      <div className='home-container'>
        <Grid container>
          <Grid item xs={12} sm={5} className='home-column'>
            <div className='home-column'>
              {loadProfile ? (
                <Avatar sx={{ m: 3, width: 150, height: 150 }}></Avatar>
              ) : (
                <Avatar
                  sx={{ m: 3, width: 150, height: 150 }}
                  src={profile.picture}
                ></Avatar>
              )}

              <p className='name'>
                {profile.firstName + ' ' + profile.lastName}
              </p>
              <p>{profile.role}</p>
            </div>
          </Grid>
          <Grid item sm={1} display={{ xs: 'none', sm: 'flex' }}>
            <div className='home-column'>
              <div className='vertical-line'></div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} className='home-column'>
            {' '}
            <TableContainer
              component={Paper}
              sx={{ maxWidth: 600 }}
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
                    <TableCell align='left'>{profile.firstName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='left'>Middle Name</TableCell>
                    <TableCell align='left'>{profile.middleName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='left'>Last Name</TableCell>
                    <TableCell align='left'>{profile.lastName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='left'>DOB</TableCell>
                    <TableCell align='left'>{profile.dob}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align='left'>Email</TableCell>
                    <TableCell align='left'>{profile.email}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default User;
