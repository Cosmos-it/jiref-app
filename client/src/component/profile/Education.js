import React, { Component } from 'react'
import { FormattedDate } from 'react-intl';

export default class Education extends Component {
   render() {
      const { education } = this.props;
      let edu_data;

      if (education.length != 0) {
         edu_data = education.map(edu => (
            <div key={edu._id} className="jiref-list-profile jiref-margin-bottom education-dash">
               <p className="title"><i className="fas fa-graduation-cap"></i>{' '}{edu.school}</p>
               <p><i className="fas fa-certificate"></i>{' '}{edu.degree}</p>
               <p>{' '}
                  <FormattedDate
                     value={edu.from}
                     month="long"
                     year="numeric" />
                 {' - '}
                  {edu.to === null ? (
                     ' Now'
                  ) : (
                        <FormattedDate
                           value={edu.to}
                           month="long"
                           year="numeric"
                        />
                     )}
               </p>
            </div>
         ));
      }

      return (
         <div>
            <label>Education</label>
            <div>
               {edu_data}
            </div>
            <hr />
         </div>
      )
   }
}
