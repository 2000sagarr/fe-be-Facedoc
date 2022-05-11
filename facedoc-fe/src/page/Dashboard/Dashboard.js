import React from 'react';
import {
  Typography,
  Stack,
  IconButton,
  Card,
  Grid,
  CardContent,
  CardActions,
} from '@mui/material';
import camera from '../../assets/camera.jpg';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Navbar from '../../components/Navbar';
import './Dashboard.css';

const Input = styled('input')({
  display: 'none',
});

function Dashboard() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Navbar />

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
          }}
        >
          <Card sx={{
            height: 400, width: 600, bgcolor: 'background.paper',
            boxShadow: 7,
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <CardContent >
              <Typography variant="h4" color="text" gutterBottom sx={{ mt: 5, fontWeight: 700}}>
                Upload Image
              </Typography>
            </CardContent>
            <CardActions sx={{mt:10}}>
              <Stack direction="row" alignItems="center" spacing={2} >
                <label htmlFor="icon-button-file" >
                  <Typography color="text.secondary" variant="h6">
                  select the image:
                  </Typography>
                  <Input accept="image/*" id="icon-button-file" type="file" />
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera sx={{ height:80, width: 68, alignItems: 'center', ml:3.5,
            justifyContent: 'center',}} />
                  </IconButton>
                </label>
              </Stack>
            </CardActions>
          </Card>
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
            backgroundColor: 'white',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'black',
              height: '100vh',
              mt: 3.7
            }}
          >
            <img
              src={camera}
              alt='camera'
              style={{ width: '100%', height:'85%' }}
              className='img-anim'
            />
          </div>
        </Grid>
      </Grid>
    </div >
  );
}

export default Dashboard;
