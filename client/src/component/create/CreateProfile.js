import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySocialInputs: false,
      me: "",
      company: "",
      website: "",
      location: "",
      mentorshipInterest: [],
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      linkedin: "",
      github: "",
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const profileData = {
      me: this.state.me,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      mentorshipInterest: this.state.mentorshipInterest.join(','),
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      github: this.state.twitter,
      linkedin: this.state.linkedin
    };
    this.props.createProfile(profileData, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addMentorshipInterest(item) {
    // Check for duplicates.
    if (this.state.mentorshipInterest.length == 0) {
      this.setState({
        mentorshipInterest: [...this.state.mentorshipInterest, item]
      });
    }

    this.state.mentorshipInterest.filter(i => {
      console.log(item, i);
      if (i !== item) {
        this.setState({
          mentorshipInterest: [...this.state.mentorshipInterest, item]
        });
      }
    });
  }

  deleteMentorshipInterest(detetItem) {
    this.setState({
      mentorshipInterest: this.state.mentorshipInterest.filter(function(item) {
        return item !== detetItem;
      })
    });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="Github Profile URL"
            name="github"
            icon="Github fa-github"
            value={this.state.github}
            onChange={this.onChange}
            error={errors.github}
          />
        </div>
      );
    }

    const mentorship_interests = [
      "Software engineering",
      "Web development",
      "Leadership",
      "Product management",
      "Mobile development",
      "Marketing",
      "Career development",
      "On job mentorship",
      "Data science",
      "Blockchain",
      "Cryptocurrency"
    ];

    let display;

    if (this.state.mentorshipInterest) {
      display = this.state.mentorshipInterest.map(data => (
        <button
          type="button"
          className="btn btn-danger btn-md"
          key={data}
          onClick={this.deleteMentorshipInterest.bind(this, data)}
        >
          {data}
        </button>
      ));
    }

    let interests = (
      <div>
        <p>
          Before you set your account, lets get some information to help
          personalize your experience on Jiref.
        </p>
        <label className="lead">Interested in what type of mentorship</label>
        <div className="list-item">
          {mentorship_interests.map(data => (
            <button
              type="button"
              className={classnames("btn btn-default btn-md", {
                "btn-success": data
              })}
              key={data}
              onClick={this.addMentorshipInterest.bind(this, data)}
            >
              {data}
            </button>
          ))}
        </div>
        <div>
          <div className="list-item">{display}</div>
        </div>
      </div>
    );

    // Select options for status
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="portfolio">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto jiref-bg">
              <div className="">
                <div className="card-body">
                  <Link to="/dashboard">Go Back</Link>
                  <p className="text-center">Create profile</p> {interests}
                  <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      placeholder="* Profile Handle"
                      name="me"
                      value={this.state.me}
                      onChange={this.onChange}
                      error={errors.me}
                      info="Unique user name"
                    />

                    <SelectListGroup
                      placeholder="Status"
                      name="status"
                      value={this.state.status}
                      onChange={this.onChange}
                      options={options}
                      error={errors.status}
                      info="Give us an idea of where you are at in your career"
                    />

                    <TextFieldGroup
                      placeholder="Company"
                      name="company"
                      value={this.state.company}
                      onChange={this.onChange}
                      error={errors.company}
                      info="Could be your own company or one you work for"
                    />

                    <TextFieldGroup
                      placeholder="Website"
                      name="website"
                      value={this.state.website}
                      onChange={this.onChange}
                      error={errors.website}
                      info="Could be your own website or a company one"
                    />

                    <TextFieldGroup
                      placeholder="Location"
                      name="location"
                      value={this.state.location}
                      onChange={this.onChange}
                      error={errors.location}
                      info="City or city & state suggested (eg. Boston, MA)"
                    />

                    <TextFieldGroup
                      placeholder="* Skills"
                      name="skills"
                      value={this.state.skills}
                      onChange={this.onChange}
                      error={errors.skills}
                      info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                    />

                    <TextFieldGroup
                      placeholder="Github Username"
                      name="githubusername"
                      value={this.state.githubusername}
                      onChange={this.onChange}
                      error={errors.githubusername}
                      info="If you want your latest repos and a Github link, include your username"
                    />

                    <TextAreaFieldGroup
                      placeholder="Short Bio"
                      name="bio"
                      value={this.state.bio}
                      onChange={this.onChange}
                      error={errors.bio}
                      info="Tell us a little about yourself"
                    />

                    <div className="mb-3">
                      <button
                        type="button"
                        onClick={() => {
                          this.setState(prevState => ({
                            displaySocialInputs: !prevState.displaySocialInputs
                          }));
                        }}
                        className="btn btn-light"
                      >
                        Add Social Network Links
                      </button>
                      <span className="text-muted">Optional</span>
                    </div>
                    {socialInputs}
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-info"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile, getCurrentProfile));
