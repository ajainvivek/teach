import Ember from 'ember';

export default Ember.Component.extend({
  attendees : [{
    name : "Ajain",
    isPresenter : true
  },{
    name : "Sett",
    isPresenter : false
  },{
    name : "Sajith",
    isPresenter : false
  },{
    name : "Umesh",
    isPresenter : false
  }]
});
