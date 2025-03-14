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
        this.#initializeActionButtons();

        // Destination List
        this.#initializeDestinationList();

        // Append elements to the DualList
        dualList.appendChild(this.#sourceListHtmlElement);
        dualList.appendChild(this.#actionButtons);
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

        requiredClasses = [
            'btn',
            'btn-default',
        ];
        const allToDestinationButton = document.createElement('button');
        for (const requiredClass of requiredClasses) {
            allToDestinationButton.classList.add(requiredClass);
        }
        allToDestinationButton.onclick = () => {
            console.log('Move all to destination');
        };

        requiredClasses = [
            'glyphicon',
            'glyphicon-fast-forward',
        ];
        const allToDestinationIcon = document.createElement('span');
        for (const requiredClass of requiredClasses) {
            allToDestinationIcon.classList.add(requiredClass);
        }
        allToDestinationIcon.ariaHidden = 'true';

        requiredClasses = [
            'btn',
            'btn-default',
        ];
        const selectedToDestinationButton = document.createElement('button');
        for (const requiredClass of requiredClasses) {
            selectedToDestinationButton.classList.add(requiredClass);
        }
        selectedToDestinationButton.onclick = () => {
            console.log('Move selected to destination');
        };

        requiredClasses = [
            'glyphicon',
            'glyphicon-forward',
        ];
        const selectedToDestinationIcon = document.createElement('span');
        for (const requiredClass of requiredClasses) {
            selectedToDestinationIcon.classList.add(requiredClass);
        }
        selectedToDestinationIcon.ariaHidden = 'true';

        requiredClasses = [
            'btn',
            'btn-default',
        ];
        const selectedToOriginButton = document.createElement('button');
        for (const requiredClass of requiredClasses) {
            selectedToOriginButton.classList.add(requiredClass);
        }
        selectedToOriginButton.onclick = () => {
            console.log('Move selected to origin');
        };

        requiredClasses = [
            'glyphicon',
            'glyphicon-backward',
        ];
        const selectedToOriginIcon = document.createElement('span');
        for (const requiredClass of requiredClasses) {
            selectedToOriginIcon.classList.add(requiredClass);
        }
        selectedToOriginIcon.ariaHidden = 'true';

        requiredClasses = [
            'btn',
            'btn-default',
        ];
        const allToOriginButton = document.createElement('button');
        for (const requiredClass of requiredClasses) {
            allToOriginButton.classList.add(requiredClass);
        }
        allToOriginButton.onclick = () => {
            console.log('Move all to origin');
        };

        requiredClasses = [
            'glyphicon',
            'glyphicon-fast-backward',
        ];
        const allToOriginIcon = document.createElement('span');
        for (const requiredClass of requiredClasses) {
            allToOriginIcon.classList.add(requiredClass);
        }
        allToOriginIcon.ariaHidden = 'true';

        allToDestinationButton.appendChild(allToDestinationIcon);
        selectedToDestinationButton.appendChild(selectedToDestinationIcon);
        selectedToOriginButton.appendChild(selectedToOriginIcon);
        allToOriginButton.appendChild(allToOriginIcon);
        buttonGroup.appendChild(allToDestinationButton);
        buttonGroup.appendChild(selectedToDestinationButton);
        buttonGroup.appendChild(selectedToOriginButton);
        buttonGroup.appendChild(allToOriginButton);
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
