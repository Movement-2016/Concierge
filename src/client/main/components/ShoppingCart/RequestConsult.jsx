import React    from 'react';
import { Link } from 'react-router';

  
const RequestConsult = () => {
  const url = '/plan/consult';
  return (
    <div className="consult-area">
      <div className="consult-desc">You can also talk with one of our donation advisors about your plan.</div> 
      <Link className="consult-button btn-flat waves-effect waves-light" to={url}>
        <span className="consult-button-icon">
          <i className="material-icons">people</i>
        </span>
        <span className="consult-button-text">Request A Consult</span>
      </Link>
    </div>
  );
}

module.exports = RequestConsult;
