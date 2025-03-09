/**
 * @classdesc A dropdown Bootstratp 3.3.7 compatible component.
 * @class
 * @public
 * @todo Implementar método render.
 */
export class Dropdown {
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
     * @todo Implementar o método initializeElement.
     * @todo Criar div para o dropdown.
     * @todo Criar grupo para os componentes do formulário.
     * @todo Criar componente select.
     * @todo Criar e adicionar as opções do select.
     * @todo Adicionar todos os elementos ao elemento principal.
     */
    #initializeElement() {
        // Create dropdown div
        let requiredClasses = [
            'col-xs-12',
        ];
        const dropdown = document.createElement('div');
        for (const requiredClass of requiredClasses) {
            dropdown.classList.add(requiredClass);
        }
        
        // form-group
        // select form-control
        // select options
        // Append elements to dropdown div
    }
}

