import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(
        popupSelector,
        handleSubmit, {
            popupOpenSelector,
            popupCloseButtonClass,
            formSelector,
            saveButtonSelector,
            inputSelector
        }) {
        super(popupSelector, popupOpenSelector, popupCloseButtonClass);
        this._handleSubmit = handleSubmit;
        this._form = this._popupElement.querySelector(formSelector);
        this._saveButton = this._form.querySelector(saveButtonSelector);
        this._inputs = this._form.querySelectorAll(inputSelector);
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