import React, { Component } from "react";
import "./Search.css";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profileActions';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
  }

  componentDidMount() {
    this.props.getProfiles(this.state.searchTerm);
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value });
    this.props.getProfiles(e.target.value.toString());
  }

  render() {

    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null) {

    } else {
      if (profiles.length > 0) {
        profileItems = (
          profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
          ))
        )
      } else {
        profileItems = (
          <div className="col-md-10 m-auto text-center">
            <h5 className="no-searches">Nothing found...</h5>;
          </div>
        )
      }
    }

    return (

      <div >
        <div className="row" id="search">
          <div className="col-md-10 m-auto">
            <input
              className="form-control form-control-lg"
              type="text"
              name="searchTerm"
              placeholder="Start Typing"
              value={this.state.searchTerm}
              onChange={this.onChange}
              autoFocus/>
          </div>
        </div>
        {profileItems}
      </div>
    );
  }
}


Search.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Search);