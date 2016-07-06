import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('landing', {path : "/"});
  this.route('join');
  this.route('slide');
});

export default Router;
