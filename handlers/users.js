//Created by Andrey on 03.10.2015.

var crypto = require("crypto");
var mongoose = require('mongoose');
var _ = require('lodash');

var UserHandler = function (db) {
    "use strict";
    
    var async = require('async');
    var userSchema = mongoose.Schemas['User'];
    var UserModel = db.model('User', userSchema);
    var ObjectId = mongoose.Schema.Types.ObjectId;
    
    this.createUser = function (req, res, next) {
        var body = req.body;
        var userModel = new UserModel(body);
        
        userModel.save(function (err, user) {
            if (err) {
                return next(err);
            }
            res.status(200).send(user);
        });
    };
    
    this.getUsers = function (req, res, next) {
        
        UserModel.find()
            .exec(function (err, users) {
                if (err) {
                    return next(err);
                }
                res.status(200).send(users);
            });
    };
    
    this.editUser = function (req, res, next) {
        var userId = req.params.id;
        var updateData = req.body;
        
        UserModel.findByIdAndUpdate(userId, updateData, {new: true}, function (err, user) {
            if (err) {
                return next(err);
            }
            
            res.status(200).send(user);
        });
    };
    
    this.deleteUser = function (req, res, next) {
        var userId = req.params.id;
        
        UserModel.remove({_id: userId}, function (err) {
            if (err) {
                return next(err);
            }
            
            res.send({success: 'Success'})
        });
    };
    
    this.getUserById = function (req, res, next) {
        var userId = req.params.id;
        
        UserModel.find({'_id': userId})
            .exec(function (err, user) {
                if (err) {
                    return next(err);
                }
                res.status(200).send(user);
            });
    };
    
    this.letsRegister = function (req, res, next) {
        var body = req.body;
        var email = body.email;
        var password = body.password;
        var firstName = body.firstName;
        var lastName = body.lastName;
        
        UserModel
            .findOne({email: email})
            .exec(function (error, user) {
                if (error) {
                    return next(error);
                }
                if (user && user._id) {
                    error = new Error('Email in use');
                    error.status = 400;
                    return next(error);
                }
                
                user = new UserModel({
                    email    : email,
                    pass     : password,
                    firstName: firstName,
                    lastName : lastName
                });
                
                user.save(function (error, user) {
                    if (error) {
                        return next(error);
                    }
                    req.session.uId = user._id;
                    res.status(200).send({success: 'success'});
                });
            });
    };
    
    this.letsLogin = function (req, res, next) {
        var body = req.body;
        var email = body.email;
        var password = body.password;
        var whereOption = {
            email: email,
            pass : password
        };
        
        UserModel
            .findOne(whereOption)
            .exec(function (error, user) {
                if (error) {
                    return next(error);
                }
                
                if (_.isNull(user)) {
                    error = new Error('Wrong credentilas');
                    error.status = 400;
                    return next(error);
                }
    
                req.session.uId = user._id;
                res.status(200).send({success: 'Success'})
            });
    };
    
    this.letsLogout = function (req, res, next) {
        if (req.session) {
            req.session.destroy();
        }
        res.status(200).send({success: 'success'});
    };
};

module.exports = UserHandler;