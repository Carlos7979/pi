const uploader = require('./multer')
const auth = require('./auth')
const authViews = require('./authViews')
const authorization = require('./authorization')
const passportCall = require('./passportCall')

module.exports = {
	uploader,
	auth,
	authViews,
	authorization,
	passportCall
}
