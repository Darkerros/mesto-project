import '../pages/index.css'
import * as card from './card'
import * as modal from './modal'
import * as validate from './validate'
import * as consts from './consts'
import './api'


export function getProfileNameAndAbout() {
    return {"name": consts.profileNameElement.textContent, "about": consts.profileAboutElement.textContent}
}
export function setProfileNameAndAbout(name, about) {
    consts.profileNameElement.textContent = name;
    consts.profileAboutElement.textContent = about;
}

function openPopupProfileEdit(editPopup) {
    const profile = getProfileNameAndAbout()
    consts.profilePopupNicknameInput.value = profile["name"];
    consts.profilePopupAboutInput.value = profile["about"];
    modal.openPopup(editPopup);
}
function openPopupAddCard(){
    consts.popupCardFormNameInput.value = ''
    consts.popupCardFormImageLink.value = ''
    modal.openPopup(consts.popupCard)
}
function sendEditForm(evt) {
    evt.preventDefault();
    setProfileNameAndAbout(consts.profilePopupNicknameInput.value,consts.profilePopupAboutInput.value);
    modal.closePopup(consts.profilePopup);
    consts.profilePopupSubmitButton.setAttribute("disabled",'disabled')
}
function sendAddForm(evt) {
    evt.preventDefault();
    card.addCard(card.getFilledCard(consts.popupCardFormNameInput.value,consts.popupCardFormImageLink.value))
    modal.closePopup(consts.popupCard)
    consts.popupCardFormSubmitButton.setAttribute('disabled','disabled')
}

validate.enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__accept',
    inactiveButtonClass: 'form__accept_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input__error_visible'
});
// Card Popup
consts.addCardButton.addEventListener("click", () => {openPopupAddCard()})
consts.popupCardForm.addEventListener("submit", (evt) => sendAddForm(evt))
// Profile popup
consts.profileEditButton.addEventListener("click", () => openPopupProfileEdit(consts.profilePopup));
consts.profilePopupForm.addEventListener("submit", (evt) => sendEditForm(evt));

consts.allPopups.forEach(popup => popup.addEventListener('mousedown',evt => modal.closePopupOnCloseButtonAndContainer(popup,evt)))
card.addCardsFromObjList(consts.cardsInfoObjList);
