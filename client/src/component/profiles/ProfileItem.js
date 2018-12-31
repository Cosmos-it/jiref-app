import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/empty';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 m-auto">
            <Link to={`/profile/me/${profile.me}`} className="row jiref-padding jiref-margin-bottom profile-item jiref-bg">
              <div className="col-2 ">
                <img src={profile.user.avatar} alt="" className="rounded-circle" />
              </div>
              
              <div className="col-md-4">
                <p className="label-style">{profile.user.name}</p>
                <p>{
                  profile.status}{' '}
                  {
                    isEmpty(profile.company) ? null : (
                      <span>at {profile.company}</span>
                    )}
                </p>
                <p>
                  {
                    isEmpty(profile.location) ? null : (
                      <span>{profile.location}</span>
                    )}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
