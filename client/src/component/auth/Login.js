import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import TextFieldGroup from '../common/TextFieldGroup'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/feed');
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/feed');
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

  }

  onSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {

    const { errors, profile } = this.state;

    return (
      <div className="login-background">
        <div className="container top-form">
          <div className="row">
            <div className="col-md-6 m-auto">
              {/* Form */}
              <div className="card-1 z-index-10 jiref-post-bg">
              <h4 className="text-center jiref-margin-top">Sign in</h4>

                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      placeholder="Email Address"
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                    />

                    <TextFieldGroup
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                    />

                    <input type="submit" className="btn btn-info btn-block mt-4" />

                  </form>
                </div>
              </div>
              {/* End of form */}
              <p className="lead text-center">
                Dont have an account yet? <Link className="nav-link" to="/register">Create account </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

    );
  }
}


Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});


export default connect(mapStateToProps, { loginUser })(Login);
