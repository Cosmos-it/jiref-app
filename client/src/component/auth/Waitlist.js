import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import classnames from "classnames";

/**
 * Waitlist:
 * @desc Allows the people to give their name and email to be informed about
 * launching of the application.
 * - Ability to allow data intake
 * - show success message
 * - clear the input area
 */

class WishList extends Component {
  constructor() {
    super();
    this.state = {
      fullname: "",
      email: "",
      success: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const userInfo = {
      fullname: this.state.fullname,
      email: this.state.email
    };

    /** post data to the server */
    axios
      .post("/api.jiref.com/waitlist", userInfo)
      .then(res => 
        {
          this.setState({success: true});
          this.clearInput();
        })
      .catch(err => this.setState({ errors: err.response.data }));
  }

  clearInput= () => {
    this.setState({})
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (

      <div className="container top-form">
        <div className="row">
          <div className="col-lg-6 col-md-8 m-auto">
            <h4 className="text-center">Welcome to Jiref</h4>
            <br />
            <div className="card card-xl z-index-10">
              <div className="card-body">
              { 
                this.state.success ? 
                <div className="card text-center" style={{'backgroundColor': 'green', 'padding': '20px', 'color': '#FFFFFF', }}> 
                <p className="">Thank you for your precious time</p>
              </div> : null }
              { !this.state.success ? 
                <form onSubmit={this.onSubmit} id="contact-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.fullname
                      })}
                      placeholder="Full name"
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
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.email
                      })}
                      placeholder="Email Address"
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
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
                : null}
              </div>
            </div>
            <div className="text-center text-danger">
                    <p>Fake emails will be flaged</p>
                    <Link className="nav-link" to="/">
                      {" "}
                      Home
                  </Link>
                  </div>
            {/* End of form */}
          </div>
        </div>
      </div>
    );
  }
}

export default WishList;
