/**
 * @classdesc A search box component for Bootstrap 3.3.7 that provides real-time filtering functionality.
 * @class
 * @public
 */
export class SearchBox {
    /**
     * The HTML element used to render the search box container.
     * @private
     * @type {HTMLDivElement}
     */
    #htmlElement;

    /**
     * The HTML input element for text entry.
     * @private
     * @type {HTMLInputElement}
     */
    #textboxHtmlElement;

    /**
     * Callback function for search events.
     * @private
     * @type {Function}
     */
    #onSearchCallback;

    /**
     * Gets the current search text value.
     * @public
     * @returns {string} The current search text
     */
    get text() {
        return this.#textboxHtmlElement.value;
    }

    /**
     * Creates a new SearchBox instance.
     * @constructor
     * @param {string} [id='SearchBox'] - The unique identifier for the search box
     * @param {string} [placeholder='Find ...'] - The placeholder text for the input
     * @param {Function} [onSearch=null] - Callback function for search events
     * @example
     * const searchBox = new SearchBox(
     *   'search-input',
     *   'Search items...',
     *   (searchText) => {
     *     // Handle search text changes
     *     console.log('Searching for:', searchText);
     *   }
     * );
     */
    constructor(id = 'SearchBox', placeholder = 'Find ...', onSearch = null) {
        this.#onSearchCallback = onSearch;

        // Initialize container
        const searchBox = document.createElement('div');
        searchBox.classList.add('col-xs-12');

        // Create form group
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group', 'form-group-sm');

        // Create input group
        const inputGroup = document.createElement('div');
        inputGroup.classList.add('input-group', 'input-group-sm');

        // Create search icon
        const icon = document.createElement('span');
        icon.classList.add('input-group-addon');
        const iconSymbol = document.createElement('i');
        iconSymbol.classList.add('glyphicon', 'glyphicon-search');

        // Create text input
        const textBox = document.createElement('input');
        textBox.type = 'text';
        textBox.classList.add('form-control', 'input-sm');
        textBox.id = id;
        textBox.placeholder = placeholder;

        // Add clear button
        const clearButton = document.createElement('span');
        clearButton.classList.add('input-group-addon');
        clearButton.style.cursor = 'pointer';
        const clearIcon = document.createElement('i');
        clearIcon.classList.add('glyphicon', 'glyphicon-remove');
        clearButton.appendChild(clearIcon);

        // Assemble components
        icon.appendChild(iconSymbol);
        inputGroup.appendChild(icon);
        inputGroup.appendChild(textBox);
        inputGroup.appendChild(clearButton);
        formGroup.appendChild(inputGroup);
        searchBox.appendChild(formGroup);

        // Store references
        this.#textboxHtmlElement = textBox;
        this.#htmlElement = searchBox;

        // Add event listeners
        this.#setupEventListeners(clearButton);
    }

    /**
     * Sets up event listeners for search and clear functionality.
     * @private
     * @param {HTMLElement} clearButton - The clear button element
     */
    #setupEventListeners(clearButton) {
        // Search input event
        this.#textboxHtmlElement.addEventListener('input', () => {
            if (this.#onSearchCallback) {
                this.#onSearchCallback(this.text);
            }
        });

        // Clear button event
        clearButton.addEventListener('click', () => {
            this.#textboxHtmlElement.value = '';
            if (this.#onSearchCallback) {
                this.#onSearchCallback('');
            }
        });
    }

    /**
     * Renders the search box component.
     * @public
     * @returns {HTMLElement} The search box HTML element
     */
    render() {
        return this.#htmlElement;
    }
}
