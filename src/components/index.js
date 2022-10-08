import '../pages/index.css'
import * as card from './card'
import * as modal from './modal'
import * as validate from './validate'
import * as consts from './consts'
import * as api from './api'
import * as profile from './profile'
import * as utils from './utils'

export function getProfileNameAndAbout() {
    return {"name": consts.profileNameElement.textContent, "about": consts.profileAboutElement.textContent}
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
    utils.setButtonText(consts.profilePopupSubmitButton,'Идет сохранение...')
    api.updateProfile(nickname,about)
        .then(updateProfileInfo => {
            utils.setButtonText(consts.profilePopupSubmitButton,'Успешно')
            setTimeout(() => {
                evt.target.reset()
                profile.setProfile(updateProfileInfo)
                modal.closePopup(consts.profilePopup);
            },700)
        })
        .catch(errorResp => errorResp.json().then(error => {
            modal.closePopup(consts.profilePopup);
            modal.openErrorPopup(error.message)
        }))
        .finally(() => {
            setTimeout(() => utils.setButtonText(consts.profilePopupSubmitButton,'Сохранить'),1000)
        })
}
function sendAddForm(evt) {
    evt.preventDefault();
    const name = consts.popupCardFormNameInput.value
    const link = consts.popupCardFormImageLink.value
    utils.setButtonText(consts.popupCardFormSubmitButton,"Идет сохранение")
    api.addCard(name,link)
        .then(addedCardInfo => {
            utils.setButtonText(consts.popupCardFormSubmitButton,"Успешно")
            setTimeout(() => {
                evt.target.reset()
                modal.closePopup(consts.popupCard)
                card.addCard(card.getFilledCard(addedCardInfo))
            },1000)
        })
        .catch(errorResp => errorResp.json().then(error => {
            utils.setButtonText(consts.popupCardFormSubmitButton,"Не удалось добавить карточку")
            setTimeout(() => {
                modal.closePopup(consts.popupCard)
                modal.openErrorPopup(error.message)
            },1000)
        }))
        .finally(() => {
            setTimeout(() => utils.setButtonText(consts.popupCardFormSubmitButton,'Сохранить'),1000)
        })
}

function sendUpdateAvatarForm(evt){
    evt.preventDefault();
    const avatarUrl = consts.avatarUpdatePopupInput.value
    utils.setButtonText(consts.avatarUpdatePopupSubmitBtn,"Идет сохранение...")
    api.updateAvatar(avatarUrl)
        .then(profileInfo => {
            utils.setButtonText(consts.avatarUpdatePopupSubmitBtn,"Успешно")
            setTimeout(() => {
                evt.target.reset()
                profile.setProfile(profileInfo)
                modal.closePopup(consts.avatarUpdatePopup)
            },1000)
        })
        .catch(errorResp => errorResp.json().then(error => {
            utils.setButtonText(consts.avatarUpdatePopupSubmitBtn,"Произошла ошибка...")
            setTimeout(() => {
                modal.closePopup(consts.avatarUpdatePopup)
                modal.openErrorPopup(error.message)
            },1000)
        }))
        .finally(() => {
            setTimeout(() => utils.setButtonText(consts.avatarUpdatePopupSubmitBtn,'Сохранить'),1000)
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
consts.addCardButton.addEventListener("click", openPopupAddCard)
consts.popupCardForm.addEventListener("submit", sendAddForm)
// Profile popup
consts.profileEditButton.addEventListener("click", () => openPopupProfileEdit(consts.profilePopup));
consts.profilePopupForm.addEventListener("submit", sendEditForm);
// Update avatar
consts.avatarEditBtn.addEventListener('click',modal.openUpdateAvatarPopup)
consts.avatarUpdatePopupForm.addEventListener('submit',sendUpdateAvatarForm)

consts.allPopups.forEach(popup => popup.addEventListener('mousedown',evt => modal.closePopupOnCloseButtonAndContainer(popup,evt)))
;

Promise.all([api.getProfile(),api.getCards()])
    .then(([profileInfo,allCards]) => {
        profile.setProfile(profileInfo)
        card.addCardsFromObjList(allCards.reverse())
        }
    )
    .catch(utils.handleError)
