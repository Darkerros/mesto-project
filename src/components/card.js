import * as modal from './modal'
import * as consts from './consts'

export function addCard(filledCard) {
    consts.elementsSection.prepend(filledCard);
}
export function getFilledCard(name, link) {
    const currentCard = consts.cardTemplate.cloneNode(true);
    const cardImage = currentCard.querySelector('.card__image')
    cardImage.src = link;
    cardImage.alt = name;
    currentCard.querySelector('.card__description-text').textContent = name;
    currentCard.querySelector('.card__remove-icon').addEventListener("click", (evt) => clickRemoveButton(evt));
    currentCard.querySelector('.card__description-like').addEventListener("click", (evt) => clickLikeButton(evt));
    cardImage.addEventListener("click", (evt) => modal.openPopupImage(name,link));
    return currentCard
}
export function addCardsFromObjList(cardsList) {
    if (cardsList) cardsList.forEach(card => addCard(getFilledCard(card["name"], card["link"])))
}
function clickRemoveButton(evt) {
    const elementToRemove = evt.target.closest('.card');
    elementToRemove.remove();
}
function clickLikeButton(evt) {
    evt.target.closest('.card__description-like').classList.toggle("card__description-like_active");
}
