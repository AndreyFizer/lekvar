var express = require('express');
var router = express.Router();
var ProductHandler = require('../handlers/products');

module.exports = function (db) {
    "use strict";
    
    var productHandler = new ProductHandler(db);
    
    router.post('/', productHandler.createProduct);
    router.get('/', productHandler.getProducts);
    // router.get('/:id', productHandler.getUserById);
    
    return router;
};