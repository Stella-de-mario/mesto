export default class Card {
  constructor(card, cardTemplate, handleCardClick) {
    this._name = card.name;
    this._link = card.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._btnDelete = this._element.querySelector(".card__delete-button");
    this._btnDelete.addEventListener("click", () => {
      this._deleteCard();
    });

    this._btnLike = this._element.querySelector(".card__heart");
    this._btnLike.addEventListener("click", () => {
      this._toggleLike();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _toggleLike() {
    this._btnLike.classList.toggle("card__heart_active");
  }
}
