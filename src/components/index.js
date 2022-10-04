import '../pages/index.css'
import * as card from './card'
import * as modal from './modal'
import * as validate from './validate'



function sendAddForm(evt) {
    evt.preventDefault();
    card.addCard(card.getFilledCard(modal.popupCardFormNameInput.value,modal.popupCardFormImageLink.value))
    modal.closePopup(modal.popupCard)
    modal.popupCardFormSubmitButton.setAttribute('disabled','disabled')
}
function openPopupProfileEdit(editPopup) {
    const profile = modal.getProfileNameAndAbout()
    modal.profilePopupNicknameInput.value = profile["name"];
    modal.profilePopupAboutInput.value = profile["about"];
    modal.openPopup(editPopup);
}
function sendEditForm(evt) {
    evt.preventDefault();
    modal.setProfileNameAndAbout(modal.profilePopupNicknameInput.value,modal.profilePopupAboutInput.value);
    modal.closePopup(modal.profilePopup);
    modal.profilePopupSubmitButton.setAttribute("disabled",'disabled')
}

validate.enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__accept',
    inactiveButtonClass: 'form__accept_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input__error_visible'
});


document.addEventListener('keydown',evt => modal.closePopupOnEsc(evt))
// Image popup
card.imagePopup.addEventListener('mousedown',evt => modal.closePopupOnCloseButtonAndContainer(card.imagePopup,evt))
// Card Popup
modal.addCardButton.addEventListener("click", () => {
    modal.popupCardFormNameInput.value = ''
    modal.popupCardFormImageLink.value = ''
    modal.openPopup(modal.popupCard)})
modal.popupCard.addEventListener('mousedown',evt => modal.closePopupOnCloseButtonAndContainer(modal.popupCard,evt))
modal.popupCardForm.addEventListener("submit", (evt) => sendAddForm(evt))
// Profile popup
modal.profileEditButton.addEventListener("click", () => openPopupProfileEdit(modal.profilePopup));
modal.profilePopup.addEventListener('mousedown',evt => modal.closePopupOnCloseButtonAndContainer(modal.profilePopup,evt))
modal.profilePopupForm.addEventListener("submit", (evt) => sendEditForm(evt));
