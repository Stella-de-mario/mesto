export class FormValidator {
  constructor(dataValidation, form) {
    this._form = form;
    this._inputSelector = dataValidation.inputSelector;
    this._submitButtonSelector = dataValidation.submitButtonSelector;
    this._inactiveButtonClass = dataValidation.inactiveButtonClass;
    this._inputErrorClass = dataValidation.inputErrorClass;
    this._errorClass = dataValidation.errorClass;
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputs = this._form.querySelectorAll(this._inputSelector);
  }

  _toggleButton() {
    this._submitButton.disabled = !this._form.checkValidity();
    this._submitButton.classList.toggle(
      this._inactiveButtonClass,
      !this._form.checkValidity()
    );
  }

  _showInputError(input) {
    const errorNode = this._form.querySelector(`#${input.id}-error`);
    errorNode.classList.add(this._errorClass);
    errorNode.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
  }

  _hideInputError(input) {
    const errorNode = this._form.querySelector(`#${input.id}-error`);
    errorNode.classList.remove(this._errorClass);
    errorNode.textContent = "";
    input.classList.remove(this._inputErrorClass);
  }

  _handleFormInput(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  resetInputValidity() {
    this._inputs.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButton();
  }

  _setEventListeners() {
    this._form.addEventListener("input", (evt) => {
      this._handleFormInput(evt.target);
      this._toggleButton();
    });
  }

  enableValidation() {
    this._setEventListeners();
    this._toggleButton();
  }
}
