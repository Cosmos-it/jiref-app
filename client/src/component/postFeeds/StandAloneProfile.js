import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class StandAloneProfile extends Component {

  render() {
    const { auth } = this.props;
    return (
      // <div className="col-md-3">
      <div className="text-center">
          <img src={auth.user.avatar} alt="profile" className="rounded-circle jiref-margin"/>
        </div>
      // </div>
    )
  }
}

StandAloneProfile.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(StandAloneProfile)