/**
 * @class
 * @description Represents an option in the dropdown list.
 */
class DropdownOption {
    #id;
    #caption;

    /**
     * @param {string} id - The option's unique identifier.
     * @param {string} caption - The text to display.
     */
    constructor(id, caption) {
        this.#id = id;
        this.#caption = caption;
    }

    get id() { return this.#id; }
    get caption() { return this.#caption; }
}

/**
 * @classdesc A dropdown Bootstratp 3.3.7 compatible component.
 * @class
 * @public
 * @todo Implementar método render.
 */
export class Dropdown {
    /**
     * The Html component used to render the dropdown to the screen.
     * @private
     * @constant
     * @type {HTMLDivElement}
     */
    #htmlElement;

    /**
     * The Html component used to render the select to the screen.
     * @private
     * @constant
     * @type {HTMLSelectElement}
     */
    #selectHtmlElement;

    /**
     * The description of the dropdown.
     * If the string has length greater then 0, 
     * then the first option is the text provided but disabled,
     * so the user can't select it.
     * @private
     * @type {string}
     */
    #description;

    /**
     * The list of options of the dropdown.
     * @private
     * @type {DropdownOption[]}
     */
    #optionsList;

    /**
     * Returns the select id - Can be set.
     * @property {string} - The HTML element id.
     * @public
     */
    get id() {
        return this.#selectHtmlElement.id;
    }

    set id(value = 'selectId') {
        this.#selectHtmlElement = value;
    }

    /**
     * Defines if the dropdown is required.
     * If true the user has to pick one option.
     * @property {boolean} - Whether the dropdown is required.
     * @public
     */
    get isRequired() {
        return this.#selectHtmlElement.required;
    }

    set isRequired(value = true) {
        this.#selectHtmlElement.required = value;
    }

    /**
     * The description of the dropdown.
     * If the string has length greater then 0, 
     * then the first option is the text provided but disabled,
     * so the user can't select it.
     * @property {string} - The description of the dropdown.
     * @public
     */
    get description() {
        return this.#description;
    }

    set description(value = '') {
        this.#description = value;
    }

    /**
     * The list of options of the dropdown.
     * Must be a list of DropdownOption objects.
     * @property {DropdownOption[]} - The list of dropdown options.
     * @public
     */
    get optionsList() {
        return this.#optionsList;
    }

    set optionsList(value = []) {
        this.#optionsList = value;
    }

    /**
     * Returns a DropdownOption object. Consists of an id and caption.
     * Ex:
     *     const dropdownOption = dropdown.DropdownOption('optionId', 'optionCaption');
     *     console.log(dropdownOption.id); // Should print optionId
     *     console.log(dropdownOption.caption); // Should print optionCaption
     * @static
     * @param {string} id - A unique identifier for the dropdown option.
     * @param {string} caption - A caption to be displayed with the dropdown option.
     */
    static dropdownOptionObject(id, caption) {
        return new DropdownOption(id, caption);
    }

    /**
     * Class constructor - Returns a Dropdown instance.
     * @param {string} [id='dropDownElement'] - The unique identifier of the dropdown.
     * @param {boolean} [isRequired=true] - Defines if it is required to select an option.
     * @param {string} [description=''] - If provided, the first option will be disabled and show the text provided.
     * @param {Iterable<DropdownOption>} [optionsList=[]] - Initializes the dropdown with the items provided in the list.
     */
    constructor(id = 'dropDownElement', isRequired = true, description = '', optionsList = []) {
        // Inicializar elemento
        this.#description = description;
        this.#optionsList = optionsList;
        
        // Create dropdown div
        let requiredClasses = [
            'col-xs-12',
        ];
        const dropdown = document.createElement('div');
        for (const requiredClass of requiredClasses) {
            dropdown.classList.add(requiredClass);
        }
        
        // form-group
        requiredClasses = [
            'form-group',
            'form-group-sm',
        ];
        const formGroup = document.createElement('div');
        for (const requiredClass of requiredClasses) {
            formGroup.classList.add(requiredClass);
        }

        // select form-control
        requiredClasses = [
            'form-control',
            'input-sm',
        ];
        const select = document.createElement('select');
        for (const requiredClass of requiredClasses) {
            select.classList.add(requiredClass);
        }
        select.id = id;
        select.required = isRequired;

        // select description
        if (this.#description && this.#description.trim().length > 0) {
            const selectDescription = document.createElement('option');
            selectDescription.value = '';
            selectDescription.selected = true;
            selectDescription.disabled = true;
            selectDescription.innerText = this.#description;
            select.appendChild(selectDescription);
        }

        // select options
        if (this.#optionsList && typeof this.optionsList[Symbol.iterator] === 'function'){
            for (const option in this.#optionsList) {
                if (!(option instanceof DropdownOption)) {
                    throw new TypeError('Only DropdownOption instances can be added!');
                }
                const currentOption = document.createElement('option');
                currentOption.value = option.id;
                currentOption.innerText = option.caption;
                
                select.appendChild(currentOption);
            }
        }

        // Append elements to dropdown div
        formGroup.appendChild(select);
        dropdown.appendChild(formGroup);     

        this.#selectHtmlElement = select;
        this.#htmlElement = dropdown;
    }

    /**
     * Adds a DropdownOption to the Dropdown
     * @method
     * @param {DropdownOption} dropdownOption 
     * @public
     */
    addOption(dropdownOption) {
        if (!(dropdownOption && dropdownOption instanceof DropdownOption)) {
            throw new TypeError('Only DropdownOption instances can be added!');
        }
        
        this.#optionsList.push(dropdownOption);
        
        const option = document.createElement('option');
        option.value = dropdownOption.id;
        option.innerText = dropdownOption.caption;
        
        this.#selectHtmlElement.appendChild(option);
        
    }

    /**
     * Returns an HTMLElement object with the dropdown to be added to the page.
     * @method
     * @public
     * @returns {HTMLDivElement} - A HTMLElement object with the dropdown to be added to the page.
     */
    render() {
        return this.#htmlElement;
    }
}