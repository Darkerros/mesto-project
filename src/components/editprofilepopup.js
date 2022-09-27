import {closePopup, openPopup} from "./modal";

const editProfilePopup = document.querySelector('#popup-edit-profile');
const editForm = editProfilePopup.querySelector('.form');
const editFormNicknameInput = editForm.querySelector('#form-nickname-input');
const editFormAboutInput = editForm.querySelector('#form-about-input');
const editProfileButton = document.querySelector('.profile').querySelector('.profile__edit-btn');

const profileName = document.querySelector('.profile').querySelector('.profile__name');
const profileAbout = document.querySelector('.profile').querySelector('.profile__about');
function getProfileNameAndAbout() {
    return {"name": profileName.textContent, "about": profileAbout.textContent}
}
function setProfileNameAndAbout(name, about) {
    profileName.textContent = name;
    profileAbout.textContent = about;
}


function openPopupProfileEdit(editPopup) {
    const profileOBJ = getProfileNameAndAbout()
    editFormNicknameInput.placeholder = profileOBJ["name"];
    editFormAboutInput.placeholder = profileOBJ["about"];
    openPopup(editPopup);
}
function sendEditForm(evt) {
    evt.preventDefault();
    if (editFormNicknameInput.value && editFormAboutInput.value) {
        const name = editFormNicknameInput.value;
        const about = editFormAboutInput.value;
        setProfileNameAndAbout(name, about);
        closePopup(editProfilePopup);

        editFormNicknameInput.value = '';
        editFormAboutInput.value = '';
    } else {
        alert("Не все поля заполнены")
    }
}

// Open, Close, Submit Profile Edit Form
editProfileButton.addEventListener("click", () => openPopupProfileEdit(editProfilePopup));
editForm.addEventListener("submit", (evt) => sendEditForm(evt));

