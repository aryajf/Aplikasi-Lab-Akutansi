var express = require('express')
var router = express.Router()

// CALL CONTROLLER
const auth = require('../controllers/auth')
const user = require('../controllers/user')
const article = require('../controllers/article')

// CALL MIDDLEWARE
const checkAuth = require('../middleware/checkAuth')
const isAdmin = require('../middleware/isAdmin')
const fileUpload = require('../middleware/fileUpload')

router.get('/', function(req, res, next) {
  res.send('hello labamen')
})

// AUTH
router.post('/login', auth.login)
router.post('/register', auth.register)
router.get('/profile', checkAuth, auth.profile)
router.put('/profile/update', checkAuth, auth.updateProfile)
router.put('/profile/updateAvatar', checkAuth, fileUpload.single('avatar'), auth.updateAvatar)
router.get('/verify/:email/:token', auth.verifyEmail)
router.post('/password/forgot', auth.forgotPasswordRequest)
router.put('/password/update/:email/:token', auth.updatePassword)
router.post('/password/change', checkAuth, auth.changePassword)

// ADMIN
router.route('/user')
  .get(checkAuth, isAdmin, user.getUsers)
router.route('/user/search/:keyword')
  .get(checkAuth, isAdmin, user.searchUsers)
router.route('/user/:id')
  .get(checkAuth, isAdmin, user.showUsers)
  .delete(checkAuth, isAdmin, user.deleteUser)

// ARTICLE
router.route('/article')
  .get(article.index)
  .post(checkAuth, isAdmin, fileUpload.fields([{name: 'cover'}]), article.store)

// SEARCH article
router.route('/article/search/:keyword')
  .get(article.search)

router.route('/article/:slug')
  .get(article.show)
  .put(checkAuth, isAdmin, fileUpload.fields([{name: 'cover'}]), article.update)
  .delete(checkAuth, isAdmin, article.delete)
  
module.exports = router
