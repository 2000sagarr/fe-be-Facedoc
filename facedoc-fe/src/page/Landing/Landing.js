import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

import './Landing.css';
function Home() {
  return (
    <div
      className='home-container'
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <span style={{ fontSize: 108, fontWeight: 500 }}>Face</span>
        <span style={{ fontSize: 108, fontWeight: 100 }}>Doc</span>
      </div>
      <div className='reg-box'>
        <Link
          to='/signup'
          className='home-link'
          style={{ backgroundColor: 'black', color: 'white' }}
        >
          Register
        </Link>
        <Link
          to='/signin'
          className='home-link'
          style={{ border: '2px black solid', color: 'black' }}
        >
          SignIn
        </Link>
      </div>
    </div>
  );
}

export default Home;
