import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateExperience, getExperienceById } from '../../actions/profileActions';
import isEmpty from '../../validation/empty';

class EditExperience extends Component {

  constructor(props) {
    super(props)
    this.state = {
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getExperienceById(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.experience.experience) {
      let experience = nextProps.experience.experience;
      experience.from = !isEmpty(experience.from) ? experience.from : "";
      experience.to = !isEmpty(experience.to) ? experience.to : "";
      experience.description = !isEmpty(experience.description) ? experience.description : "";

      this.setState({
        company: experience.company,
        title: experience.title,
        location: experience.location,
        from: experience.from,
        to: experience.to,
        current: experience.current,
        description: experience.description
      })
    }


  }

  onSubmit = (e) => {
    e.preventDefault();

    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.updateExperience(expData, this.props.history);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck = (e) => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container bottom">
        <div className="row">
          <div className="col-md-8 m-auto jiref-bg">
            <div className="">
              <div className="card-body">
              <Link to="/dashboard">
              <i class="fas fa-angle-left"></i>{' '}Back
              </Link>
              <h3 className="text-center">Edit Experience</h3>

                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="* Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                    error={errors.company}
                  />
                  <TextFieldGroup
                    placeholder="* Job Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                    error={errors.title}
                  />
                  <TextFieldGroup
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
                  />
                  <h6>From Date</h6>
                  <TextFieldGroup
                    name="from"
                    type="date"
                    value={this.state.from}
                    onChange={this.onChange}
                    error={errors.from}
                  />

                  <div className="form-check mb-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="current"
                      value={this.state.current}
                      checked={this.state.current}
                      onChange={this.onCheck}
                      id="current"
                    />
                    <label className="form-check-label btn btn-outline-info" htmlFor="current">
                      Click for currently employed here.
                  </label>
                  </div>

                  <h6>To Date</h6>
                  <TextFieldGroup
                    name="to"
                    type="date"
                    value={this.state.to}
                    onChange={this.onChange}
                    error={errors.to}
                    disabled={this.state.disabled ? 'disabled' : ''}
                  />
                  <TextAreaFieldGroup
                    placeholder="Job Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                    info="Tell us about the the position"
                  />
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-brand"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditExperience.propTypes = {
  getExperienceById: PropTypes.func.isRequired,
  updateExperience: PropTypes.func.isRequired,
  experience: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  experience: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { updateExperience, getExperienceById })(
  withRouter(EditExperience)
);
