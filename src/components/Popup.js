export default class Popup {
    constructor(popupSelector, popupOpenSelector, popupCloseButtonSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._popupOpenSelector = popupOpenSelector;
        this._popupCloseButtonSelector = popupCloseButtonSelector;
        this._popupSelector = popupSelector;
    }

    open() {
        this._popupElement.classList.add(this._popupOpenSelector);
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove(this._popupOpenSelector);
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose = (event) => {
        if (event.key === "Escape") {
            this.close();
        }
    };

    // Кнопки закрытия Pop-up
    setEventListeners() {
        this._popupElement.addEventListener("mousedown", (event) => {
            event.target.classList.contains(this._popupCloseButtonSelector) || event.target.classList.contains(this._popupSelector) ? this.close():false
        });
    }
}