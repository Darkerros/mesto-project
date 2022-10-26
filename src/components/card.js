import Popup from './Popup'
import * as consts from './consts'
import * as profile from './profile'
import * as utils from './utils'
import {Api} from "./api";


const api = new Api()


class Card {
    constructor(cardTemplateSelector, {name,link,owner,likes},isIncludeProfileFn,isCurrentProfileFn) {
        this._cardTemplate = document.querySelector(cardTemplateSelector)
        this._isIncludeProfileFn = isIncludeProfileFn
        this._isCurrentProfileFn = isCurrentProfileFn

        this._name = name
        this._avatarLink = link
        this._ownerId = owner._id
        this._likesIdList = likes.map(likeInfo => likeInfo._id)

        this._currentCardElement = this._cardTemplate.cloneNode(true);
        this._cardImageElement = this._currentCardElement.querySelector('.card__image')
        this._cardDescriptionElement = this._currentCardElement.querySelector('.card__description-text')
        this._cardLikeCountElement = this._currentCardElement.querySelector('.card__description-like-count')
        this._cardRemoveBtn = this._currentCardElement.querySelector('.card__remove-icon')
        this._cardLikeBtn = this._currentCardElement.querySelector('.card__description-like')
    }

    getCard(){
        this._cardImageElement.textContent = this._name;
        this._cardImageElement.alt = this._name;
        this._cardImageElement.src = this._avatarLink;
        this._cardLikeCountElement.textContent = this._likesIdList.length

        if (this._isIncludeProfileFn(this._likesIdList)) {
            this._cardLikeBtn.classList.add('card__description-like_active')
        }
        if (!this._isCurrentProfileFn(this._ownerId)) {
            this._cardRemoveBtn.classList.add('card__remove-icon_type_hidden')
        } else {
            this._cardRemoveBtn.addEventListener("click", (evt) => clickRemoveButton(evt, cardInfo._id));
        }
    }

}

export function addCard(filledCard) {
    consts.elementsSection.prepend(filledCard);
}

export function getFilledCard(cardInfo) {
    const currentCard = consts.cardTemplate.cloneNode(true);
    const cardImage = currentCard.querySelector('.card__image')
    const cardDescription = currentCard.querySelector('.card__description-text')
    const cardRemoveBtn = currentCard.querySelector('.card__remove-icon')
    const cardLikeBtn = currentCard.querySelector('.card__description-like')
    const cardLikeCountElement = currentCard.querySelector('.card__description-like-count')

    const ownerId = cardInfo.owner._id
    const likesIdList = cardInfo.likes.map(likeInfo => likeInfo._id)

    cardLikeCountElement.textContent = likesIdList.length
    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;
    cardDescription.textContent = cardInfo.name;
    if (profile.isIncludeCurrentProfile(likesIdList)) {
        cardLikeBtn.classList.add('card__description-like_active')
    }
    if (profile.isCurrentProfile(ownerId)) {
        cardRemoveBtn.addEventListener("click", (evt) => clickRemoveButton(evt, cardInfo._id));
    } else {
        cardRemoveBtn.classList.add('card__remove-icon_type_hidden')
    }

    cardLikeBtn.addEventListener("click", (evt) => clickLikeButton(cardLikeBtn, cardInfo._id, cardLikeCountElement));
    cardImage.addEventListener("click", (evt) => Popup.open(cardInfo.name, cardInfo.link));
    return currentCard
}

export function addCardsFromObjList(cardsList) {
    if (cardsList) cardsList.forEach(card => addCard(getFilledCard(card)))
}

function clickRemoveButton(evt, cardId) {
    api.deleteCard(cardId)
        .then(deleteCard => {
            const elementToRemove = evt.target.closest('.card');
            elementToRemove.remove();
        })
        .catch(utils.handleError)
}

function clickLikeButton(likeBtn, cardId, cardLikeCountElement) {
    if (likeBtn.classList.contains('card__description-like_active')) {
        api.deleteLike(cardId)
            .then(cardInfo => {
                cardLikeCountElement.textContent = cardInfo.likes.length
                likeBtn.classList.remove("card__description-like_active");
            })
            .catch(handleError)
    } else {
        api.installLike(cardId)
            .then(cardInfo => {
                cardLikeCountElement.textContent = cardInfo.likes.length
                likeBtn.classList.add("card__description-like_active");
            })
            .catch(utils.handleError)
    }
}

