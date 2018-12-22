import React, { Component } from "react";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { add_post } from '../../actions/postAction';


class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {},
      rows: 5
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { user } = this.props.auth;
    console.log(user);
    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.add_post(newPost);
    this.setState({ text: '' });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const { auth } = this.props;
    return (
      <div className="card jiref-padding">
        <div className="jiref-profile-image">
          <img src={auth.user.avatar} alt="profile" className="rounded-circle rounded-circle-post" />
          <div className="jiref-post-header">
            <p>{auth.user.name}</p>
          </div>
        </div>
        <form onSubmit={this.onSubmit}>
          <TextAreaFieldGroup
            placeholder="Got something to share?..."
            type="text"
            name="text"
            value={this.state.text}
            onChange={this.onChange}
            error={errors.text}
          />
          <div className="">
            <button type="subtmit" value="Share" className="jiref-button-sm btn-circle btn-brand">post</button>
          </div>
        </form>
      </div>

    )
  }
}

PostForm.propTypes = {
  add_post: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { add_post })(PostForm);