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
function setButtonText(button,text){
    button.textContent = text
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
    const name = consts.popupCardFormNameInput.value
    const link = consts.popupCardFormImageLink.value
    setButtonText(consts.popupCardFormSubmitButton,"Идет сохранение")
    api.addCard(name,link)
        .then(addedCardInfo => {
        setButtonText(consts.popupCardFormSubmitButton,"Успешно")
        disableButton(consts.popupCardFormSubmitButton)
        setTimeout(() => {
            modal.closePopup(consts.popupCard)
            card.addCard(card.getFilledCard(addedCardInfo))
            setButtonText(consts.popupCardFormSubmitButton,"Сохранить")
            modal.openErrorPopup(error.message)
        },1000)
    })
        .catch(errorResp => errorResp.json().then(error => {

        setButtonText(consts.popupCardFormSubmitButton,"Не удалось добавить карточку")
        disableButton(consts.popupCardFormSubmitButton)
        setTimeout(() => {
            modal.closePopup(consts.popupCard)
            setButtonText(consts.popupCardFormSubmitButton,"Сохранить")
            modal.openErrorPopup(error.message)
        },1000)
    }))


}

function sendUpdateAvatarForm(evt){
    evt.preventDefault();
    const avatarUrl = consts.avatarUpdatePopupInput.value
    setButtonText(consts.avatarUpdatePopupSubmitBtn,"Сохраняю...")
    api.updateAvatar(avatarUrl)
        .then(profileInfo => {
            setButtonText(consts.avatarUpdatePopupSubmitBtn,"Успешно")
            disableButton(consts.avatarUpdatePopupSubmitBtn)
            profile.setprofile(profileInfo)
            modal.closePopup(consts.avatarUpdatePopup)
            setButtonText(consts.avatarUpdatePopupSubmitBtn,"Сохранить")
            consts.avatarUpdatePopupInput.value = ''
        })
        .catch(errorResp => errorResp.json().then(error => {
            modal.closePopup(consts.avatarUpdatePopup)
            disableButton(consts.avatarUpdatePopupSubmitBtn)
            modal.openErrorPopup(error.message)
            setButtonText(consts.avatarUpdatePopupSubmitBtn,"Сохранить")
            consts.avatarUpdatePopupInput.value = ''
        }))
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
// Update avatar
consts.avatarEditBtn.addEventListener('click',() => modal.openUpdateAvatarPopup())
consts.avatarUpdatePopupForm.addEventListener('submit',(evt) => sendUpdateAvatarForm(evt))

consts.allPopups.forEach(popup => popup.addEventListener('mousedown',evt => modal.closePopupOnCloseButtonAndContainer(popup,evt)))
;

Promise.all([api.getProfile(),api.getCards()])
    .then(dataList => {
        profile.setprofile(dataList[0])
        card.addCardsFromObjList(dataList[1].reverse())
        }
    )
    .catch(errorResp => errorResp.json().then(error => modal.openErrorPopup(error.message)))
