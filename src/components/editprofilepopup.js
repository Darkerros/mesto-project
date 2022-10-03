import {closePopup, openPopup} from "./modal";
import {logPlugin} from "@babel/preset-env/lib/debug";

const profilePopup = document.querySelector('#popup-edit-profile');
const profilePopupForm = profilePopup.querySelector('.form');
const profilePopupNicknameInput = profilePopupForm.querySelector('#form-nickname-input');
const profilePopupAboutInput = profilePopupForm.querySelector('#form-about-input');
const profilePopupSubmitButton = profilePopupForm.querySelector('.form__accept-profile-edit');
const profileEditButton = document.querySelector('.profile').querySelector('.profile__edit-btn');

const profileName = document.querySelector('.profile').querySelector('.profile__name');
const profileAbout = document.querySelector('.profile').querySelector('.profile__about');
function getProfileNameAndAbout() {
    return {"name": profileName.textContent, "about": profileAbout.textContent}
}
function setProfileNameAndAbout(name, about) {
    console.log(name)
    console.log(profileName.textContent)
    profileName.textContent = name;
    profileAbout.textContent = about;
}


function openPopupProfileEdit(editPopup) {
    const profile = getProfileNameAndAbout()
    profilePopupNicknameInput.value = profile["name"];
    profilePopupAboutInput.value = profile["about"];
    openPopup(editPopup);
}
function sendEditForm(evt) {
    evt.preventDefault();
    setProfileNameAndAbout(profilePopupNicknameInput.value,profilePopupAboutInput.value);
    closePopup(profilePopup);
    profilePopupSubmitButton.setAttribute("disabled",'disabled')
}

// Open, Close, Submit Profile Edit Form
profileEditButton.addEventListener("click", () => openPopupProfileEdit(profilePopup));
profilePopupForm.addEventListener("submit", (evt) => sendEditForm(evt));

