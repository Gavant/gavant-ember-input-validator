import Ember from 'ember';
import layout from '../templates/components/input-validator';

const {
    get,
    set,
    isEmpty,
    Component,
    computed,
    observer,
    defineProperty,
} = Ember;

export default Component.extend({
    layout: layout,
    classNames: [ 'form-group', 'input-validator' ],
    classNameBindings: ['hasError:has-error', 'label:hasLabel', 'showAllValidations:force-error-display'],
    hasError: false,
    error: null,
    label: true,
    focusOut() {
        return set(this, 'hasError', !isEmpty(get(this, 'error')));
    },
    showAllValidations: computed.alias('targetObject.showValidationFields'),
    targetObject: computed('parentView', function() {
        return get(this, 'parentView');
    }),
    fieldLabel: computed('nameString', 'text', function() {
        let text = get(this, 'text');
        if (text) {
            return text;
        } else {
            return get(this, 'nameString');
        }
    }),
    nameString: computed('target', function() {
        let target = get(this, 'target');
        return target.string ? target.string : target;
    }),
    forceErrorDisplay: observer('showAllValidations', function() {
        let showValidationFields = get(this, 'showAllValidations'),
            error = get(this, 'error');
        if (showValidationFields === true) {
            set(this, 'hasError', !isEmpty(error));
        }
    }),
    didRender() {
        let id = Ember.$(this.get('element')).find('input').attr('id');
        Ember.$(this.get('element')).find('label').attr('for', id);
    },
    didInsertElement () {
        defineProperty(this, 'error', computed.alias(`targetObject.errors.${this.get('nameString')}`));
    }
});
