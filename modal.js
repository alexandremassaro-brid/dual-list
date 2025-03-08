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
        modal.classList.add(requiredClasses);
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
        documentDiv.classList.add(documentRequiredClasses);
        documentDiv.role = documentRole;

        modal.appendChild(documentDiv);

        // Initialize Content
        this.#initializeContent();
        modal.appendChild(this.#contentHtmlElement);

        this.#htmlElement = modal;
    }

    /**
     * Initializes the content of the modal.
     * @method
     * @private
     */
    #initializeContent() {
        // Create content div
        const requiredClasses = [
            'modal-content',
        ];
        const modalContent = document.createElement('div');
        modalContent.classList.add(requiredClasses);

        // Header
        this.#initializeHeader();
        modalContent.appendChild(this.#headerHtmlElement);

        // Body
        // Footer

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
        modalHeader.classList.add(requiredClasses);

        // Close button
        const closeButtonRequiredClasses = [
            'close',
        ];
        const closeButton = document.createElement('button');
        closeButton.classList.add(closeButtonRequiredClasses);
        closeButton.setAttribute('data-dismiss', 'modal');
        closeButton.setAttribute('aria-label', 'Close');
        const closeButtonLabel = document.createElement('span');
        closeButtonLabel.setAttribute('aria-hidden', 'true');
        closeButtonLabel.innerHTML = '&times;';
        closeButton.appendChild(closeButtonLabel);

        // Modal title
        const titleRequiredClasses = [
            'modal-title',
        ];
        const h4Title = document.createElement('h4');
        h4Title.id = labelId.trim().length > 0 ? labelId.trim() : 'modalTitleLabel';
        h4Title.innerText = labelText.trim().length > 0 ? labelText.trim() : 'Dialog Modal';

        // Append elements to Header
        modalHeader.appendChild(closeButton);
        modalHeader.appendChild(h4Title);

        this.#headerHtmlElement = modalHeader;
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