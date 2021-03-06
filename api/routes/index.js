var express = require('express')
var router = express.Router()

// CALL CONTROLLER
const auth = require('../controllers/auth')
const article = require('../controllers/article')
const comments = require('../controllers/comments')

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

// ARTICLE
router.route('/article')
  .get(article.index)
  .post(checkAuth, isAdmin, fileUpload.fields([{name: 'cover'}]), article.store)

// SEARCH article
router.route('/article/search/:keyword')
  .get(article.search)

router.route('/article/comments/:slug')
  .put(checkAuth, comments.store)
  .delete(checkAuth, comments.delete)

router.route('/article/:slug')
  .get(article.show)
  .put(checkAuth, isAdmin, fileUpload.fields([{name: 'cover'}]), article.update)
  .delete(checkAuth, isAdmin, article.delete)
  
module.exports = router
