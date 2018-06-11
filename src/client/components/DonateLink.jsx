import React from 'react';

import { getRefCode } from '../lib/helperFunctions';

const DonateLink = ({ url, children, className = '' }) => (
  <a
    className={'donate-button ' + className}
    href={url + '?refcode=' + (getRefCode() || 'mvpsite')}
    target="_blank"
  >
    {children}
  </a>
);

module.exports = DonateLink;
