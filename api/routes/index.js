var express = require('express')
var router = express.Router()

// CALL CONTROLLER
const auth = require('../controllers/auth')
const user = require('../controllers/user')

// CALL MIDDLEWARE
const checkAuth = require('../middleware/checkAuth')
const fileUpload = require('../middleware/fileUpload')

router.get('/', function(req, res, next) {
  res.send('hello labamen')
})

// AUTH
router.post('/login', auth.login)
router.post('/register', auth.register)
router.get('/profile', checkAuth, auth.profile)
router.put('/profile/update', checkAuth, fileUpload.single('avatar'), auth.updateProfile)
router.put('/verify/:email/:token', auth.verifyEmail)
router.post('/password/forgot', auth.forgotPasswordRequest)
router.put('/password/update/:email/:token', auth.updatePassword)
router.post('/password/change', checkAuth, auth.changePassword)
  
module.exports = router
