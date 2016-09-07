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
    return ['home', 'aboutSection', 'testimonials'];
  }

  render() {
    const { home, aboutSection, testimonials } = this.state.pages;
    return(
      <div>
        <TilesPage page={home} className="homeArea" />
        <div className="row aboutUsArea">
          <SubSection section={aboutSection} numCols={6} colsPerRow={1} />
          <SubSection section={testimonials} numCols={6} colsPerRow={2} />
        </div>
      </div>

      );
  }
}

module.exports = HomePage;
