import '../pages/index.css'
import PopupWithImage from "./PopupWithImage";
import PopupWithForm from "./PopupWithForm";
import {PopupWithError} from "./PopupWithError";
import UserInfo from "./UserInfo";
import {Api} from "./Api";
import * as consts from "./consts";
import Section from "./Section";
import {Card} from "./Card";
import * as utils from "./utils";
import FormValidator from "./FormValidator";

const api = new Api()

const profileController = new UserInfo(
    '.profile__name',
    '.profile__about',
    '.profile__avatar',
    api)


export function getProfileNameAndAbout() {
    return {"name": consts.profileNameElement.textContent, "about": consts.profileAboutElement.textContent}
}
function openPopupProfileEdit() {
    const profile = getProfileNameAndAbout()
    consts.profilePopupNicknameInput.value = profile["name"];
    consts.profilePopupAboutInput.value = profile["about"];
    userEditPopup.open();
}

function sendUpdateAvatarForm(data){
    this.renderLoading(true)
    profileController.updateUserAvatar(data['mesto-avatar-url'])
        .then(profileInfo => {
            setTimeout(() => this.close(),1000)
        })
        .catch(errorResp => errorResp.json().then(error => {
            this.renderLoading(false)
            setTimeout(() => this.close(),1000)
            consts.errorPopup.open(error.message)
        }))
        .finally(() => {
            setTimeout(() => this.renderLoading(false),1000)
        })
}
function sendEditForm(data) {
    console.log(data)
    this.renderLoading(true)
    profileController.setUserInfo(data['nickname-set'],data['about-set'])
        .then(updateProfileInfo => {
            setTimeout(() => this.close(),700)
        })
        .catch(errorResp => errorResp.json().then(error => {
            this.close();
            consts.errorPopup.open(error.message)
        }))
        .finally(() => {
            setTimeout(() => this.renderLoading(false),1000)
        })
}
function sendAddForm(data) {
    this.renderLoading(true)
    api.addCard(data['mesto-add'],data['mesto-img-url'])
        .then(addedCardInfo => {
            this.renderLoading(false)
            cardsSection.addItem(new Card('#card-template', addedCardInfo, profileController, api, imagePopup).getCard())
            setTimeout(() => {
                this.close()
            },1000)
        })
        .catch(errorResp => errorResp.json().then(error => {
            setTimeout(() => {
                this.close()
                consts.errorPopup.open(error.message)
            },1000)
        }))
        .finally(() => {
            setTimeout(() => this.renderLoading(false),1000)
        })
}

const avatarPopup = new PopupWithForm(
    '#popup-update-avatar',
    'popup_open',
    'popup__close-btn',
    sendUpdateAvatarForm,
    '.form',
    '.form__accept',
    '.form__input')

const userEditPopup = new PopupWithForm(
    '#popup-edit-profile',
    'popup_open',
    'popup__close-btn',
    sendEditForm,
    '.form',
    '.form__accept',
    '.form__input')

const cardPopup = new PopupWithForm(
    '#popup-add-card',
    'popup_open',
    'popup__close-btn',
    sendAddForm,
    '.form',
    '.form__accept',
    '.form__input')


const imagePopup = new PopupWithImage(
    '#popup-selected-card',
    'popup_open',
    'popup__close-btn',
    '.popup__image',
    '.popup__img-description')

const addCardFormValidator = new FormValidator(
    {
        formSelector: '.form',
        inputSelector: '.form__input',
        submitButtonSelector: '.form__accept',
        inactiveButtonClass: 'form__accept_disabled',
        inputErrorClass: 'form__input_type_error',
        errorClass: 'form__input__error_visible'
    },
    consts.addCardFormElement
)

const updateAvatarFormValidator = new FormValidator(
    {
        formSelector: '.form',
        inputSelector: '.form__input',
        submitButtonSelector: '.form__accept',
        inactiveButtonClass: 'form__accept_disabled',
        inputErrorClass: 'form__input_type_error',
        errorClass: 'form__input__error_visible'
    },
    consts.updateAvatarFormElement
)

const editProfileFormValidator = new FormValidator(
    {
        formSelector: '.form',
        inputSelector: '.form__input',
        submitButtonSelector: '.form__accept',
        inactiveButtonClass: 'form__accept_disabled',
        inputErrorClass: 'form__input_type_error',
        errorClass: 'form__input__error_visible'
    },
    consts.editProfileFormElement
)

let cardsSection = new Section(
    {
        items: [],
        rendererFN: (item) => {
            cardsSection.addItem(new Card('#card-template', item, profileController, api, imagePopup).getCard())
        }
    },
    '.elements')

consts.addCardButton.addEventListener("click", () => cardPopup.open())
consts.profileEditButton.addEventListener("click", () => openPopupProfileEdit());
consts.avatarEditBtn.addEventListener('click',() => avatarPopup.open())

avatarPopup.setEventListeners()
userEditPopup.setEventListeners()
cardPopup.setEventListeners()
imagePopup.setEventListeners()

consts.errorPopup.setEventListeners()

addCardFormValidator.enableValidation()
updateAvatarFormValidator.enableValidation()
editProfileFormValidator.enableValidation()



Promise.all([profileController.getUserInfo(),api.getCards()])
    .then(([profileInfo,allCards]) => {
            cardsSection = new Section(
                {
                    items: allCards,
                    rendererFN: (item) => {
                        cardsSection.addItem(new Card('#card-template', item, profileController, api, imagePopup).getCard())
                    }
                },
                '.elements')
            cardsSection.renderItems()
        }
    )
    .catch(utils.handleError)
