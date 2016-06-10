import Ember from 'ember';
import layout from '../templates/components/input-validator';

const {
    get,
    set,
    isEmpty,
    Binding,
    Component
} = Ember;

export default Component.extend({
    layout: layout,
    classNames: [ 'form-group', 'input-validator' ],
    classNameBindings: ['hasError:has-error', 'label:hasLabel'],
    hasError: false,
    error: null,
    label: true,
    focusOut: function() {
        return set(this, 'hasError', !isEmpty(get(this, 'error')));
    },
    targetObject: Ember.computed('parentView', function() {
        return get(this, 'parentView');
    }),
    fieldLabel: Ember.computed('nameString', 'text', function() {
        let text = get(this, 'text');
        if (text) {
            return text;
        } else {
            return get(this, 'nameString');
        }
    }),
    nameString: Ember.computed('target', function() {
        let target = get(this, 'target');
        return target.string ? target.string : target;
    }),
    displayAllErrors: Ember.observer('targetObject.showValidationFields', function() {
        let showValidationFields = get(this, 'targetObject.showValidationFields'),
            error = get(this, 'error');
        if (showValidationFields === true) {
            set(this, 'hasError', !isEmpty(error));
        }
    }),
    didRender: function() {
        let id = Ember.$('input').attr('id');
        Ember.$('label').attr('for', id);
    },
    didInsertElement: function() {
        let name = get(this, 'nameString');
        Binding.from("targetObject.errors." + name).to("error").connect(this);
    }
});
