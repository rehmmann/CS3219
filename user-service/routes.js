const db = require('./queries')
const express = require('express')

let router = express.Router();

router.get('/users', db.getUsers)
router.get('/users/signedin/:id', db.getUserById)
router.post('/users/login', db.loginUser)
router.post('/users', db.createUser)
router.delete('/users/signined/:id', db.deleteUser)

module.exports = router;
