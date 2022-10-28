import {errorPopup} from "./consts";

export const handleError = (errorResp) => errorResp.json().then((error) => errorPopup.open(error.message))
