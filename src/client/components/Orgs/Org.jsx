import React from 'react';

const OrgHeader = ({ tags, terms, id, name }) => {
  const labels = tags.map(tag => terms[tag].name).join(', ');

  return (
    <div className="group-header">
      <div className="group-title" data-id={id} data-href={`/groups#${id}`}>
        {name}
      </div>
      <div className="nonprofit-tags">
        {labels}
      </div>
    </div>
  );
};

const OrgImage = ({ url, name }) => url 
                                      ? <img className="group-thumb group-image" src={url} />
                                      : <div className="group-thumb group-placeholder">{name[name.search('[A-Za-z]')]}</div>;

const OrgLinks = ({ onOrgClick, planText, planIcon, urlGive, urlWeb }) => 
    <div className="group-links">
      <a className="group-link" href="#" onClick={onOrgClick}>
        <i className="material-icons">{planIcon}</i>{planText}</a>
      {urlGive && <a className="group-link" href={urlGive} target="_blank">
        <i className="material-icons">{'star_border'}</i>{'Donate Now'}</a>}
      {urlWeb && <a className="group-link" href={urlWeb} target="_blank">
        <i className="material-icons">{'link'}</i>{'Website'}</a>}
    </div>;

   
const OrgContent = ({ description }) => <div className="group-content"><p dangerouslySetInnerHTML={{__html: description }}/></div>; // eslint-disable-line react/no-danger

const OrgTags = ({fields, filters}) => {
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
            <span className="tagblock-title">{label + ': '}</span>
            <span className="tagblock-tags">{tagBlocks[label].join(', ')}</span>
          </div>
        );
      })}
    </div>
  );

};

const OrgMobile = ({
    cls,
    description,
    fields,
    filters,
    id,
    image,
    name,
    npTags,
    npTerms,
    onClick,
    planIcon,
    planText,
    urlGive,
    urlWeb,
  }) =>         
        <div className={`group ${cls}`}>
          <OrgHeader id={id} name={name} tags={npTags} terms={npTerms}/>
          <OrgImage url={image} name={name} />
          <OrgLinks {...{urlGive, urlWeb, planIcon, planText}} onOrgClick={onClick} />
          <OrgContent description={description} />
          <OrgTags fields={fields} filters={filters} />
        </div>;

const OrgDesktop = ({
    cls,
    description,
    fields,
    filters,
    id,
    image,
    name,
    npTags,
    npTerms,
    onClick,
    planIcon,
    planText,
    urlGive,
    urlWeb,
}) => <div className={`group ${cls}`}>
        <div className="image-col">
          <OrgImage url={image} name={name} />
          <OrgLinks {...{urlGive, urlWeb, planIcon, planText}} onOrgClick={onClick} />
        </div>
        <div className="content-col">
          <OrgHeader id={id} name={name} tags={npTags} terms={npTerms}/>
          <OrgContent description={description} />
          <OrgTags fields={fields} filters={filters} />
        </div>
      </div>;

const translateProps = ({
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
  mobile,
  selected,
  toggleItem
}) => ({
  cls: selected ? 'selected' : '',
  description,
  fields,
  filters,
  id,
  image,
  mobile,
  name,
  npTags,
  npTerms: filters['nonprofit-type'].terms,
  onClick: function(e) { e.preventDefault(); toggleItem(id); },
  planIcon: selected ? 'close' : 'playlist_add',
  planText: selected ? 'Remove' : 'Add to plan',
  urlGive: urlC3 || urlC4,
  urlWeb,
});

class Org extends React.Component {

  shouldComponentUpdate(nextProps) {
    return this.props.selected !== nextProps.selected;
  }

  render() {
    const props = translateProps(this.props);

    return props.mobile 
            ? <OrgMobile {...props} />
            : <OrgDesktop {...props} />;
  }
}

module.exports = Org;
