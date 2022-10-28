import Popup from "./Popup";







export const allPopups = document.querySelectorAll('.popup')
//Card popup
export const addCardButton = document.querySelector(".profile").querySelector('.profile__add-button');
export const popupCard = document.querySelector('#popup-add-card');
export const popupCardForm = popupCard.querySelector(".form");
export const popupCardFormSubmitButton = popupCard.querySelector(".form__accept");
export const popupCardFormNameInput = popupCardForm.querySelector("#form__mesto-input");
export const popupCardFormImageLink = popupCardForm.querySelector("#form__mesto-img-url-input");

//Profile popup
export const profilePopup = document.querySelector('#popup-edit-profile');
export const profilePopupForm = profilePopup.querySelector('.form');
export const profilePopupNicknameInput = profilePopupForm.querySelector('#form-nickname-input');
export const profilePopupAboutInput = profilePopupForm.querySelector('#form-about-input');
export const profilePopupSubmitButton = profilePopupForm.querySelector('.form__accept-profile-edit');
export const profileEditButton = document.querySelector('.profile').querySelector('.profile__edit-btn');

//Profile
export const profileNameElement = document.querySelector('.profile').querySelector('.profile__name');
export const profileAboutElement = document.querySelector('.profile').querySelector('.profile__about');

//Cards
export const cardsInfoObjList = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
export const imagePopup = document.querySelector('#popup-selected-card');
export const imagePopupImg = imagePopup.querySelector('.popup__image');
export const imagePopupImgDescription = imagePopup.querySelector(".popup__img-description");

export const elementsSection = document.querySelector(".elements");

// Error popup
export const errorPopupMessageElement = errorPopup.querySelector('.form__error')
// accept popup
export const acceptPopup = document.querySelector('#popup-error')
// Update avatar popup
export const avatarUpdatePopup = document.querySelector('#popup-update-avatar')
export const avatarUpdatePopupForm = avatarUpdatePopup.querySelector('.form')
export const avatarUpdatePopupInput = avatarUpdatePopup.querySelector('#form__mesto-avatar-url-input')
export const avatarUpdatePopupSubmitBtn = avatarUpdatePopup.querySelector('.form__accept')
// Avatar edit
export const avatarEditBtn = document.querySelector('.profile__avatar-group')
export const avatarElement = document.querySelector('.profile__avatar')