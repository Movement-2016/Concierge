import React    from 'react';
import Tiles    from './Tiles.jsx';

import M2016Service from '../../m2016-service';

const NUM_COLS_PER_ROW = 3;
const TILE_COL_WIDTH = 3;
const FIRST_COL_OFFSET = 1;


class TilesPage extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
      loading: true,
      page: null
    };
  }

  componentDidMount() {
    M2016Service.init().then( service => {
      this.setState({ 
        loading: false, 
        page: service.pages[this.props.page]
      });
    });
  }

  render() {

    const { 
      loading, 
      page
    } = this.state;

    const { 
      className, 
      children 
    } = this.props;

    if( loading ) {
      return <div className="well loading">Loading...</div>;
    }

    return (
      <main className={className} >
        {children}
        <h1 className="tiles-title" dangerouslySetInnerHTML={{__html:page.title}}/>
        <Tiles {...page} colsPerRow={NUM_COLS_PER_ROW} colWidth={TILE_COL_WIDTH} offset={FIRST_COL_OFFSET} />
      </main>
    );
  }
}

module.exports = TilesPage;
