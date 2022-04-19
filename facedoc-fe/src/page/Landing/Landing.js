import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='home-container'>
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
          style={{ border: '2px black solid' }}
        >
          SignIn
        </Link>
      </div>
    </div>
  );
}

export default Home;
