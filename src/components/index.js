import '../pages/index.css'
// import * as card from './card'
// import PopupWithImage from './PopupWithImage'
// import PopupWithForm from "./PopupWithForm"
// import Section from "./Section";
// import * as validate from './validate'
//import * as consts from './consts'
// import * as profile from './profile'
// import * as utils from './utils'
//
// export function getProfileNameAndAbout() {
//     return {"name": consts.profileNameElement.textContent, "about": consts.profileAboutElement.textContent}
// }
//
//
//
//
// function openPopupProfileEdit(editPopup) {
//     const profile = getProfileNameAndAbout()
//     consts.profilePopupNicknameInput.value = profile["name"];
//     consts.profilePopupAboutInput.value = profile["about"];
//     Popup.openPopup(editPopup);
// }
//
// function sendEditForm(evt) {
//     evt.preventDefault();
//     const nickname = consts.profilePopupNicknameInput.value
//     const about = consts.profilePopupAboutInput.value
//     utils.setButtonText(consts.profilePopupSubmitButton,'Идет сохранение...')
//     api.updateProfile(nickname,about)
//         .then(updateProfileInfo => {
//             utils.setButtonText(consts.profilePopupSubmitButton,'Успешно')
//             setTimeout(() => {
//                 evt.target.reset()
//                 profile.setProfile(updateProfileInfo)
//                 Popup.closePopup(consts.profilePopup);
//             },700)
//         })
//         .catch(errorResp => errorResp.json().then(error => {
//             Popup.closePopup(consts.profilePopup);
//             Popup.openErrorPopup(error.message)
//         }))
//         .finally(() => {
//             setTimeout(() => utils.setButtonText(consts.profilePopupSubmitButton,'Сохранить'),1000)
//         })
// }
// function sendAddForm(evt) {
//     evt.preventDefault();
//     const name = consts.popupCardFormNameInput.value
//     const link = consts.popupCardFormImageLink.value
//     utils.setButtonText(consts.popupCardFormSubmitButton,"Идет сохранение")
//     api.addCard(name,link)
//         .then(addedCardInfo => {
//             utils.setButtonText(consts.popupCardFormSubmitButton,"Успешно")
//             setTimeout(() => {
//                 evt.target.reset()
//                 Popup.closePopup(consts.popupCard)
//                 card.addCard(card.getFilledCard(addedCardInfo))
//             },1000)
//         })
//         .catch(errorResp => errorResp.json().then(error => {
//             utils.setButtonText(consts.popupCardFormSubmitButton,"Не удалось добавить карточку")
//             setTimeout(() => {
//                 Popup.closePopup(consts.popupCard)
//                 Popup.openErrorPopup(error.message)
//             },1000)
//         }))
//         .finally(() => {
//             setTimeout(() => utils.setButtonText(consts.popupCardFormSubmitButton,'Сохранить'),1000)
//         })
// }
//

//
// // validate.enableValidation({
// //     formSelector: '.form',
// //     inputSelector: '.form__input',
// //     submitButtonSelector: '.form__accept',
// //     inactiveButtonClass: 'form__accept_disabled',
// //     inputErrorClass: 'form__input_type_error',
// //     errorClass: 'form__input__error_visible'
// // });
//
//
//
// Promise.all([api.getProfile(),api.getCards()])
//     .then(([profileInfo,allCards]) => {
//         profile.setProfile(profileInfo)
//         card.addCardsFromObjList(allCards.reverse())
//         }
//     )
//     .catch(utils.handleError)




import PopupWithImage from "./PopupWithImage";
import PopupWithForm from "./PopupWithForm";
import {PopupWithError} from "./PopupWithError";
import UserInfo from "./UserInfo";
import {Api} from "./Api";

const api = new Api()

const profileController = new UserInfo(
    'profile__name',
    'profile__about',
    'profile__avatar',
    api)

// function sendUpdateAvatarForm(avatarLink){
//     this.renderLoading(true)
//     //utils.setButtonText(consts.avatarUpdatePopupSubmitBtn,"Идет сохранение...")
//     api.updateAvatar(avatarLink)
//         .then(profileInfo => {
//             //utils.setButtonText(consts.avatarUpdatePopupSubmitBtn,"Успешно")
//             setTimeout(() => {
//                 profile.setProfile(profileInfo)
//                 this.close()
//             },1000)
//         })
//         .catch(errorResp => errorResp.json().then(error => {
//             //utils.setButtonText(consts.avatarUpdatePopupSubmitBtn,"Произошла ошибка...")
//             setTimeout(() => {
//                 this.close()
//                 errorPopup.open(error.message)
//             },1000)
//         }))
//         .finally(() => {
//             setTimeout(() => utils.setButtonText(consts.avatarUpdatePopupSubmitBtn,'Сохранить'),1000)
//         })
// }

const avatarPopup = new PopupWithForm(
    '#popup-update-avatar',
    'popup_open',
    'popup__close-btn',
    (evt) => {
        evt.preventDefault()
    },
    '.form',
    '.form__accept',
    '.form__input')

const userEditPopup = new PopupWithForm(
    '#popup-edit-profile',
    'popup_open',
    'popup__close-btn',
    (evt) => {
        evt.preventDefault()
    },
    '.form',
    '.form__accept',
    '.form__input')

const cardPopup = new PopupWithForm(
    '#popup-add-card',
    'popup_open',
    'popup__close-btn',
    (evt) => {
        evt.preventDefault()
    },
    '.form',
    '.form__accept',
    '.form__input')


const imagePopup = new PopupWithImage(
    '#popup-selected-card',
    'popup_open',
    'popup__close-btn',
    '.popup__image',
    '.popup__img-description')

const errorPopup = new PopupWithError(
    '#popup-error',
    'popup_open',
    'popup__close-btn',
    '.form__error')



consts.addCardButton.addEventListener("click", () => cardPopup.open())
consts.profileEditButton.addEventListener("click", () => userEditPopup.open());
consts.avatarEditBtn.addEventListener('click',() => avatarPopup.open())

avatarPopup.setEventListeners()
userEditPopup.setEventListeners()
cardPopup.setEventListeners()
imagePopup.setEventListeners()
