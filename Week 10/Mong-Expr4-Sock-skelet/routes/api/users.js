/*
 * users.js
 * API controller voor users 
 * namespace : /api/users
 */
var express = require('express');
var router = express.Router();
var loadUser = require('../middleware/load_user.js')

//--- pagina oproepen met een XMLHTTP call
router.get('/apiCall', function (req, res) {
    res.render('users/apiCall', {
        title: 'Ophalen van users met XMLHTTP'
    })
});

//---- API controller
router.get('/', function (req, res) {
    UsersRepo.getAllUsers(function (err , users) {
        if (err) {
            res.json(err);
        }
        res.json(users);
        //res.end(JSON.stringify(users)); //alternatief
    }); 
});

module.exports = router;