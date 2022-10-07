import * as consts from "./consts";


export function openPopup(popup) {
    popup.classList.add("popup_open");
    document.addEventListener('keydown', closePopupOnEsc)
}
export function closePopup(popup) {
    popup.classList.remove("popup_open");
    document.removeEventListener('keydown', closePopupOnEsc)
}
export function closePopupOnCloseButtonAndContainer(popup,evt){
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')){
        closePopup(popup)
    }
}
export function closePopupOnEsc(evt) {
    if (evt.key !== 'Escape') return;
    const openedPopup = document.querySelector('.popup_open');
    closePopup(openedPopup);
}
export function openPopupImage(name,link) {
    consts.imagePopupImg.src = link;
    consts.imagePopupImg.alt = name;
    consts.imagePopupImgDescription.textContent = name;
    openPopup(consts.imagePopup);
}
export function openErrorPopup(error){
    consts.errorPopupMessageElement.textContent = error
    openPopup(consts.errorPopup)
}
export function openUpdateAvatarPopup(){
    openPopup(consts.avatarUpdatePopup)
}




