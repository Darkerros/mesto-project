export default class FormValidator {
    constructor({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}, formElement) {
        this._formElement = formElement;
        this._formSelector = formSelector;
        this._inputSelector = inputSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._inactiveButtonClass = inactiveButtonClass;
        this._inputErrorClass = inputErrorClass;
        this._errorClass = errorClass;
    }

    _showInputError(errorElement, message, input) {
        errorElement.textContent = message
        input.classList.add(this._inputErrorClass)
    }

    _hideInputError(errorElement, input) {
        errorElement.textContent = ''
        input.classList.remove(this._inputErrorClass)
    }

    _isInputValid(input) {
        const isPatternValid = !input.validity.patternMismatch
        const isInputValid = input.validity.valid

        if (isPatternValid && !isInputValid) {
            return {valid: false, message: input.validationMessage}
        } else if (!isPatternValid && !isInputValid) {
            return {valid: false, message: input.dataset.errorMsg}
        } else if (isPatternValid && isInputValid) {
            return {valid: true, message: ''}
        }
    }

    _validateInput(inputElement) {
        const currentErrorElement = this._formElement.querySelector('.' + inputElement.id + "-error")
        const isValid = this._isInputValid(inputElement)
        isValid.valid ? this._hideInputError(currentErrorElement, inputElement) : this._showInputError(currentErrorElement, isValid.message, inputElement, isValid)
        return isValid.valid
    }

    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonSubmitElement = this._formElement.querySelector(this._submitButtonSelector);

        this._formElement.addEventListener('reset', () => {
            setTimeout(() => {
                this._toggleButtonState(inputList, buttonSubmitElement);
            }, 0);
        });
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._validateInput(inputElement);
                this._toggleButtonState(inputList, buttonSubmitElement);
            });
        });
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.setAttribute('disabled', "disabled")
            buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            buttonElement.removeAttribute('disabled')
            buttonElement.classList.remove(this._inactiveButtonClass);
        }
    };

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !this._isInputValid(inputElement).valid;
        })
    };

    enableValidation() {
        this._setEventListeners()
    }
}





