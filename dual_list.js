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
        // Append elements to the DualList
        dualList.appendChild(this.#sourceListHtmlElement);
        this.#htmlElement = dualList;
    }

    #initializeSourceList() {
        const list = new List('sourceList', 'Source List');

        list.addItem('item1', 'Item 1');

        this.#sourceListHtmlElement = list.render();
    }

    #initializeActionButtons() {
        // Action buttons
    #initializeDestinationList() {
    }

    render() {
        // Implementar método render.
    }
    
}
