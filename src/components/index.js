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
import {addCardFormElement, editProfileFormElement, updateAvatarFormElement} from "./consts";

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

function sendUpdateAvatarForm(avatarLink){
    this.renderLoading(true)
    //utils.setButtonText(consts.avatarUpdatePopupSubmitBtn,"Идет сохранение...")
    profileController.updateUserAvatar(avatarLink)
        .then(profileInfo => {
            //utils.setButtonText(consts.avatarUpdatePopupSubmitBtn,"Успешно")
            setTimeout(() => this.close(),1000)
        })
        .catch(errorResp => errorResp.json().then(error => {
            this.renderLoading(false)
            //utils.setButtonText(consts.avatarUpdatePopupSubmitBtn,"Произошла ошибка...")
            setTimeout(() => this.close(),1000)
            errorPopup.open(error.message)
        }))
        .finally(() => {
            setTimeout(() => this.renderLoading(false),1000)
            //setTimeout(() => utils.setButtonText(consts.avatarUpdatePopupSubmitBtn,'Сохранить'),1000)
        })
}
function sendEditForm(data) {
    console.log(data)
    //utils.setButtonText(consts.profilePopupSubmitButton,'Идет сохранение...')
    this.renderLoading(true)
    profileController.setUserInfo(data['nickname-set'],data['about-set'])
        .then(updateProfileInfo => {
            //utils.setButtonText(consts.profilePopupSubmitButton,'Успешно')
            setTimeout(() => this.close(),700)
        })
        .catch(errorResp => errorResp.json().then(error => {
            this.close();
            consts.errorPopup.open(error.message)
        }))
        .finally(() => {
            setTimeout(() => this.renderLoading(false),1000)
            //setTimeout(() => utils.setButtonText(consts.profilePopupSubmitButton,'Сохранить'),1000)
        })
}
function sendAddForm({name, link}) {
    //utils.setButtonText(consts.popupCardFormSubmitButton,"Идет сохранение")
    this.renderLoading(true)
    api.addCard(name,link)
        .then(addedCardInfo => {
            this.renderLoading(false)
            //utils.setButtonText(consts.popupCardFormSubmitButton,"Успешно")
            setTimeout(() => {
                this.close()
                //card.addCard(card.getFilledCard(addedCardInfo))
            },1000)
        })
        .catch(errorResp => errorResp.json().then(error => {
            //utils.setButtonText(consts.popupCardFormSubmitButton,"Не удалось добавить карточку")
            setTimeout(() => {
                this.close()
                errorPopup.open(error.message)
            },1000)
        }))
        .finally(() => {
            setTimeout(() => this.renderLoading(false),1000)
            //setTimeout(() => utils.setButtonText(consts.popupCardFormSubmitButton,'Сохранить'),1000)
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
            const cardsSection = new Section(
                {
                    items: allCards.reverse(),
                    rendererFN: (item) => {
                        cardsSection.addItem(new Card('#card-template', item, profileController, api, imagePopup).getCard())
                    }
                },
                '.elements')
            cardsSection.renderItems()
        }
    )
    //.catch(utils.handleError)
