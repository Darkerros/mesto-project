import '../pages/index.css'
import * as card from './card'
import * as modal from './modal'
import * as cardPopup from './addcardpopup'
import * as validate from './validate'
import * as profilePopup from "./editprofilepopup";




validate.enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__accept',
    inactiveButtonClass: 'form__accept_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input__error_visible'
});


// Card Popup
cardPopup.addCardButton.addEventListener("click", () => {
    cardPopup.popupCardFormNameInput.value = ''
    cardPopup.popupCardFormImageLink.value = ''
    modal.openPopup(cardPopup.popupCard)})
cardPopup.popupCard.addEventListener('mousedown',evt => modal.closePopupOnCloseButtonAndContainer(cardPopup.popupCard,evt))
cardPopup.popupCard.addEventListener('keydown',evt => modal.closePopupOnEsc(cardPopup.popupCard,evt))
cardPopup.popupCardForm.addEventListener("submit", (evt) => cardPopup.sendAddForm(evt))
// Profile popup
profilePopup.profileEditButton.addEventListener("click", () => profilePopup.openPopupProfileEdit(profilePopup.profilePopup));
profilePopup.profilePopup.addEventListener('mousedown',evt => modal.closePopupOnCloseButtonAndContainer(profilePopup.profilePopup,evt))
profilePopup.profilePopup.addEventListener('keydown',evt => modal.closePopupOnEsc(profilePopup.profilePopup,evt))
profilePopup.profilePopupForm.addEventListener("submit", (evt) => profilePopup.sendEditForm(evt));
