import DS from 'ember-data';

// app/models/post.js
export default DS.Model.extend({
  name: DS.attr('string'),
  slideId: DS.attr('string'),
  infoHash: DS.attr('string'),
  timestamp: DS.attr('number')
});
