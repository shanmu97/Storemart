const express = require('express')
const {registerUser,loginUser,getUserData,editDetails} = require('../Controllers/UserController')
const router = express.Router()
const {protect} = require('../Middlewares/authMiddleware')

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/bio',protect,getUserData)
router.put('/edit',protect,editDetails)

module.exports = router;