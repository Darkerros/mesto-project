import Popup from "./Popup";
import * as consts from './consts'
export function setButtonText(button,text){
    button.textContent = text
}

function openErrorPopup(error){
    consts.errorPopupMessageElement.textContent = error
    consts.errorPopup.classList.add('popup_open')
}

export const handleError = (errorResp) => errorResp.json().then((error) => openErrorPopup(error.message))
