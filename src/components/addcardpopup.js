import {closePopup, openPopup} from "./modal";
import {addCard, getFilledCard} from "./card";

const addCardButton = document.querySelector(".profile").querySelector('.profile__add-button');
const addCardPopup = document.querySelector('#popup-add-card');
const addCardForm = addCardPopup.querySelector(".form");
const addCardFormCardNameInput = addCardForm.querySelector("#form__mesto-input");
const addCardFormCardImageLink = addCardForm.querySelector("#form__mesto-img-url-input");

function sendAddForm(evt) {
    evt.preventDefault();
    if (addCardFormCardNameInput.value && addCardFormCardImageLink.value) {
        const mestoName = addCardFormCardNameInput.value;
        const mestoImageUrl = addCardFormCardImageLink.value;
        addCardFormCardNameInput.value = ''
        addCardFormCardImageLink.value = ''

        addCard(getFilledCard(mestoName, mestoImageUrl));
        closePopup(addCardPopup);
    } else {
        alert("Не все поля заполнены")
    }
}

addCardButton.addEventListener("click", () => {
    addCardFormCardNameInput.value = ''
    addCardFormCardImageLink.value = ''
    openPopup(addCardPopup)})
addCardForm.addEventListener("submit", (evt) => sendAddForm(evt))