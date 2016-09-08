var mongoose = require('mongoose');

var ProductHandler = function (db) {
    "use strict";
    
    var async = require('async');
    var productSchema = mongoose.Schemas['Product'];
    var ProductModel = db.model('Product', productSchema);
    var ObjectId = mongoose.Schema.Types.ObjectId;
    
    function createProduct(req, res, next) {
        var body = req.body;
        var productModel = new ProductModel(body);
    
        productModel.save(function (err, product) {
            if (err) {
                return next(err);
            }
            res.status(200).send(product);
        });
    }
    
    function getProducts(req, res, next) {
    
        ProductModel.find()
            .exec(function (err, products) {
                if (err) {
                    return next(err);
                }
                res.status(200).send(products);
            });
    }
    
    this.createProduct = createProduct;
    this.getProducts = getProducts;
    // this.getUserById = getUserById;
    
};

module.exports = ProductHandler;
