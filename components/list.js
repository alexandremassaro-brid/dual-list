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
     * The current filter text.
     * @private
     * @type {string}
     */
    #filterText = '';

    /**
     * Maximum number of page buttons to show.
     * @private
     * @type {number}
     */
    #maxPageButtons = 6;

    /**
     * Whether to always show previous/next buttons.
     * @private
     * @type {boolean}
     */
    #alwaysShowNavButtons = true;

    /**
     * Whether to always show first/last page buttons.
     * @private
     * @type {boolean}
     */
    #alwaysShowEdgeButtons = true;

    /**
     * Creates a new List instance.
     * @constructor
     * @param {string} [id='List'] - The unique identifier for the list
     * @param {string} [title='List'] - The title text for the list panel
     * @param {number} [itemsPerPage=5] - Number of items to display per page
     * @param {Object} [paginationOptions={}] - Pagination customization options
     * @param {number} [paginationOptions.maxPageButtons=6] - Maximum number of page buttons to show
     * @param {boolean} [paginationOptions.alwaysShowNavButtons=true] - Whether to always show previous/next buttons
     * @param {boolean} [paginationOptions.alwaysShowEdgeButtons=true] - Whether to always show first/last page buttons
     */
    constructor(id = 'List', title = 'List', itemsPerPage = 5, paginationOptions = {}) {
        this.#itemsPerPage = itemsPerPage;
        this.#maxPageButtons = paginationOptions.maxPageButtons ?? 6;
        this.#alwaysShowNavButtons = paginationOptions.alwaysShowNavButtons ?? true;
        this.#alwaysShowEdgeButtons = paginationOptions.alwaysShowEdgeButtons ?? true;

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
        const titleH3 = document.createElement('h4');
        titleH3.classList.add('panel-title');
        titleH3.innerText = title;

        // Create items container
        const itemsList = document.createElement('div');
        itemsList.classList.add('list-group', 'small');
        itemsList.id = id + 'ItemsList';
        this.#itemsList = itemsList;

        // Create footer for pagination
        const footer = document.createElement('div');
        footer.classList.add('panel-footer', 'small');
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
     * Gets the total number of visible items based on current filter.
     * @private
     * @returns {number} Total number of visible items
     */
    #getVisibleItemsCount() {
        return Array.from(this.#itemsList.children).filter(item =>
            !this.#filterText || item.textContent.toLowerCase().includes(this.#filterText)
        ).length;
    }

    /**
     * Gets the total number of pages based on visible items.
     * @private
     * @returns {number} Total number of pages
     */
    #getTotalPages() {
        return Math.ceil(this.#getVisibleItemsCount() / this.#itemsPerPage);
    }

    /**
     * Updates the pagination controls.
     * @private
     */
    #updatePagination() {
        const totalPages = this.#getTotalPages();
        this.#paginationElement.innerHTML = '';

        // If no pages, don't show pagination
        if (totalPages <= 0) {
            return;
        }

        const pagination = document.createElement('nav');
        pagination.setAttribute('aria-label', 'Page navigation');
        pagination.classList.add('small');

        const ul = document.createElement('ul');
        ul.classList.add('pagination', 'pagination-sm');

        // Helper function to add a page button
        const addPageButton = (pageNum, isDisabled = false) => {
            const li = document.createElement('li');
            if (pageNum === this.#currentPage) {
                li.classList.add('active');
            }
            if (isDisabled) {
                li.classList.add('disabled');
            }
            const a = document.createElement('a');
            a.href = '#';
            a.textContent = pageNum;
            a.onclick = (e) => {
                e.preventDefault();
                if (!isDisabled) {
                    this.#currentPage = pageNum;
                    this.#updateItemsVisibility();
                    this.#updatePagination();
                }
            };
            li.appendChild(a);
            ul.appendChild(li);
            return li;
        };

        // Helper function to add a navigation button
        const addNavButton = (isPrev, isDisabled) => {
            const li = document.createElement('li');
            if (isDisabled) {
                li.classList.add('disabled');
            }
            const a = document.createElement('a');
            a.href = '#';
            a.setAttribute('aria-label', isPrev ? 'Previous' : 'Next');
            a.innerHTML = `<span aria-hidden="true">${isPrev ? '&laquo;' : '&raquo;'}</span>`;
            a.onclick = (e) => {
                e.preventDefault();
                if (!isDisabled) {
                    this.#currentPage += isPrev ? -1 : 1;
                    this.#updateItemsVisibility();
                    this.#updatePagination();
                }
            };
            li.appendChild(a);
            ul.appendChild(li);
            return li;
        };

        // Step 1: Add Previous button (if required)
        const isPrevDisabled = this.#currentPage === 1;
        const shouldShowPrev = this.#alwaysShowNavButtons || !isPrevDisabled;
        if (shouldShowPrev) {
            addNavButton(true, isPrevDisabled);
        }

        // Step 2: Create an array of page buttons to display
        const pageButtons = [];

        // Always include current page
        pageButtons.push(this.#currentPage);

        // Include first and last page if required
        if (this.#alwaysShowEdgeButtons) {
            if (this.#currentPage !== 1) {
                pageButtons.push(1);
            }
            if (this.#currentPage !== totalPages) {
                pageButtons.push(totalPages);
            }
        }

        // Calculate remaining slots
        let remainingSlots = this.#maxPageButtons;

        // Subtract required navigation buttons
        if (shouldShowPrev) {
            remainingSlots -= 1; // Previous
        }
        if (this.#alwaysShowNavButtons) {
            remainingSlots -= 1; // Next
        }

        // Subtract page buttons already added
        remainingSlots -= pageButtons.length;

        // Add sequential pages around current page
        if (remainingSlots > 0) {
            // Add pages after current page
            let after = this.#currentPage + 1;
            while (remainingSlots > 0 && after < totalPages) {
                if (!pageButtons.includes(after)) {
                    pageButtons.push(after);
                    remainingSlots--;
                }
                after++;
            }

            // Add pages before current page
            let before = this.#currentPage - 1;
            while (remainingSlots > 0 && before > 1) {
                if (!pageButtons.includes(before)) {
                    pageButtons.push(before);
                    remainingSlots--;
                }
                before--;
            }
        }

        // Step 3: Sort and render page buttons
        pageButtons.sort((a, b) => a - b);

        // Render page buttons
        for (const pageNum of pageButtons) {
            addPageButton(pageNum);
        }

        // Step 4: Add Next button (if required)
        const isNextDisabled = this.#currentPage === totalPages;
        const shouldShowNext = this.#alwaysShowNavButtons || !isNextDisabled;
        if (shouldShowNext) {
            addNavButton(false, isNextDisabled);
        }

        pagination.appendChild(ul);
        this.#paginationElement.appendChild(pagination);
    }

    /**
     * Filters items based on the given text.
     * @public
     * @param {string} text - The text to filter items by
     */
    filter(text) {
        this.#filterText = text.toLowerCase();
        this.#currentPage = 1; // Reset to first page when filtering
        this.#updateItemsVisibility();
        this.#updatePagination();
    }

    /**
     * Updates the visibility of items based on current page and filter.
     * @private
     */
    #updateItemsVisibility() {
        const items = Array.from(this.#itemsList.children);
        const startIndex = (this.#currentPage - 1) * this.#itemsPerPage;
        const endIndex = startIndex + this.#itemsPerPage;

        // First, determine which items match the filter
        const visibleItems = items.filter(item =>
            !this.#filterText || item.textContent.toLowerCase().includes(this.#filterText)
        );

        // Then show/hide items based on pagination
        items.forEach(item => {
            const isVisible = visibleItems.includes(item);
            const isOnCurrentPage = visibleItems.indexOf(item) >= startIndex &&
                visibleItems.indexOf(item) < endIndex;

            if (isVisible && isOnCurrentPage) {
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
     * Gets the list container element.
     * @public
     * @returns {HTMLDivElement} The list container element
     */
    get listElement() {
        return this.#itemsList;
    }

    /**
     * Updates the list's pagination and visibility.
     * @public
     */
    update() {
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

        // Store List instance reference in panel element
        const panel = this.#htmlElement.querySelector('.panel');
        panel.__list = this;

        return this.#htmlElement;
    }
}
