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
export function closePopupOnEsc(popup,evt){
    const clickedElementKey = evt.key
    if (clickedElementKey === 'Escape'){
        popup.classList.remove("popup_open");
    }
}



