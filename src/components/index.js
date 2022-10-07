import '../pages/index.css'
import * as card from './card'
import * as modal from './modal'
import * as validate from './validate'
import * as consts from './consts'
import * as api from './api'
import * as profile from './profile'


export function getProfileNameAndAbout() {
    return {"name": consts.profileNameElement.textContent, "about": consts.profileAboutElement.textContent}
}
function disableButton(button){
    button.setAttribute("disabled",'disabled')
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
    api.updateProfile(consts.profilePopupNicknameInput.value,consts.profilePopupNicknameInput.value)
        .then(updateProfileInfo => {
            profile.setprofileInfo(updateProfileInfo.name,updateProfileInfo.about)
            modal.closePopup(consts.profilePopup);
            disableButton(consts.profilePopupSubmitButton)
        })
        .catch(errorResp => errorResp.json().then(error => {
            modal.closePopup(consts.profilePopup);
            disableButton(consts.profilePopupSubmitButton)
            modal.openErrorPopup(error.message)
        }))
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
;

Promise.all([api.getProfile(),api.getCards()])
    .then(dataList => {
        profile.setprofile(dataList[0])
        card.addCardsFromObjList(dataList[1])
        }
    )
    .catch(errorResp => errorResp.json().then(error => modal.openErrorPopup(error.message)))
