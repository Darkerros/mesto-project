import Popup from "./Popup";

export class PopupWithError extends Popup{
    constructor(popupSelector,popupOpenClass,popupCloseButtonClass,popupErrorSelector) {
        super(popupSelector,popupOpenClass,popupCloseButtonClass);
        this._errorElement = this._popupElement.querySelector(popupErrorSelector)
    }
    open(error) {
        this._errorElement.textContent = error
        super.open();
    }

}