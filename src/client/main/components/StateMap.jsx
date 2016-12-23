import React from 'react';
import 'whatwg-fetch';
import { findDOMNode } from 'react-dom';
import Loading from './Loading.jsx';

import '../../lib/tooltip';

const formatRace = race => {
  return ['category', 'hotraces', 'notes'].reduce( (str,k) => {
    race[k] && (str += '<div class="datum">' + race[k].replace(/(?:\r\n|\r|\n)/g, '<br />') + '</div>');
    return str;
  } , '' );
};

class StateMap extends React.Component {

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  }

  constructor() {
    super(...arguments);
    this.state = {
      mapData: null
    };
    this.unMounted = false;
  }

  componentWillMount() {
    const storeState = this.context.store.getState();
    const { service } = storeState;
    const {
      groupings:{
        terms:states
      },
    } = service;

    const {
      dataSource
    } = this.props;

    service.getStateRaces(dataSource).then( races => this.populateMapData(races,states) );
  }

  componentDidUpdate() {
    if( !this.gotTT ) {
      const $e     = $(findDOMNode(this));
      const $links = $('[data-toggle="tooltip"]',$e);

      $links.tooltipX({ container:'#map', html: true });
      this.gotTT = true;
    }
  }

  componentWillUnmount() {
    this.unMounted = true;
  }

  populateMapData(raceData,states) {
    /* globals $ */
    fetch( location.origin + '/images/state-map-data.svg')
      .then( response => response.text() )
      .then( mapData => {
          if( this.unMounted ) {
            return;
          }
          const div = document.createElement('DIV');
          div.innerHTML = mapData;
          $('a',div).each( (i,a) => {
            const $e = $(a);

            const stateName = $e.attr('xlink:href').match(/[a-z\-]+$/)[0];
            const formattedName = stateName.replace('-', ' ');

            const state = states[stateName] || null;

            $e.attr('data-toggle', 'tooltip');

            let link, title, cls;
            title = `<div class="tooltip-header"><span class="state-name">${formattedName}</span> - `;
            if( state ) {
              const { label, group, count } = state;
              link  = '/groups#' + stateName;
              cls   = 'map-' + group;
              const s = (count === 1 ? '' : 's');
              title += `${count} group${s}</div>`;
            } else {
              link  = '/groups#no-groups';
              title += '0 groups</div>';
              cls   = 'map-no-groups';
            }

            raceData[stateName] && (title += '<div class="race-data">' + formatRace(raceData[stateName]) + '</div>');

            $e.attr('xlink:href', link);
            $e.attr('title', title);
            $('path',a).addClass( cls );

          });


          mapData = div.innerHTML;
          this.setState({ mapData });
          div.innerHTML = '';

        });
  }

  render() {
    const { mapData } = this.state;

    return (
      <div className="map-area">
        {mapData
          ? <div id="map" dangerouslySetInnerHTML={{__html:mapData}} />
          : <Loading />
        }
      </div>
    );
  }
}

module.exports = StateMap;
