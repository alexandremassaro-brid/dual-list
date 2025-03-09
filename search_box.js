/**
 * @classdesc A searchbox Bootstratp 3.3.7 compatible component.
 * @class
 * @public
 * @todo Implementar método render.
 * @todo Implementar inicialização do SearchBox.
 */
export class SearchBox {
    // Inicializar elementos
    #htmlElement;

    #textboxHtmlElement;

    get text() {
        return this.#textboxHtmlElement.value;
    }

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

    render() {
        return this.#htmlElement;
    }
}
