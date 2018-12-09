import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { deletePost, addLike, removeLike } from '../../actions/postAction';
import Post from '../postComments/Post';

class PostItem extends Component {
   onDeleteClick(id) {
      this.props.deletePost(id);
   }

   onLikeClick(id) {
      this.props.addLike(id);
   }

   onUnlikeClick(id) {
      this.props.removeLike(id);
   }

   findUserLike(likes) {
      const { auth } = this.props;
      if (likes.filter(like => like.user === auth.user.id).length > 0) {
         return true;
      } else {
         return false;
      }
   }

   render() {
      const { post, auth } = this.props;

      return (
         <div className="card-s jiref-margin-top">
            <div className="jiref-post-bg">
               <div className="jiref-profile-image">
                  <img src={post.avatar} alt="profile" className="rounded-circle rounded-circle-post" />
                  <div className="jiref-post-header">
                     <p><Link to={`/profile/user/${post.user}`}>{post.name}</Link></p>
                  </div>
               </div>

               <div className="jiref-post-content">
                  <p>{post.text}</p>
                  <div className="jiref-likes">
                  </div>
               </div>

               <div className="jiref-post-functions">
                  <div className="jiref-post-footer">

                     <span className="like">
                        <button
                           onClick={this.onLikeClick.bind(this, post._id)}
                           type="button"
                           className="mr-1 like-btn">
                           <i className={classnames('fas fa-thumbs-up', {
                              'text-info': this.findUserLike(post.likes)
                           })}
                           />
                           {' '}<span className="badge badge-info">{post.likes.length}</span>
                        </button>

                        <button
                           onClick={this.onUnlikeClick.bind(this, post._id)}
                           type="button"
                           className="mr-1 like-btn">
                           <i className="text-secondary fas fa-thumbs-down" />
                        </button>
                     </span>

                     <span className="like">
                        <Link to={`/post/${post._id}`} className="like"><i className="far fa-comment" /> {' '}Comment</Link>
                        {post.user === auth.user.id ? (
                           <button
                              onClick={this.onDeleteClick.bind(this, post._id)}
                              type="button"
                              className="mr-1 like-btn delete">
                              <i className="fas fa-trash" />{' '} Delete
                   </button>
                        ) : null}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

PostItem.propTypes = {
   auth: PropTypes.object.isRequired,
   post: PropTypes.object.isRequired,
   deletePost: PropTypes.func.isRequired,
   addLike: PropTypes.func.isRequired,
   removeLike: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
   auth: state.auth
})

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);
