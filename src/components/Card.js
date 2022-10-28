import {handleError} from "./utils";


export class Card {
    constructor(cardTemplateSelector,
                {name, link, owner, likes, _id},
                profile,
                api,
                popupWithImage) {
        this._cardTemplate = document.querySelector(cardTemplateSelector).content.cloneNode(true)
        this._profile = profile
        this._api = api
        this._popupWithImage = popupWithImage

        this._cardId = _id
        this._name = name
        this._avatarLink = link
        this._ownerId = owner._id
        this._likesIdList = likes.map(likeInfo => likeInfo._id)


        this._currentCardElement = this._cardTemplate.querySelector('.card')
        this._cardImageElement = this._currentCardElement.querySelector('.card__image')
        this._cardDescriptionElement = this._currentCardElement.querySelector('.card__description-text')
        this._cardLikeCountElement = this._currentCardElement.querySelector('.card__description-like-count')
        this._cardRemoveBtn = this._currentCardElement.querySelector('.card__remove-icon')
        this._cardLikeBtn = this._currentCardElement.querySelector('.card__description-like')

    }

    getCard() {
        this._cardImageElement.textContent = this._name;
        this._cardImageElement.alt = this._name;
        this._cardDescriptionElement.textContent = this._name;
        this._cardImageElement.src = this._avatarLink;
        this._cardLikeCountElement.textContent = this._likesIdList.length

        const is_include_profile = this._profile.isIncludeCurrentProfile(this._likesIdList)
        const is_owner = this._profile.isCurrentProfile(this._ownerId)

        !is_owner ? this._cardRemoveBtn.classList.add('card__remove-icon_type_hidden') : this._cardRemoveBtn.addEventListener("click",this._clickRemoveButton)
        is_include_profile ? this._cardLikeBtn.classList.add('card__description-like_active') : false

        this.setEventListeners()
        return this._currentCardElement
    }

    _clickRemoveButton(evt) {
        this._api.deleteCard(this._cardId)
            .then(deleteCard => {
                const elementToRemove = evt.target.closest('.card');
                elementToRemove.remove();
            })
            .catch(handleError)
    }

    _clickLikeButton() {
        if (this._cardLikeBtn.classList.contains('card__description-like_active')) {
            this._api.deleteLike(this._cardId)
                .then(cardInfo => {
                    this._cardLikeCountElement.textContent = cardInfo.likes.length
                    this._cardLikeBtn.classList.remove("card__description-like_active");
                })
                .catch(handleError)
        } else {
            this._api.installLike(this._cardId)
                .then(cardInfo => {
                    this._cardLikeCountElement.textContent = cardInfo.likes.length
                    this._cardLikeBtn.classList.add("card__description-like_active");
                })
                .catch(handleError)
        }
    }

    setEventListeners() {
        this._cardLikeBtn.addEventListener("click", this._clickLikeButton);
        this._cardImageElement.addEventListener("click", () => this._popupWithImage.open(this._name, this._avatarLink));
    }

}


