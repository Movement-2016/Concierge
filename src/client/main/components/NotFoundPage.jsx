import React from 'react';
import { Link } from 'react-router';

/**
 * Content displayed for 404
 */
const NotFoundPage = () => {
  return (
    <div>
      <span>Page not found.</span>
      <Link to='/' className='button'>Home</Link>
    </div>
  );
};

export default NotFoundPage;
