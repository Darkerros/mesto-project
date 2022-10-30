import './index.css'
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import {Api} from "../components/Api";
import * as consts from "../utils/consts";
import Section from "../components/Section";
import {Card} from "../components/Card";
import * as utils from "../utils/utils";
import FormValidator from "../components/FormValidator";
import {createCard} from "../utils/utils";
import {PopupWithError} from "../components/PopupWithError";

const api = new Api()

const profileController = new UserInfo(
    '.profile__name',
    '.profile__about',
    '.profile__avatar',
    api)

const errorPopup = new PopupWithError(
    '#popup-error',
    'popup_open',
    'popup__close-btn',
    '.form__error')


function openPopupProfileEdit() {
    profileController.getUserInfo().then(user => {
        consts.profilePopupNicknameInput.value = user.name;
        consts.profilePopupAboutInput.value = user.about;
        userEditPopup.open();
    })
}

function sendUpdateAvatarForm(data) {
    avatarPopup.renderLoading(true)
    profileController.updateUserAvatar(data['mesto-avatar-url'])
        .then(profileInfo => {
            avatarPopup.close()
        })
        .catch(errorResp => errorResp.json().then(error => {
            avatarPopup.close()
            errorPopup.open(error.message)
        }))
        .finally(() => avatarPopup.renderLoading(false))
}
function sendEditForm(data) {
    userEditPopup.renderLoading(true)
    profileController.setUserInfo(data['nickname-set'], data['about-set'])
        .then(updateProfileInfo => {
            userEditPopup.close()
        })
        .catch(errorResp => errorResp.json().then(error => {
            userEditPopup.close();
            errorPopup.open(error.message)
        }))
        .finally(() => userEditPopup.renderLoading(false))
}
function sendAddForm(data) {
    cardPopup.renderLoading(true)
    api.addCard(data['mesto-add'], data['mesto-img-url'])
        .then(addedCardInfo => {
            cardsSection.addItem(new Card('#card-template', addedCardInfo, profileController, api, imagePopup,errorPopup).getCard())
            cardPopup.close()
        })
        .catch(errorResp => errorResp.json().then(error => {
            cardPopup.close()
            errorPopup.open(error.message)
        }))
        .finally(() => cardPopup.renderLoading(false))
}

const avatarPopup = new PopupWithForm('#popup-update-avatar', sendUpdateAvatarForm, consts.popupWithFormBaseSettings)
const userEditPopup = new PopupWithForm('#popup-edit-profile', sendEditForm, consts.popupWithFormBaseSettings)
const cardPopup = new PopupWithForm('#popup-add-card', sendAddForm, consts.popupWithFormBaseSettings)
const imagePopup = new PopupWithImage('#popup-selected-card', consts.popupWithImageBassSettings)

const addCardFormValidator = new FormValidator(consts.validatorBaseSettings, consts.addCardFormElement)
const updateAvatarFormValidator = new FormValidator(consts.validatorBaseSettings, consts.updateAvatarFormElement)
const editProfileFormValidator = new FormValidator(consts.validatorBaseSettings, consts.editProfileFormElement)

let cardsSection;

consts.addCardButton.addEventListener("click", () => cardPopup.open())
consts.profileEditButton.addEventListener("click", () => openPopupProfileEdit());
consts.avatarEditBtn.addEventListener('click', () => avatarPopup.open())

avatarPopup.setEventListeners()
userEditPopup.setEventListeners()
cardPopup.setEventListeners()
imagePopup.setEventListeners()
errorPopup.setEventListeners()

addCardFormValidator.enableValidation()
updateAvatarFormValidator.enableValidation()
editProfileFormValidator.enableValidation()


Promise.all([profileController.getUserInfo(), api.getCards()])
    .then(([profileInfo, allCards]) => {
            cardsSection = new Section(
                {
                    items: allCards,
                    rendererFN: (item) => {
                        cardsSection.addItem(createCard(item,profileController,api,imagePopup,errorPopup))
                    }
                },
                '.elements')
            cardsSection.renderItems()
        }
    )
    .catch(utils.handleError)
