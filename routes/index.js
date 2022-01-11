const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//Welcome Page
router.get('/', (req, res) => {
    res.render('welcome');
});

//Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    //console.log(req.user._id);
    res.render('dashboard', {
        name: req.user.name
    });
    //console.log(req.params.id);
});

module.exports = router;