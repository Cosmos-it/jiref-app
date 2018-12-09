import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import { addProject } from '../../../actions/profileActions';
import isEmpty from '../../../validation/empty';

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      githubproject: '',
      timetaken: '',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }


  onSubmit = (e) => {
    e.preventDefault();
    const project = {
      name: this.state.name,
      githubproject: this.state.githubproject,
      description: this.state.description,
      timetaken: this.state.timetaken,
    };

    console.log(project);
    this.props.addProject(project, this.props.history);
  }

  render() {

    const { errors } = this.state;

    return (
      <div className="container top bottom">
        <div className="row">
          <div className="col-md-8 m-auto jiref-post-bg">
            <div className="">
              <div className="card-body">
                <Link to="/dashboard" className="">
                  Go Back
                  </Link>
                <p className="lead text-center">
                  Add a project
              </p>
                <small className="d-block pb-3">* = required fields</small>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="Project name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />

                  <TextAreaFieldGroup
                    placeholder="Short description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                  />

                  <TextFieldGroup
                    placeholder="Github project link"
                    name="githubproject"
                    value={this.state.githubproject}
                    onChange={this.onChange}
                    error={errors.githubproject}
                  />

                  <TextFieldGroup
                    placeholder="How long did it take"
                    name="timetaken"
                    value={this.state.timetaken}
                    onChange={this.onChange}
                    error={errors.timetaken}
                  />
                  <input type="submit" value="Submit" className="btn btn-info"
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


AddProject.propTypes = {
  addProject: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addProject })(
  withRouter(AddProject)
);