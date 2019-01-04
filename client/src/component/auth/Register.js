import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup'
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions'

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register-login">
        <div className="container">
          <div className="row">
            <div className="col-md-6 m-auto">
              {/************ Form **************/}
              <div className="jiref-post-bg">
                <h4 className="text-center">Create an account</h4>

                <div className="card-body">
                  <form noValidate onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      placeholder="Enter your full name"
                      name="name"
                      type="text"
                      value={this.state.name}
                      onChange={this.onChange}
                      error={errors.name}
                    />

                    <TextFieldGroup
                      placeholder="Enter your email"
                      name="email"
                      type="text"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                    />

                    <small className="form-text text-muted text-center text-info">
                      Uses Gravatar email for profile.
                           </small>

                    <TextFieldGroup
                      placeholder="Enter new password"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                    />

                    <TextFieldGroup
                      placeholder="Confirm new password"
                      name="password2"
                      type="password"
                      value={this.state.password2}
                      onChange={this.onChange}
                      error={errors.password2}
                    />

                    <input type="submit" className="btn btn-info btn-block mt-4 button-join" value="Register"/>
                    
                  </form>
                </div>
              </div>

              {/* End of Form */}

              <p className="lead text-center"> By signing up, you agree to the terms of service
              <Link className="nav-link" to="/login">{' '} Login </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// define the property types.
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// Map the auth state.
const mapStateToProps = (state) => ({
  auth: state.auth, // state.auth from /reducers/index
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(Register);
