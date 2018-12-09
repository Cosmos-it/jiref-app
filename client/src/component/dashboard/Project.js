

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';
import { Link } from "react-router-dom";

import { deleteProject } from '../../actions/profileActions';

class Project extends Component {
  onDeleteClick(id) {
    console.log("deleteing...")
    this.props.deleteProject(id);
  }

  render() {
    const project = this.props.project.map(pj => (
      <div key={pj._id} className="project-dash jiref-margin-bottom">
        <div style={{ 'float': 'right' }}>

          <Link to={`/project/${pj._id}`} className="btn" style={{ 'color': 'darkblue', 'backgroundColor': 'transparent' }}>
          <i className="far fa-edit"></i>
          </Link>

          <button style={{ 'color': 'darkred', 'backgroundColor': 'transparent' }}
            onClick={this.onDeleteClick.bind(this, pj._id)}
            className="btn"><i className="fas fa-trash-alt"></i>
          </button>
        </div>

        <p><a target="_blank" href="https://github.com/Cosmos-it/node-api">{pj.name}</a></p>
        <p>{pj.description}</p>
        <p>{pj.timetaken}</p>
      </div>
    ));

    return (
      <div>
        <label>Project</label>
        {project}
      </div>
    );
  }
}

Project.propTypes = {
  deleteProject: PropTypes.func.isRequired
};

export default connect(null, { deleteProject })(Project);
