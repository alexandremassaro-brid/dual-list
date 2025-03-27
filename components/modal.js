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
     * The dropdown component.
     * @private
     * @type {Dropdown}
     */
    #dropdown;

    /**
     * The search box component.
     * @private
     * @type {SearchBox}
     */
    #searchBox;

    /**
     * The dual list component.
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
     * Sets the modal id
     * @property {string} - The HTML element id.
     * @public
     */
    set id(value) {
        this.#htmlElement.id = value;
    }

    /**
     * Returns the modal title
     * @property {string} - The modal title.
     * @public
     */
    get title() {
        return this.#headerHtmlElement.querySelector('.modal-title').textContent;
    }

    /**
     * Sets the modal title
     * @property {string} - The modal title.
     * @public
     */
    set title(value) {
        this.#headerHtmlElement.querySelector('.modal-title').textContent = value;
    }

    /**
     * Returns the dropdown description
     * @property {string} - The dropdown description.
     * @public
     */
    get dropdownDescription() {
        return this.#dropdown.description;
    }

    /**
     * Sets the dropdown description
     * @property {string} - The dropdown description.
     * @public
     */
    set dropdownDescription(value) {
        this.#dropdown.description = value;
    }

    /**
     * Returns the search box placeholder
     * @property {string} - The search box placeholder.
     * @public
     */
    get searchPlaceholder() {
        return this.#searchBox.placeholder;
    }

    /**
     * Sets the search box placeholder
     * @property {string} - The search box placeholder.
     * @public
     */
    set searchPlaceholder(value) {
        this.#searchBox.placeholder = value;
    }

    /**
     * Returns the source list title
     * @property {string} - The source list title.
     * @public
     */
    get sourceListTitle() {
        return this.#dualList.sourceListTitle;
    }

    /**
     * Sets the source list title
     * @property {string} - The source list title.
     * @public
     */
    set sourceListTitle(value) {
        this.#dualList.sourceListTitle = value;
    }

    /**
     * Returns the target list title
     * @property {string} - The target list title.
     * @public
     */
    get targetListTitle() {
        return this.#dualList.targetListTitle;
    }

    /**
     * Sets the target list title
     * @property {string} - The target list title.
     * @public
     */
    set targetListTitle(value) {
        this.#dualList.targetListTitle = value;
    }

    /**
     * Returns the items per page
     * @property {number} - The number of items per page.
     * @public
     */
    get itemsPerPage() {
        return this.#dualList.itemsPerPage;
    }

    /**
     * Sets the items per page
     * @property {number} - The number of items per page.
     * @public
     */
    set itemsPerPage(value) {
        this.#dualList.itemsPerPage = value;
    }

    /**
     * Sets the source items
     * @property {Array} - The source items array.
     * @public
     */
    set sourceItems(value) {
        this.#dualList.sourceItems = value;
    }

    /**
     * Sets the target items
     * @property {Array} - The target items array.
     * @public
     */
    set targetItems(value) {
        this.#dualList.targetItems = value;
    }

    /**
     * Sets the on transfer callback
     * @property {Function} - The callback function.
     * @public
     */
    set onTransfer(value) {
        this.#dualList.onTransfer = value;
    }

    /**
     * Class constructor - Returns a Modal instance.
     */
    constructor() {
        this.#initializeComponents();
        this.#initializeElement();
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
        const ariaLabelledBy = 'modalTitleLabel';

        const modal = document.createElement('div');
        for (const requiredClass of requiredClasses) {
            modal.classList.add(requiredClass);
        }
        modal.id = modalId;
        modal.tabIndex = tabIndex;
        modal.role = role;
        modal.setAttribute('aria-labbeledby', ariaLabelledBy);

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
        this.#initializeContent();
        documentDiv.appendChild(this.#contentHtmlElement);

        modal.appendChild(documentDiv);

        this.#htmlElement = modal;
    }

    /**
     * Initializes the content of the modal.
     * @method
     * @private
     */
    #initializeContent(headerTitle = 'modalTitleLabel') {
        // Create content div
        const requiredClasses = [
            'modal-content',
        ];
        const modalContent = document.createElement('div');
        for (const requiredClass of requiredClasses) {
            modalContent.classList.add(requiredClass);
        }

        // Header
        this.#initializeHeader('headerId', headerTitle);
        modalContent.appendChild(this.#headerHtmlElement);

        // Body
        this.#initializeBody();
        modalContent.appendChild(this.#bodyHtmlElement);

        // Footer
        this.#initializeFooter();
        modalContent.appendChild(this.#footerHtmlElement);

        this.#contentHtmlElement = modalContent;
    }

    /**
     * Initializes the header of the modal.
     * @method
     * @private
     * @param {string} [labelId='modalTitleLabel'] - The id for the title's label.
     * @param {string} [labelText='Modal Title'] - The text to print in the title.
     */
    #initializeHeader(labelId = 'modalTitleLabel', labelText = 'Modal Title') {
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
        h4Title.id = labelId.trim().length > 0 ? labelId.trim() : 'modalTitleLabel';
        h4Title.innerText = labelText.trim().length > 0 ? labelText.trim() : 'Dialog Modal';

        // Append elements to Header
        modalHeader.appendChild(closeButton);
        modalHeader.appendChild(h4Title);

        this.#headerHtmlElement = modalHeader;
    }

    /**
     * Initializes the components of the modal.
     * @private
     */
    #initializeComponents() {
        // Initialize dropdown
        this.#dropdown = new Dropdown('dropDownObject', true, 'Selecione uma opção', []);

        // Initialize search box
        this.#searchBox = new SearchBox('SearchBox', 'Buscar...');

        // Initialize dual list
        this.#dualList = new DualList('dualList', [], [], 5);
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

        // Append components to form
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
        cancelButton.onclick = cancelAction;

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
        confirmButton.onclick = confirmAction;

        // Append elements to footer
        footer.appendChild(cancelButton);
        footer.appendChild(confirmButton);

        this.#footerHtmlElement = footer;
    }

    /**
     * Returns an HTMLElement object to be appended to the HTML Document
     * @method
     * @public
     * @returns {HTMLDivElement} The Modal's HTMLElement
    */
    render() {
        return this.#htmlElement;
    }
}
