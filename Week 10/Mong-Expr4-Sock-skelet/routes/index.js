﻿var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
   res.render('index', { title: 'Skeleton: mongo - express4 - angular - node - sockets' });
   // res.redirect('/users');
});

module.exports = router;