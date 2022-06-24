import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageTitle = this._popup.querySelector(".popup__image-text");
    this._popupImageCaption = this._popup.querySelector(".popup__image");
  }

  open(card) {
    super.open();

    this._popupImageCaption.src = card.link;
    this._popupImageCaption.alt = card.name;
    this._popupImageTitle.textContent = card.name;

  }
}
