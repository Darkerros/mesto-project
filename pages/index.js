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

const profileName = document.querySelector('.profile').querySelector('.profile__name');
const profileAbout = document.querySelector('.profile').querySelector('.profile__about');
const elementsSection = document.querySelector(".elements");

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
const selcetCardImage = selectCardImagePopup.querySelector('.popup__image');
const selcetCardDesription = selectCardImagePopup.querySelector(".popup__img-description");

function openPopup (popup){
    popup.classList.add("popup_open");
}
function closePopup (popup){
    popup.classList.remove("popup_open");
}

function openOPopupProfileEdit(edipPopup){
    profileOBJ = getProfileNameAndAbout()
    editFormNicknameInput.placeholder = profileOBJ["name"];
    editFormAboutInput.placeholder = profileOBJ["about"];
    openPopup(edipPopup);
}
function openPopupImage (evt){
    selcetCardImage.src = evt.target.src;
    selcetCardImage.alt = evt.target.alt;
    selcetCardDesription.textContent = evt.target.alt;
    openPopup(selectCardImagePopup);
}

function sendEditForm(evt){
    evt.preventDefault();
    if (editFormNicknameInput.value && editFormAboutInput.value){
        const name = editFormNicknameInput.value;
        const about =  editFormAboutInput.value;
        setProfileNameAndAbout(name,about);
        closePopup(editProfilePopup);
        
        editFormNicknameInput.value = '';
        editFormAboutInput.value = '';
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
    profileName.textContent = name;
    profileAbout.textContent = about;
}
function getProfileNameAndAbout (){
    const name = profileName.textContent;
    const about = profileAbout.textContent;
    return {"name":name,"about":about}
}

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
// Open, Close, Submit Profile Edit Form
editProfileButton.addEventListener("click",() => openOPopupProfileEdit(editProfilePopup));
editProfilePopupCloseButton.addEventListener("click",() => closePopup(editProfilePopup));
editForm.addEventListener("submit",(evt) => sendEditForm(evt));
// Open, Close, Submit Add Card Form
addCardButton.addEventListener("click",() => openPopup(addCardPopup));
addCardCloseButton.addEventListener("click",() => closePopup(addCardPopup));
addCardForm.addEventListener("submit",(evt) => sendAddForm(evt));
//Close Image popup
selectCardPopupCloseButton.addEventListener("click",() => closePopup(selectCardImagePopup));