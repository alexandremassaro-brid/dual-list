/**
 * @classdesc A searchbox Bootstratp 3.3.7 compatible component.
 * @class
 * @public
 * @todo Implementar método render.
 * @todo Implementar inicialização do SearchBox.
 */
export class SearchBox {
    // Inicializar elementos
    /**
     * The Html component used to render the SearchBox to the screen.
     * @private
     * @constant
     * @type {HTMLDivElement}
     */
    #htmlElement;

    /**
     * The Html component used to render the textbox to the screen.
     * @private
     * @constant
     * @type {HTMLInputElement}
     */
    #textboxHtmlElement;

    /**
     * Return the value typed in the textbox.
     * @property {string} - The list of dropdown options.
     * @public
     */
    get text() {
        return this.#textboxHtmlElement.value;
    }

    /**
     * SearchBox class constructor.
     * Returns an instance of a SearchBox.
     * @param {string} id - The unique identificator of the SearchBox.
     * @param {string} placeholder - The placeholder text to be displayed at the text box.
     */
    constructor(id = 'SearchBox', placeholder = 'Find ...') {
        // Inicializar elemento
        let requiredClasses = [
            'col-xs-12',
        ];
        const searchBox = document.createElement('div');
        for (const requiredClass of requiredClasses) {
            searchBox.classList.add(requiredClass);
        }

        // Criar form group
        requiredClasses = [
            'form-group',
            'form-group-sm',
        ];
        const formGroup = document.createElement('div');
        for (const requiredClass of requiredClasses) {
            formGroup.classList.add(requiredClass);
        }

        // Criar input group
        requiredClasses = [
            'input-group',
            'input-group-sm',
        ];
        const inputGroup = document.createElement('div');
        for (const requiredClass of requiredClasses) {
            inputGroup.classList.add(requiredClass);
        }
        
        // Criar icone
        requiredClasses = [
            'input-group-addon',
        ];
        const icon = document.createElement('span');
        for (const requiredClass of requiredClasses) {
            icon.classList.add(requiredClass);
        }
        requiredClasses = [
            'glyphicon',
            'glyphicon-search',
        ];
        const iconSymbol = document.createElement('i');
        for (const requiredClass of requiredClasses) {
            iconSymbol.classList.add(requiredClass);
        }

        // Criar caixa de texto
        requiredClasses = [
            'form-control',
            'input-sm',
        ];
        const textBox = document.createElement('input');
        textBox.type = 'text';
        for (const requiredClass of requiredClasses) {
            textBox.classList.add(requiredClass);
        }
        textBox.id = id;
        textBox.placeholder = placeholder;

        // Adicionar elementos ao SearchBox.
        icon.appendChild(iconSymbol);
        inputGroup.appendChild(icon);
        inputGroup.appendChild(textBox);
        formGroup.appendChild(inputGroup);
        searchBox.appendChild(formGroup);

        this.#textboxHtmlElement = textBox;
        this.#htmlElement = searchBox;
    }

    /**
     * Returns a HTMLElement to be added to the webpage.
     * @returns - The SearchBox HTMLElement.
     */
    render() {
        return this.#htmlElement;
    }
}
