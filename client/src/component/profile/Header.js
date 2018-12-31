import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Experience from './Experience';
import Education from './Education';
import Project from './Project';
import { onFollow } from '../../actions/profileActions';
import CompleteProfile from '../common/CompleteProfile';


class Header extends Component {

  onFollow = (userA, userB) => {
    this.props.onFollow(userA, userB);
  }

  render() {
    const { profile, auth } = this.props;
    let education;
    let experience;
    let project;
    let skills;
    let mentorshipInterest;
    let social;
    let bio;
    let followers;
    let profileImage;
    let username;
    let _id;
    let completeProfile;


      // Check if the user hasn't completed their profile and send them back to 
      if (profile.user.name && profile.user._id) {
        username = profile.user.name;
        _id = profile.user._id;
      }

      if (profile.user.avatar) {
        profileImage = (
          <img
            className="rounded-circle"
            id="profile-pic"
            src={profile.user.avatar}
            alt="avatar"
          />)
      } else {
        profileImage = (
          <img
            className="rounded-circle"
            id="profile-pic"
            alt="avatar"
          />)
      }


      if (profile.followers) {
        followers = profile.followers.map(f => f._id).length;
      }

      // Do this action if property is in the object.
      if (profile.experience) {
        experience = (
          <div>
            <Experience experience={profile.experience} />
          </div>
        );
      }

      if (profile.education) {
        education = (
          <div>
            <Education education={profile.education} />
          </div>
        );
      }

      if (profile.project) {
        project = (
          <div>
            <Project project={profile.project} />
          </div>
        );
      }

      if (profile.skills) {
        skills = profile.skills.map(skill => (
          <ul key={skill.toString()}>
            <li>
              <p className="btn btn-circle btn-brand">{skill}</p>
            </li>
            {' '}
          </ul>
        ));
      }

      if (profile.mentorshipInterest) {
        mentorshipInterest = profile.mentorshipInterest.map(interest => (
          <ul key={interest.toString()}>
            <li>
              <p className="">{interest}</p>
            </li>
            {' '}
          </ul>
        ));
      }


      if (profile.bio) {
        bio = (
          <div>
            <p>{profile.bio}</p>
          </div>
        )
      }

      // Change this code: it is a not a list, rather an object
      if (profile.social) {

        // Displays social connections
        social = (
          <div>
            <ul>
              {
                profile.social.linkedin ? (
                  <li><a href={profile.social.linkedin} target="blank"><i className="fab fa-linkedin"></i></a></li>
                ) : null
              }
              {' '}
              {
                profile.githubusername ? (
                  <li><a href={`https://github.com/` + profile.githubusername} target="blank"><i className="fab fa-github"></i></a></li>
                ) : null
              }
            </ul>
          </div>
        )
      }
    
      if (profile.experience.length < 1 && username === auth.user.name) {
        completeProfile = <CompleteProfile/>
      } 
    

    // CSS
    const marginBottom = {
      marginBottom: '50px'
    }

    return (

      <div className="container">
        <div className="row">
          {completeProfile}
          <div className="col-md-8 m-auto jiref-bg">
            <div className="row jiref-padding">

              <div className="col-md-12 m-auto text-center">

                {/*---------- Profile image------------*/}
                {profileImage}

                {/*--------- User credentials ----------*/}
                <div className="credentails">
                  <label className="label-style">{username}</label>
                  <br />
                  <p style={{ fontSize: '20px' }}>{profile.status}</p>
                  <br />
                  <p><i className="fas fa-briefcase"></i>{' '}{profile.company}</p>
                  <p><i className="fas fa-map-marker-alt"></i>{' '}{profile.location}</p>
                </div>

                <div className="social-media">
                  {/*--------- Social media ------------*/}
                  {social}
                </div>
              </div>

              {_id !== auth.user.id ? (<p><input className="btn btn-brand" type="button"
                onClick={this.onFollow.bind(this, auth.user, profile.user)} value="Connect" /></p>
              ) : null}

              <div className="col-md-12 m-auto">
                <span className="badge badge-dark">Followers{" "}{followers}</span>


                {/*----------- Bio/About ----------------*/}
                <div className="bio">
                  <hr />
                  <label>About</label>
                  <blockquote>{bio}</blockquote>
                </div>
                <hr />
                <div className="skills">
                  <label>Skills</label>

                  {/* ------------- Skills -----------------*/}
                  <div>
                    {skills}
                  </div>
                </div>

                <div className="experience">
                  {/*------------ Experience ----------- */}
                  {experience}
                </div>

                {/*--------------- Education ---------------*/}
                <div className="education">
                  {education}
                </div>

                {/*------------ Project ------------------*/}
                <div className="project">
                  {project}
                </div>

                {/* ------------- Mentership Interests -----------------*/}
                <br />
                <div className="skills">
                  <label>Mentorship Interests</label>
                  <div>
                    {mentorshipInterest}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  onFollow: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { onFollow })(Header)
