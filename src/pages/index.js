import "./index.css";

import { initialCards } from "../utils/initialCards.js";
import { dataValidation } from "../utils/dataValidation.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const btnEdit = document.querySelector(".profile__edit-button");
const btnAdd = document.querySelector(".profile__add-button");
const popupElementEdit = document.querySelector(".popup_edit-item");
const popupElementAdd = document.querySelector(".popup_add-item");
const popupFormElementEdit = popupElementEdit.querySelector(".popup__form");
const popupFormElementAdd = popupElementAdd.querySelector(".popup__form");
const profileName = popupElementEdit.querySelector("#profile-name");
const profileProfession = popupElementEdit.querySelector("#profile-profession");

const user = new UserInfo({
  name: ".profile__name",
  profession: ".profile__profession",
});

function getCardElement(item) {
  const card = new Card(item, ".card-template", () => {
    popupImagePreview.open(item);
  });
  const cardElement = card.createCard();
  return cardElement;
}

const cardsContainer = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = getCardElement(item);
      cardsContainer.addItem(card);
    },
  },
  ".cards__list"
);
cardsContainer.renderItems();

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

const popupEditProfile = new PopupWithForm((item) => {
  user.setUserInfo(item);
  popupEditProfile.close();
}, ".popup_edit-item");

const popupAddCard = new PopupWithForm((item) => {
  cardsContainer.addItem(getCardElement(item));
  popupAddCard.close();
}, ".popup_add-item");

const popupImagePreview = new PopupWithImage(".popup_preview-image");

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupImagePreview.setEventListeners();

btnEdit.addEventListener("click", () => {
  const userInfo = user.getUserInfo();
  profileName.value = userInfo.name;
  profileProfession.value = userInfo.profession;
  profileFormValidator.resetInputValidity();
  popupEditProfile.open();
});

btnAdd.addEventListener("click", () => {
  cardFormValidator.resetInputValidity();
  popupAddCard.open();
});
