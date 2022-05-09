import React from 'react';
import {
  createTheme,
  ThemeProvider,
  Container,
  Typography,
  CssBaseline,
  Box,
} from '@mui/material';
import { Form, Card, Button } from 'react-bootstrap';
import Navbar from '../../components/Navbar';
import './Dashboard.css';

const theme = createTheme();
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
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='sm'>
          <Card>
            <Card.Body>
              <CssBaseline />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography component='h1' variant='h5'>
                  Upload Image
                </Typography>
                <Form.Group controlId='formFileLg' className='mb-3'>
                  <br />
                  <Form.Label>Select image:</Form.Label>
                  <Form.Control type='file' size='mg' />
                </Form.Group>
                <Button variant='dark' size='md'>
                  Submit
                </Button>
              </Box>
            </Card.Body>
          </Card>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Dashboard;
