import {Marionette} from './vendors';
import ItemView from './views/itemView';

export default Marionette.Application.extend({
    region: '#app',
    
    initialize() {
        this.on('start', () => {
            this.showView(new ItemView());
        })
    }
});
