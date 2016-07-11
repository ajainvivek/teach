import Ember from 'ember';

export default Ember.Component.extend({
  data : [],
  isListFilled : function () {
    let list = this.get('data');
    return (list.length > 0) ? true : false;
  }.property('data')
});
