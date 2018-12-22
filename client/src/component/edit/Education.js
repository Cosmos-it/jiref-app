import React, { Component } from 'react';
import { getEducationById, updateEducation } from '../../actions/profileActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import isEmpty from '../../validation/empty';



class EditEducation extends Component {

  constructor() {
    super();
    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
      description: '',
      to: '',
      from: '',
      current: false,
      disabled: false,
      errors: {}
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getEducationById(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ 
        disabled: !this.state.disabled,
        errors: nextProps.errors });
    }
    if (nextProps.education.education) {
      const education = nextProps.education.education;
      education.school = !isEmpty(education.school) ? education.school : "";
      education.degree = !isEmpty(education.degree) ? education.degree : "";
      education.description = !isEmpty(education.description) ? education.description : "";
      education.to = !isEmpty(education.to) ? education.to : "";
      education.from = !isEmpty(education.from) ? education.from : "";
      education.current = !isEmpty(education.current) ? education.current : "";
      this.setState({
        school: education.school,
        degree: education.degree,
        fieldofstudy: education.fieldofstudy,
        description: education.description,
        to: education.to,
        from: education.from,
        current: education.current,
        disabled: this.state.disabled
      });
    }

  }

  onSubmit = (d) => {
    d.preventDefault();
    const data = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.updateEducation(data)
  }

  onChange = (d) => {
    this.setState({ [d.target.name]: d.target.value });
  }

  onCheck = (e) =>  {
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
            <div className="col-md-8 m-auto jiref-post-bg">
            <div className="">
              <div className="card-body">
              <Link to="/dashboard">
                Go Back
              </Link>
              <h3 className="display-6 text-center">Edit Education</h3>
  
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                />

                <TextFieldGroup
                  placeholder="* Degree or Certification"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="* Field of Study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
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
                  <label htmlFor="current" className="form-check-label btn btn-outline-info">
                    Currently attending
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
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the program that you were in"
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
    )
  }
}

EditEducation.propType = {
  getEducationById: PropTypes.func.isRequired,
  updateEducation: PropTypes.func.isRequired,
  education: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  education: state.education,
  errors: state.errors
})


export default connect(mapStateToProps, { getEducationById, updateEducation })(EditEducation);