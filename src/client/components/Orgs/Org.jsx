import React from 'react';

import {toggleItem} from '../../store/actions';

function OrgHeader(props) {
  const labels = props.tags.map(tag => props.terms[tag].name);

  return (
    <div className="group-header">
      <div className="group-title" data-id={props.id} data-href={`/groups#${props.id}`}>
        {props.name}
      </div>
      <div className="nonprofit-tags">
        {labels.join(', ')}
      </div>
    </div>
  );
}

function OrgImage(props) {
  if (props.url) {
    return (
      <img className="group-thumb group-image" src={props.url} />
    );
  } else {
    const i = props.name.search('[A-Za-z]');
    const letter = props.name[i];
    return (
      <div className="group-thumb group-placeholder">{letter}</div>
    );
  }
}

function OrgLinks (props) {
  return (
    <div className="group-links">
      <a className="group-link" href="#" onClick={props.onOrgClick}>
        <i className="material-icons">{props.planIcon}</i>{props.planText}</a>
      {props.urlGive && <a className="group-link" href={props.urlGive} target="_blank">
        <i className="material-icons">star_border</i>Donate Now</a>}
      {props.urlWeb && <a className="group-link" href={props.urlWeb} target="_blank">
        <i className="material-icons">link</i>Website</a>}
    </div>
  );
}

function OrgContent(props) {
  return (
    <div className="group-content">
      <p dangerouslySetInnerHTML={{__html: props.description}}/>
    </div>
  );
}

function OrgTags(props) {
  const {fields, filters} = props;

  const tagBlocks = {};

  ['issue-area', 'constituency'].forEach(taxonomySlug => {
    if (fields[taxonomySlug] && fields[taxonomySlug].length) {
      const taxonomy = filters[taxonomySlug];
      const terms = taxonomy.terms;
      tagBlocks[taxonomy.label] = fields[taxonomySlug].map(slug => terms[slug].name);
    }
  });

  const keys = Object.keys(tagBlocks);
  if (!keys.length) {
    return null;
  }

  return (
    <div className="tagblocks">
      {keys.map( label => {
        return (
          <div className="tagblock" key={label}>
            <span className="tagblock-title">{label}: </span>
            <span className="tagblock-tags">{tagBlocks[label].join(', ')}</span>
          </div>
        );
      })}
    </div>
  );
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
    if (this.state.selected !== nextProps.selected) {
      this.setState({selected: nextProps.selected});
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.state.selected !== nextProps.selected;
  }

  onOrgClick(e) {
    e.preventDefault();
    this.props.store.dispatch(toggleItem(this.props.ID));
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
        'nonprofit-type': npTags = [],
        image
      },
      ID: id,
      filters,
      mobile
    } = this.props;

    const {selected} = this.state;

    const planIcon = selected
      ? 'close'
      : 'playlist_add';
    const planText = selected
      ? 'Remove'
      : 'Add to plan';
    const cls = selected
      ? 'selected'
      : '';

    const npTerms = filters['nonprofit-type'].terms;

    const urlGive = urlC3 || urlC4;

    if (mobile) {
      return (
        <div className={`group ${cls}`}>
          <OrgHeader id={id} name={name} tags={npTags} terms={npTerms}/>
          <OrgImage url={image} name={name} />
          <OrgLinks {...{urlGive, urlWeb, planIcon, planText}} onOrgClick={this.onOrgClick} />
          <OrgContent description={description} />
          <OrgTags fields={fields} filters={filters} />
        </div>
      );
    }

    return (
      <div className={`group ${cls}`}>
        <div className="image-col">
          <OrgImage url={image} name={name} />
          <OrgLinks {...{urlGive, urlWeb, planIcon, planText}} onOrgClick={this.onOrgClick} />
        </div>
        <div className="content-col">
          <OrgHeader id={id} name={name} tags={npTags} terms={npTerms}/>
          <OrgContent description={description} />
          <OrgTags fields={fields} filters={filters} />
        </div>
      </div>
    );
  }
}

module.exports = Org;
