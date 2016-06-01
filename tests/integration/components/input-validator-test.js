import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input-validator', 'Integration | Component | input validator', {
  integration: true
});

test('it renders', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{#input-validator target="model.name" text="Name"}}
        {{input type="text" value=test}}
    {{/input-validator}}
  `);

  assert.equal(this.$('label').text().trim(), 'Name');
});
