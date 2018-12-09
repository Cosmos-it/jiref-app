const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const keys = require("../../../config/keys");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();

// load validation
const validationProfileInput = require("../../../validation/profile-validation");
const validationExperienceInput = require("../../../validation/experience-validation");
const validationEducationInput = require("../../../validation/education-validation");
const validateProjectInput = require("../../../validation/project-validation");

// load profile
const Profile = require("../../models/profile");
// load user
const User = require("../../models/user");

/**
 * @url       {GET} api.jiref.com/profile
 * @desc      Get current user profile
 * @access    private
 */
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  const errors = {}; // errors object

  Profile.findOne({
    user: req.user.id
  })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "User has no profile";
        return res.status(400).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(400).json(err));  // catch error
});


/**
 * @url      {GET} api.jiref.com/profile/all
 * @desc     Get all profiles
 * @access   public
 */
router.get("/search", (req, res) => {
  const errors = {};
  Profile.find(
    {
      me: { $regex: new RegExp(req.query.me.toString()) }

    }, function (err, data) {
      return res.json(data);

    }).limit(10);
});



/**
 * @url      {GET} api.jiref.com/profile/all
 * @desc     Get all profiles
 * @access   public
 */
router.get("/all", (req, res) => {

  const errors = {}; // errors object
  Profile.find(
    {
       me: { $regex: new RegExp(req.query.me.toString()) },
    }
  ).populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "No user profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })

    .catch(err =>
      res.status(404).json({
        profile: "No profiles"
      })
    );
});

/**
 * @url     {GET} api.jiref.com/profile/me/:me
 * @desc    Get profile by me
 * @access  public
 */
router.get("/me/:me", (req, res) => {
  const errors = {};
  Profile.findOne({
    me: req.params.me
  })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "No profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});


/**
 * @url     {GET} api.jiref.com/profile/user/:user_id
 * @desc    Get profile by id
 * @access  public
 */
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({
    user: req.params.user_id
  })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "No profile for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({
        profile: "No profile for this user"
      })
    );
});

/**
 * @url     {POST} api.jiref.com/profile
 * @desc    Create or edit user profile
 * @access  private
 */
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {

  const { errors, isValid } = validationProfileInput(req.body);
  const profileValues = {};

  // check for validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // get fields
  profileValues.user = req.user.id;
  if (req.body.me) profileValues.me = req.body.me;
  if (req.body.company) profileValues.company = req.body.company;
  if (req.body.website) profileValues.website = req.body.website;
  if (req.body.location) profileValues.location = req.body.location;
  if (req.body.bio) profileValues.bio = req.body.bio;
  if (req.body.status) profileValues.status = req.body.status;
  if (req.body.githubusername)
    profileValues.githubusername = req.body.githubusername;

  //skills -split into array
  if (typeof req.body.skills !== "undefined") {
    profileValues.skills = req.body.skills.split(",");
  }

  // social
  profileValues.social = {};
  if (req.body.github) profileValues.social.github = req.body.github;
  if (req.body.linkedin) profileValues.social.linkedin = req.body.linkedin;

  Profile.findOne({
    user: req.user.id
  }).then(profile => {
    if (profile) {
      // update
      Profile.findOneAndUpdate(
        {
          user: req.user.id
        },
        {
          $set: profileValues
        },
        {
          new: true
        }
      ).then(profile => res.json(profile));
    } else {
      // Create new profile
      // Check if me exisits
      Profile.findOne({
        me: profileValues.me
      })
        .then(profile => {
          if (profile) {
            errors.me = "Me handle already exists";
            res.status(400).json(errors);
          }
          // save profile
          new Profile(profileValues)
            .save()
            .then(profile => res.json(profile));
        })
        .catch(err => res.status(404).json(err));
    }
  });
});


/**
 * @url   {POST} api.jiref.com/profile/project
 * @desc  Post new project
 * @access  private
 */
router.post("/project", passport.authenticate("jwt", { session: false }), (req, res) => {

  const { errors, isValid } = validateProjectInput(req.body);
  const newProject = {
    name: req.body.name,
    githubproject: req.body.githubproject,
    description: req.body.description,
    timetaken: req.body.timetaken
  };

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({
    user: req.user.id
  }).then(profile => {
    // add experiene to array
    profile.project.unshift(newProject);
    profile.save().then(profile => res.json(profile));

  });
});

/**
 * @url     {POST} api.jiref.com/profile/followers
 * @desc    Add new follower to a user
 * @access private
 */

router.post("/followers", passport.authenticate('jwt', { session: false }), (req, res) => {
  // Currently logged user
  const userA = {
    user: req.user.id,
    name: req.body.userA.name,
    avatar: req.body.userA.avatar,
  };

  const userB = {
    user: req.body.userB._id,
    name: req.body.userB.name,
    avatar: req.body.userB.avatar,
  };

  Profile.findOne({
    user: req.user.id
  }).then(profile => {

    if (profile.followers.filter(follower => follower.user.toString() === userB.user).length > 0) {
      return res.status(201).json(
        {
          followed: 'Already followed'
        });

    } else {
      profile.followers.unshift(userB);
      profile.save().then(follower => { });
      profile.close();
    }

  }).catch(error => { });

  // post person A to B
  postUserAtob(userB, userA, res);

});


/**
 * @url     {GET} api.jiref.com/profile/followers
 * @desc    Add new follower to a user
 * @access private
 */
router.get('/followers', passport.authenticate('jwt', { session: false }), (req, res) => {

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile.followers) {
      return res.status(200).json(profile.followers);
    }
    else {
    }
  }).catch(err => {
    return res.status(400).json({ empty: 'Empty' });
  })

})

/**
* @url     {DELETE} api.jiref.com/profile/followers/:id
* @desc    Remove a follower
* @access  private
*/
router.delete("/followers/:id", passport.authenticate("jwt", { session: false }), (req, res) => {

  Profile.findOne({
    user: req.user.id
  })
    .then(profile => {
      // Get remove index

      const removeIndex = profile.followers
        .map(item => item.id)
        .indexOf(req.params.id);
      profile.followers.splice(removeIndex, 1);
      profile.save().then(profile => res.json("deleted"));

    })
    .catch(err => res.status(404).json(err));
});


/**
 * @url     {DELETE} api.jiref.com/profile/project/:edu_id
 * @desc    Delete project from profile
 * @access  private
 */
router.delete("/project/:proj_id", passport.authenticate("jwt", { session: false }), (req, res) => {

  Profile.findOne({
    user: req.user.id
  })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.project
        .map(item => item.id)
        .indexOf(req.params.proj_id);
      // Splice out of array
      profile.project.splice(removeIndex, 1);
      // Save
      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
}
);

/**
 * @url     {POST} api.jiref.com/profile/experience
 * @desc    Add experience to profile
 * @access  private
 */
router.post("/experience", passport.authenticate("jwt", { session: false }), (req, res) => {

  const { errors, isValid } = validationExperienceInput(req.body);

  const newExperience = {
    title: req.body.title,
    company: req.body.company,
    location: req.body.location,
    from: req.body.from,
    to: req.body.to,
    current: req.body.current,
    description: req.body.description
  };

  if (!isValid) {
    return res.status(400).json(errors); // return errors
  }

  Profile.findOne({
    user: req.user.id
  }).then(profile => {

    // add experiene to array
    profile.experience.unshift(newExperience);
    profile.save().then(profile => res.json(profile));

  });

});


/**
 * @url     {POST} api.jiref.com/profile/education
 * @desc    Add education to profile
 * @access  private
 */
router.post("/education", passport.authenticate("jwt", { session: false }), (req, res) => {

  const { errors, isValid } = validationEducationInput(req.body);

  const education = {
    school: req.body.school,
    degree: req.body.degree,
    fieldofstudy: req.body.fieldofstudy,
    from: req.body.from,
    to: req.body.to,
    current: req.body.current,
    description: req.body.description
  };
  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Profile.findOne({
    user: req.user.id
  }).then(profile => {
    // Add to exp array
    profile.education.unshift(education);
    profile.save().then(profile => res.json(profile));
  });

});


/**
 * @url     {DELETE} api.jiref.com/profile/experience/:exp_id
 * @desc    Delete experience from profile
 * @access  private
 */
router.delete("/experience/:exp_id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({
    user: req.user.id
  })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);
      // Splice out of array
      profile.experience.splice(removeIndex, 1);
      // Save
      profile.save().then(profile => res.json(profile));
    })

    .catch(err => res.status(404).json(err));
});


/**
 * @url     {get}api.jiref.com/profile/education/:id
 * @desc    Get education by id
 * @access  private
 */
router.get('/education/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const error = {};

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'No users profile'
        return res.status(400).json(errors)
      }
      profile.education.forEach(element => {
        if (req.params.id == element._id) {
          return res.json(element)
        }
      });

    })
    .catch(err => res.json(err));
});


/**
 * @url   {PUT} api.jiref.com/profile/educaiton/:id
 * @desc Update education
 * @access  private
 */
router.put('/education/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = validationEducationInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  Profile.findOne({ user: req.params.id }).then(profile => {
    if (profile) {
      profile.findOneAndUpdate(
        {
          'education._id': req.params.id
        },
        {
          '$set': {
            'education.$.school': req.body.school,
            'education.$.degree': req.body.degree,
            'education.$.fieldofstudy': req.body.fieldofstudy,
            'education.$.from': req.body.from,
            'education.$.to': req.body.to,
            'education.$.current': req.body.current,
            'education.$.description': req.body.description
          }
        },
        {
          new: true
        }
      ).catch(err => res.json(err));
    }
  })
});


/**
 * @url   {PUT} api.jiref.com/profile/experience/:id
 * @desc Update experience
 * @access  private
 */
router.put('/experience/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = validationExperienceInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  Profile.findOne({ user: req.params.id }).then(profile => {
    if (profile) {
      profile.findOneAndUpdate(
        {
          'experience._id': req.params.id
        },
        {
          '$set': {
            'experience.$.title': req.body.title,
            'experience.$.company': req.body.company,
            'experience.$.location': req.body.location,
            'experience.$.from': req.body.from,
            'experience.$.to': req.body.to,
            'experience.$.current': req.body.current,
            'experience.$.description': req.body.description
          }
        },
        {
          new: true
        }
      ).catch(err => res.json(err));
    }
  })

});


/**
 * @url  {PUT} api.jiref.com/profile/project/:id
 * @desc Update project
 * @access  private
 */
router.put('/project/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

  const { errors, isValid } = validationProfileInput(req.body);

  if (!isValid) return res.status(400).json(errors);
  Profile.findOne({ user: req.params.id }).then(profile => {
    if (profile) {
      profile.findOneAndUpdate({
        'project._id': req.params.id
      },
        {
          '$set': {
            'project.$.name': req.body.name,
            'project.$.githubproject': req.body.githubproject,
            'project.$.description': req.body.description,
            'project.$.timetaken': req.body.timetaken
          }
        },
        {
          new: true
        }
      ).catch(err => res.json(err));
    }
  });
});



/**
 * @url   {GET} api.jiref.com/profile/experience/:id
 * @desc  Get experience by id
 * @access  private
 */
router.get('/experience/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const error = {};

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'No users profile'
        return res.status(400).json(errors)
      }
      profile.experience.forEach(element => {
        if (req.params.id == element._id) {
          return res.json(element)
        }
      });

    })
    .catch(err => res.json(err));
});


/**
 * @url   {GET} api.jiref.com/profile/project/:id
 * @desc  Get project by id
 * @access  private
 */
router.get('/project/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

  const error = {};

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'No users profile'
        return res.status(400).json(errors)
      }
      profile.project.forEach(element => {
        if (req.params.id == element._id) {
          return res.json(element)
        }
      });

    })
    .catch(err => res.json(err));
});


/** 
 * @url     {DELETE} api.jiref.com/profile/education/:edu_id
 * @desc    Delete experience from profile
 * @access  private
 */
router.delete("/education/:edu_id", passport.authenticate("jwt", { session: false }), (req, res) => {

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // Get remove index
      const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
      profile.education.splice(removeIndex, 1); // Splice out of array
      profile.save().then(profile => res.json(profile)); // Save

    })
    .catch(err => res.status(404).json(err));
});

/**
 * @url     {DELETE} api.jiref.com/profile
 * @desc    Delete user and profile
 * @access  private
 */
router.delete("/", passport.authenticate("jwt", { session: false }), (req, res) => {

  Profile.findOneAndRemove({
    user: req.user.id
  }).then(() => {
    User.findOneAndRemove({
      _id: req.user.id
    }).then(() =>
      res.json({
        success: true
      })
    );
  });
});

function postUserAtob(userB, userA, res) {
  Profile.findOne({
    user: userB.user
  }).then(profile => {

    if (profile.followers.filter(follower => follower.user.toString() === userA.user).length > 0) {
      return res.status(201).json({
        followed: 'Already followed'
      });
    }
    else {
      profile.followers.unshift(userA);
      profile.save().then(follower => { });
    }
  }).catch(error => { });
}


module.exports = router;



