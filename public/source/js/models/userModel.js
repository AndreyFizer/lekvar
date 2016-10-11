import {$, _, Backbone, moment} from 'vendors';

return Backbone.Model.extend({
    idAttribute: '_id',
    
    defaults: {
        firstName: "",
        lastName : "",
        email    : "",
        role     : 1
    },
    
    urlRoot: function () {
        return '/users';
    },
    
    parse: function (atts) {
        if (atts.updatedAt) {
            atts.updateValue = moment(atts.updatedAt).format("MMM Do YY");
        }
        
        return atts;
    }
});
