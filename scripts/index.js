import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./image.js";

const btnEdit = document.querySelector(".profile__edit-button");
const btnAdd = document.querySelector(".profile__add-button");
const popups = Array.from(document.querySelectorAll(".popup"));
const popupFormEdit = document.querySelector(".popup__form_edit");
const popupFormAdd = document.querySelector(".popup__form_add");
const popupElementEdit = document.querySelector(".popup_edit-item");
const popupElementAdd = document.querySelector(".popup_add-item");
const popupPreviewImage = document.querySelector(".popup_preview-image");
const popupImage = popupPreviewImage.querySelector(".popup__image");
const popupText = popupPreviewImage.querySelector(".popup__image-text");
const popupFormElementEdit = popupElementEdit.querySelector(".popup__form");
const popupFormElementAdd = popupElementAdd.querySelector(".popup__form");
const nameInput = popupElementEdit.querySelector("#profile-name");
const professionInput = popupElementEdit.querySelector("#profile-profession");
const cardInput = popupElementAdd.querySelector("#card-name");
const linkInput = popupElementAdd.querySelector("#card-link");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const cardsContainer = document.querySelector(".cards__list");

const dataValidation = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const cardFormValidator = new FormValidator(
  dataValidation,
  popupFormElementAdd
);
const profileFormValidator = new FormValidator(
  dataValidation,
  popupFormElementEdit
);
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();

function getCardElement(cardImage) {
  const cardElement = new Card(cardImage, ".card-template", showCardImage);
  return cardElement.createCard();
}

initialCards.forEach((element) => {
  cardsContainer.append(getCardElement(element));
});

function setProfileInput() {
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
}

function openedEditForm() {
  setProfileInput();
  profileFormValidator.resetInputValidity();
  openedPopup(popupElementEdit);
}

function openedAddForm() {
  popupFormAdd.reset();
  cardFormValidator.resetInputValidity();
  openedPopup(popupElementAdd);
}

function openedPopup(element) {
  element.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEsc);
}

btnEdit.addEventListener("click", openedEditForm);
btnAdd.addEventListener("click", openedAddForm);

function closePopup(element) {
  element.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEsc);
}

function closeOnOverlay(evt, element) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("popup__close-button")
  ) {
    closePopup(element);
  }
}

function closeOnEsc(evt) {
  if (evt.key === "Escape") {
    const openPopupElement = document.querySelector(".popup_opened");
    closePopup(openPopupElement);
  }
}

popups.forEach(function (element) {
  element.addEventListener("mousedown", function (evt) {
    closeOnOverlay(evt, element);
  });
});

function showCardImage(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupText.textContent = name;
  openedPopup(popupPreviewImage);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardObject = {
    name: cardInput.value,
    link: linkInput.value,
  };
  cardsContainer.prepend(getCardElement(cardObject));
  closePopup(popupElementAdd);
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(popupElementEdit);
}

popupFormElementAdd.addEventListener("submit", handleAddCardFormSubmit);
popupFormElementEdit.addEventListener("submit", handleEditProfileFormSubmit);
