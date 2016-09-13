import React      from 'react';

import TilesPage       from './TilesPage.jsx';
import Tiles           from './Tiles.jsx';
import { PageContext } from './ContextMixins.js';


const SubSection = ({ section, numCols, colsPerRow }) => {
  return(
      <div className={`col-md-${numCols}`}>
        <Tiles {...section} colsPerRow={colsPerRow} />
      </div>
    );
};

class HomePage extends PageContext(React.Component) {
  get pages() {
    return ['home', 'info', 'testimonials'];
  }

  render() {
    const { home, info, testimonials } = this.state.pages;
    return(
      <div>
        <TilesPage page={home} className="home-area" />
        <div className="row about-us-area">
          <SubSection section={info}         numCols={6} colsPerRow={1} />
          <SubSection section={testimonials} numCols={6} colsPerRow={2} />
        </div>
      </div>

      );
  }
}

module.exports = HomePage;
