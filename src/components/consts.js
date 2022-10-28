import {PopupWithError} from "./PopupWithError";

export const errorPopup = new PopupWithError(
    '#popup-error',
    'popup_open',
    'popup__close-btn',
    '.form__error')

export const addCardButton = document.querySelector(".profile").querySelector('.profile__add-button');
export const profileEditButton = document.querySelector('.profile').querySelector('.profile__edit-btn');
export const avatarEditBtn = document.querySelector('.profile__avatar-group')
//Profile popup
export const profilePopup = document.querySelector('#popup-edit-profile');
export const profilePopupNicknameInput = profilePopup.querySelector('#form-nickname-input');
export const profilePopupAboutInput = profilePopup.querySelector('#form-about-input');
//Profile
export const profileNameElement = document.querySelector('.profile').querySelector('.profile__name');
export const profileAboutElement = document.querySelector('.profile').querySelector('.profile__about');

