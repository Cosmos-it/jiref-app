import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExperience } from '../../actions/profileActions';
import { FormattedDate } from 'react-intl';
import { Link } from 'react-router-dom';


class Experience extends Component {

  onDeleteExperience(id) {
    this.props.deleteExperience(id);
  }

  render() {

    const experience = this.props.experience.map(exp => (
      <div key={exp._id} className="experience-dash jiref-margin-bottom">
        <div style={{ 'float': 'right' }} >
          <Link to={`/experience/${exp._id}`} className="btn" style={{ 'color': 'darkblue', 'backgroundColor': 'transparent' }}>
            <i className="fas fa-edit"></i>
          </Link>

          <button style={{ 'color': 'darkred', 'backgroundColor': 'transparent' }}
            onClick={this.onDeleteExperience.bind(this, exp._id)}
            className="btn"><i className="fas fa-trash-alt"></i>
          </button>

      
        </div>
        <p>{exp.company}</p>
        <p>{exp.title}</p>
        <p>From:
               <FormattedDate
            value={exp.from}
            month="long"
            year="numeric" />
          {" "}

          {exp.to === null ? (
            ' Now'
          ) : (
              <FormattedDate
                value={exp.to}
                month="long"
                year="numeric"
              />
            )}
        </p>
      </div>
    ));

    return (
      <div>
        <label>Experience</label>
        {experience}
        <hr />
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);