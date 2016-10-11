import {Backbone} from 'vendors';

export default Backbone.Model.extend({
    
    defaults: {
        menuName : 'DefName',
        menuClass: 'DefClass'
    },
    
    initialize() {
        console.log('model inicialized...');
    }
});

