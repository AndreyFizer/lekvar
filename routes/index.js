var express = require('express');
var UserHandler = require('../handlers/users');
var _ = require('lodash');

module.exports = function (app, db) {
    "use strict";
    
    var userRouter = require('./users')(db);
    var productRouter = require('./products')(db);
    
    var userHandler = new UserHandler(db);
    
    function checkSession(req, res, next) {
        if (req.session.uId){
            return next();
        }
        res.render('login');
    }
    
    app.get('/', function(req, res, next){
        if (req.session.uId){
            res.render('index');
        } else {
            res.render('login');
        }
    });
    
    app.get('/registration', function(req, res, next){
        if (req.session.uId){
            res.redirect('/');
        } else {
            res.render('registration');
        }
    });

    app.post('/login', userHandler.letsLogin);
    app.post('/registration', userHandler.letsRegister);
    app.post('/logout', userHandler.letsLogout);
    
    app.use('/users', userRouter);
    app.use('/products', productRouter);
};