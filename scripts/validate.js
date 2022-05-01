const dataValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const showInputError = (input, config) => {
  const errorNode = document.querySelector(`#${input.id}-error`);
  errorNode.classList.add(config.errorClass);
  errorNode.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass);
};

const hideInputError = (input, config) => {
  const errorNode = document.querySelector(`#${input.id}-error`);
  errorNode.classList.remove(config.errorClass);
  errorNode.textContent = "";
  input.classList.remove(config.inputErrorClass);
};

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    form.addEventListener("input", (evt) => {
      handleFormInput(evt.target, form, config);
    });
    toggleButton(form, config);
  });
}

function handleFormInput(input, form, config) {
  if (!input.validity.valid) {
    showInputError(input, config);
  } else {
    hideInputError(input, config);
  }
  toggleButton(form, config);
}

function toggleButton(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  button.disabled = !form.checkValidity();
  button.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
}

function resetInputValidity(form, config) {
  const inputs = form.querySelectorAll(config.inputSelector);
  inputs.forEach((input) => {
    hideInputError(input, config);
  });
  toggleButton(form, config);
}

enableValidation(dataValidation);
