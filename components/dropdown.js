/**
 * @classdesc Represents an option in the dropdown list.
 * @class
 * @private
 */
class DropdownOption {
    #id;
    #caption;

    /**
     * Creates a new DropdownOption instance.
     * @constructor
     * @param {string} id - The option's unique identifier.
     * @param {string} caption - The text to display.
     */
    constructor(id, caption) {
        this.#id = id;
        this.#caption = caption;
    }

    /**
     * Gets the option's unique identifier.
     * @returns {string} The option's ID.
     */
    get id() { return this.#id; }

    /**
     * Gets the option's display text.
     * @returns {string} The option's caption.
     */
    get caption() { return this.#caption; }
}

/**
 * @classdesc A Bootstrap 3.3.7 compatible dropdown component that supports required fields,
 * descriptions, and change event handling.
 * @class
 * @public
 */
export class Dropdown {
    /**
     * The HTML container element for the dropdown.
     * @private
     * @type {HTMLDivElement}
     */
    #htmlElement;

    /**
     * The select element used for the dropdown.
     * @private
     * @type {HTMLSelectElement}
     */
    #selectHtmlElement;

    /**
     * The description text shown as the first disabled option.
     * @private
     * @type {string}
     */
    #description;

    /**
     * The list of available options.
     * @private
     * @type {DropdownOption[]}
     */
    #optionsList;

    /**
     * Callback function for change events.
     * @private
     * @type {Function|null}
     */
    #onChangeCallback;

    /**
     * Gets the select element's ID.
     * @returns {string} The HTML element ID.
     * @public
     */
    get id() {
        return this.#selectHtmlElement.id;
    }

    /**
     * Sets the select element's ID.
     * @param {string} value - The new ID value.
     * @public
     */
    set id(value = 'selectId') {
        this.#selectHtmlElement.id = value;
    }

    /**
     * Gets whether the dropdown is required.
     * @returns {boolean} True if the dropdown is required.
     * @public
     */
    get isRequired() {
        return this.#selectHtmlElement.required;
    }

    /**
     * Sets whether the dropdown is required.
     * @param {boolean} value - Whether the dropdown is required.
     * @public
     */
    set isRequired(value = true) {
        this.#selectHtmlElement.required = value;
    }

    /**
     * Gets the dropdown description.
     * @returns {string} The description text.
     * @public
     */
    get description() {
        return this.#description;
    }

    /**
     * Sets the dropdown description.
     * @param {string} value - The new description text.
     * @public
     */
    set description(value = '') {
        this.#description = value;
        this.#updateDescription();
    }

    /**
     * Gets the list of options.
     * @returns {DropdownOption[]} The list of options.
     * @public
     */
    get optionsList() {
        return this.#optionsList;
    }

    /**
     * Sets the list of options.
     * @param {DropdownOption[]} value - The new list of options.
     * @throws {TypeError} If any option is not a DropdownOption instance.
     * @public
     */
    set optionsList(value = []) {
        this.#validateOptionsList(value);
        this.#optionsList = value;
        this.#updateOptions();
    }

    /**
     * Creates a new DropdownOption instance.
     * @static
     * @param {string} id - The option's unique identifier.
     * @param {string} caption - The option's display text.
     * @returns {DropdownOption} A new DropdownOption instance.
     * @public
     */
    static dropdownOptionObject(id, caption) {
        return new DropdownOption(id, caption);
    }

    /**
     * Creates a new Dropdown instance.
     * @constructor
     * @param {string} [id='dropDownElement'] - The dropdown's unique identifier.
     * @param {boolean} [isRequired=true] - Whether selection is required.
     * @param {string} [description=''] - Optional description text.
     * @param {DropdownOption[]} [optionsList=[]] - Initial list of options.
     * @param {Function} [onChange=null] - Callback for change events.
     */
    constructor(id = 'dropDownElement', isRequired = true, description = '', optionsList = [], onChange = null) {
        // Initialize properties first
        this.#description = description;
        this.#optionsList = optionsList;
        this.#onChangeCallback = onChange;

        // Create elements
        const { dropdown, select } = this.#createElements(id, isRequired);
        this.#htmlElement = dropdown;
        this.#selectHtmlElement = select;

        // Setup content and events
        if (this.#description?.trim()) {
            this.#updateDescription();
        }
        if (this.#optionsList?.length) {
            this.#updateOptions();
        }
        this.#setupEventListeners();
    }

    /**
     * Creates the HTML elements for the dropdown.
     * @private
     * @param {string} id - The dropdown's ID.
     * @param {boolean} isRequired - Whether selection is required.
     * @returns {{dropdown: HTMLDivElement, select: HTMLSelectElement}} The created elements.
     */
    #createElements(id, isRequired) {
        // Create dropdown div
        const dropdown = document.createElement('div');
        dropdown.classList.add('col-xs-12');

        // Create form group
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group', 'form-group-sm');

        // Create select element
        const select = document.createElement('select');
        select.classList.add('form-control', 'input-sm');
        select.id = id;
        select.required = isRequired;

        // Assemble elements
        formGroup.appendChild(select);
        dropdown.appendChild(formGroup);

        return { dropdown, select };
    }

    /**
     * Sets up event listeners.
     * @private
     */
    #setupEventListeners() {
        this.#selectHtmlElement.addEventListener('change', (event) => {
            if (this.#onChangeCallback) {
                this.#onChangeCallback(event.target.value);
            }
        });
    }

    /**
     * Updates the description option.
     * @private
     */
    #updateDescription() {
        const firstOption = this.#selectHtmlElement.firstElementChild;
        if (firstOption && firstOption.disabled) {
            firstOption.innerText = this.#description;
        } else if (this.#description?.trim()) {
            const descriptionOption = document.createElement('option');
            descriptionOption.value = '';
            descriptionOption.selected = true;
            descriptionOption.disabled = true;
            descriptionOption.innerText = this.#description;
            this.#selectHtmlElement.insertBefore(descriptionOption, this.#selectHtmlElement.firstChild);
        }
    }

    /**
     * Updates the options list.
     * @private
     */
    #updateOptions() {
        // Remove existing options except description
        while (this.#selectHtmlElement.children.length > 1) {
            this.#selectHtmlElement.removeChild(this.#selectHtmlElement.lastChild);
        }

        // Add new options
        for (const option of this.#optionsList) {
            const optionElement = document.createElement('option');
            optionElement.value = option.id;
            optionElement.innerText = option.caption;
            this.#selectHtmlElement.appendChild(optionElement);
        }
    }

    /**
     * Validates the options list.
     * @private
     * @param {DropdownOption[]} options - The options to validate.
     * @throws {TypeError} If any option is invalid.
     */
    #validateOptionsList(options) {
        if (!Array.isArray(options)) {
            throw new TypeError('Options must be an array');
        }
        for (const option of options) {
            if (!(option instanceof DropdownOption)) {
                throw new TypeError('Only DropdownOption instances can be added!');
            }
        }
    }

    /**
     * Adds a new option to the dropdown.
     * @param {DropdownOption} dropdownOption - The option to add.
     * @throws {TypeError} If the option is invalid.
     * @public
     */
    addOption(dropdownOption) {
        if (!(dropdownOption instanceof DropdownOption)) {
            throw new TypeError('Only DropdownOption instances can be added!');
        }

        this.#optionsList.push(dropdownOption);

        const option = document.createElement('option');
        option.value = dropdownOption.id;
        option.innerText = dropdownOption.caption;
        this.#selectHtmlElement.appendChild(option);
    }

    /**
     * Gets the currently selected value.
     * @returns {string} The selected value.
     * @public
     */
    getValue() {
        return this.#selectHtmlElement.value;
    }

    /**
     * Sets the selected value.
     * @param {string} value - The value to select.
     * @public
     */
    setValue(value) {
        this.#selectHtmlElement.value = value;
    }

    /**
     * Validates the current selection.
     * @returns {boolean} True if the selection is valid.
     * @public
     */
    validate() {
        if (this.isRequired) {
            return this.getValue() !== '';
        }
        return true;
    }

    /**
     * Renders the dropdown component.
     * @returns {HTMLDivElement} The rendered dropdown element.
     * @public
     */
    render() {
        return this.#htmlElement;
    }
}