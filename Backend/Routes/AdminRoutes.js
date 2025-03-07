const express = require('express')

const {protect} = require('../Middlewares/authMiddleware')
const router = express.Router()

router.post('/register',registerAdmin)
router.post('/login',loginAdmin)
router.get('/bio',protect)