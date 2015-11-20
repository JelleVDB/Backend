var express = require('express');
var router = express.Router();
var users = require('../data/users.json');
var loadUser = require('./middleware/loadUser.js');

/* GET users listing. */
router.get('/', function (req, res) {
    //res.send('respond with a resource');

    res.render('users/index', { title: 'Users', users: users });
});

router.get('/:name', function (req, res, next) {
    var user = users[req.params.name.toLowerCase()];
    if (user) {
    res.render('users/details', { title: 'User profile', user: user });
    } else {
        next();
    }
});
/*
router.get('/:name', loadUser, function (req, res, next) {
    //deze code word vervangen door de loadUser middleware
    //var user = users[req.params.name.toLowerCase()];
    //if (user) {
        res.render('users/details', { title: 'User profile', user: req.user });
    //} else {
    //    next();
    //}
});*/

router.get('/new', function (req, res) {
    res.render('users/create', { title: "New User" });
});

router.post('/', function (req, res) {
    if (users[req.body.username]) {
        res.send('Conflict', 409);
    } else {
        users[req.body.username.toLowerCase()] = req.body;
        res.redirect('/users');
    }
});

router.route('/:name').post(function (req, res, next) {
    var userName = req.params.name.toLowerCase();
    if (users[userName]) {
        switch (req.body._method) {
            case "DELETE":
                delete users[userName];
                break;
            case "PUT":
                users[userName] = req.body;
                break;
            default:
                next();
        }
        res.redirect('/users');
    }
    
});


module.exports = router;