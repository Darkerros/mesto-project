export default class Popup {
    constructor(popupSelector, popupOpenClass, popupCloseButtonClass) {
        this._popupElement = document.querySelector(popupSelector);
        this._popupOpenClass = popupOpenClass;
        this._popupCloseButtonClass = popupCloseButtonClass;

    }

    open() {
        this._popupElement.classList.add(this._popupOpenClass);
        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove(this._popupOpenClass);
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

            event.target.classList.contains(this._popupCloseButtonClass) || event.target.classList.contains(this._popupOpenClass) ? this.close():false
        });
    }
}
