import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  validations: {
    test: {presence: true}
  },
  test: "",

  actions: {
      showValidationFields: function() {
          this.set('showValidationFields', true);
      }
  }
});
