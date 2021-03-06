import React from 'react';

import { cleanHtml } from '../../lib/helperFunctions';

const OrgHeader = ({ stateName, name }) => (
  <div className="group-header">
    <div className="group-title">{name}</div>
    <div className="group-header-tags">{stateName}</div>
  </div>
);

const OrgImage = ({ image, name }) =>
  image ? (
    <img className="group-thumb group-image" src={image} />
  ) : (
    <div className="group-thumb group-placeholder">{name[name.search('[A-Za-z]')]}</div>
  );

const OrgLinks = ({ urlWeb }) =>
  urlWeb && (
    <div className="group-links">
      <a className="group-link" href={urlWeb} target="_blank">
        <i className="material-icons">{'link'}</i> {'Website'}
      </a>
    </div>
  );

const OrgContent = ({ description }) => (
  <div className="group-content">
    <p dangerouslySetInnerHTML={{ __html: cleanHtml(description) }} />
  </div>
);

const OrgMobile = ({ description, image, name, stateName, urlWeb }) => (
  <div className="group">
    <div className="group-top">
      <OrgImage {...{ name, image }} />
      <div className="intro-block">
        <OrgHeader {...{ name, stateName }} />
        <OrgLinks urlWeb={urlWeb} />
      </div>
    </div>
    <OrgContent description={description} />
  </div>
);

const OrgDesktop = ({ description, image, name, stateName, urlWeb }) => (
  <div className="group">
    <div className="image-col">
      <OrgImage {...{ name, image }} />
      <OrgLinks urlWeb={urlWeb} />
    </div>
    <div className="content-col">
      <OrgHeader {...{ name, stateName }} />
      <OrgContent description={description} />
    </div>
  </div>
);

const translateProps = ({
  body: description,
  title: name,
  website: urlWeb = '',
  statename: stateName,
  image = '',
}) => ({ description, image, name, stateName, urlWeb });

const Org = props => {
  const propsTranslated = translateProps(props);
  return props.mobile ? <OrgMobile {...propsTranslated} /> : <OrgDesktop {...propsTranslated} />;
};

module.exports = Org;
