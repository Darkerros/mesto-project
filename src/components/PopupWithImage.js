import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector, popupOpenSelector, popupCloseButtonSelector, imageSelector, imageDescriptionSelector) {
        super(popupSelector, popupOpenSelector, popupCloseButtonSelector);
        this._imagePopupImg = this._popupElement.querySelector(imageSelector);
        this._imagePopupImgDescription = this._popupElement.querySelector(imageDescriptionSelector);
    }

    open(name, link) {
        this._imagePopupImg.src = link;
        this._imagePopupImg.alt = name;
        this._imagePopupImgDescription.textContent = name;
        super.open();
    }
}