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


const editProfileButton = document.querySelector('.profile').querySelector('.profile__edit-btn');
const editProfilePopup = document.querySelector('#popup-edit-profile');
const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close-btn');
const editForm = editProfilePopup.querySelector('.form');
const editFormNicknameInput = editForm.querySelector('#form__nickname-input');
const editFormAboutInput = editForm.querySelector('#form_about-input');

const addCardButton = document.querySelector(".profile").querySelector('.profile__add-button');
const addCardPopup = document.querySelector('#popup-add-card');
const addCardForm = addCardPopup.querySelector(".form");
const addCardCloseButton = addCardPopup.querySelector(".popup__close-btn");
const addCardFormCardNameInput = addCardForm.querySelector("#form__mesto-input");
const addCardFormCardImageLink = addCardForm.querySelector("#form__mesto-img-url-input");


const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const selectCardImagePopup = document.querySelector('#popup-selected-card');
const selectCardPopupCloseButton = selectCardImagePopup.querySelector('.popup__close-btn');

function openPopup (popup){
    if (popup.querySelector("#form__nickname-input")){
        profileOBJ = getProfileNameAndAbout()
        popup.querySelector("#form__nickname-input").placeholder = profileOBJ["name"];
        popup.querySelector("#form_about-input").placeholder = profileOBJ["about"];
    }
    popup.classList.add("popup_open");
}
function openPopupImage (evt){
    selectCardImagePopup.querySelector('.popup__image').src = evt.target.src;
    selectCardImagePopup.querySelector(".popup__img-description").textContent = evt.target.alt;
    openPopup(selectCardImagePopup);
}
function closePopup (popup){
    popup.classList.remove("popup_open");
}

function sendEditForm(evt){
    evt.preventDefault();
    if (editFormNicknameInput.value && editFormAboutInput.value){
        const name = editFormNicknameInput.value;
        const about =  editFormAboutInput.value;
        setProfileNameAndAbout(name,about);
        closePopup(editProfilePopup);
    }
    else {
        alert("Не все поля заполнены")
    }
}
function sendAddForm (evt){
    evt.preventDefault();
    if (addCardFormCardNameInput.value && addCardFormCardImageLink.value){
        const mestoName = addCardFormCardNameInput.value;
        const mestoImageUrl =  addCardFormCardImageLink.value;
        addCard(getFilledCard(mestoName,mestoImageUrl));
        closePopup(addCardPopup);
    }
    else{
        alert("Не все поля заполнены")
    }
}

function setProfileNameAndAbout (name,about){
    document.querySelector(".profile").querySelector('.profile__name').textContent = name
    document.querySelector(".profile").querySelector('.profile__about').textContent = about
}
function getProfileNameAndAbout (){
    const name = document.querySelector('.profile').querySelector('.profile__name').textContent;
    const about = document.querySelector('.profile').querySelector('.profile__about').textContent;

    return {"name":name,"about":about}
}

function addCard(filledCard){
    document.querySelector('.elements').insertAdjacentElement("afterbegin",filledCard);
}
function getFilledCard(name,link){
    let currentCard = cardTemplate.cloneNode(true);
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
    let elementToRemove = evt.target.parentNode;
    elementToRemove.remove();
}

function likeClicked(evt){
    evt.target.closest('.card__description-like').classList.toggle("card__description-like_active");
}

addCardsFromObjList(cardsInfoObjList);
// Open, Close, Submit Profile Edit Form
editProfileButton.addEventListener("click",() => openPopup(editProfilePopup));
editProfilePopupCloseButton.addEventListener("click",() => closePopup(editProfilePopup));
editForm.addEventListener("submit",(evt) => sendEditForm(evt));
// Open, Close, Submit Add Card Form
addCardButton.addEventListener("click",() => openPopup(addCardPopup));
addCardCloseButton.addEventListener("click",() => closePopup(addCardCloseButton));
addCardForm.addEventListener("submit",(evt) => sendAddForm(evt));
//Close Image popup
selectCardPopupCloseButton.addEventListener("click",() => closePopup(selectCardImagePopup));