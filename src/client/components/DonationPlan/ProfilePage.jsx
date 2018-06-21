import React from 'react';
import { connect } from 'react-redux';

import Link from '../../services/LinkToRoute';
import { syncProfile } from '../../../shared/store/actions/profile';

import { Shell } from '../ContentPage.jsx';
import BackLink from '../BackLink.jsx';
import ProfileForm from '../Profile/Form.jsx';
import AutoSave from '../Profile/AutoSave.jsx';

class _PlanProfilePage extends React.Component {
  onSubmit = () => {
    const { profile, syncProfile } = this.props;

    syncProfile({ ...profile });

    Link.navigateTo('/plan/summary');
  };

  render() {
    return (
      <Shell title="Complete Your Plan" name="custom-planning profile-page">
        <p className="page-description">
          {
            'Almost done! Enter your info below to save your donation plan, send yourself a copy, or request to speak with a donor advisor.'
          }
        </p>
        <ProfileForm submitText="Complete Plan" onSubmit={this.onSubmit}>
          <BackLink to="/plan" title="Edit Plan">
            {'Edit plan'}
          </BackLink>
          <AutoSave />
        </ProfileForm>
      </Shell>
    );
  }
}

const mapStateToProps = ({ profile }) => ({ profile });
const mapDispatchToProps = { syncProfile };

const PlanProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_PlanProfilePage);

module.exports = PlanProfilePage;
