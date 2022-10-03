function openPopup(popup) {
    popup.classList.add("popup_open");
}
function closePopup(popup,evt) {
    const clickedElement = evt.target
    if (clickedElement.classList.contains('.popup__container') || clickedElement.classList.contains('.popup__close-btn')){
        popup.classList.remove("popup_open");
    }
}


module.exports = {
    closePopup,
    openPopup
}

