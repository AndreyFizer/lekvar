//Created by Andrey on 03.10.2015.

module.exports = (function () {
    "use strict";
    
    var mongoose = require('mongoose');

    var userSchema = mongoose.Schema({
        email         : {type: String, require: true, unique: true},
        pass          : {type: String},
        firstName     : {type: String},
        lastName      : {type: String},
        role          : {type: Number, required: true, default: 1},
        createdAt     : {type: Date, default: Date.now},
        updatedAt     : {type: Date, default: Date.now}
    }, {
        collection    : 'Users'
    });

    mongoose.model('User', userSchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }

    mongoose.Schemas['User'] = userSchema;

    if (process.env.NODE_ENV !== 'production') {
        userSchema.set('autoIndex', false);
    }

})();