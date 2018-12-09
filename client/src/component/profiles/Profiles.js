import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';
import Search from './Search';

class Profiles extends Component {

  render() {
    return (
      <div className="profiles" style={{ 'marginTop': '80px' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <Search/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(withRouter(Profiles));