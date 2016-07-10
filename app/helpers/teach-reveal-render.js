import Ember from 'ember';

export function teachRevealRender(params) {
  return Ember.String.htmlSafe(params[0]);
}

export default Ember.Helper.helper(teachRevealRender);
