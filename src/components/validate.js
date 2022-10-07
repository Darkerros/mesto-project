function showInputError(errorElement,message,input,settings){
    errorElement.textContent = message
    input.classList.add(settings.inputErrorClass)
}
function hideInputError(errorElement,input,settings){
    errorElement.textContent = ''
    input.classList.remove(settings.inputErrorClass)
}
function isInputValid(input) {
    const isPatternValid = !input.validity.patternMismatch
    const isInputValid = input.validity.valid

    if (isPatternValid && !isInputValid){
        return {valid: false, message: input.validationMessage}
    }
    else if (!isPatternValid && !isInputValid){
        return {valid: false, message: input.dataset.errorMsg}
    }
    else if (isPatternValid && isInputValid){
        return {valid: true, message: ''}
    }
}
function validateInput(form,inputElement,settings){
    const currentErrorElement = form.querySelector('.'+inputElement.id + "-error")
    const isValid = isInputValid(inputElement)
    isValid.valid ? hideInputError(currentErrorElement,inputElement,settings) : showInputError(currentErrorElement,isValid.message,inputElement,isValid)
    return isValid.valid
}

function setEventListeners(formElement,settings){
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonSubmitElement = formElement.querySelector(settings.submitButtonSelector);

    formElement.addEventListener('reset', () => {
        setTimeout(() => {
            toggleButtonState(inputList, buttonSubmitElement,settings);
        }, 0);
    });
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {validateInput(formElement, inputElement,settings);
            toggleButtonState(inputList, buttonSubmitElement,settings);
        });
    });
}

function toggleButtonState(inputList, buttonElement,settings){
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled',"disabled")
        buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
        buttonElement.removeAttribute('disabled')
        buttonElement.classList.remove(settings.inactiveButtonClass);
    }
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !isInputValid(inputElement).valid;
    })
};

export function enableValidation(settings) {
    const formElementsList = document.querySelectorAll(settings.formSelector);
    formElementsList.forEach(form => setEventListeners(form,settings))
}






