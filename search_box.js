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
        // Inicializar elemento
        let requiredClasses = [
            'col-xs-12',
        ];
        const searchBox = document.createElement('div');
        for (const requiredClass of requiredClasses) {
            searchBox.classList.add(requiredClass);
        }

        // Criar form group
        // Criar input group
        // Criar icone
        // Criar caixa de texto
        // Adicionar elementos ao SearchBox.
        this.#htmlElement = searchBox;
