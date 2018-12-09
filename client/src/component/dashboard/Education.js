import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';
import { Link } from "react-router-dom";

import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {

  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }

  render() {
    const education = this.props.education.map(edu => (
      <div key={edu._id} className="education-dash jiref-margin-bottom">
          <div style={{ 'float': 'right' }}>
            <Link to={`/education/${edu._id}`} className="btn" style={{ 'color': 'darkblue', 'backgroundColor': 'transparent' }}>
              <i className="far fa-edit"></i>
            </Link>
            <button style={{ 'color': 'darkred', 'backgroundColor': 'transparent' }}
              onClick={this.onDeleteClick.bind(this, edu._id)}
              className="btn"><i className="fas fa-trash-alt"></i>
            </button>

          </div>
        <p>{edu.school}</p> 
        <p>{edu.degree}</p>
        <p>
          From: <FormattedDate
            value={edu.from}
            month="long"
            year="numeric" />
          {" "}

          {edu.to === null ? (
            ' Now'
          ) :
            (
              <FormattedDate
                value={edu.to}
                month="long"
                year="numeric"
              />
            )
          }
        </p>
      </div>
    ));

    return (
      <div>
        <label>Education Credentials</label>
        {education}
        <hr/>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
