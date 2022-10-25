export default class Section {
    constructor({ items, rendererFN }, sectionSelector) {
        this._renderer = rendererFN;
        this._items = items;
        this._container = document.querySelector(sectionSelector);
    }

    addItem(sectionElement) {
        this._container.prepend(sectionElement);
    }

    renderItems() {
        this._items.reverse().forEach((item) => this._renderer(item));
    }
}