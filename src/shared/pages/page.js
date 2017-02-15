
import React from 'react';

class ContentPage extends React.Component {
  render() {
    const { content } = this.props;
    return <div className="content" dangerouslySetInnerHTML={{__html:content}} />;
  }
}

ContentPage.title = 'ContentPage';


module.exports = ContentPage;