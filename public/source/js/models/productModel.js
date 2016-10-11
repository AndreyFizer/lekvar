import {$, _, Backbone, moment} from 'vendors'

export default Backbone.Model.extend({
    idAttribute: '_id',
    
    defaults: {
        name       : "",
        price      : "",
        description: "",
        image      : ""
    },
    
    urlRoot() {
        return '/products';
    },
    
    parse(atts) {
        atts.updatedAt = atts.updatedAt ? moment(atts.updatedAt).format("MMM Do YY") : '';
        atts.createdAt = atts.createdAt ? moment(atts.createdAt).format("MMM Do YY") : '';
        
        return atts;
    }
});

