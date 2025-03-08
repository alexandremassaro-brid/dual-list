/**
 * Enumerates the types of lists and list items.
 * @readonly
 * @enum {string}
 */
export const types = {
    UNORDERED: 'UNORDERED',
    LINKED_ITEMS: 'LINKED_ITEMS',
    BUTTON_ITEMS: 'BUTTON_ITEMS',
};

/**
 * @class ListItem
 * @description This class represents a list item.
 */
export class ListItem {
    /**
     * Enumerates the context of list items.
     * @readonly
     * @enum {string}
     */
    static contexts = {
        NONE: '',
        // PRIMARY: 'PRIMARY',
        // SECONDARY: 'SECONDARY',
        SUCCESS: ' list-group-item-success',
        DANGER: ' list-group-item-danger',
        WARNING: ' list-group-item-warning',
        INFO: ' list-group-item-info',
        // LIGHT: 'LIGHT',
        // DARK: 'DARK',
    }

    /**
     * @private
     * @type {contexts}
     * @description The context of the item.
     */
    #context;

    /**
     * @private
     * @type {boolean}
     * @description Whether the item is active.
     */
    #active;

    /**
     * @private
     * @type {boolean}
     * @description Whether the item is disabled.
     */
    #disabled;

    /**
     * @private
     * @type {string}
     * @description Unique identifier.
     */
    #id;

    /**
     * @private
     * @type {string}
     * @description Text to be displayed.
     */
    #caption;

    /**
     * @private
     * @type {HTMLElement}
     * @description The type of list item render component.
     */
    #htmlElement;

    /**
     * @constructor
     * @param {string} id - Unique identifier.
     * @param {string} caption - Text to be displayed.
     * @param {contexts} [context=contexts.NONE] - The context of the item.
     */
    constructor(id, caption, context = contexts.NONE) {
        this.#id = id;
        this.#caption = caption;
        this.#context = context;
        this.#active = false;
        this.#disabled = false;
    }

    /**
     * Returns the item's unique identifier.
     * @returns {string} - This item's unique identifier.
     */
    get id() {
        return this.#id;
    }

    /**
     * Sets the item's unique identifier.
     * @param {string} id - This item's unique identifier.
     */
    set id(id) {
        this.#id = id;
    }

    /**
     * Returns the item's caption.
     * @returns {string} - This item's caption.
     */
    get caption() {
        return this.#caption;
    }

    /**
     * Sets the item's caption.
     * @param {string} caption - This item's caption.
     */
    set caption(caption) {
        this.#caption = caption;
    }

    /**
     * Returns whether the item is active.
     * @returns {boolean} - Whether the item is active.
     */
    get active() {
        return this.#active;
    }

    /**
     * Sets whether the item is active.
     * @param {boolean} active - Whether the item is active.
     */
    set active(active) {
        this.#active = active;
        this.#htmlElement.classList.toggle('active', active);
    }

    /**
     * Returns whether the item is selected
     * @returns {boolean} - Whether the item is selected.
     */
    get selected() {
        return this.#active;
    }

    /**
     * Sets whether the item is selected.
     * @param {boolean} selected - Whether the item is selected.
     */
    set selected(selected) {
        this.active = selected;
    }

    /**
     * Returns whether the item is disabled.
     * @returns {boolean} - Whether the item is disabled.
     */
    get disabled() {
        return this.#disabled;
    }

    /**
     * Sets whether the item is disabled.
     * @param {boolean} disabled - Whether the item is disabled.
     */
    set disabled(disabled) {
        this.#disabled = disabled;
    }

    /**
     * Returns the item's context.
     * @returns {string} - This item's context.
     */
    get context() {
        return this.#context;
    }

    /**
     * Sets the item's context.
     * @param {contexts} context - This item's context.
     */
    set context(context) {
        if (context) {
            switch (context) {
                case contexts.BUTTON_ITEMS:
                case contexts.LINKED_ITEMS:
                this.#context = context;
            }
        }
        this.#context = contexts.UNORDERED;
    }

    /**
     * Selects the item.
     */
    select() {
        this.active = true;
    }

    /**
     * Deselects the item.
     */
    deselect() {
        this.active = false;
    }

    /**
     * Toggles the item's selected state.
     */
    toggleSelected() {
        this.active = !this.active;
    }

    /**
     * Disables the item.
     */
    disable() {
        this.disabled = true;
    }

    /**
     * Enables the item.
     */
    enable() {
        this.disabled = false;
    }

    /**
     * Toggles the item's disabled state.
     */
    toggleDisabled() {
        this.disabled = !this.disabled;
    }

    /**
     * Returns a ListItem Bootstrap Component.
     * @param {types} [type=types.UNORDERED] - The type of list item render component.
     * @returns {HTMLElement} - A ListItem Bootstrap Component.
     */
    render(type = types.UNORDERED) {
        switch (type) {
            case types.LINKED_ITEMS:
                this.#htmlElement = document.createElement('a');
                this.#htmlElement.href = '#';
                break;
            case types.BUTTON_ITEMS:
                this.#htmlElement = document.createElement('button');
                this.#htmlElement.type = 'button';
                break;
            default:
                this.#htmlElement = document.createElement('li');
        }
        
        this.#htmlElement.classList.add('list-group-item')
        this.#htmlElement.classList.toggle('active', this.#active);
        this.#htmlElement.classList.toggle('disabled', this.#disabled);
        
        this.#htmlElement.classList.remove(contexts.BUTTON_ITEMS);
        this.#htmlElement.classList.remove(contexts.LINKED_ITEMS);
        this.#htmlElement.classList.remove(contexts.UNORDERED);
        this.#htmlElement.classList.add(this.#context);

        this.#htmlElement.dataset.id = this.#id;
        this.#htmlElement.textContent = this.#caption;

        return this.#htmlElement;
    }
}

/**
 * @class ListItemSet
 * @extends Set
 * @description A Set that only accepts ListItem instances.
 */
export class ListItemSet extends Set {
    /**
     * @constructor
     * @param {Iterable<ListItem>} [iterable] - Optional iterable of ListItems to initialize the set.
     */
    constructor(iterable = []) {
        if (iterable) {
            for (const item of iterable) {
                if (!(item instanceof ListItem)) {
                    throw new TypeError('Only ListItem instances can be added to this set');
                }
            }
        }
        super(iterable);
    }
  
    /**
     * Adds a ListItem to the set.
     * @param {ListItem|iterable<ListItem>} item - The item or set of items to add.
     * @throws {TypeError} - If the item is not an instance of ListItem or Tuple.
     */
    add(item) {
        if (item) {
            if (typeof item[Symbol.iterator] === 'function') {
                for (const i of item) {
                    if (i instanceof ListItem) {
                        super.add(i);
                    } else {
                        break;
                    }
                }
                return
            } else if (item instanceof ListItem) {
                super.add(item);
            }
        }
        throw new TypeError('Only ListItem instances can be added to this set');
    }
  
    /**
     * Creates a new ListItemSet with the results of calling a provided function on every element in this set.
     * @param {function(ListItem): ListItem} callbackFn - Function to execute for each element.
     * @returns {ListItemSet} - A new ListItemSet with transformed items.
     */
    map(callbackFn) {
        const result = new ListItemSet();
        for (const item of this) {
            const newItem = callbackFn(item);
            result.add(newItem);
        }
        return result;
    }
  
    /**
     * Creates a new ListItemSet with all elements that pass the test.
     * @param {function(ListItem): boolean} callbackFn - Function to test each element.
     * @returns {ListItemSet} - A new ListItemSet with filtered items.
     */
    filter(callbackFn) {
        const result = new ListItemSet();
        for (const item of this) {
            if (callbackFn(item)) {
                result.add(item);
            }
        }
        return result;
    }

    /**
     * Removes an item from the set.
     * @param {ListItem} item - The item to remove.
     * @returns {ListItem|boolean} - The removed item or false if not fount.
     */
    delete(item) {
        if (!(item instanceof ListItem)) {
            throw new TypeError('Only ListItem instances can be removed from this set');
        }

        if (super.delete(item)) {
            return item;
        }
        
        return false;
    }

    /**
     * Removes all active items from the set.
     */
    deleteActive() {
        for (const item of this) {
            if (item.active) {
                this.delete(item);
            }
        }
    }
}

/**
 * @class List
 * @description This class represents a list.
 */
export class List {
    /**
     * @private
     * @type {ListItemSet}
     * @description A set of all list items in this list.
     */
    #items;

    /**
     * @private
     * @type {types}
     * @description The type of component to render.
     */
    #type;

    /**
     * Creates an instance of a List.
     * @constructor
     * @typedef {string} id - The item's unique identifier.
     * @typedef {string} caption - The item's caption.
     * @typedef {[id, caption]} ListItemTuple - A tuple with the item's unique identifier and caption.
     * @param {Iterable<ListItem|ListItemTuple>} itemsList - Any iterable of ListItem or Tuples with id and caption strings.
     */
    constructor(itemsList = [], type = types.UNORDERED) {
        this.#type = type;

        if (typeof itemsList[Symbol.iterator] === 'function') {
            this.#items = new ListItemSet(itemsList);
            return;
        }
        
        throw new TypeError('The itemsList parameter must be an array or a ListItemSet');
    }

    /**
     * Adds an item to the list.
     * @typedef {string} id - The item's unique identifier.
     * @typedef {string} caption - The item's caption.
     * @typedef {[id, caption]} ListItemTuple - A tuple with the item's unique identifier and caption.
     * @param {ListItemTuple|ListItem|Iterable<ListItem|ListItemTuple>} item - The item or set of items to add.
     */
    add(item) {
        if (item) {
            if (Array.isArray(item) && item.length === 2) {
                item = new ListItem(item.id, item.caption);
            } 
            if (item instanceof ListItem) {
                this.#items.add(item);
                return;
            } else if (typeof item[Symbol.iterator] === 'function') {
                this.#items.add(item)
            }
        }
    }

    /**
     * Filters the list by their caption and returns a new list with the filtered items.
     * @param {string} filter - A string to filter the items by their caption.
     * @returns {List} - A filtered list of items.
     */
    filter(filter = '') {
        return new List(this.#items.filter(listItem =>
            listItem.caption.toLowerCase().includes(filter.toLowerCase())
        ));
    }

    /**
     * Select an item.
     * @param {ListItem} item - The item to select.
     */
    select(item) {
        item.select();
    }

    /**
     * Deselect an item.
     * @param {ListItem} item - The item to deselect.
     */
    deselect(item) {
        item.deselect();
    }

    /**
     * Remove an item from the list and return it.
     * @param {ListItem} item - The item to remove.
     * @returns {ListItem} - The removed item.
     */
    remove(item) {
        return this.#items.delete(item);
    }

    /**
     * Deletes all items in the list.
     */
    clear() {
        this.#items.clear();
    }

    /**
     * Toggled selected state of an item.
     * @returns {boolean} - Whether the item is selected.
     */
    toggleSelected(item) {
        if (item.selected) {
            this.deselect(item)
        } else {
            this.select(item)
        }

        return item.selected
    }

    /**
     * Renders the list Booststrap component.
     * @returns {HTMLElement} - A list component.
     */
    render() {
        let list;
        switch (this.#type) {
            case types.UNORDERED:
                list = document.createElement('ul');
                break;
            default:
                list = document.createElement('div');
                break;
        }
                
        list.classList.add('list-group');

        for (const item of this.#items) {
            list.appendChild(item.render());
        }

        return list;
    }

}


/**
 * @class DualList
 * @description - This class represents a dual list of items.
 */
export class DualList {
    /**
     * @private
     * @type {List}
     * @description The source list.
     */
    #sourceList;

    /**
     * @private
     * @type {List}
     * @description The target list.
     */
    #targetList;

    /**
     * @constructor
     * @param {List} sourceList - The Source List.
     * @param {List} targetList - The Target List.
     */
    constructor(sourceList = new List(), targetList = new List()) {
        this.#sourceList = sourceList;
        this.#targetList = targetList;
    }

    /**
     * Returns the Source List.
     * @returns {List}
     */
    get sourceList() {
        return this.#sourceList;
    }

    /**
     * Returns the Target List.
     * @returns {List}
     */
    get targetList() {
        return this.#targetList;
    }

    /**
     * Moves an item from the source list to the target list.
     * @param {ListItem} item 
     */
    moveFromSourceToTarget(item) {
        let removedItem = this.#sourceList.remove(item);
        if (removedItem) {
            this.#targetList.add(removedItem);
        }
    }

    /**
     * Moves an item from the target list to the source list.
     * @param {ListItem} item 
     */
    moveFromTargetToSource(item) {
        let removedItem = this.#targetList.remove(item);
        if (removedItem) {
            this.#sourceList.add(removedItem);
        }
    }

    /**
     * Removes all items from the source list.
     */
    clearSourceList() {
        this.#sourceList.clear();
    }

    /**
     * Removes all items from the target list.
     */
    clearTargetList() {
        this.#targetList.clear();
    }

    /**
     * Removes all items from both lists.
     */
    clearLists() {
        this.clearSourceList();
        this.clearTargetList();
    }

    /**
     * Filters the source list by their caption and returns a new list with the filtered items.
     * @param {string} filter 
     * @returns {List} - A filtered list of items from the source list.
     */
    filterSourceList(filter = '') {
        return this.#sourceList.filter(filter);
    }

    /**
     * Filters the target list by their caption and returns a new list with the filtered items.
     * @param {string} filter 
     * @returns A filtered list of items from the target list.
     */
    filterTargetList(filter = '') {
        return this.#targetList.filter(filter);
    }
}
