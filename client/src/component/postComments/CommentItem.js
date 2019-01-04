import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/postAction";
import { Link } from "react-router-dom";
import Moment from 'moment';


class CommentItem extends Component {
  
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  render() {

    const { comment, postId, auth } = this.props;
    Moment.locale('en');

    const margin = { padding: '20px' }
    return (
      <div className="jiref-bg" style={margin}>
        <div className="jiref-profile-image">
          <img src={comment.avatar} alt="profile" className="rounded-circle rounded-circle-post" />
          <div className="jiref-post-header">
            <p><Link to={`/profile/user/${auth.user.id}`}>{comment.name}</Link>
            <br/>{Moment(comment.date).format('d MMM')}</p>
          </div>
        </div>

        <div className="jiref-post-content">
          <p className="lead">{comment.text}</p>
        </div>
        <span className="like jiref-padding">
          {comment.user === auth.user.id ? (
            <button
              onClick={this.onDeleteClick.bind(this, postId, comment._id)}
              type="button"
              className="mr-1 delete">
              <i className="fas fa-trash" />
            </button>
          ) : null}
        </span>
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
