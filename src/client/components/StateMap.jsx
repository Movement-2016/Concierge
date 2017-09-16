import React from 'react';
import axios from 'axios';
import { findDOMNode } from 'react-dom';
import Loading from './Loading.jsx';
import Link from '../services/LinkToRoute';

import '../lib/tooltip';

let mapCache = null;

class StateMap extends React.Component {

  constructor() {
    super(...arguments);
    this.state = {
      mapData: mapCache
    };
    this.unMounted = false;
  }

  componentDidMount() {
    this.populateMapData(this.props.dataSource);
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

  populateMapData(states) {
    if( mapCache ) {
      this.setState({ mapData:mapCache });
      return;
    }

    /* globals $ */
    axios( location.origin + '/images/state-map-data.svg', { headers: { 'Accept': 'image/svg+xml' }} )
      .then( response => {          
          if( this.unMounted ) {
            return;
          }
          let mapData = response.data;
          const div = document.createElement('DIV');
          div.innerHTML = mapData;
          $('a',div).each( (i,a) => {
            const $e = $(a);

            const stateName = $e.attr('xlink:href').match(/[a-z\-]+$/)[0];
            const formattedName = stateName.replace('-', ' ');

            const state = states.find( state => state.slug === stateName );

            $e.attr('data-toggle', 'tooltip');

            let link, title, cls;
            title = `<div class="tooltip-header"><span class="state-name">${formattedName}</span> - `;
            if( state ) {
              const { parent:{ slug }, count, description } = state;
              link  = '/groups#' + stateName;
              cls   = 'map-' + slug.replace(/-states/,'');
              const s = (count === 1 ? '' : 's');
              title += `${count} group${s}</div>`;
              if( description ) {
                title += `<div class="race-data">${description}</div>`;
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
          mapCache = mapData;
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
