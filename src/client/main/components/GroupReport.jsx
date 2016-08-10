import React from 'react';

const GroupReport = ({ group, amount }) => {
  // let tags = group.tags.split (',');
  let giveLink;
  if (group.urlGive !== '') {
    let url = group.urlGive;
    let text = url;
    if (url.endsWith ('homepage')) {
      url = `${url.substr (0, url.length - 8)}worksheet&amount=${amount}`;
      text = url.substr (0, url.lastIndexOf ('?'));
    }
    giveLink = (
      <div>
        <span>Contribute to: </span>
        <a href={url} target='_blank' rel='noopener noreferrer'>
          {text}
        </a>
      </div>
    );
  }
  return (
    <div className='r-group'>
      <div className='r-name'>
          {group.name}
      </div>
      <div className='r-amount'>
        {amount}
      </div>
      <div className='r-text'>
        <span>{`${group.tags} - ${group.state}`}</span>
      </div>
      <div className='r-links'>
        {giveLink}
      </div>
    </div>
  );
};

export default GroupReport;

GroupReport.propTypes = {
  group: React.PropTypes.object.isRequired,
  amount: React.PropTypes.string.isRequired,
};
