import {PopupWithError} from "../components/PopupWithError";


export const addCardButton = document.querySelector(".profile").querySelector('.profile__add-button');
export const profileEditButton = document.querySelector('.profile').querySelector('.profile__edit-btn');
export const avatarEditBtn = document.querySelector('.profile__avatar-group')
//Profile popup
export const profilePopup = document.querySelector('#popup-edit-profile');
export const profilePopupNicknameInput = profilePopup.querySelector('#form-nickname-input');
export const profilePopupAboutInput = profilePopup.querySelector('#form-about-input');
//Forms
export const addCardFormElement = document.querySelector('#popup-add-card').querySelector('.form');
export const updateAvatarFormElement = document.querySelector('#popup-update-avatar').querySelector('.form');
export const editProfileFormElement = document.querySelector('#popup-edit-profile').querySelector('.form');
//
export const validatorBaseSettings = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__accept',
    inactiveButtonClass: 'form__accept_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input__error_visible'
}
export const popupWithFormBaseSettings = {
    popupOpenSelector: 'popup_open',
    popupCloseButtonClass: 'popup__close-btn',
    formSelector: '.form',
    saveButtonSelector: '.form__accept',
    inputSelector: '.form__input'
}
export const popupWithImageBassSettings = {
    popupOpenClass: 'popup_open',
    popupCloseButtonClass: 'popup__close-btn',
    imageSelector: '.popup__image',
    imageDescriptionSelector: '.popup__img-description'
}

