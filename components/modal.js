import { Dropdown } from './dropdown.js';
import { SearchBox } from './search_box.js';
import { DualList } from './dual_list.js';

/**
 * @classdesc A dialog modal that opens over the web page.
 * @class
 * @public
 */
export class Modal {
    /**
     * The Html component used to render the modal to the screen.
     * @private
     * @constant
     * @type {HTMLDivElement}
     */
    #htmlElement;

    /**
     * The Html component used to render the modal's content.
     * @private
     * @constant
     * @type {HTMLDivElement}
     */
    #contentHtmlElement;

    /**
     * The Html component used to render the modal's header.
     * @private
     * @constant
     * @type {HTMLDivElement}
     */
    #headerHtmlElement;

    /**
     * The Html component used to render the modal's body.
     * @private
     * @constant
     * @type {HTMLDivElement}
     */
    #bodyHtmlElement;

    /**
     * The Html component used to render the modal's footer.
     * @private
     * @constant
     * @type {HTMLDivElement}
     */
    #footerHtmlElement;

    /**
     * The dropdown component for context selection.
     * @private
     * @type {Dropdown}
     */
    #dropdown;

    /**
     * The search box component for filtering items.
     * @private
     * @type {SearchBox}
     */
    #searchBox;

    /**
     * The dual list component for item transfer.
     * @private
     * @type {DualList}
     */
    #dualList;

    /**
     * Returns the modal id
     * @property {string} - The HTML element id.
     * @public
     */
    get id() {
        return this.#htmlElement.id;
    }

    /**
     * Creates a new Modal instance.
     * @constructor
     * @param {Object} options - Configuration options for the modal
     * @param {string} [options.id='dialogModal'] - The unique identifier for the modal
     * @param {string} [options.title='Dialog Modal'] - The text to display in the modal's title
     * @param {string} [options.dropdownDescription='Selecione uma opção'] - The dropdown's description text
     * @param {Array} [options.dropdownOptions=[]] - The dropdown's options array
     * @param {string} [options.searchPlaceholder='Buscar...'] - The search box's placeholder text
     * @param {string} [options.sourceListTitle='Source List'] - The source list's title text
     * @param {string} [options.targetListTitle='Target List'] - The target list's title text
     * @param {Array} [options.sourceItems=[]] - Initial items for the source list
     * @param {Array} [options.targetItems=[]] - Initial items for the target list
     * @param {number} [options.itemsPerPage=5] - Number of items per page
     * @param {string} [options.cancelButtonLabel='Cancelar'] - Text for the cancel button
     * @param {string} [options.confirmButtonLabel='Confirmar'] - Text for the confirm button
     * @param {Function} [options.onCancel=() => console.log(False)] - Callback for cancel button click
     * @param {Function} [options.onConfirm=() => console.log(True)] - Callback for confirm button click
     * @param {Function} [options.onTransfer=null] - Callback when items are transferred
     * @param {Object} [options.paginationOptions={}] - Pagination customization options
     * @example
     * // Basic usage
     * const modal = new Modal();
     *
     * // Full customization
     * const modal = new Modal({
     *   id: 'customModal',
     *   title: 'Select Items',
     *   dropdownDescription: 'Choose a context',
     *   dropdownOptions: [
     *     Dropdown.dropdownOptionObject('context1', 'Context 1'),
     *     Dropdown.dropdownOptionObject('context2', 'Context 2')
     *   ],
     *   searchPlaceholder: 'Search items...',
     *   sourceListTitle: 'Available Items',
     *   targetListTitle: 'Selected Items',
     *   sourceItems: [
     *     { id: '1', caption: 'Item 1' },
     *     { id: '2', caption: 'Item 2' }
     *   ],
     *   targetItems: [
     *     { id: '3', caption: 'Item 3' }
     *   ],
     *   itemsPerPage: 10,
     *   cancelButtonLabel: 'Cancel',
     *   confirmButtonLabel: 'Save',
     *   onCancel: () => console.log('Cancelled'),
     *   onConfirm: (selectedItems, selectedContext) => {
     *     console.log('Selected:', selectedItems);
     *     console.log('Context:', selectedContext);
     *   },
     *   onTransfer: (type) => {
     *     console.log('Transfer type:', type);
     *   }
     * });
     */
    constructor(options = {}) {
        // Initialize components with default values
        this.#initializeComponents(options);

        // Initialize footer with options
        this.#initializeFooter(
            options.cancelButtonLabel || 'Cancelar',
            options.confirmButtonLabel || 'Confirmar',
            options.onCancel || (() => console.log('Cancelar')),
            options.onConfirm || (() => console.log('Confirmar'))
        );

        // Initialize modal element with options
        this.#initializeElement(
            options.id || 'dialogModal',
            options.title || 'Dialog Modal'
        );

        // Set additional customizations
        if (options.dropdownDescription) {
            this.dropdownDescription = options.dropdownDescription;
        }
        if (options.searchPlaceholder) {
            this.searchPlaceholder = options.searchPlaceholder;
        }
        if (options.sourceListTitle) {
            this.sourceListTitle = options.sourceListTitle;
        }
        if (options.targetListTitle) {
            this.targetListTitle = options.targetListTitle;
        }
        if (options.onTransfer) {
            this.onTransfer = options.onTransfer;
        }
        if (options.paginationOptions) {
            this.paginationOptions = options.paginationOptions;
        }
    }

    /**
     * Initializes the modal's components.
     * @private
     * @param {Object} options - Configuration options for the components
     */
    #initializeComponents(options) {
        // Initialize dropdown
        this.#dropdown = new Dropdown(
            'dropDownObject',
            false,
            options.dropdownDescription || 'Selecione uma opção',
            options.dropdownOptions || []
        );

        // Initialize search box with filtering callback
        this.#searchBox = new SearchBox(
            'SearchBox',
            options.searchPlaceholder || 'Buscar...',
            (searchText) => {
                if (this.#dualList) {
                    this.#dualList.filter(searchText);
                }
            }
        );

        // Initialize dual list with all options
        this.#dualList = new DualList(
            'dualList',
            options.sourceItems || [],
            options.targetItems || [],
            options.itemsPerPage || 5,
            options.onTransfer || null,
            options.sourceListTitle || 'Source List',
            options.targetListTitle || 'Target List',
            options.paginationOptions || {}
        );
    }

    /**
     * Initializes the HTMLElement.
     * @private
     * @method
     * @param {string} [id='dialogModal'] - The id to be used in this modal.
     * @param {string} [label='Dialog Modal'] - The text to be used in the modal's title.
    */
    #initializeElement(id = 'dialogModal', label = 'Dialog Modal') {
        // Create modal div tag
        const requiredClasses = [
            'modal',
            'fade',
        ];
        const modalId = id;
        const tabIndex = '-1';
        const role = 'dialog';
        const ariaLabelledBy = 'modalTitleLabel'; // Must be the same as the header's label's id.

        const modal = document.createElement('div');
        for (const requiredClass of requiredClasses) {
            modal.classList.add(requiredClass);
        }
        modal.id = modalId;
        modal.tabIndex = tabIndex;
        modal.role = role;
        modal.setAttribute('aria-labelledby', ariaLabelledBy);

        // Create document div tag
        const documentRequiredClasses = [
            'modal-dialog',
        ];
        const documentRole = 'document';

        const documentDiv = document.createElement('div');
        for (const requiredClass of documentRequiredClasses) {
            documentDiv.classList.add(requiredClass);
        }
        documentDiv.role = documentRole;

        // Initialize Content
        this.#initializeContent(label);
        documentDiv.appendChild(this.#contentHtmlElement);

        modal.appendChild(documentDiv);

        this.#htmlElement = modal;
    }

    /**
     * Initializes the content of the modal.
     * @private
     * @param {string} title - The modal's title text
     */
    #initializeContent(title) {
        // Create content div
        const requiredClasses = [
            'modal-content',
        ];
        const modalContent = document.createElement('div');
        for (const requiredClass of requiredClasses) {
            modalContent.classList.add(requiredClass);
        }

        // Header
        this.#initializeHeader('modalTitleLabel', title);
        modalContent.appendChild(this.#headerHtmlElement);

        // Body
        this.#initializeBody();
        modalContent.appendChild(this.#bodyHtmlElement);

        // Footer
        if (this.#footerHtmlElement) {
            modalContent.appendChild(this.#footerHtmlElement);
        }

        this.#contentHtmlElement = modalContent;
    }

    /**
     * Initializes the header of the modal.
     * @private
     * @param {string} labelId - The id for the title's label
     * @param {string} labelText - The text to display in the title
     */
    #initializeHeader(labelId, labelText) {
        // Create header div
        const requiredClasses = [
            'modal-header',
        ];
        const modalHeader = document.createElement('div');
        for (const requiredClass of requiredClasses) {
            modalHeader.classList.add(requiredClass);
        }

        // Close button
        const closeButtonRequiredClasses = [
            'close',
        ];
        const closeButton = document.createElement('button');
        for (const requiredClass of closeButtonRequiredClasses) {
            closeButton.classList.add(requiredClass);
        }
        closeButton.type = 'button';
        closeButton.ariaLabel = 'Close';
        closeButton.setAttribute('data-dismiss', 'modal');
        const closeButtonLabel = document.createElement('span');
        closeButtonLabel.ariaHidden = 'true';
        closeButtonLabel.innerHTML = '&times;';
        closeButton.appendChild(closeButtonLabel);

        // Modal title
        const titleRequiredClasses = [
            'modal-title',
        ];
        const h4Title = document.createElement('h4');
        for (const requiredClass of titleRequiredClasses) {
            h4Title.classList.add(requiredClass);
        }
        h4Title.id = labelId;
        h4Title.innerText = labelText;

        // Append elements to Header
        modalHeader.appendChild(closeButton);
        modalHeader.appendChild(h4Title);

        this.#headerHtmlElement = modalHeader;
    }

    /**
     * Initializes the body of the modal.
     * @private
     */
    #initializeBody() {
        // Create body div
        let requiredClasses = [
            'modal-body',
        ];
        const body = document.createElement('div');
        for (const requiredClass of requiredClasses) {
            body.classList.add(requiredClass);
        }
        body.style.maxHeight = '500px';
        body.style.overflowY = 'auto';

        // Form
        requiredClasses = [
            'form-horizontal',
        ];
        const form = document.createElement('form');
        for (const requiredClass of requiredClasses) {
            form.classList.add(requiredClass);
        }

        // Append configured components to form
        form.appendChild(this.#dropdown.render());
        form.appendChild(this.#searchBox.render());
        form.appendChild(this.#dualList.render());
        body.appendChild(form);

        this.#bodyHtmlElement = body;
    }

    /**
     * Initializes the footer of the modal
     * @method
     * @private
     */
    #initializeFooter(
        cancelButtonLabel = 'Cancelar',
        confirmButtonLabel = 'Confirmar',
        cancelAction = () => console.log('Cancelar'),
        confirmAction = () => console.log('Confirmar')
    ) {
        // Create footer div
        const footerRequiredClasses = [
            'modal-footer',
        ];
        const footer = document.createElement('div');
        for (const requiredClass of footerRequiredClasses) {
            footer.classList.add(requiredClass);
        }

        // Cancel Button
        const cancelRequiredClasses = [
            'btn',
            'btn-default',
        ];
        const cancelButton = document.createElement('button');
        for (const requiredClass of cancelRequiredClasses) {
            cancelButton.classList.add(requiredClass);
        }
        cancelButton.type = 'button';
        cancelButton.innerText = cancelButtonLabel.trim().length > 0 ? cancelButtonLabel.trim() : 'Cancelar';
        cancelButton.setAttribute('data-dismiss', 'modal');
        cancelButton.onclick = (event) => {
            event.preventDefault();
            event.stopPropagation();
            // Reset dropdown to unselected state
            this.#dropdown.setValue('');

            // Move all items back to source list
            this.#dualList.moveAllToSource();

            // Call the original cancel action
            cancelAction();
        };

        // Confirm Button
        const confirmRequiredClasses = [
            'btn',
            'btn-primary',
        ];
        const confirmButton = document.createElement('button');
        for (const requiredClass of confirmRequiredClasses) {
            confirmButton.classList.add(requiredClass);
        }
        confirmButton.type = 'button';
        confirmButton.innerText = confirmButtonLabel.trim().length > 0 ? confirmButtonLabel.trim() : 'Confirmar';
        confirmButton.onclick = (event) => {
            event.preventDefault();
            event.stopPropagation();
            // Get the selected dropdown value
            const selectedContext = this.#dropdown.getValue();

            // Get all items from the destination list
            const selectedItems = this.#dualList.getDestinationItems();

            // Call the confirm action with the selected context and items
            confirmAction(selectedItems, selectedContext);
        };

        // Append elements to footer
        footer.appendChild(cancelButton);
        footer.appendChild(confirmButton);

        this.#footerHtmlElement = footer;
    }

    /**
     * Updates the dual list with new items and configuration.
     * @public
     * @param {Array} sourceItems - The source items array
     * @param {Array} targetItems - The target items array
     * @param {number} itemsPerPage - Number of items per page
     */
    updateDualList(sourceItems, targetItems, itemsPerPage) {
        this.#dualList = new DualList(
            'dualList',
            sourceItems || [],
            targetItems || [],
            itemsPerPage || 5,
            this.onTransfer,
            this.sourceListTitle || 'Source List',
            this.targetListTitle || 'Target List',
            this.paginationOptions || {}
        );

        // Update the dual list in the form
        const form = this.#bodyHtmlElement.querySelector('form');
        const oldDualList = form.querySelector('#dualList').closest('.row');
        form.replaceChild(this.#dualList.render(), oldDualList);
    }

    /**
     * Returns an HTMLElement object to be appended to the HTML Document
     * @method
     * @public
     * @returns {HTMLDivElement} The Modal's HTMLElement
    */
    render() {
        // Return the modal's HTMLElement object;
        return this.#htmlElement;
    }
}
