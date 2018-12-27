import React, { Component } from 'react'

class CompleteProfile extends Component {
  render() {
    const style = { background: 'red', fontSize: '25px', paddingTop: '10px', color: '#FFFFFF', borderRadius:'4px', marginBottom: '40px'}
    
    return (
        <div className="col-md-8 m-auto text-center" style={style}>
         <p>Complete your profile please</p>
        </div>
    )
  }
}

export default CompleteProfile;