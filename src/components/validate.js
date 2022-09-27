function showInputError(errorElement,message){
    errorElement.textContent = message
}
function hideInputError(errorElement){
    errorElement.textContent = ''
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
function validateInput(form,evt){
    const currentInput = evt.target
    const currentErrorElement = form.querySelector('.'+currentInput.id + "-error")
    let isValid = isInputValid(currentInput)
    isValid.valid ? hideInputError(currentErrorElement) : showInputError(currentErrorElement,isValid.message)

    return isValid.valid
}

function disableEnableButton(button,status) {
    if (!status){
        button.setAttribute("disabled", "disabled")
    }
    else {
        button.removeAttribute("disabled")
    }

}
function validateForm(form,evt,inputslist,submitButton) {
    if (inputslist.indexOf(evt.target) !== -1){
        validateInput(form,evt)
    }

    const validateInputInfo = inputslist.map((input) => {return isInputValid(input).valid})
    const isFormValid = validateInputInfo.indexOf(false) !== -1 ? false : true

    disableEnableButton(submitButton,isFormValid)
}
function enableValidation(formSelector,inputsSelectorList,submitButtonSelector){
    const form = document.querySelector(formSelector)
    const inputslist = inputsSelectorList.map((inputSelector) => {return form.querySelector(inputSelector)})
    const submitButton = form.querySelector(submitButtonSelector)
    form.addEventListener("input",(evt) => validateForm(form,evt,inputslist,submitButton))
}


module.exports = {enableValidation}