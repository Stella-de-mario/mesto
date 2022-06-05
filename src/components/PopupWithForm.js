import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(submitForm, popupSelector) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._popup.querySelectorAll(".popup__input"));
  }

  _getInputValues() {
    this._formValuesData = {};
    this._inputList.forEach((input) => {
      this._formValuesData[input.name] = input.value;
    });
    return this._formValuesData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      this._submitForm(this._getInputValues());
      evt.preventDefault();
      this.close();
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
