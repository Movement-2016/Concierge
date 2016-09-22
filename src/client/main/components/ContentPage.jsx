import React from 'react';
import { PageContext } from './ContextMixins';
import Loading from './Loading.jsx';

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
      return <Loading />;
    }

    return(
        <main className={`content-page ${this.page}`}>
          <div className="container small-container">
            <h1 className="page-title">{title}</h1>
            <div className="content" dangerouslySetInnerHTML={{__html:content}} />;
          </div>
        </main>
      );
  }
}

module.exports = ContentPage;