import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from './Header';
import Spinner from '../common/Spinner';
import { getProfileByHandle, getProfileById } from '../../actions/profileActions';

class Profile extends Component {

   componentDidMount() {

      // Allows the user's profile to be accessed via handle
      if (this.props.match.params.me) {
         this.props.getProfileByHandle(this.props.match.params.me);
      }
      // Allows the user's profile to be accessed via id
      if (this.props.match.params.id) {
         this.props.getProfileById(this.props.match.params.id);
      }
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.profile.profile === null && this.props.profile.loading) {
         this.props.history.push('/not-found');
      }
   }

   render() {
      const { profile, loading } = this.props.profile;
      let profileContent;

      if (profile === null || loading) {
         profileContent = <Spinner />;
      } else {
         profileContent = (
            <div className="container">
               <ProfileHeader profile={profile} />
            </div>
         );
      }

      return (
         <div className="profile" style={{ 'marginTop': '80px', 'marginBottom': '80px'}}>
               {profileContent}
         </div>
      );
   }
}

Profile.propTypes = {
   getProfileByHandle: PropTypes.func.isRequired,
   getProfileById: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle, getProfileById })(Profile);
