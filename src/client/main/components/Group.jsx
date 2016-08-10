import React from 'react';

const Group = ({ group, onClick }) => {
  const tags = group.tags.split (',');
  let webLink;
  let giveLink;
  if (group.urlWeb !== '') {
    webLink = (
      <a className='imgLink' href={group.urlWeb} target='_blank' rel='noopener noreferrer'>
        <img src='/images/ic_link_red_24dp.png' alt='' /><span> Website</span>
      </a>
    );
  }
  if (group.urlGive !== '') {
    giveLink = (
      <a className='imgLink' href={group.urlGive} target='_blank' rel='noopener noreferrer'>
        <img src='/images/ic_star_border_red_24dp.png' alt='' /><span> Contribute</span>
      </a>
    );
  }
  let classes = `group ${group.color}`;
  if (group.favorite) {
    classes += ' selected';
  }
  return (
    <div className={classes}>
      <div
        className='name'
        onClick={() => { onClick (group.id); }}
      >
        { group.favorite ? <img src='/images/ic_done_black_24dp.png' alt='' /> : null }
        <span>{group.name}</span>
      </div>
      <div className='linksArea'>
        {webLink}
        {giveLink}
      </div>
      <div className='orgTypeArea'>
        {(tags.indexOf ('501c3') !== -1) ? <span>501c3</span> : null}
        {(tags.indexOf ('501c4') !== -1) ? <span>501c4</span> : null}
        {(tags.indexOf ('pac') !== -1) ? <span>PAC</span> : null}
      </div>
      <div className='descriptionArea'>
        {group.description}
      </div>
    </div>
  );
};

export default Group;

/*
<div className='socialArea'>
  <a className='imgLink' href='#'>
    <img src='/images/ic_comment_red_24dp.png'/><span> 0 Comments</span>
  </a>
</div>
*/

Group.propTypes = {
  group: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired,
};
