import {addCard, getFilledCard} from "./card";

export const addCardButton = document.querySelector(".profile").querySelector('.profile__add-button');
export const popupCard = document.querySelector('#popup-add-card');
export const popupCardForm = popupCard.querySelector(".form");
const popupCardFormSubmitButton = popupCard.querySelector(".form__accept");
export const popupCardFormNameInput = popupCardForm.querySelector("#form__mesto-input");
export const popupCardFormImageLink = popupCardForm.querySelector("#form__mesto-img-url-input");

export function sendAddForm(evt) {
    evt.preventDefault();
    addCard(getFilledCard(popupCardFormNameInput.value,popupCardFormImageLink.value))
    closePopup(popupCard)
    popupCardFormSubmitButton.setAttribute('disabled','disabled')
}

