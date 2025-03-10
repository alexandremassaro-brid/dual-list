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
        // Action Button
        // Destination List
        // Append elements to the DualList
        this.#htmlElement = dualList;
    }

    #initializeSourceList() {
    }

    #initializeActionButtons() {
        // Action buttons
    #initializeDestinationList() {
    }

    render() {
        // Implementar método render.
    }
    
}
