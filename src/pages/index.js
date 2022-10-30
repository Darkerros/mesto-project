import './index.css'
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import {Api} from "../components/Api";
import * as consts from "../utils/consts";
import Section from "../components/Section";
import FormValidator from "../components/FormValidator";
import {createCard, handleError} from "../utils/utils";
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
    }).catch(errorResp => handleError(errorResp, errorPopup))
}

function sendUpdateAvatarForm(data) {
    avatarPopup.renderLoading(true)
    profileController.updateUserAvatar(data['mesto-avatar-url'])
        .then(profileInfo => null)
        .catch(errorResp => handleError(errorResp, errorPopup))
        .finally(() => {
            avatarPopup.close()
            avatarPopup.renderLoading(false)
        })
}

function sendEditForm(data) {
    userEditPopup.renderLoading(true)
    profileController.setUserInfo(data['nickname-set'], data['about-set'])
        .then(updateProfileInfo => null)
        .catch(errorResp => handleError(errorResp, errorPopup))
        .finally(() => {
            userEditPopup.close();
            userEditPopup.renderLoading(false)
        })
}

function sendAddForm(data) {
    cardPopup.renderLoading(true)
    api.addCard(data['mesto-add'], data['mesto-img-url'])
        .then(addedCardInfo => {
            cardsSection.addItem(createCard(addedCardInfo, profileController, api, imagePopup, errorPopup))
        })
        .catch(errorResp => handleError(errorResp, errorPopup))
        .finally(() => {
            cardPopup.close()
            cardPopup.renderLoading(false)
        })
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
                        cardsSection.addItem(createCard(item, profileController, api, imagePopup, errorPopup))
                    }
                },
                '.elements')
            cardsSection.renderItems()
        }
    )
    .catch(errorResp => handleError(errorResp, errorPopup))
