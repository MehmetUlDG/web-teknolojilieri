import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc', marginBottom: '2rem' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
        <h1>SDÜ Film Kulübü - Dizi Arama</h1>
      </Link>
    </header>
  );
};

export default Header;