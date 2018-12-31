import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { updateProject, getProjectById } from '../../actions/profileActions';
import isEmpty from '../../validation/empty';

class EditProject extends Component {
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

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getProjectById(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.project.project) {
      let project = nextProps.project.project;

      this.setState({
        name: project.name,
        description: project.description,
        githubproject: project.githubproject,
        timetaken: project.timetaken,
      })
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

    this.props.updateProject(project, this.props.history);
  }

  render() {

    const { errors } = this.state;

    return (
      <div className="container bottom">
        <div className="row">
          <div className="col-md-8 m-auto jiref-bg">
            <div className="">
              <div className="card-body">
                <Link to="/dashboard">Go Back</Link>

                <h3 className="text-center">Edit Project</h3>
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
                  <input type="submit" value="Submit" className="btn btn-brand"
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


EditProject.propTypes = {
  updateProject: PropTypes.func.isRequired,
  getProjectById: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.project,
  errors: state.errors
});

export default connect(mapStateToProps, { getProjectById, updateProject })(
  withRouter(EditProject)
);