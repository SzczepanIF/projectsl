/* !
 * ConditionalField
 *
 * @author
 * @copyright
 */
import Expandable from '../expandable/expandable';
import extend from 'lodash.assignin';
import $ from 'jquery';

class ConditionalField extends Expandable {

	constructor($element, data, options) {
		let _defaultOptions = {
			domSelectors: {},
			dependencies: [

				// {
					// component: '', // condition component selector
					// condition: '', // eq, neq, empty, nempty
					// value: ''
					// events: [] // change, click, keydown ...
				// }
			],
			type: 'toggle',
			resetOnLock: true,
			scrollTargetIntoView: true,
			defaultEvents: ['change', 'keydown']
		};

		super($element, data, extend(_defaultOptions, options));

		// Initially check conditions
		this._onDependenciesChanged();
	}

	/**
	 * Initialisation of variables, which point to DOM elements
	 */
	_initUi() {
		this.ui.$area = this.ui.$element;

		this.id = this.ui.$element.attr('id');

		// Use uuid if no id is present
		if (!this.id) {
			this.id = this.uuid;
			this.ui.$element.attr('id', this.id);
		}

		if (this.options.type === 'toggle') {
			// Add attributes to improve accessibility
			this.ui.$element.attr({
				role: 'region',
				'aria-live': 'polite',
				tabindex: -1
			});
		}
	}

	/**
	 * Event listeners initialisation
	 */
	_initEventListeners() {
		this.options.dependencies.forEach((dependency) => {
			let events = dependency.events || this.options.defaultEvents,
				$component,
				$targets;

			if (!Array.isArray(events)) {
				events = [events];
			}

			events = events.map((event) => {
				return event + '.' + this.uuid;
			});

			$component = $(dependency.component);

			// Create collection of all conditional elements controlled by this component
			$targets = ($component.data(this.name + '-targets') || $()).add(this.ui.$element);

			$component
				.data(this.name + '-targets', $targets);

			$component.on(events.join(' '), this._onDependenciesChanged.bind(this));
		});
	}

	toggle(expand, event, disable) {
		if (!expand) {
			this.ui.$element.find('[required]').attr('aria-required', true).removeAttr('required');
		}

		super.toggle(expand, event, disable);
	}

	_onDependenciesChanged() {
		let conditionsPassed = this._checkDependencies();

		if (this.options.type === 'toggle') {
			this.toggle(conditionsPassed);

			if (this.options.scrollTargetIntoView) {
				this.ui.$element[0].scrollIntoView();
			}

			if (conditionsPassed) {
				this.ui.$element.find('[data-init]').trigger('cui.show');
				this.ui.$element.find('[aria-required]').attr('required', true);
			}
		} else {
			this._toggleLock(conditionsPassed);
		}
	}

	_checkDependencies() {
		let conditionsPassed = true;

		this.options.dependencies.forEach((dependency) => {
			if (!this._isDependencyPassed(dependency)) {
				conditionsPassed = false;
			}
		});

		return conditionsPassed;
	}

	_isDependencyPassed(dependency) {
		let $component = this._getComponent(dependency.component),
			condition = dependency.condition,
			currentValue = this._getFieldValue($component),
			conditionValue = dependency.value;

		// Cast comparison values to to string
		currentValue = (currentValue || '') + '';

		if (Array.isArray(conditionValue)) {
			conditionValue = conditionValue.map((value) => (value || '') + '');
		} else {
			conditionValue = (conditionValue || '') + '';
		}

		switch (condition) {
			case 'eq':
				return currentValue === conditionValue;
			case 'neq':
				return currentValue !== conditionValue;
			case 'empty':
				return currentValue === '';
			case 'nempty':
				return currentValue !== '';
			case 'in':
				return conditionValue.indexOf(currentValue) !== -1;
			case 'nin':
				return conditionValue.indexOf(currentValue) === -1;
			default:
				return false;
		}
	}

	_getComponent(selector) {
		let $component = $(selector).first();

		if ($component.is('input[type="radio"]')) {
			$component = $(selector + ':checked');
		}

		return $component;
	}

	_getFieldValue($component) {
		let value = $component.val();

		if ($component.is('input[type="checkbox"]')) {
			value = $component.is(':checked');
		}

		return value;
	}

	_updateTriggers(/* expand */) {
		this.options.dependencies.forEach((dependency) => {
			$(dependency.component).each((i, component) => {
				const $component = $(component),
					options = $component.data(this.name + '-options'),
					$targets = $component.data(this.name + '-targets');

				// Check whether a controlled element is visible
				// We cannot use the `expand` argument here since it would allow a dependent component to overwrite the state of another one (the last one would always win)
				let expandElement = $targets.filter(':visible').length > 0;

				// Checkboxes and radio buttons can only be expanded if checked
				if (expandElement && $component.is(':radio, :checkbox') && !$component.is(':checked')) {
					expandElement = false;
				}

				// Change aria-expanded attribute only on non-input elements (invalid otherwise)
				if (!$component.is(':input') && $component.attr('aria-expanded') !== expandElement) {
					$component.attr('aria-expanded', expandElement);
				}

				if (options && options.textExpanded && options.textCollapsed) {
					this._replaceText($component, expandElement ? options.textExpanded : options.textCollapsed);
				}
			});
		});
	}

	_replaceText($element, text) {
		let $target = $element,
			targetText = text;

		if ($target.is(':input')) {
			$target = $element.parents('label');

			if ($target.length === 0) {
				$target = $('[for="' + $element.attr('id') + '"]');
			}
		}

		$target.contents().each(function() {
			if (this.nodeType !== 1) {
				// Replace first textNode with new text
				this.nodeValue = targetText;

				// Empty every other textNode
				targetText = '';
			}
		});
	}

	_toggleLock(conditionsPassed) {
		this.ui.$element.prop('readonly', !conditionsPassed);

		if (this.options.resetOnLock) {
			this.ui.$element
				.prop('checked', false)
				.prop('selected', false)
				.val('');
		}

		// Trigger change event
		this.ui.$element.change();
	}

	/**
	 * Unbind events, remove data, custom teardown
	 */
	destroy() {
		super.destroy();

		// Custom destroy actions go here
		this.options.dependencies.forEach((dependency) => {
			let events = dependency.events || this.options.defaultEvents;

			$(dependency.component).off(events.join(' '));
		});
	}
}

export default ConditionalField;
