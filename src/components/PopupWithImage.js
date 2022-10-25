import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePopupImg = this._popup.querySelector(".popup__image");
        this._imagePopupImgDescription = this._popup.querySelector(".popup__img-description");
    }

    open(name, link) {
        this._imagePopupImg.src = link;
        this._imagePopupImg.alt = name;
        this._imagePopupImgDescription.textContent = name;
        super.open();
    }
}