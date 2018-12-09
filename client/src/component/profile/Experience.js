import React, { Component } from 'react'
import { FormattedDate } from 'react-intl';


class Experience extends Component {
   render() {
      const { experience } = this.props;
      let expData;

      if (experience.length !== 0) {
         expData = experience.map(exp => (
             <div key={exp._id} className="jiref-list-profile jiref-margin-bottom education-dash">
                  <p><i className="fas fa-briefcase"/>{' '}{exp.company}</p>
                  <p className="title">Role:{' '}{exp.title}</p>
                  <p><i className="fas fa-info"></i>{' '}{exp.description}</p>
                  <p>{' '}
                  <FormattedDate
                     value={exp.from}
                     month="long"
                     year="numeric" />
                 {' - '}
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
         ))
      }

      return (
         <div className="jiref-list">
         <hr/>
            <label>Experience</label>
               {expData}
            <hr />
         </div>)
   }
}

export default Experience;