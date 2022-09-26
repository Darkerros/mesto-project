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
const addCardButton = document.querySelector(".profile").querySelector('.profile__add-button');
const addCardPopup = document.querySelector('#popup-add-card');
const addCardForm = addCardPopup.querySelector(".form");
const addCardCloseButton = addCardPopup.querySelector(".popup__close-btn");
const addCardFormCardNameInput = addCardForm.querySelector("#form__mesto-input");
const addCardFormCardImageLink = addCardForm.querySelector("#form__mesto-img-url-input");
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const selectCardImagePopup = document.querySelector('#popup-selected-card');
const selectCardPopupCloseButton = selectCardImagePopup.querySelector('.popup__close-btn');
const selcetCardImage = selectCardImagePopup.querySelector('.popup__image');
const selcetCardDesription = selectCardImagePopup.querySelector(".popup__img-description");
const elementsSection = document.querySelector(".elements");

function addCard(filledCard){
    elementsSection.insertAdjacentElement("afterbegin",filledCard);
}
function getFilledCard(name,link){
    const currentCard = cardTemplate.cloneNode(true);
    currentCard.querySelector('.card__image').src = link;
    currentCard.querySelector('.card__image').alt = name;
    currentCard.querySelector('.card__description-text').textContent = name;
    currentCard.querySelector('.card__remove-icon').addEventListener("click",(evt) => removeCard(evt));
    currentCard.querySelector('.card__description-like').addEventListener("click",(evt) => likeClicked(evt));
    currentCard.querySelector('.card__image').addEventListener("click",(evt)=>openPopupImage(evt));
    return currentCard
}
function addCardsFromObjList(cardsList){
    if (cardsList){
        for (let cardsInfo of cardsList){
            const filledCard = getFilledCard(cardsInfo["name"],cardsInfo["link"]);
            addCard(filledCard);
        }
    }
}
function removeCard (evt){
    const elementToRemove = evt.target.closest('.card');
    elementToRemove.remove();
}
function likeClicked(evt){
    evt.target.closest('.card__description-like').classList.toggle("card__description-like_active");
}


addCardsFromObjList(cardsInfoObjList);
// Open, Close, Submit Add Card Form
addCardButton.addEventListener("click",() => openPopup(addCardPopup));
addCardCloseButton.addEventListener("click",() => closePopup(addCardPopup));
addCardForm.addEventListener("submit",(evt) => sendAddForm(evt));
//Close Image popup
selectCardPopupCloseButton.addEventListener("click",() => closePopup(selectCardImagePopup));