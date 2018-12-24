import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
    return (
      <div className="shadow-sm">
          <nav className="nav nav-underline">
              <Link to="/edit-profile" className="nav-link">
                  <i className="fas fa-edit"></i>{' '}Profile
                  </Link>
              <Link to="/add-experience" className="nav-link">
                  <i className="fas fa-plus"></i>{' '}Experience
              </Link>
              <Link to="/add-education" className="nav-link">
              <i className="fas fa-plus"></i>{' '}Education
              </Link>
              <Link to="/add-project" className="nav-link">
              <i className="fas fa-plus"></i> {' '}Project
              </Link>
          </nav>
      </div>
 
    );
};

export default ProfileActions;
