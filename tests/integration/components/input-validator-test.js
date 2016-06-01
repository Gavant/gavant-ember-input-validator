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


test('Show error', function(assert) {
  this.set('errors', {
     name: ' can not be empty'
  });
  //Usually you don't provide the targetObject, but to direct the input validator to validate based off of properties set here in the test, we provide the targetObject
  this.render(hbs`
    {{#input-validator target="name" text="Name" targetObject=this}}
        {{input type="text" value=name}}
    {{/input-validator}}
  `);
  this.set('showValidationFields', true);

  assert.equal(this.$('.input-validation-error b').text().trim(), 'Name can not be empty');
});
