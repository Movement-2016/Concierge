import React from 'react';
import MediaQuery from 'react-responsive';

import BrowsePageDesktop from './BrowsePageDesktop.jsx';
import BrowsePageMobile from './BrowsePageMobile.jsx';

function BrowsePage(props) {
  return (
    <MediaQuery minWidth={993} >
      {(matches) => {
        if (matches) {
          return <BrowsePageDesktop />
        } else {
          return <BrowsePageMobile />
        }
      }}
    </MediaQuery>
  );
}

module.exports = BrowsePage;
