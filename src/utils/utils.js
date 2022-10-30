import {Card} from "../components/Card";


export const createCard = (cardInfo, profileController, api, imagePopup,errorPopup) => new Card('#card-template', cardInfo, profileController, api, imagePopup,errorPopup).getCard()

export const handleError = (errorResp, errorPopup) => errorResp.json().then((error) => errorPopup.open(error.message))
