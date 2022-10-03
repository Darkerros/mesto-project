import '../pages/index.css'
import './card'
import './modal'
import './editprofilepopup'
import './addcardpopup'
import * as validate from './validate'



validate.enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__accept',
    inactiveButtonClass: 'form__accept_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input__error_visible'
});

