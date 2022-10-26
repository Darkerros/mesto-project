import Popup from "./Popup";

export function setButtonText(button,text){
    button.textContent = text
}

export const handleError = (errorResp) => errorResp.json().then((error) => Popup.openErrorPopup(error.message))
