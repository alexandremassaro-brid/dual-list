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
     * The id to be atributed to the select html element.
     * @private
     * @type {string}
     */
    #id;

    /**
     * Returns the select id - Can be set.
     * @property {string} - The HTML element id.
     * @public
     */
    get id() {
        return this.#id;
    }

    set id(value = 'selectId') {
        this.#id = value;
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
     */
    constructor() {
        // Inicializar elemento
        this.#initializeElement();
    }

    /**
     * Initializes the dropdown HTML Element.
     * @method
     * @private
     * @param {string} [id=this.#id] - The id to be atributed to the select element.
     * @param {boolean} [isRequired=true] - Define if the select is required to be ... well selected.
     * @param {string} [description='Select an option from the list'] - A description to be displayed with DropDown.
     * @param {Iterable<DropdownOption>} [optionsList=[]] - A DropdownOption list to be inserted to the select element.
     * @todo Criar componente select.
     * @todo Criar e adicionar as opções do select.
     * @todo Adicionar todos os elementos ao elemento principal.
     */
    #initializeElement(id = this.#id, isRequired = true, description = 'Select an option from the list', optionsList = []) {
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
        if (description.trim().length > 0) {
            const selectDescription = document.createElement('option');
            selectDescription.value = '';
            selectDescription.innerText = description;
            select.appendChild(selectDescription);
        }

        // select options
        if (optionsList && typeof optionsList[Symbol.iterator] === 'function'){
            for (const option in optionsList) {
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

        this.#htmlElement = dropdown;
    }
}

