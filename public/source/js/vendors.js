// import _ from  './libs/underscore/underscore-min';
// import Backbone from './libs/backbone/backbone-min';
// import $ from './libs/jquery/dist/jquery.min';
// import Marionette from './libs/backbone.marionette/lib/backbone.marionette.min';

const _ = require('./libs/underscore/underscore-min');
const Backbone = require('./libs/backbone/backbone-min');
const $ = require('./libs/jquery/dist/jquery.min');
const Marionette = require('./libs/backbone.marionette/lib/backbone.marionette.min');

Backbone.$ = $;
window.$ = $;

export {_, $, Backbone, Marionette};