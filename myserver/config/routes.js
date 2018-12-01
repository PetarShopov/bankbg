const mongoose = require('mongoose')
const BankAccount = mongoose.model('BankAccount')
const errorHandler = require('../utilities/error-handler')
const passport = require('passport')

module.exports = (app) => {
	app.get('/bankAccounts/all', (req, res) => {
		const page = parseInt(req.query.page) || 1
		const selectedType = req.query.selectedType
		const pageSize = 6

		let startIndex = (page - 1) * pageSize
		let endIndex = startIndex + pageSize

		BankAccount.find({})
			.then(bankAccounts => {
				bankAccounts = bankAccounts.slice(startIndex, endIndex)
				res.status(200).json({ bankAccounts })
			})
			.catch(err => {
				let message = errorHandler.handleMongooseError(err)
				return res.status(200).json({
					success: false,
					message: message
				})
			})
	})

	app.post('/bankAccounts/add', (req, res) => {
		let bankAccountReq = req.body;

		BankAccount
			.create({
				ownerFirstName: bankAccountReq.ownerFirstName || 'No First Name',
				ownerLastName: bankAccountReq.ownerLastName || 'No Last Name',
				ownerPin: bankAccountReq.ownerPin || 'No PIN',
				balance: bankAccountReq.balance || 0,
				history: bankAccountReq.history || [],
				createdOn: +Date.now(),
				lastChange: +Date.now()
			})
			.then(bankAccount => {
				res.status(200).json({
					success: true,
					message: 'Bank Account added successfully.',
					bankAccount
				})
			})
			.catch(err => {
				let message = errorHandler.handleMongooseError(err)
				return res.status(200).json({
					success: false,
					message: message
				})
			})
	})

	app.post('/users/register', (req, res) => {
		return passport.authenticate('local-signup', (err) => {
			if (err) {
				return res.status(200).json({
					success: false,
					message: err
				})
			}

			return res.status(200).json({
				success: true,
				message: 'You have successfully signed up! Now you should be able to log in.'
			})
		})(req, res)
	})

	app.post('/users/login', (req, res) => {
		return passport.authenticate('local-login', (err, token, userData) => {
			if (err) {
				if (err.name === 'IncorrectCredentialsError') {
					return res.status(200).json({
						success: false,
						message: err.message
					})
				}

				return res.status(200).json({
					success: false,
					message: err.message
				})
			}

			return res.json({
				success: true,
				message: 'You have successfully logged in!',
				token,
				user: userData
			})
		})(req, res)
	})

	app.all('*', (req, res) => {
		res.status(404)
		res.send('404 Not Found!')
		res.end()
	})
}
