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
     * Returns the modal id
     * @property {string} - The HTML element id.
     * @public
     */
    get id() {
        console.log(this.#htmlElement.id);
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
        const ariaLabelledBy = 'modalTitleLabel';

        this.#htmlElement = document.createElement('div');
        this.#htmlElement.classList.add(requiredClasses);
        this.#htmlElement.id = modalId;
        this.#htmlElement.tabIndex = tabIndex;
        this.#htmlElement.role = role;
        this.#htmlElement.setAttribute('aria-labbeledby', ariaLabelledBy);

        // Create document div tag
        const documentRequiredClasses = [
            'modal-dialog',
        ];
        const documentRole = 'document';

        const documentDiv = document.createElement('div');
        documentDiv.classList.add(documentRequiredClasses);
        documentDiv.role = documentRole;

        this.#htmlElement.appendChild(documentDiv);

        // Initialize Content
        this.#initializeContent();
    }

    /**
     * Initializes the content of the modal
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
        // Body
        // Footer
    }

    /**
     * Initializes the header of the modal
     * @method
     * @private
     */
    #initializeHeader() {
        //
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