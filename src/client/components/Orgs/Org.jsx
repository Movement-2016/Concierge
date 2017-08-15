import React from 'react';

const OrgHeader = ({ tags, id, name }) => 
    <div className="group-header">
      <div className="group-title" data-id={id} data-href={`/groups#${id}`}>
        {name}
      </div>
      <div className="nonprofit-tags">
        {tags && tags.tags.map( tag => tag.name ).join(', ')}
      </div>
    </div>
;

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

const OrgTags = ({tags}) =>
    <div className="tagblocks">
      {Object.keys(tags).filter( key => tags[key].category.tag ).map( key => {
        return (
          <div className="tagblock" key={key}>
            <span className="tagblock-title">{tags[key].category.name + ': '}</span>
            <span className="tagblock-tags">{tags[key].tags.map(tag => tag.name).join(', ')}</span>
          </div>
        );
      })}
    </div>
;

const OrgMobile = ({
  cls,
  description,
  id,
  image,
  name,
  tags,
  onClick,
  planIcon,
  planText,
  urlGive,
  urlWeb
  }) =>         
        <div className={`group ${cls}`}>
          <OrgHeader id={id} name={name} tags={tags['nonprofit-type']} />
          <OrgImage url={image} name={name} />
          <OrgLinks {...{urlGive, urlWeb, planIcon, planText}} onOrgClick={onClick} />
          <OrgContent description={description} />
          <OrgTags tags={tags} />
        </div>;

const OrgDesktop = ({
  cls,
  description,
  id,
  image,
  name,
  tags,
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
          <OrgHeader id={id} name={name} tags={tags['nonprofit-type']} />
          <OrgContent description={description} />
          <OrgTags tags={tags} />
        </div>
      </div>;

const tagsByCat = tags => tags.reduce( (accum,tag) => {
  const catSlug = tag.category.slug;
  if( !accum[catSlug] ) {
    accum[catSlug] = {
      category: tag.category,
      tags: []
    };
  }
  accum[catSlug].tags.push(tag);
  return accum;
}, {});

const translateProps = ({
  org: {
    id,
    body:description,
    title:name,
    website: urlWeb = '',
    c4_donate_link: urlC4 = '',
    c3_donate_link: urlC3 = '',
    image = '',
    tags,
    state
  },
  selected,
  toggleItem
}) => ({
  cls: selected ? 'selected' : '',
  description,
  id,
  image,
  name,
  tags: tagsByCat(tags),
  state,
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
