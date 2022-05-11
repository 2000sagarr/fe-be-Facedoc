import React, { useState } from 'react';
import {
  Typography,
  Card,
  Grid,
  CardContent,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Navbar from '../../components/Navbar';
import './Dashboard.css';
import axiosInstance from '../../axios';
import camera from '../../assets/camera.jpg';

function Dashboard() {
  const [load, setLoad] = useState(true);
  const [file, setFile] = useState('');
  const [uploadedFile, setUploadedFile] = useState('');
  const [documents, setDocuments] = useState([
    {
      name: 'Aadhar',
      link: '#',
    },
    {
      name: 'Driving License',
      link: '#',
    },
    {
      name: 'Passport',
      link: '#',
    },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const Upload = async () => {
      axiosInstance
        .post('/documents')
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          const { fileName, filePath, docs } = data;
          setUploadedFile({ filePath, fileName });
          setLoad(true);
          setDocuments(docs);
        });
    };
    Upload();
  };

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
          sm={12}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Card
            sx={{
              boxShadow: 7,
              borderRadius: 3,
              padding: 3,
              width: '80%',
              margin: 20,
              textAlign: 'center',
              backgroundColor: '#fbfbfb',
            }}
            elevation={10}
          >
            <CardContent></CardContent>
            <CardActions
              sx={{
                fontWeight: 700,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <form
                onSubmit={handleSubmit}
                enctype='multipart/form-data'
                className='form-container'
              >
                <label>
                  <Typography
                    variant='h4'
                    color='text'
                    style={{ marginBottom: '15px', fontWeight: 900 }}
                  >
                    Upload
                    <span style={{ fontWeight: 300, fontFamily: 'Roboto' }}>
                      Image
                    </span>
                  </Typography>
                  <input
                    accept='image/*'
                    id='icon-button-file'
                    type='file'
                    className='img-uploader'
                    onChange={(event) => setFile(event.target.files[0])}
                  />
                </label>
              </form>
              {load && (
                <TableContainer
                  component={Paper}
                  sx={{
                    margin: 10,
                    borderRadius: 4,
                  }}
                  elevation={5}
                >
                  <Table aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          colSpan={12}
                          align='center'
                          style={{ fontWeight: 700, fontSize: '18pt' }}
                        >
                          Documents
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {documents.map((document) => (
                        <TableRow>
                          <TableCell align='center'>{document.name}</TableCell>
                          <TableCell align='center'>
                            {' '}
                            <a
                              className='link-btn'
                              target='_blank'
                              href={document.link}
                            >
                              Open
                            </a>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              {!load && (
                <img
                  src={camera}
                  alt='camera'
                  style={{ width: '30%' }}
                  className='img-anim'
                />
              )}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
