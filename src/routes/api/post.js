const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const keys = require('../../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const Post = require('../../models/post');
const Profile = require('../../models/profile');

/// validation
const validatePostInput = require('../../../validation/post-validation');

/// @desc   Get posts | @route  GET api.jiref.com/post
/// @access public
router.get('/', (req, res) => {
  Post.find().sort({date: -1})
    .then(posts => {
      res.json(posts)}
      )
    .catch(error => res.json({ nopostsfound: 'No posts' }));

});


/// @desc   Get posts | @route  GET api.jiref.com/post/:id
/// @access public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({
      nopostsfound: 'No post'
    }));

});


/// @desc    Create post | @route   POST /api.jiref.com/posts
/// @access  Private
router.post('/post', passport.authenticate('jwt', { session: false }),
  (req, res) => {

    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) { /// Check Validation
      return res.status(400).json(errors); /// If any errors, send 400 with errors object
    }
    const post = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    })
    post.save().then(post => res.json(post));

  });

/// @desc    Delete post | @route   DELETE api.jiref.com/posts/:id
/// @access  Private
router.delete('/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  Profile.findOne({
    user: req.user.id
  }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        /// Check for post owner
        if (post.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({
              notauthorized: 'User not authorized'
            });
        }
        /// Delete
        post.remove().then(() => res.json({
          success: true
        }));
      })
      .catch(err => res.status(400).json({
        postnotfound: 'No post found'
      }));
  });
});

/// @desc    Like post |  @route   POST api.jiref.com/posts/like/:id
/// @access  Private
router.post('/like/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  Profile.findOne({
    user: req.user.id
  }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        console.log('Liked from sever');
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
          return res
            .status(400)
            .json({
              alreadyliked: 'Already liked'
            });
        }
        /// Add user id to likes array
        post.likes.unshift({
          user: req.user.id
        });
        post.save().then(post => res.json(post));
      });
  });
});


/// @desc    Unlike post | @route   POST api.jiref.com/posts/unlike/:id
/// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  Profile.findOne({
    user: req.user.id
  }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (post.likes.filter(like => like.user.toString() === req.user.id)
          .length === 0) {
          return res
            .status(400)
            .json({
              notliked: 'You have not given thumbs up'
            });
        }
        /// Get remove index
        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);
        /// Splice out of array
        post.likes.splice(removeIndex, 1);
        /// Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(400).json({
        postnotfound: 'No post found'
      }));
  });
});


/// @desc    Add comment to post | @route   POST api.jiref.com/posts/comment/:id
/// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  const { errors, isValid } = validatePostInput(req.body);
  /// Check Validation
  if (!isValid) {
    /// If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };
      /// Add to comments array
      post.comments.unshift(newComment);
      /// Save
      post.save().then(post => res.status(200).json(post));
    })
    .catch(err => res.status(400).json({
      postnotfound: 'No post found'
    }));
});


/// @desc    Remove comment from post | @route   DELETE api.jiref.com/posts/comment/:id/:comment_id
/// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

  Post.findById(req.params.id)
    .then(post => {
      /// Check to see if comment exists
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res
          .status(400)
          .json({
            commentnotexists: 'Comment does not exist'
          });
      }
      /// Get remove index
      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      /// Splice comment out of array
      post.comments.splice(removeIndex, 1);

      post.save().then(post => res.status(200).json(post));
    })
    .catch(err => res.status(400).json({
      postnotfound: 'No post found'
    }));
});

module.exports = router;
