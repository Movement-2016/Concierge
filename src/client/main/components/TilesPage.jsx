import React    from 'react';
import Tiles    from './Tiles.jsx';

const NUM_COLS_PER_ROW = 3;

class TilesPage extends React.Component {

  render() {

    const { 
      page,
      className, 
      children,
      numColsPerRow = NUM_COLS_PER_ROW
    } = this.props;

    return (
      <main className={className} >
        {children}
        <h1 className="tiles-title" dangerouslySetInnerHTML={{__html:page.title}}/>
        <Tiles {...page} colsPerRow={numColsPerRow} />
      </main>
    );
  }
}

module.exports = TilesPage;
