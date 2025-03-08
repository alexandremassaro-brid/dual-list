/**
 * @class Modal
 * @description A dialog modal that opens over the web page.
 */
export class Modal {
    /**
     * @private
     * @type {HTMLDivElement}
     * @description The Html component used to render the modal to the screen.
     */
    #htmlElement;

    /**
     * @constructor
     */
    constructor() {
        this.#initializeElement();
    }

    /**
     * Initializes the HTMLElement
     * @private
    */
   #initializeElement(id, label) {
        // Create modal div tag
        const requiredClasses = [
            'modal',
            'fade',
        ];
        const modalId = 'dialogModal';
        const tabIndex = '-1';
        const role = 'dialog';
        const ariaLabelledBy = 'modalTitleLabel';

        this.#htmlElement = new HTMLDivElement();
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

        const documentDiv = new HTMLDivElement();
        documentDiv.classList.add(documentRequiredClasses);
        documentDiv.role = documentRole;

        this.#htmlElement.appendChild(documentDiv);

        // Initialize Content
    }
}