import * as consts from "./consts";


export function openPopup(popup) {
    popup.classList.add("popup_open");
    document.addEventListener('keydown', (evt) => closePopupOnEsc(evt,popup))
}
export function closePopup(popup) {
    popup.classList.remove("popup_open");
    document.removeEventListener('keydown', (evt) => closePopupOnEsc(evt,popup))
}
export function closePopupOnCloseButtonAndContainer(popup,evt){
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-btn')){
        closePopup(popup)
    }
}
export function closePopupOnEsc(evt,popup) {
    if (evt.key !== 'Escape') return;
    closePopup(popup)
}
export function openPopupImage(name,link) {
    consts.imagePopupImg.src = link;
    consts.imagePopupImg.alt = name;
    consts.imagePopupImgDescription.textContent = name;
    openPopup(consts.imagePopup);
}



