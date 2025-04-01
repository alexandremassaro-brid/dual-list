import { List } from './list.js';

/**
 * @classdesc A dual list component that allows transferring items between source and destination lists.
 * @class
 * @public
 */
export class DualList {
    /**
     * The HTML element used to render the dual list container.
     * @private
     * @type {HTMLDivElement}
     */
    #htmlElement;

    /**
     * The HTML element containing the source list.
     * @private
     * @type {HTMLDivElement}
     */
    #sourceListHtmlElement;

    /**
     * The HTML element containing the action buttons.
     * @private
     * @type {HTMLDivElement}
     */
    #actionButtons;

    /**
     * The HTML element containing the destination list.
     * @private
     * @type {HTMLDivElement}
     */
    #destinationListHtmlElement;

    /**
     * Creates a new DualList instance.
     * @constructor
     * @param {string} [id='dualList'] - The unique identifier for the dual list
     * @param {Array} [sourceItems=[]] - Initial items for the source list
     * @param {Array} [targetItems=[]] - Initial items for the target list
     * @param {number} [itemsPerPage=5] - Number of items per page
     * @param {Function} [onTransfer=null] - Callback when items are transferred
     * @param {string} [sourceTitle='Source List'] - Title for the source list
     * @param {string} [targetTitle='Destination List'] - Title for the target list
     * @param {Object} [paginationOptions={}] - Pagination customization options
     */
    constructor(id = 'dualList', sourceItems = [], targetItems = [], itemsPerPage = 5, onTransfer = null, sourceTitle = 'Source List', targetTitle = 'Destination List', paginationOptions = {}) {
        // Dual list Row div
        const dualList = document.createElement('div');
        dualList.classList.add('row');

        // Source list
        this.#initializeSourceList(id + 'Source', sourceItems, itemsPerPage, sourceTitle, paginationOptions);

        // Action Button
        this.#initializeActionButtons(id + 'Actions', onTransfer);

        // Destination List
        this.#initializeDestinationList(id + 'Destination', targetItems, itemsPerPage, targetTitle, paginationOptions);

        // Append elements to the DualList
        dualList.appendChild(this.#sourceListHtmlElement);
        dualList.appendChild(this.#actionButtons);
        dualList.appendChild(this.#destinationListHtmlElement);

        this.#htmlElement = dualList;
    }

    /**
     * Initializes the source list component.
     * @private
     * @param {string} id - The unique identifier for the source list
     * @param {Array} items - Initial items for the source list
     * @param {number} itemsPerPage - Number of items per page
     * @param {string} title - Title for the source list
     * @param {Object} paginationOptions - Pagination customization options
     */
    #initializeSourceList(id, items, itemsPerPage, title, paginationOptions) {
        const list = new List(id, title, itemsPerPage, paginationOptions);

        items.forEach(item => {
            list.addItem(item.id, item.caption);
        });

        this.#sourceListHtmlElement = list.render();
    }

    /**
     * Initializes the action buttons component.
     * @private
     * @param {string} id - The unique identifier for the action buttons
     * @param {Function} onTransfer - Callback when items are transferred
     */
    #initializeActionButtons(id, onTransfer) {
        const actionButtons = document.createElement('div');
        actionButtons.classList.add('col-xs-2', 'text-center');

        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('btn-group-vertical', 'btn-group-sm');

        const buttons = [
            {
                classes: ['btn', 'btn-default'],
                icon: ['glyphicon', 'glyphicon-fast-forward'],
                action: () => this.#handleTransferAllToDestination(onTransfer)
            },
            {
                classes: ['btn', 'btn-default'],
                icon: ['glyphicon', 'glyphicon-forward'],
                action: () => this.#handleTransferSelectedToDestination(onTransfer)
            },
            {
                classes: ['btn', 'btn-default'],
                icon: ['glyphicon', 'glyphicon-backward'],
                action: () => this.#handleTransferSelectedToSource(onTransfer)
            },
            {
                classes: ['btn', 'btn-default'],
                icon: ['glyphicon', 'glyphicon-fast-backward'],
                action: () => this.#handleTransferAllToSource(onTransfer)
            }
        ];

        buttons.forEach(button => {
            const btn = document.createElement('button');
            button.classes.forEach(cls => btn.classList.add(cls));
            btn.onclick = (event) => {
                event.preventDefault();
                event.stopPropagation();
                button.action();
            };

            const icon = document.createElement('span');
            button.icon.forEach(cls => icon.classList.add(cls));
            icon.ariaHidden = 'true';

            btn.appendChild(icon);
            buttonGroup.appendChild(btn);
        });

        actionButtons.appendChild(buttonGroup);
        this.#actionButtons = actionButtons;
    }

    /**
     * Initializes the destination list component.
     * @private
     * @param {string} id - The unique identifier for the destination list
     * @param {Array} items - Initial items for the destination list
     * @param {number} itemsPerPage - Number of items per page
     * @param {string} title - Title for the destination list
     * @param {Object} paginationOptions - Pagination customization options
     */
    #initializeDestinationList(id, items, itemsPerPage, title, paginationOptions) {
        const list = new List(id, title, itemsPerPage, paginationOptions);

        items.forEach(item => {
            list.addItem(item.id, item.caption);
        });

        this.#destinationListHtmlElement = list.render();
    }

    /**
     * Handles transferring all items to destination.
     * @private
     * @param {Function} onTransfer - Callback when items are transferred
     */
    #handleTransferAllToDestination(onTransfer) {
        const sourceList = this.#sourceListHtmlElement.querySelector('.list-group');
        const destinationList = this.#destinationListHtmlElement.querySelector('.list-group');
        const items = Array.from(sourceList.children);

        items.forEach(item => {
            item.classList.remove('active');
            destinationList.appendChild(item);
        });

        // Update pagination for both lists
        this.#sourceListHtmlElement.querySelector('.panel').__list.update();
        this.#destinationListHtmlElement.querySelector('.panel').__list.update();

        if (onTransfer) {
            onTransfer('allToDestination');
        }
    }

    /**
     * Handles transferring selected items to destination.
     * @private
     * @param {Function} onTransfer - Callback when items are transferred
     */
    #handleTransferSelectedToDestination(onTransfer) {
        const sourceList = this.#sourceListHtmlElement.querySelector('.list-group');
        const destinationList = this.#destinationListHtmlElement.querySelector('.list-group');
        const selectedItems = Array.from(sourceList.querySelectorAll('.active'));

        selectedItems.forEach(item => {
            item.classList.remove('active');
            destinationList.appendChild(item);
        });

        // Update pagination for both lists
        this.#sourceListHtmlElement.querySelector('.panel').__list.update();
        this.#destinationListHtmlElement.querySelector('.panel').__list.update();

        if (onTransfer) {
            onTransfer('selectedToDestination');
        }
    }

    /**
     * Handles transferring selected items to source.
     * @private
     * @param {Function} onTransfer - Callback when items are transferred
     */
    #handleTransferSelectedToSource(onTransfer) {
        const sourceList = this.#sourceListHtmlElement.querySelector('.list-group');
        const destinationList = this.#destinationListHtmlElement.querySelector('.list-group');
        const selectedItems = Array.from(destinationList.querySelectorAll('.active'));

        selectedItems.forEach(item => {
            item.classList.remove('active');
            sourceList.appendChild(item);
        });

        // Update pagination for both lists
        this.#sourceListHtmlElement.querySelector('.panel').__list.update();
        this.#destinationListHtmlElement.querySelector('.panel').__list.update();

        if (onTransfer) {
            onTransfer('selectedToSource');
        }
    }

    /**
     * Handles transferring all items to source.
     * @private
     * @param {Function} onTransfer - Callback when items are transferred
     */
    #handleTransferAllToSource(onTransfer) {
        const sourceList = this.#sourceListHtmlElement.querySelector('.list-group');
        const destinationList = this.#destinationListHtmlElement.querySelector('.list-group');
        const items = Array.from(destinationList.children);

        items.forEach(item => {
            item.classList.remove('active');
            sourceList.appendChild(item);
        });

        // Update pagination for both lists
        this.#sourceListHtmlElement.querySelector('.panel').__list.update();
        this.#destinationListHtmlElement.querySelector('.panel').__list.update();

        if (onTransfer) {
            onTransfer('allToSource');
        }
    }

    /**
     * Filters items in both lists based on the given text.
     * @public
     * @param {string} text - The text to filter items by
     */
    filter(text) {
        const sourceList = this.#sourceListHtmlElement.querySelector('.panel').__list;
        const destinationList = this.#destinationListHtmlElement.querySelector('.panel').__list;

        sourceList.filter(text);
        destinationList.filter(text);
    }

    /**
     * Renders the dual list component.
     * @public
     * @returns {HTMLElement} The dual list HTML element
     */
    render() {
        return this.#htmlElement;
    }

    /**
     * Moves all items from destination list back to source list.
     * @public
     */
    moveAllToSource() {
        const sourceList = this.#sourceListHtmlElement.querySelector('.list-group');
        const destinationList = this.#destinationListHtmlElement.querySelector('.list-group');
        const items = Array.from(destinationList.children);

        items.forEach(item => {
            item.classList.remove('active');
            sourceList.appendChild(item);
        });

        // Update pagination for both lists
        this.#sourceListHtmlElement.querySelector('.panel').__list.update();
        this.#destinationListHtmlElement.querySelector('.panel').__list.update();
    }

    /**
     * Gets all items from the destination list.
     * @public
     * @returns {Array} Array of items with id and caption
     */
    getDestinationItems() {
        const destinationList = this.#destinationListHtmlElement.querySelector('.list-group');
        return Array.from(destinationList.children).map(item => ({
            id: item.dataset.id,
            caption: item.textContent
        }));
    }

    /**
     * Updates both lists' pagination and visibility.
     * @public
     */
    update() {
        this.#sourceListHtmlElement.querySelector('.panel').__list.update();
        this.#destinationListHtmlElement.querySelector('.panel').__list.update();
    }
}
