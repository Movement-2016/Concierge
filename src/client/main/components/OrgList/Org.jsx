import React from 'react';

import { toggleItem } from '../../store/actions';

class TagBlock extends React.Component {
  render() {
    const {
      fields,
      filters
    } = this.props;

    const block = {};

    ['issue-area','constituency'].forEach( taxonomySlug => {
          if( fields[taxonomySlug] && fields[taxonomySlug].length ) {
            const taxonomy = filters[taxonomySlug];
            const terms     = taxonomy.terms;
            block[taxonomy.label] = fields[taxonomySlug].map( slug => terms[slug].name );
          }
      });

    return (
      <div>
      {Object.keys(block).map( label => {
          return (
              <div className="tagblock" key={label} >
                <div className="tagblock-title">{label}:</div>
                <div className="tagblock-tags">{block[label].map( (g,i) => <span className="group-tag" key={i}>{g}</span>)}</div>
              </div>
            );
      })}
      </div>
    );
  }
}

class Org extends React.Component {

  constructor() {
    super(...arguments);

    this.state = {
      selected: this.props.selected
    };

    this.onOrgClick = this.onOrgClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if( this.state.selected !== nextProps.selected ) {
      this.setState( {selected: nextProps.selected} );
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.state.selected !== nextProps.selected;
  }

  onOrgClick(e) {
    e.preventDefault();
    this.props.store.dispatch( toggleItem(this.props.ID) );
  }

  render() {
    const {
      post_title: name,
      post_content: description,
      fields,
      fields: {
        website: urlWeb,
        c4_donate_link: urlC4,
        c3_donate_link: urlC3,
        'nonprofit-type': npTags = []
      },
      ID: id,
      filters
    } = this.props;

    const {
      selected
    } = this.state;

    const icon    = selected ? 'close' : 'playlist_add';
    const iconCls = selected ? 'remove' : 'add';
    const text    = selected ? 'Remove from plan' : 'Add to plan';
    const cls     = selected ? 'selected' : '';

    const npTerms = filters['nonprofit-type'].terms;

    const urlGive = urlC3 || urlC4;

    return(
        <div className={`group ${cls}`}>
          <div className="group-title" data-id={id}><span data-href={`/groups#${id}`}>{name}</span></div>
          <div className="group-links-row row">
            <div className="col s6 m9">
              {urlWeb  && <a className="group-link" href={urlWeb}  target="_blank"><i className="material-icons">link</i>Website</a>}
              <a className="group-link hide-on-small-and-down" href="#" onClick={this.onOrgClick}><span><i className={`material-icons ${iconCls}`}>{icon}</i>{text}</span></a>
              {urlGive && <a className="group-link" href={urlGive} target="_blank"><i className="material-icons">star_border</i>Donate Now</a>}
            </div>
            <div className="nonprofit-tags col s6 m3">
              {npTags.map( t => <span className="group-tag" key={t}>{npTerms[t].name}</span> )}
            </div>
          </div>
          <div className="group-content"><p dangerouslySetInnerHTML={{__html:description}} /></div>
          <TagBlock fields={fields} filters={filters} />
        </div>
      );
  }
}

module.exports = Org;
