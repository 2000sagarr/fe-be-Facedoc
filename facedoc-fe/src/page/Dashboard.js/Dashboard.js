  
import React from 'react';
import './Dashboard.css';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Navbar from '../../components/Navbar';

const theme = createTheme();
function Dashboard() {
  return (
    
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Navbar />
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='sm'>
          <Card>
            <Card.Body >
              <CssBaseline />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Typography component='h1' variant='h5'>
                  Get User Details by:
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={13}>
                    <label htmlFor="">Enter Name</label>
                    <TextField
                      required
                      fullWidth
                      id='name'
                      label='Name'
                      name='name'
                      autoComplete='name'
                    />
                    <Form.Group controlId="formFileLg" className="mb-3">
                      <br />
                      <Form.Label>Upload File</Form.Label>
                      <Form.Control type="file" size="lg" />
                    </Form.Group>
                    <Button variant="dark" size="lg">Submit</Button>
                  </Grid>
                </Grid>
              </Box>
            </Card.Body>
          </Card>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Dashboard;
