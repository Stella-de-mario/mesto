import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._btnSubmit = this._popupForm.querySelector(".popup__save-button");
    this._inputList = Array.from(this._popup.querySelectorAll(".popup__input"));
  }

  _getInputValues() {
    this._formValuesData = {};
    this._inputList.forEach((input) => {
      this._formValuesData[input.name] = input.value;
    });
    return this._formValuesData;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      this._submitForm(this._getInputValues());
      evt.preventDefault();
    });
  }

  getLoading(isLoading) {
    if (isLoading) {
       this._btnSubmit.textContent = 'Сохранение...';
    } else {
       this._btnSubmit.textContent = 'Сохранить';
    }
 }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
