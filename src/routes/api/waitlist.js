const express = require('express');
const router = express.Router();
const WaitList = require('../../models/waitlist');
const validateWaitListInput = require('../../../validation/waitlist-validation');

// @route    POST api.jiref.com/email-wish/
// @desc     Collect User emails
// @access   Public
router.post('/', (req, res) => {
	// begin registration.
	const {
		errors,
		isValid
	} = validateWaitListInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	WaitList.findOne({
			email: req.body.email
		})
		.then(useremail => {
			if (useremail) {
				errors.email = 'Email already exists';
				return res.status(400).json(errors);
			} else {

				const waitlist = new WaitList({
					fullname: req.body.fullname,
					email: req.body.email,
				});

				waitlist.save()
					.then(data => res.json(data))
					.catch(err => {
						return res.json(err)
					});
			}
		});
});

// @route    GET api.jiref.com/email-wish/
// @desc     Collect User email
// @access   Public
router.get('/', (req, res) => {
	const errors = {};
	WaitList.find()
		.sort({
			date: -1
		})
		.then(data => res.json(data))
		.catch(error => res.status(404).json({
			noemail: 'No email'
		}));
});

module.exports = router;
