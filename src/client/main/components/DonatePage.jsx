import React    from 'react';
import ContentPage from './ContentPage.jsx';
import DonateTiles from './DonateTiles.jsx';

class DonatePage extends React.Component {

  render() {
    return(
        <ContentPage.Shell name="donate" title="Select a Donation Plan" big="false">
          <DonateTiles />
        </ContentPage.Shell>
      );
  }
}

module.exports = DonatePage;
