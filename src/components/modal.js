//Card popup
export const addCardButton = document.querySelector(".profile").querySelector('.profile__add-button');
export const popupCard = document.querySelector('#popup-add-card');
export const popupCardForm = popupCard.querySelector(".form");
export const popupCardFormSubmitButton = popupCard.querySelector(".form__accept");
export const popupCardFormNameInput = popupCardForm.querySelector("#form__mesto-input");
export const popupCardFormImageLink = popupCardForm.querySelector("#form__mesto-img-url-input");

//Profile popup
export const profilePopup = document.querySelector('#popup-edit-profile');
export const profilePopupForm = profilePopup.querySelector('.form');
export const profilePopupNicknameInput = profilePopupForm.querySelector('#form-nickname-input');
export const profilePopupAboutInput = profilePopupForm.querySelector('#form-about-input');
export const profilePopupSubmitButton = profilePopupForm.querySelector('.form__accept-profile-edit');
export const profileEditButton = document.querySelector('.profile').querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile').querySelector('.profile__name');
const profileAbout = document.querySelector('.profile').querySelector('.profile__about');
//Card popup
export function getProfileNameAndAbout() {
    return {"name": profileName.textContent, "about": profileAbout.textContent}
}
export function setProfileNameAndAbout(name, about) {
    console.log(name)
    console.log(profileName.textContent)
    profileName.textContent = name;
    profileAbout.textContent = about;
}
// Profile popup
export function openPopup(popup) {
    popup.classList.add("popup_open");
}
export function closePopup(popup) {
    popup.classList.remove("popup_open");

}
export function closePopupOnCloseButtonAndContainer(popup,evt){
    const clickedElement = evt.target
    if (clickedElement.classList.contains('popup') || clickedElement.classList.contains('popup__close-btn')){
        popup.classList.remove("popup_open");
    }
}
export function closePopupOnEsc(evt) {
    if (evt.key !== 'Escape') return;
    const openPopup = document.querySelector('.popup_open');
    if (!openPopup) return;
    closePopup(openPopup)
}



