import React from 'react';
import Link from '../services/LinkToRoute';
import { Shell } from './ContentPage.jsx';

/**
 * Content displayed for 404
 */
const NotFoundPage = () => {
  return (
    <Shell title="Wups - Nothing Here" name="404">
      <div style={{minHeight:300}}><span>Hmmm... doesn't look like anything is here.</span> <Link to='/' className='button'>Home</Link></div>
    </Shell>
  );
};

module.exports = NotFoundPage;
