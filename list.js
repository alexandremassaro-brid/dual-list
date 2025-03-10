class ListItem {
    #htmlElement;

    get selected() {
        return this.#htmlElement.classList.contains('active');
    }

    constructor(id = 'ListItem', caption = 'List Item') {
        let requiredClasses = [
            'list-group-item',
        ];
        const listItem = document.createElement('a');
        for (const requiredClass of requiredClasses) {
            listItem.classList.add(requiredClass);
        }
        listItem.href = '#';

        listItem.dataset.id = id;
        listItem.textContent = caption;

        listItem.onclick = () => {
            listItem.classList.toggle('active');
            console.log(this.selected);
        };

        this.#htmlElement = listItem;
    }

    render() {
        return this.#htmlElement;
    }
}

export class List {
    // Implement List class
    #htmlElement;
    #itemsList;

    constructor(id = 'List', title = 'List') {
        let requiredClasses = [
            'col-xs-5',
        ];
        const list = document.createElement('div');
        for (const requiredClass of requiredClasses) {
            list.classList.add(requiredClass);
        }

        requiredClasses = [
            'panel',
            'panel-default',
        ];
        const panel = document.createElement('div');
        for (const requiredClass of requiredClasses) {
            panel.classList.add(requiredClass);
        }

        requiredClasses = [
            'panel-heading',
        ];
        const heading = document.createElement('div');
        for (const requiredClass of requiredClasses) {
            heading.classList.add(requiredClass);
        }

        requiredClasses = [
            'panel-title',
        ];
        const titleH3 = document.createElement('h3');
        for (const requiredClass of requiredClasses) {
            titleH3.classList.add(requiredClass);
        }
        titleH3.innerText = title;

        requiredClasses = [
            'list-group',
        ];
        const itemsList = document.createElement('div');
        for (const requiredClass of requiredClasses) {
            itemsList.classList.add(requiredClass);
        }
        itemsList.id = id + 'ItemsList';
        this.#itemsList = itemsList;

        requiredClasses = [
            'panel-footer',
        ];
        const footer = document.createElement('div');
        for (const requiredClass of requiredClasses) {
            footer.classList.add(requiredClass);
        }
        footer.id = id + 'Pagination';
        
        list.appendChild(panel);
        panel.appendChild(heading);
        heading.appendChild(titleH3);
        panel.appendChild(itemsList);
        panel.appendChild(footer);

        this.#htmlElement = list;
    }

    addItem(
        id = this.#itemsList.dataset.id + this.#itemsList.childElementCount + 1, 
        caption = this.#itemsList.dataset.id + this.#itemsList.childElementCount + 1
    ) {
        const itemsList = this.#itemsList;
        itemsList.appendChild(new ListItem(id, caption).render());
    }

    render() {
        return this.#htmlElement;
    }
}
