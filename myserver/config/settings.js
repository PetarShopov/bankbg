const path = require('path')

let rootPath = path.normalize(path.join(__dirname, '/../../'))
//mongodb://localhost:27017/xapnibg

module.exports = {
	development: {
		rootPath: rootPath,
		db: 'mongodb://localhost:27017/bankbg',
		port: 5000
	},
	staging: {
	},
	production: {
		db: '',
		port: process.env.PORT
	}
}
