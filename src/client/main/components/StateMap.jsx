import React from 'react';
import 'whatwg-fetch';
import { findDOMNode } from 'react-dom';
import Loading from './Loading.jsx';
import { browserHistory } from 'react-router';
import '../../lib/tooltip';

window.slink = function(e,a) {
  e.stopPropagation();
  e.preventDefault();
  browserHistory.push(a);
};

const formatRace = race => {
  return ['category', 'hotraces', 'notes'].reduce( (str,k) => { 
    race[k] && (str += `<br />${race[k]}`);
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
  }

  componentWillMount() {
    const storeState = this.context.store.getState();
    const { 
      groupings:{ 
        terms:states 
      },
      stateRaces 
    } = storeState.service;

    stateRaces.then( races => this.populateMapData(races,states) );
  }

  componentDidUpdate() {
    if( !this.gotTT ) {
      const $e     = $(findDOMNode(this));
      const $links = $('[data-toggle="tooltip"]',$e);

      $links.tooltipX({ container:'#map', html: true }); 
      this.gotTT = true;      
    }
  }

  populateMapData(raceData,states) {
    /* globals $ */
    fetch( location.origin + '/images/state-map-data.svg')
      .then( response => response.text() )
      .then( mapData => {
          const div = document.createElement('DIV');
          div.innerHTML = mapData;
          $('a',div).each( (i,a) => {
            const $e = $(a);
            
            const stateName = $e.attr('xlink:href').match(/[a-z\-]+$/)[0];
            
            const state = states[stateName] || null;

            $e.attr('data-toggle', 'tooltip');

            let link, title, cls;

            if( state ) {
              const { label, group, count } = state;
              link  = '/groups#' + stateName;
              title = count === 1
                        ? `<b>There is 1 group in ${label}</b>`
                        : `<b>There are ${count} groups in ${label}</b>`;
              cls   = 'map-' + group;
            } else {
              link  = '/groups#no-groups';
              title = 'no groups in ' + stateName + '!';
              cls   = 'map-no-groups';
            }

            raceData[stateName] && (title += formatRace(raceData[stateName]));

            $e.attr('onclick', 'window.slink(event,"'+link+'")');
            $e.attr('xlink:href', '#');
            $e.attr('title', title);
            $('path',a).addClass( cls );

          });


          mapData = div.innerHTML;
          this.setState({ mapData });
          div.innerHTML = '';

        });
  }

  onStateClick(e) {
    location.href = e.target.href;
  }

  render() {
    const { mapData } = this.state;

    return (
      <div className="map-area">
        <h2 className="map-title">Find A Group</h2>
        <div className="map-desc">Click the map to browse the groups in each state.</div>
          {mapData
            ? <div id="map" dangerouslySetInnerHTML={{__html:mapData}} />
            : <Loading />
          }
      </div>
    );
  }
}

module.exports = StateMap;