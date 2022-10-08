import * as modal from './modal'
import * as consts from './consts'
import * as profile from './profile'
import * as api from './api'

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
    cardImage.addEventListener("click", (evt) => modal.openPopupImage(cardInfo.name, cardInfo.link));
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
        .catch(handleError)
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
            .catch(handleError)
    }
}

const handleError = (errorResp) => errorResp.json().then((error) => modal.openErrorPopup(error.message))
