import React from 'react';
import 'whatwg-fetch';
import { findDOMNode } from 'react-dom';
import Loading from './Loading.jsx';
import Link from '../services/LinkToRoute';

import '../lib/tooltip';

class StateMap extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
      mapData: null
    };
    this.unMounted = false;
  }

  componentDidMount() {
    const states = {};
    this.props.dataSource.forEach( s => states[s.slug] = s );
    const colors = {};
    this.props.colors.forEach( c => colors[c.term_id] = c );
    this.populateMapData(states,colors);
  }

  componentDidUpdate() {
    if( !this.gotTT ) {
      const $e     = $(findDOMNode(this));
      const $links = $('[data-toggle="tooltip"]',$e);

      $links.tooltipX({ container:'#map', html: true });
      $links.click( function(e) {
        e.preventDefault();
        var $this = $(this);
        var href = $this.attr('xlink:href');
        Link.navigateTo( href );
      });
      this.gotTT = true;
    }
  }

  componentWillUnmount() {
    this.unMounted = true;
  }

  populateMapData(states,colors) {
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
              const { parent, count } = state;
              link  = '/groups#' + stateName;
              cls   = 'map-' + colors[parent].slug.replace(/-states/,'');
              const s = (count === 1 ? '' : 's');
              title += `${count} group${s}</div>`;
              if( state.description ) {
                title += '<div class="race-data">' + state.description + '</div>';
              }
            } else {
              link  = '/groups#no-groups';
              title += '0 groups</div>';
              cls   = 'map-no-groups';
            }

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

    /* eslint-disable react/no-danger */
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
