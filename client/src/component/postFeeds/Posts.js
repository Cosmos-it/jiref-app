import React, { Component } from 'react';
import PostForm from './PostForm';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { get_posts } from '../../actions/postAction';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import PostFeeds from './PostFeeds';
import StandAloneProfile from './StandAloneProfile';

class Posts extends Component {

  componentDidMount() {
    this.props.get_posts();
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.profile.profile) {
      this.props.history.push('/dashboard');
    } 
  }

  render() {
    const { posts, loading } = this.props.post;
    const { auth, profiles } = this.props;
    let post_content;
    if (posts === null || loading) {
      post_content = <Spinner />
    } else {
      post_content = <PostFeeds posts={posts} />
    }

    return (
      <div className="top">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <div className="row">
                <StandAloneProfile />
                <div className="col-md-9">
                  <PostForm />
                  {post_content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  get_posts: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile,
  auth: state.auth
})


export default connect(mapStateToProps, { get_posts, getCurrentProfile })(Posts);