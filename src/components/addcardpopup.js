import {addCard, getFilledCard} from "./card";

const addCardButton = document.querySelector(".profile").querySelector('.profile__add-button');
const popupCard = document.querySelector('#popup-add-card');
const popupCardForm = popupCard.querySelector(".form");
const popupCardFormSubmitButton = popupCard.querySelector(".form__accept");
const popupCardFormNameInput = popupCardForm.querySelector("#form__mesto-input");
const popupCardFormImageLink = popupCardForm.querySelector("#form__mesto-img-url-input");

function sendAddForm(evt) {
    evt.preventDefault();
    addCard(getFilledCard(popupCardFormNameInput.value,popupCardFormImageLink.value))
    closePopup(popupCard)
    popupCardFormSubmitButton.setAttribute('disabled','disabled')
}

addCardButton.addEventListener("click", () => {
    popupCardFormNameInput.value = ''
    popupCardFormImageLink.value = ''
    openPopup(popupCard)}
)

popupCardForm.addEventListener("submit", (evt) => sendAddForm(evt))