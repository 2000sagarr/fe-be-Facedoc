import React from 'react';
import { Link } from 'react-router-dom';
import img from './imagee.jpg';
function Error() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img src={img} alt='404 error page not found' style={{ width: '40vw' }} />
      <h3>Lost? Let's take you back to the Landing?</h3>
      <Link
        to='/'
        style={{
          backgroundColor: '#4287f5',
          borderRadius: 20,
          color: 'white',
          textDecoration: 'none',
          padding: 20,
        }}
      >
        Take me Back!
      </Link>
    </div>
  );
}

export default Error;
