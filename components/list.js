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
     * The HTML element containing the pagination controls.
     * @private
     * @type {HTMLDivElement}
     */
    #paginationElement;

    /**
     * Number of items to display per page.
     * @private
     * @type {number}
     */
    #itemsPerPage;

    /**
     * Current page number (1-based).
     * @private
     * @type {number}
     */
    #currentPage = 1;

    /**
     * Creates a new List instance.
     * @constructor
     * @param {string} [id='List'] - The unique identifier for the list
     * @param {string} [title='List'] - The title text for the list panel
     * @param {number} [itemsPerPage=5] - Number of items to display per page
     */
    constructor(id = 'List', title = 'List', itemsPerPage = 5) {
        this.#itemsPerPage = itemsPerPage;

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
        this.#paginationElement = footer;

        // Assemble components
        list.appendChild(panel);
        panel.appendChild(heading);
        heading.appendChild(titleH3);
        panel.appendChild(itemsList);
        panel.appendChild(footer);

        this.#htmlElement = list;
    }

    /**
     * Gets the total number of pages based on items per page.
     * @private
     * @returns {number} Total number of pages
     */
    #getTotalPages() {
        return Math.ceil(this.#itemsList.children.length / this.#itemsPerPage);
    }

    /**
     * Updates the pagination controls.
     * @private
     */
    #updatePagination() {
        const totalPages = this.#getTotalPages();
        this.#paginationElement.innerHTML = '';

        const pagination = document.createElement('nav');
        pagination.setAttribute('aria-label', 'Page navigation');

        const ul = document.createElement('ul');
        ul.classList.add('pagination', 'pagination-sm');

        // Previous button
        const prevLi = document.createElement('li');
        if (this.#currentPage === 1) {
            prevLi.classList.add('disabled');
        }
        const prevA = document.createElement('a');
        prevA.href = '#';
        prevA.setAttribute('aria-label', 'Previous');
        prevA.innerHTML = '<span aria-hidden="true">&laquo;</span>';
        prevA.onclick = (e) => {
            e.preventDefault();
            if (this.#currentPage > 1) {
                this.#currentPage--;
                this.#updateItemsVisibility();
                this.#updatePagination();
            }
        };
        prevLi.appendChild(prevA);
        ul.appendChild(prevLi);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            if (i === this.#currentPage) {
                li.classList.add('active');
            }
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = i;
            a.onclick = (e) => {
                e.preventDefault();
                this.#currentPage = i;
                this.#updateItemsVisibility();
                this.#updatePagination();
            };
            li.appendChild(a);
            ul.appendChild(li);
        }

        // Next button
        const nextLi = document.createElement('li');
        if (this.#currentPage === totalPages) {
            nextLi.classList.add('disabled');
        }
        const nextA = document.createElement('a');
        nextA.href = '#';
        nextA.setAttribute('aria-label', 'Next');
        nextA.innerHTML = '<span aria-hidden="true">&raquo;</span>';
        nextA.onclick = (e) => {
            e.preventDefault();
            if (this.#currentPage < totalPages) {
                this.#currentPage++;
                this.#updateItemsVisibility();
                this.#updatePagination();
            }
        };
        nextLi.appendChild(nextA);
        ul.appendChild(nextLi);

        pagination.appendChild(ul);
        this.#paginationElement.appendChild(pagination);
    }

    /**
     * Updates the visibility of items based on current page.
     * @private
     */
    #updateItemsVisibility() {
        const items = this.#itemsList.children;
        const startIndex = (this.#currentPage - 1) * this.#itemsPerPage;
        const endIndex = startIndex + this.#itemsPerPage;

        Array.from(items).forEach((item, index) => {
            if (index >= startIndex && index < endIndex) {
                item.style.removeProperty('display');
            } else {
                item.style.display = 'none';
            }
        });
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
        const item = new ListItem(id, caption).render();
        this.#itemsList.appendChild(item);
        this.#updateItemsVisibility();
        this.#updatePagination();
    }

    /**
     * Renders the list component.
     * @public
     * @returns {HTMLElement} The list HTML element
     */
    render() {
        this.#updateItemsVisibility();
        this.#updatePagination();
        return this.#htmlElement;
    }
}
