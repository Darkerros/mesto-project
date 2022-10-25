import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, selector) {
        super(popupSelector);
        this._handleSubmit = selector;
        this._form = this._popup.querySelector(".form");
        this._saveButton = this._form.querySelector(".form__accept");
        this._inputs = [...this._form.querySelectorAll(".form__mesto-input")];
    }

    _getInputValues() {
        const values = {};
        this._inputs.forEach((input) => {
            values[input.name] = input.value;
        });

        return values;
    }

    changeSubmitHandler(newSubmitHandler) {
        this._handleSubmit = newSubmitHandler;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (event) => {
            event.preventDefault();
            this._handleSubmit(this._getInputValues());
        });
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._saveButton.textContent = "Сохранение...";
        } else {
            this._saveButton.textContent = "Сохранить";
        }
    }

    close() {
        this._form.reset();
        super.close();
    }
}