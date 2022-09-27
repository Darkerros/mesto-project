function openPopup(popup) {
    popup.classList.add("popup_open");
    popup.addEventListener("click", () => closePopup(popup))
    popup.querySelector('.popup__close-btn').addEventListener("click", () => closePopup(popup))
    popup.querySelector('.popup__container').addEventListener("click",(e) => e.stopPropagation())
}
function closePopup(popup) {
    popup.classList.remove("popup_open");
    popup.removeEventListener("click", () => closePopup(popup))
}

module.exports = {
    closePopup,
    openPopup
}

