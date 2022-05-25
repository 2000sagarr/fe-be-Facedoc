import React,{useEffect, useState} from 'react';
import Navbar from '../../components/Navbar';
import TextField from '@mui/material/TextField';
import './Upload.css';
import { Box, Button, Typography} from '@mui/material';
import axios from '../../axios';

function Upload() {
    const [profile, setProfile] = useState({});
    const [isAdmin, setIsAdmin] = useState(true);
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
            if(profile.role === 'admin'){
                setIsAdmin(true);
           }
          })
          .catch((err) => console.log(err));
      }, []);

    return (
        <div>
            <Navbar />
            {isAdmin ?  <Box
                sx={{
                    marginTop: '20vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                }}
            >
                <Typography
                    variant='h4'
                    color='text'
                    style={{ marginBottom: '15px', fontWeight: 900 }}
                >
                    Upload
                    <span style={{ fontWeight: 300, fontFamily: 'Roboto' }}>
                        Details
                    </span>
                </Typography>
                <TextField
                    variant='filled'
                    required
                    fullWidth
                    id='firstName'
                    label='First Name'
                    name='firstName'
                    autoComplete='first-name'
                    sx={{ width: '60vh', marginBottom: 2 }}
                />

                <TextField
                    variant='filled'
                    required
                    fullWidth
                    id='lastName'
                    label='Last Name'
                    name='lastName'
                    autoComplete='family-name'
                    sx={{ width: '60vh', marginBottom: 2 }}
                />
                <label>
                    <Typography
                        style={{ fontFamily: 'Roboto', paddingLeft: '0.2cm' }}>
                        Passport
                    </Typography>
                    <input
                        accept='image/*'
                        id='icon-button-file'
                        type='file'
                        className='img-uploader'
                    />
                </label>
                <label>
                    <Typography
                        style={{ fontFamily: 'Roboto', paddingLeft: '0.2cm', marginTop: 15 }}>
                        Aadhar Card
                    </Typography>
                    <input
                        accept='image/*'
                        id='icon-button-file'
                        type='file'
                        className='img-uploader'
                    />
                </label>
                <label>
                    <Typography
                        style={{ fontFamily: 'Roboto', paddingLeft: '0.2cm', marginTop: 15 }}>
                        Pan Card
                    </Typography>
                    <input
                        accept='image/*'
                        id='icon-button-file'
                        type='file'
                        className='img-uploader'
                    />
                </label>
                <label>
                    <Typography
                        style={{ fontFamily: 'Roboto', paddingLeft: '0.2cm', marginTop: 15 }}>
                        Driving License
                    </Typography>
                    <input
                        accept='image/*'
                        id='icon-button-file'
                        type='file'
                        className='img-uploader'
                    />
                </label>

                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{
                        mt: 3,
                        mb: 2,
                        backgroundColor: 'black',
                        height: '6vh',
                        width: '60vh',
                        marginBottom: 1,
                    }}
                >
                    Submit
                </Button>
            </Box> : <h1>You do not have access to upload the details</h1>} 
           
        </div >

    )
}
export default Upload;