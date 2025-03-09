import { Dropdown } from './dropdown.js';
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
     * Returns the modal id
     * @property {string} - The HTML element id.
     * @public
     */
    get id() {
        return this.#htmlElement.id;
    }

    /**
     * Class constructor - Returns a Modal instance.
     */
    constructor() {
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
        const ariaLabelledBy = 'modalTitleLabel'; // Must be the same as the header's label's id.

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
     * @todo Implement body of the modal
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
     * Initializes the body of the modal.
     * @todo Implementar div do corpo.
     * @todo Criar formulário para os componentes.
     * @todo Criar dropdown de períodos.
     * @todo Criar barra de filtro.
     * @todo Criar lista dupla.
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
            body.classList.add(requiredClass);
        }

        // Dropdown
        const dropDown = new Dropdown('dropDownObject', true, 'dropDownObject', []);
        dropDown.addOption(Dropdown.dropdownOptionObject('Option1', 'Option1'));
        
        // SearchBar
        
        // DualList
        
        // Append elements to body
        form.appendChild(dropDown.render());
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
        cancelAction = cancel => console.log('Cancelar'), 
        confirmAction = confirm => console.log('Confirmar')
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
        // Return the modal's HTMLElement object;
        return this.#htmlElement;
    }
}