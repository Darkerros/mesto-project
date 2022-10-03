import {openPopup} from "./modal";

const cardsInfoObjList = [
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

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const imagePopup = document.querySelector('#popup-selected-card');
const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupImgDescription = imagePopup.querySelector(".popup__img-description");

const elementsSection = document.querySelector(".elements");

export function addCard(filledCard) {
    elementsSection.prepend(filledCard);
}
export function getFilledCard(name, link) {
    const currentCard = cardTemplate.cloneNode(true);
    const cardImage = currentCard.querySelector('.card__image')
    cardImage.src = link;
    cardImage.alt = name;
    currentCard.querySelector('.card__description-text').textContent = name;
    currentCard.querySelector('.card__remove-icon').addEventListener("click", (evt) => clickRemoveButton(evt));
    currentCard.querySelector('.card__description-like').addEventListener("click", (evt) => clickLikeButton(evt));
    cardImage.addEventListener("click", (evt) => openPopupImage(evt));
    return currentCard
}
function addCardsFromObjList(cardsList) {
    if (cardsList) cardsList.forEach(card => addCard(getFilledCard(card["name"], card["link"])))
}
function clickRemoveButton(evt) {
    const elementToRemove = evt.target.closest('.card');
    elementToRemove.remove();
}
function clickLikeButton(evt) {
    evt.target.closest('.card__description-like').classList.toggle("card__description-like_active");
}

function openPopupImage(evt) {
    imagePopupImg.src = evt.target.src;
    imagePopupImg.alt = evt.target.alt;
    imagePopupImgDescription.textContent = evt.target.alt;
    openPopup(imagePopup);
}

addCardsFromObjList(cardsInfoObjList);

