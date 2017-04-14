const router = require('express').Router();
const auth = require('./utils.js');
const Call = require('../calling/config.js');
const User = require('../models/users.js');

router.post('/signup', (req, res) => {
	// TODO: Add server validation
	// Errors: #1 undefined becomes email exists error
	// #2 even if send is an error, sms gets sent
	// #3 verifications sent are not recorded anywhere
	// #4 what if user has been created and unvalidated, then user tries to signup again with the same credentials?
	
	const { email, firstName, lastName, password, phone } = req.body;
	let user;

	auth.hash(password)
		.then(hashedPassword => {
			return User.new({
				email,
				first_name: firstName,
				last_name: lastName,
				password: hashedPassword,
				phone
			});
		})
		.then(userFromDb => {
			// TODO: Verify user's number
			Call.sendVerification(userFromDb.phone);
			user = userFromDb;
			return auth.sign(user);
		})
		.then(token => {
			res.status(200).json({
				user: user,
				token: token
			});	
		})
		.catch(err => {
			// console.error('Error: ', err);
			res.status(400).json({
				error: 'Email exists.'
			});
		});
});

router.post('/login', (req, res) => {
	const { email, password } = req.body;	
	let user;
	User.findByEmail(email)
		.then((userFromDb) => {
			user = userFromDb;
			return auth.compare(password, user.password);
		})
		.then(verified => {
			if (verified) {
				return auth.sign(user);
			} else {
				throw new Error('Invalid Email/Password combination');
			}
		})
		.then(token => {
			res.status(200).json({
				user: user,
				token: token
			});
		})
		.catch(err => {
			// console.error('Error: ', err)
			res.status(401).json({
				error: err
			});
		});
});

router.use('/verify', auth.authMiddleware);
router.post('/verify', (req, res) => {
	const verificationCode = req.body.verificationCode;
	const { user_id, phone } = req.user // from middleware
	Call.verify(phone, 1, verificationCode)
		.then(response => {
			if (response) {
				User.verifyPhone(user_id);
				res.status(201).json({
					message: 'Phone number has been successfully verified.'
				});
			} else {
				throw new Error('Error verifying phone number with code');
			}
		})
		.catch(err => {
			res.status(400).json({
				error: err
			});
		});
});

module.exports = router;
