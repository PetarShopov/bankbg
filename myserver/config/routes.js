const mongoose = require('mongoose')
const BankAccount = mongoose.model('BankAccount')
const Credit = mongoose.model('Credit')
const errorHandler = require('../utilities/error-handler')
const passport = require('passport')

module.exports = (app) => {
	app.get('/bankAccounts/all', (req, res) => {
		const page = parseInt(req.query.page) || 1
		const username = req.query.username
		const pageSize = 6

		let startIndex = (page - 1) * pageSize
		let endIndex = startIndex + pageSize
		let bankInfo = {
			totalBalance: 0,
			bankAccounts: 0
		}
		BankAccount.find({})
			.then(bankAccounts => {
				if (username) {
					bankAccounts = bankAccounts.filter((bankAccount) => {
						return bankAccount.ownerUsername === username
					})
				}
				bankAccounts.forEach((bankAccount) => {
					bankInfo.totalBalance += bankAccount.balance;
				})
				bankInfo.bankAccounts = bankAccounts.length;
				bankAccounts = bankAccounts.slice(startIndex, endIndex)
				res.status(200).json({ bankAccounts, bankInfo })
			})
			.catch(err => {
				let message = errorHandler.handleMongooseError(err)
				return res.status(200).json({
					success: false,
					message: message
				})
			})
	})

	app.post('/bankAccounts/transferMoney', (req, res) => {
		const ownerPin = req.body.receiverPin;
		const amount = Number(req.body.amount);
		BankAccount.findOne({ ownerPin })
			.then(bankAccount => {
				if (!bankAccount || !Number(bankAccount.balance)) {
					return res.status(200).json({
						success: false,
						message: 'Wrong PIN or amount!'
					})
				}

				BankAccount.update({ ownerPin }, {
					balance: Number(bankAccount.balance) + amount
				})
					.then(updatedBankAccount => {
						res.status(200).json({
							success: true,
							message: `Transfer succeeded. ${amount} was transfered to ${bankAccount.ownerFirstName} ${bankAccount.ownerLastName} - ${ownerPin}`,
							bankAccount: updatedBankAccount
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
		const ownerPin = req.body.ownerPin;
		BankAccount.findOne({ ownerPin })
			.then(bankAccount => {
				if (bankAccount) {
					return res.status(200).json({
						success: false,
						message: 'A bank account with such PIN is already created!'
					})
				}
				BankAccount
					.create({
						ownerFirstName: bankAccountReq.ownerFirstName || 'No First Name',
						ownerLastName: bankAccountReq.ownerLastName || 'No Last Name',
						ownerUsername: bankAccountReq.ownerUsername || 'No Username',
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
			.catch(err => {
				let message = errorHandler.handleMongooseError(err)
				return res.status(200).json({
					success: false,
					message: message
				})
			})
	})

	app.post('/bankAccounts/requestCredit', (req, res) => {
		debugger;
		let {pin, amount} = req.body;
		if (!pin || !amount) {
			return res.status(200).json({
				success: false,
				message: "PIN or Amount is missing"
			})
		}
		Credit
			.create({
				pin,
				amount,
				createdOn: +Date.now()
			})
			.then(credit => {
				res.status(200).json({
					success: true,
					message: 'Credit requested successfully.',
					credit
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
