export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  render() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
  addNewItem(element) {
    this._container.prepend(element);
  }
  clear() {
    while (this._container.firstChild) {
      this._container.removeChild(this._container.firstChild);
    }
  }
}
