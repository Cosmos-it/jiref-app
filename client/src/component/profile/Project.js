import React, { Component } from 'react'

export default class Project extends Component {
   render() {
      const { project } = this.props;
      let projectData;

      if (project.length != 0) {
         projectData = project.map(project => (
            <div key={project._id}  className="jiref-list-profile jiref-margin-bottom education-dash">
               <p className="title"><i className="fab fa-github"></i>{' '}<a target="_blank" href={project.githubproject}>{project.name}</a></p>
               <p><i className="far fa-clock"></i>{' '} {project.timetaken}</p>
               <p><i className="fas fa-info"></i>{' '} {project.description}</p>
            </div>
         ))
      }
      return (
         <div className="jiref-list">
            <label>Project</label>
            {projectData}
         </div>)
   }
}
