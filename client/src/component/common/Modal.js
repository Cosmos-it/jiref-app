import React, { Component } from 'react'
import './Modal.css';

export default class Modal extends Component {

  render() {
    const {show, children } = this.props;
    console.log(show);

    const showHideClassName = show;

    return (
      <div>
        {!showHideClassName ? (
          <div className="modal display-block modal display-none">
            <section className="modal-main">
              {children}
              <button>close</button>
            </section>
          </div>
        ) : null}
      </div>
    )
  }
}
