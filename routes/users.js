var express = require('express');
var router = express.Router();
var UserHandler = require('../handlers/users');

module.exports = function (db) {
    "use strict";
    
    var userHandler = new UserHandler(db);
    
    router.post('/', userHandler.createUser);
    router.put('/:id', userHandler.editUser);
    router.get('/:id', userHandler.getUserById);
    router.delete('/:id', userHandler.deleteUser);
    router.get('/', userHandler.getUsers);
    
    return router;
};