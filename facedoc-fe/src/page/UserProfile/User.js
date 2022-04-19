import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

function User() {
  return (
    <div className='home-container'>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <img src='#' alt='User profile' style={{ width: '25%' }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          {' '}
          <TableContainer component={Paper} sx={{ maxWidth: 600 }}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Document </TableCell>
                  <TableCell align='right'>&ensp;&ensp;&ensp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align='left'>Aadhar</TableCell>
                  <TableCell align='right'>
                    <Button variant='outlined'>Outlined</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='left'>Aadhar</TableCell>
                  <TableCell align='right'>
                    <Button variant='outlined'>Outlined</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='left'>S.S.C Marksheet</TableCell>
                  <TableCell align='right'>
                    <Button variant='outlined'>Outlined</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='left'>H.S.C Marksheet</TableCell>
                  <TableCell align='right'>
                    <Button variant='outlined'>Outlined</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default User;
