import "../pages/index.css";

import { dataValidation } from "../utils/dataValidation.js";
import {
  btnEdit,
  btnAdd,
  btnEditUserAvatar,
  popupFormElementEdit,
  popupFormElementAdd,
  popupFormElementEditUserAvatar,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const api = new Api("https://mesto.nomoreparties.co/v1/cohort-43");

const user = new UserInfo({
  name: ".profile__name",
  profession: ".profile__profession",
  avatar: ".profile__image",
});

const cardsContainer = new Section((item) => {
  cardsContainer.addItem(getCard(item));
}, ".cards__list");

const cardFormValidator = new FormValidator(
  dataValidation,
  popupFormElementAdd
);
const profileFormValidator = new FormValidator(
  dataValidation,
  popupFormElementEdit
);
const userAvatarFormValidator = new FormValidator(
  dataValidation,
  popupFormElementEditUserAvatar
);

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
userAvatarFormValidator.enableValidation();

const popupEditProfile = new PopupWithForm(
  ".popup_edit-item",
  handleEditProfile
);
const popupAddCard = new PopupWithForm(".popup_add-item", handleAddCard);
const popupAvatarUser = new PopupWithForm(
  ".popup_form_avatar",
  handleAddAvatarUser
);
const popupImage = new PopupWithImage(".popup_preview-image");
const popupConfirmation = new PopupWithConfirmation(".popup_card-delete");

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupAvatarUser.setEventListeners();
popupImage.setEventListeners();
popupConfirmation.setEventListeners();

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userInfo, cards]) => {
    user.setUserInfo(userInfo);
    cardsContainer.renderItems(cards.reverse());
  })
  .catch((err) => console.log(`Ошибка: ${err}`));

function getCard(cardInfo) {
  const cardElement = new Card(
    cardInfo,
    () => {},
    ".card-template",
    handleClickCard,
    handleAddLike,
    confirmDelete,
    handleDeleteLike
  );
  // console.log(cardElement)

  return cardElement.createCard(user.getUserId());
}

function handleClickCard(cardInfo) {
  popupImage.open(cardInfo);
}

function confirmDelete(card) {
  popupConfirmation.open();
  popupConfirmation.setHandleSubmit(() => handleSubmitDelete(card));
}

function handleDeleteLike(card) {
  api
    .deleteLikeCard(card.getCardId())
    .then((cardInfo) => {
      card.setLikes(user.getUserId(), cardInfo.likes);
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
}

function handleAddLike(card) {
  api
    .addLikeCard(card.getCardId())
    .then((cardInfo) => {
      card.setLikes(user.getUserId(), cardInfo.likes);
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
}

btnEdit.addEventListener("click", () => {
  profileFormValidator.resetInputValidity();
  popupEditProfile.setInputValues(user.getUserInfo());
  popupEditProfile.open();
});

btnAdd.addEventListener("click", () => {
  cardFormValidator.resetInputValidity();
  popupAddCard.open();
});

btnEditUserAvatar.addEventListener("click", () => {
  userAvatarFormValidator.resetInputValidity();
  popupAvatarUser.open();
});

function handleAddCard(card) {
  popupAddCard.getLoading(true);
  api
    .setNewCardsInfo({ name: card["name"], link: card["link"] })
    .then((cardInfo) => {
      cardsContainer.addItem(getCard(cardInfo));
      popupAddCard.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      setTimeout(() => {
        popupAddCard.getLoading(false);
      }, 500);
    });
}

function handleEditProfile(userInfo) {
  popupEditProfile.getLoading(true);
  api
    .setNewUserInfo({ name: userInfo["name"], about: userInfo["profession"] })
    .then((userInfo) => {
      user.setUserInfo(userInfo);
      popupEditProfile.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      setTimeout(() => {
        popupEditProfile.getLoading(false);
      }, 500);
    });
}

function handleSubmitDelete(card) {
  api
    .deleteCard(card.getCardId())
    .then(() => {
      card.removeCard();
      popupConfirmation.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
}

function handleAddAvatarUser(userAvatar) {
  console.log(userAvatar["avatar-link"]);
  popupAvatarUser.getLoading(true);
  api
    .setUserAvatar({ avatar: userAvatar["avatar-link"] })
    .then((userAvatar) => {
      user.setUserInfo(userAvatar);
      popupAvatarUser.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      setTimeout(() => {
        popupAvatarUser.getLoading(false);
      }, 500);
    });
}
