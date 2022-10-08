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
    modal.openPopup(consts.popupCard)
}
function sendEditForm(evt) {
    evt.preventDefault();
    const nickname = consts.profilePopupNicknameInput.value
    const about = consts.profilePopupAboutInput.value
    evt.target.reset()
    setButtonText(consts.profilePopupSubmitButton,'Идет сохранение...')
    disableButton(consts.profilePopupSubmitButton)
    api.updateProfile(nickname,about)
        .then(updateProfileInfo => {
            setButtonText(consts.profilePopupSubmitButton,'Успешно')
            setTimeout(() => {
                profile.setprofileInfo(updateProfileInfo.name,updateProfileInfo.about)
                modal.closePopup(consts.profilePopup);
            },700)
        })
        .catch(errorResp => errorResp.json().then(error => {
            modal.closePopup(consts.profilePopup);
            modal.openErrorPopup(error.message)
        }))
        .finally(() => {
            setTimeout(() => setButtonText(consts.profilePopupSubmitButton,'Сохранить'),1000)

        })
}
function sendAddForm(evt) {
    evt.preventDefault();
    const name = consts.popupCardFormNameInput.value
    const link = consts.popupCardFormImageLink.value
    evt.target.reset()
    disableButton(consts.popupCardFormSubmitButton)
    setButtonText(consts.popupCardFormSubmitButton,"Идет сохранение")
    api.addCard(name,link)
        .then(addedCardInfo => {
            setButtonText(consts.popupCardFormSubmitButton,"Успешно")
            setTimeout(() => {
                modal.closePopup(consts.popupCard)
                card.addCard(card.getFilledCard(addedCardInfo))
            },1000)
        })
        .catch(errorResp => errorResp.json().then(error => {
            setButtonText(consts.popupCardFormSubmitButton,"Не удалось добавить карточку")
            setTimeout(() => {
                modal.closePopup(consts.popupCard)
                modal.openErrorPopup(error.message)
            },1000)
        }))
        .finally(() => {
            setTimeout(() => setButtonText(consts.popupCardFormSubmitButton,'Сохранить'),1000)

        })
}

function sendUpdateAvatarForm(evt){
    evt.preventDefault();
    const avatarUrl = consts.avatarUpdatePopupInput.value
    evt.target.reset()
    setButtonText(consts.avatarUpdatePopupSubmitBtn,"Идет сохранение...")
    disableButton(consts.avatarUpdatePopupSubmitBtn)
    api.updateAvatar(avatarUrl)
        .then(profileInfo => {
            setButtonText(consts.avatarUpdatePopupSubmitBtn,"Успешно")
            setTimeout(() => {
                profile.setprofile(profileInfo)
                modal.closePopup(consts.avatarUpdatePopup)
            },1000)
        })
        .catch(errorResp => errorResp.json().then(error => {
            setButtonText(consts.avatarUpdatePopupSubmitBtn,"Произошла ошибка...")
            setTimeout(() => {
                modal.closePopup(consts.avatarUpdatePopup)
                modal.openErrorPopup(error.message)
            },1000)
        }))
        .finally(() => {
            setTimeout(() => setButtonText(consts.avatarUpdatePopupSubmitBtn,'Сохранить'),1000)

        })
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
