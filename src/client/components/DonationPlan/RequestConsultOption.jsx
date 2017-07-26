import React from 'react';
import { connect } from 'react-redux';

import { setProfile } from '../../shared/store/actions/user'; 

class _RequestConsultOption extends React.Component {

  constructor() {
    super(...arguments);
    this.state = { value: false };
    this.onChecked = this.onChecked.bind(this);
  }

  onChecked(e) {
    const { value } = e.target;
    this.props.setProfile( { wantsConsult: !value } ) ;
  }

  render() {
    const value = this.props.wantsConsult;

    return(
      <div className="consult-request">
        <input type="checkbox" name="consult-request" id="consult-request" value={value} onChange={this.onChecked} />
        <label htmlFor="consult-request">Request a consultation with a donation advisor</label>
      </div>
      );
  }
}

const mapStateToProps    = s => ({ wantsConsult: s.user.wantsConsult });
const mapDispatchToProps = { setProfile };

const RequestConsultOption = connect( mapStateToProps, mapDispatchToProps )(_RequestConsultOption);

module.exports = RequestConsultOption;
