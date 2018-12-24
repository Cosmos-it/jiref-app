import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import classnames from "classnames";
import Footer from '../layout/Footer';

/**
 * Waitlist:
 * @desc Allows the people to give their name and email to be informed about
 * launching of the application.
 * - Ability to allow data intake
 * - show success message
 * - clear the input area
 */

class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      success: false,
      errors: {}
    };
  }




  onSubmit = (e) => {
    e.preventDefault();

    const userInfo = {
      fullname: this.state.fullname,
      email: this.state.email
    };

    /** post data to the server */
    axios
      .post("/api.jiref.com/waitlist", userInfo)
      .then(res => {
        this.setState({ success: true });
        this.clearInput();
      })
      .catch(err => this.setState({ errors: err.response.data }));
  }

  clearInput = () => {
    this.setState({})
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (

      <div>
        <div className="top-form background-center">

          <div className="top-form-style">
            <div className="container">
              <div className="title">
                <h2 className="text-center">Join the knowledge venture</h2>
              </div>
              <div className="row">
                  <div className="col-lg-6 col-md-8 m-auto">
                  <div className="jiref-post-bg">

                    <div className="">
                      <div className="card-body">
                        {
                          this.state.success ?
                            <div className="text-center" style={{ 'color': 'green', 'padding': '20px',fontSize: '30px' }}>
                              <p className="">Thank you for joining</p>
                            </div> : null}

                        {!this.state.success ?
                          <form onSubmit={this.onSubmit} id="contact-form">
                            <div className="form-group">
                              <input
                                type="text"
                                className={classnames("form-control input-custom form-control-lg", {
                                  "is-invalid": errors.fullname
                                })}
                                placeholder="Enter your name"
                                name="fullname"
                                value={this.state.fullname}
                                onChange={this.onChange}
                              />
                              {errors.fullname && (
                                <div className="invalid-feedback">{errors.fullname}</div>
                              )}
                            </div>

                            <div className="form-group">
                              <input
                                type="email"
                                className={classnames("form-control input-custom form-control-lg", {
                                  "is-invalid": errors.email
                                })}
                                placeholder="Enter your email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                              />
                              {errors.email && (
                                <div className="invalid-feedback">{errors.email}</div>
                              )}
                            </div>
                            <input
                              type="submit"
                              className="btn btn-info btn-block mt-4 button-join"
                            />
                          </form>
                          : null}
                      </div>
                    </div>
                  </div>
                  {/* End of form */}
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default WishList;
