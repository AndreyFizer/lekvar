import {$, Backbone} from 'vendors';

export default Backbone.Model.extend({
    url: 'login',
    
    defaults: {
        email   : '',
        password: ''
    },
    
    initialize() {
        console.log('model inicialized...');
    },
    
    validate(atts) {
        var ar = [];
        
        if (!atts.email) {
            ar.push('email')
        }
        if (!atts.password) {
            ar.push('password')
        }
        
        if (ar.length) {
            return ar.join(' and ') + String.raw(' ${(ar.length > 1 ? "are" : "is")} required field/s...');
        }
    }
});

