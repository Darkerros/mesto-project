import * as modal from "./modal";

export function setButtonText(button,text){
    button.textContent = text
}

export const handleError = (errorResp) => errorResp.json().then((error) => modal.openErrorPopup(error.message))
