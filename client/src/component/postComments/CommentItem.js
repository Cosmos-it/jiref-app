import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/postAction";
import { Link } from "react-router-dom";

class CommentItem extends Component {
  
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const { comment, postId, auth } = this.props;

    return (
      <div className="card-s jiref-bg">
          <div>
            <div className="jiref-profile-image">
              <img src={comment.avatar}
                alt="profile"
                className="rounded-circle rounded-circle-post"
              />
              <div className="jiref-post-header">
                <p>
                  <Link to={`/profile/user/${auth.user.id}`}>
                    {comment.name}
                  </Link>
                </p>
              </div>
            </div>

            <div className="jiref-post-content">
              <p className="lead">{comment.text}</p>
            </div>
            <div className="jiref-post-footer">
                <span className="like">
                  {comment.user === auth.user.id ? (
                    <button
                      onClick={this.onDeleteClick.bind(this,postId,comment._id)}
                      type="button"
                      className="mr-1 like-btn delete">
                      <i className="fas fa-trash" /> Delete
                    </button>
                  ) : null}
                </span>
              </div>
            </div>
            </div>
 

    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
