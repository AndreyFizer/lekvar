import {Marionette, Backbone} from 'vendors';
import ItemView from 'views/itemView';

var Application = Marionette.Application.extend({
    region: '#app',
    
    initialize() {

    },
    
    onStart(){
        Backbone.history.fragment || Backbone.history.start();
        
        this.showView(new ItemView());
    }
});

window.APP = Application;

export default Application;