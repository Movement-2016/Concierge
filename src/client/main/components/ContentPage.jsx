import React from 'react';
import { PageContext } from './ContextMixins';

class ContentPage extends PageContext(React.Component) {

  get page() {
    return this.props.page;
  }

  render() {

    const { 
      content, 
      page:{
        title
      } = {} 
    } = this.state;

    if( !content ) {
      return <div className="well loading">loading...</div>;
    }

    return(
        <div className={`content-page ${this.page}`}>
          <h1>{title}</h1>
          <div className="content" dangerouslySetInnerHTML={{__html:content}} />;
        </div>
      );
  }
}

module.exports = ContentPage;