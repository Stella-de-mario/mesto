export class Card {
  constructor(card, cardSelector, clickToCard) {
    this._name = card.name;
    this._link = card.link;
    this._cardSelector = cardSelector;
    this._clickToCard = clickToCard;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardTemplate;
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");

    this._setEventListeners();

    this._cardImage.scr = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._btnDelete = this._element.querySelector(".card__delete-button");
    this._btnDelete.addEventListener("click", () => {
      this._deleteCardBtn();
    });

    this._btnLike = this._element.querySelector(".card__heart");
    this._btnLike.addEventListener("click", () => {
      this._activeLikeBtn(this._btnLike);
    });

    this._cardImage.addEventListener("click", () => {
      this._clickToCard(this._name, this._link);
    });
  }

  _deleteCardBtn() {
    this._element.remove();
    this._element = null;
  }

  _activeLikeBtn() {
    this._btnLike.classList.toggle("card__heart_active");
  }
}
