const profileName = document.querySelector('.profile').querySelector('.profile__name');
const profileAbout = document.querySelector('.profile').querySelector('.profile__about');

const editProfileButton = document.querySelector('.profile').querySelector('.profile__edit-btn');
const editProfilePopup = document.querySelector('#popup-edit-profile');
const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close-btn');
const editForm = editProfilePopup.querySelector('.form');
const editFormNicknameInput = editForm.querySelector('#form__nickname-input');
const editFormAboutInput = editForm.querySelector('#form_about-input');



function openPopup (popup){
    popup.classList.add("popup_open");
}
function closePopup (popup){
    popup.classList.remove("popup_open");
}


function getProfileNameAndAbout(){
    const name = profileName.textContent;
    const about = profileAbout.textContent;
    return {"name":name,"about":about}
}

function openOPopupProfileEdit(edipPopup){
    const profileOBJ = getProfileNameAndAbout()
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



// Open, Close, Submit Profile Edit Form
editProfileButton.addEventListener("click",() => openOPopupProfileEdit(editProfilePopup));
editProfilePopupCloseButton.addEventListener("click",() => closePopup(editProfilePopup));
editForm.addEventListener("submit",(evt) => sendEditForm(evt));