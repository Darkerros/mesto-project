const CardsInfoObjList = [
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



const editProfilePopup = document.querySelector('#popup-edit-profile');
const addCardPopup = document.querySelector('#popup-add-card');
const selectCardImagePopup = document.querySelector('#popup-selected-card');

function popupOpener (popup){
    if (popup.querySelector("#form__nickname-input")){
        profileOBJ = getProfileNameAndAbout()
        popup.querySelector("#form__nickname-input").placeholder = profileOBJ["name"];
        popup.querySelector("#form_about-input").placeholder = profileOBJ["about"];
    }
    popup.classList.add("popup_open");
}
function popupImageOpener (evt){
    if (evt.target.className === "card__image"){
        selectCardImagePopup.querySelector('.popup__image').src = evt.target.src;
        popupOpener(selectCardImagePopup);
    }
}
function popupCloser (popup){
    popup.classList.remove("popup_open");
}
function popupSender (evt){
    evt.preventDefault();
    const form = evt.target.parentNode;
    const popup = evt.target.parentNode.parentNode.parentNode;
    if (popup.id === "popup-edit-profile" && form.querySelector('#form__nickname-input').value && form.querySelector('#form_about-input').value){
        const name = form.querySelector('#form__nickname-input').value;
        const about =  form.querySelector('#form_about-input').value;
        setProfileNameAndAbout(name,about);
        popupCloser(popup);
    }
    else if (popup.id === "popup-add-card" &&   form.querySelector('#form__mesto-input').value && form.querySelector('#form__mesto-img-url-input').value){
        const mestoName = form.querySelector('#form__mesto-input').value;
        const mestoImageUrl =  form.querySelector('#form__mesto-img-url-input').value;
        addCard(getFilledCard(mestoName,mestoImageUrl));
        popupCloser(popup);
    }
    else {
        alert('Не все поля формы заполнены')
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
    let cardTemplate = document.querySelector('#card-template').content.querySelector('.card').cloneNode(true);
    cardTemplate.querySelector('.card__image').src = link;
    cardTemplate.querySelector('.card__image').alt = name;
    cardTemplate.querySelector('.card__description-text').textContent = name;
    cardTemplate.querySelector('.card__remove-icon').addEventListener("click",(evt) => removeCard(evt));
    cardTemplate.addEventListener("click",(evt)=>popupImageOpener(evt))
    return cardTemplate
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
    evt.target.classList.toggle("card__description-like_active");
}

// Opener, Setter and Closer EditProfilePopup
document.querySelector('.profile__edit-btn').addEventListener("click",() => popupOpener(editProfilePopup));
editProfilePopup.querySelector('.popup__close-btn').addEventListener("click",()=> popupCloser(editProfilePopup));
editProfilePopup.querySelector('.form__accept-profile-edit').addEventListener("click",(evt)=> popupSender(evt));
// Opener, Setter and Closer AddCardPopup
document.querySelector('.profile__add-button').addEventListener("click",() => popupOpener(addCardPopup));
addCardPopup.querySelector('.popup__close-btn').addEventListener("click",()=> popupCloser(addCardPopup));
addCardPopup.querySelector('.form__accept-profile-edit').addEventListener("click",(evt)=> popupSender(evt));
// Opener and Closer selectedCardPopup
document.querySelectorAll('.card__image').forEach(cardImage => cardImage.addEventListener("click",(evt)=> popupImageOpener(evt)))
selectCardImagePopup.querySelector('.popup__close-btn').addEventListener("click",() => popupCloser(selectCardImagePopup))
// Add cards from cardsList
addCardsFromObjList(CardsInfoObjList);
// Add like clicked
document.querySelectorAll(".card__description-like").forEach(likeBtn => likeBtn.addEventListener("click",(evt) => likeClicked(evt)))