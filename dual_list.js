import { List } from './list.js';

export class DualList {
    #htmlElement;
    #sourceListHtmlElement;
    #actionButtons;
    #destinationListHtmlElement;

    constructor() {
        // Implementar inicializações dos elementos.
        // Dual list Row div
        let requiredClasses = [
            'row',
        ];
        const dualList = document.createElement('div');
        for (const requiredClass of requiredClasses) {
            dualList.classList.add(requiredClass);
        }

        // Source list
        this.#initializeSourceList();

        // Action Button
        // Destination List
        this.#initializeDestinationList();

        // Append elements to the DualList
        dualList.appendChild(this.#sourceListHtmlElement);
        dualList.appendChild(this.#destinationListHtmlElement);
        this.#htmlElement = dualList;
    }

    #initializeSourceList() {
        const list = new List('sourceList', 'Source List');

        list.addItem('item1', 'Item 1');

        this.#sourceListHtmlElement = list.render();
    }

    #initializeActionButtons() {
        // Action buttons
        let requiredClasses = [
            'col-xs-2',
            'text-center',
        ];
        const actionButtons = document.createElement('div');
        for (const requiredClass of requiredClasses) {
            actionButtons.classList.add(requiredClass);
        }

        requiredClasses = [
            'btn-group-vertical',
            'btn-group-sm',
        ];
        const buttonGroup = document.createElement('div');
        for (const requiredClass of requiredClasses) {
            buttonGroup.classList.add(requiredClass);
        }
        actionButtons.appendChild(buttonGroup);

        this.#actionButtons = actionButtons;
    }

    #initializeDestinationList() {
        const list = new List('destinationList', 'Destination List');

        list.addItem('item2', 'Item 2');

        this.#destinationListHtmlElement = list.render();
    }

    render() {
        // Implementar método render.
        return this.#htmlElement;
    }
    
}
