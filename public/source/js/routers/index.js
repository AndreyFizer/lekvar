import {Marionette, Backbone} from 'vendors'

export default Marionette.AppRouter.extend({
    routes: {
        'users': 'userRout',
        '*any' : 'anyRout'
    },
    
    userRout: function () {
        console.log('You are on user rout now');
    },
    
    anyRout: function () {
        Backbone.history.navigate('users', {trigger: true});
    }
    
})