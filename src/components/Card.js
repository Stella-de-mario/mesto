export default class Card {
  constructor(
    card, myId, cardTemplate,
    handleClickCard, handleLikeCard, handleDeleteCard,  handleDeleteLikeCard ) {
    this.card = card;
    this._name = card.name;
    this._link = card.link;
    this._likes = card.likes;
    this._cardId = card._id;
    this._id = card.owner._id;
    this._myId = myId;

    this._cardTemplate = cardTemplate;
    this._handleClickCard = handleClickCard;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteLikeCard = handleDeleteLikeCard;
  }

  getCardId() {
    return this._cardId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  createCard(myId) {
    this._element = this._getTemplate();

    this._btnDelete = this._element.querySelector(".card__delete-button");
    this._btnLike = this._element.querySelector(".card__heart");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._cardLikesCounter = this._element.querySelector(
      ".card__heart-counter"
    );

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    if (this._id !== myId) {
      this._btnDelete.classList.add("card__delete-button_inactive");
    }
    
    this.updateLikes(myId);

    return this._element;
  }

  updateLikes(myId) {
    this._cardLikesCounter.textContent = this._likes.length;

    if (this._likes.find(item => item._id == myId) !== undefined) {
      this._btnLike.classList.add("card__heart_active");
    } else {
      this._btnLike.classList.remove("card__heart_active");
    }
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  setLikes(userId, likes) {
    this._likes = likes;
    this.updateLikes(userId);
  }


  _setEventListeners() {

    this._cardImage.addEventListener("click", () => {
      this._handleClickCard(this);
    });
    
    this._btnLike.addEventListener("click", () => {
      if(this._btnLike.classList.contains('card__heart_active')) {
        this._handleDeleteLikeCard(this)
      } else {
      this._handleLikeCard(this);
      }
    });

    this._btnDelete.addEventListener("click", () => {
      this._handleDeleteCard(this);
    });
  }
}