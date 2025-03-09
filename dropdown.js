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
     * @todo Criar componente select.
     * @todo Criar e adicionar as opções do select.
     * @todo Adicionar todos os elementos ao elemento principal.
     */
    #initializeElement(id = this.#id, isRequired = true) {
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

        // select options
        // Append elements to dropdown div
    }
}

