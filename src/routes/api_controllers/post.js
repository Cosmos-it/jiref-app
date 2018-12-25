/**
 *
 * @param {*} Post
 * @param {*} res
 */
const GET_ALL_POSTS = (Post, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      res.json(posts);
    })
    .catch(error => res.json({ nopostsfound: "No posts" }));
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const GET_POST_BY_ID = (Post, req, res) => {
  Post.findById(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(error =>
      res.status(400).json({
        nopostsfound: "No post"
      })
    );
};

/**
 *
 * @param {*} Post
 * @param {*} req
 * @param {*} res
 */
const ADD_POST = (Post, req, res) => {
  const post = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });
  post.save().then(post => res.json(post));
};

/**
 *
 * @param {*} Post
 * @param {*} req
 * @param {*} res
 */
const DELETE_POST = (Post, Profile, req, res) => {
  Profile.findOne({
    user: req.user.id
  }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        /// Check for post owner
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({
            notauthorized: "User not authorized"
          });
        }
        /// Delete
        post.remove().then(() =>
          res.json({
            success: true
          })
        );
      })
      .catch(err =>
        res.status(400).json({
          postnotfound: "No post found"
        })
      );
  });
};
/**
 *
 * @param {*} req
 * @param {*} res
 */
const DELETE_A_COMMENT = (Post, req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      /// Check to see if comment exists
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res.status(400).json({
          commentnotexists: "Comment does not exist"
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
    .catch(() =>
      res.status(400).json({
        postnotfound: "No post found"
      })
    );
};

/**
 *
 * @param {*} Post
 * @param {*} Profile
 * @param {*} req
 * @param {*} res
 */
const UNLIKE_POST = (Post, Profile, req, res) => {
  Profile.findOne({
    user: req.user.id
  }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res.status(400).json({
            notliked: "You have not given thumbs up"
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
      .catch(err =>
        res.status(400).json({
          postnotfound: "No post found"
        })
      );
  });
};

/**
 *
 * @param {*} Post
 * @param {*} Profile
 * @param {*} req
 * @param {*} res
 */
const LIKE_POST = (Post, Profile, req, res) => {
  Profile.findOne({
    user: req.user.id
  }).then(profile => {
    Post.findById(req.params.id).then(post => {
      console.log("Liked from sever");
      if (
        post.likes.filter(like => like.user.toString() === req.user.id).length >
        0
      ) {
        return res.status(400).json({
          alreadyliked: "Already liked"
        });
      }
      /// Add user id to likes array
      post.likes.unshift({
        user: req.user.id
      });
      post.save().then(post => res.json(post));
    });
  });
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const ADD_COMMENT = (Post, req, res) => {
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
    .catch(err =>
      res.status(400).json({
        postnotfound: "No post found"
      })
    );
};

/**
 *
 * @param {*} Post
 * @param {*} req
 * @param {*} res
 */
const DELETE_COMMENT = (Post, req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      /// Check to see if comment exists
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res.status(400).json({
          commentnotexists: "Comment does not exist"
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
    .catch(err =>
      res.status(400).json({
        postnotfound: "No post found"
      })
    );
};

module.exports = {
  GET_ALL_POSTS,
  GET_POST_BY_ID,
  ADD_POST,
  DELETE_POST,
  LIKE_POST,
  UNLIKE_POST,
  ADD_COMMENT,
  DELETE_COMMENT
};
