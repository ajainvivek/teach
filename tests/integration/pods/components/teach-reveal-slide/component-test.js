import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('teach-reveal-slide', 'Integration | Component | teach reveal slide', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{teach-reveal-slide}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#teach-reveal-slide}}
      template block text
    {{/teach-reveal-slide}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
