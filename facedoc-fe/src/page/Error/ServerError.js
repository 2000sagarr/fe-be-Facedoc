import React from 'react';
import { Link } from 'react-router-dom';
import img from './500.jpg';
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
        To Landing Page
      </Link>
    </div>
  );
}

export default Error;
