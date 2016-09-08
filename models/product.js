module.exports = (function () {
    "use strict";
    
    var mongoose = require('mongoose');
    
    var productSchema = mongoose.Schema({
        name          : {type: String},
        price         : {type: Number},
        image         : {type: String},
        description   : {type: String},
        createdAt     : {type: Date, default: Date.now},
        updatedAt     : {type: Date, default: Date.now}
    }, {
        collection    : 'Products'
    });
    
    mongoose.model('Product', productSchema);
    
    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }
    
    mongoose.Schemas['Product'] = productSchema;
    
    if (process.env.NODE_ENV !== 'production') {
        productSchema.set('autoIndex', false);
    }
    
})();