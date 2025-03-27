/**
 * @classdesc Represents a single item in a list with selection capability.
 * @class
 * @private
 */
class ListItem {
    /**
     * The HTML element used to render the list item.
     * @private
     * @type {HTMLAnchorElement}
     */
    #htmlElement;

    /**
     * Gets whether the item is currently selected.
     * @public
     * @returns {boolean} True if the item is selected
     */
    get selected() {
        return this.#htmlElement.classList.contains('active');
    }

    /**
     * Creates a new ListItem instance.
     * @constructor
     * @param {string} [id='ListItem'] - The unique identifier for the list item
     * @param {string} [caption='List Item'] - The text to display for the item
     */
    constructor(id = 'ListItem', caption = 'List Item') {
        const listItem = document.createElement('a');
        listItem.classList.add('list-group-item');
        listItem.href = '#';
        listItem.dataset.id = id;
        listItem.textContent = caption;

        listItem.onclick = () => {
            listItem.classList.toggle('active');
            console.log(this.selected);
        };

        this.#htmlElement = listItem;
    }

    /**
     * Renders the list item component.
     * @public
     * @returns {HTMLElement} The list item HTML element
     */
    render() {
        return this.#htmlElement;
    }
}

/**
 * @classdesc A list component for Bootstrap 3.3.7 that displays items in a panel with pagination support.
 * @class
 * @public
 */
export class List {
    /**
     * The HTML element used to render the list container.
     * @private
     * @type {HTMLDivElement}
     */
    #htmlElement;

    /**
     * The HTML element containing the list items.
     * @private
     * @type {HTMLDivElement}
     */
    #itemsList;

    /**
     * Creates a new List instance.
     * @constructor
     * @param {string} [id='List'] - The unique identifier for the list
     * @param {string} [title='List'] - The title text for the list panel
     */
    constructor(id = 'List', title = 'List') {
        // Create main container
        const list = document.createElement('div');
        list.classList.add('col-xs-5');

        // Create panel container
        const panel = document.createElement('div');
        panel.classList.add('panel', 'panel-default');

        // Create panel heading
        const heading = document.createElement('div');
        heading.classList.add('panel-heading');

        // Create panel title
        const titleH3 = document.createElement('h3');
        titleH3.classList.add('panel-title');
        titleH3.innerText = title;

        // Create items container
        const itemsList = document.createElement('div');
        itemsList.classList.add('list-group');
        itemsList.id = id + 'ItemsList';
        this.#itemsList = itemsList;

        // Create footer for pagination
        const footer = document.createElement('div');
        footer.classList.add('panel-footer');
        footer.id = id + 'Pagination';

        // Assemble components
        list.appendChild(panel);
        panel.appendChild(heading);
        heading.appendChild(titleH3);
        panel.appendChild(itemsList);
        panel.appendChild(footer);

        this.#htmlElement = list;
    }

    /**
     * Adds a new item to the list.
     * @public
     * @param {string} [id] - The unique identifier for the new item
     * @param {string} [caption] - The text to display for the new item
     */
    addItem(
        id = this.#itemsList.dataset.id + this.#itemsList.childElementCount + 1,
        caption = this.#itemsList.dataset.id + this.#itemsList.childElementCount + 1
    ) {
        this.#itemsList.appendChild(new ListItem(id, caption).render());
    }

    /**
     * Renders the list component.
     * @public
     * @returns {HTMLElement} The list HTML element
     */
    render() {
        return this.#htmlElement;
    }
}
