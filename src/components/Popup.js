export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleCloseOnEsc = this._handleCloseOnEsc.bind(this)
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleCloseOnEsc);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleCloseOnEsc);
  }

  _handleCloseOnEsc = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleOverlayOnClose = (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close-button")
    ) {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      this._handleOverlayOnClose(evt);
    });
  }
}
