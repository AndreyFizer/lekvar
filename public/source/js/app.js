import {Marionette, Backbone} from 'vendors';
import ItemView from 'views/item/itemView';
import Router from 'routers/index';

var Application = Marionette.Application.extend({
    region: '#wrapper',
    
    initialize() {

    },
    
    onStart(){
        var itemView = new ItemView();
        
        new Router();
        Backbone.history.fragment || Backbone.history.start();
        
        this.showView(itemView);
    }
});

window.APP = Application;

export default Application;