const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const keys = require("../../../config/keys");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();
const Post = require("../../models/post");
const Profile = require("../../models/profile");
const controllerAPI = require("../api_controllers/post");

/// validation
const validatePostInput = require("../../../validation/post-validation");

router.get("/", (req, res) => {
  controllerAPI.GET_ALL_POSTS(Post, res);
});

router.get("/:id", (req, res) => {
  /// @desc   Get posts | @route  GET api.jiref.com/post/:id
  controllerAPI.GET_POST_BY_ID(Post, req, res);
});

/// @desc    Create post | @route   POST /api.jiref.com/posts
router.post(
  "/post",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      /// Check Validation
      return res.status(400).json(errors); /// If any errors, send 400 with errors object
    }
    controllerAPI.ADD_POST(Post, req, res);
  }
);


router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    /// @desc    Delete post | @route   DELETE api.jiref.com/posts/:id
    controllerAPI.DELETE_POST(Post, Profile, req, res);
  }
);

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    /// @desc    Like post |  @route   POST api.jiref.com/posts/like/:id
    controllerAPI.LIKE_POST(Post, Profile, req, res);
  }
);

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    /// @desc    Unlike post | @route   POST api.jiref.com/posts/unlike/:id
    controllerAPI.UNLIKE_POST(Post, Profile, req, res);
  }
);

router.post(
  "/comment/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    /// @desc    Add comment to post | @route   POST api.jiref.com/posts/comment/:id
    const { errors, isValid } = validatePostInput(req.body);
    /// Check Validation
    if (!isValid) {
      /// If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    controllerAPI.ADD_COMMENT(Post, req, res);
  }
);

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    /// @desc    Remove comment from post | @route   DELETE api.jiref.com/posts/comment/:id/:comment_id
    controllerAPI.DELETE_COMMENT(Post, req, res);
  }
);

module.exports = router;

