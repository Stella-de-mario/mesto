const btnEdit = document.querySelector(".profile__edit-button");
const btnAdd = document.querySelector(".profile__add-button");

const popupFormEdit = document.querySelector(".popup__form_edit");
const popupFormAdd = document.querySelector(".popup__form_add");
const popupElementEdit = document.querySelector(".popup_edit-item");
const popupElementAdd = document.querySelector(".popup_add-item");
const popupPreviewImage = document.querySelector(".popup_preview-image");
const popupImage = popupPreviewImage.querySelector(".popup__image");
const popupFormElementEdit = popupElementEdit.querySelector(".popup__form");
const popupFormElementAdd = popupElementAdd.querySelector(".popup__form");
const cardTemplate = document.querySelector("#card-template").content;
const nameInput = popupElementEdit.querySelector("#profile-name");
const professionInput = popupElementEdit.querySelector("#profile-profession");
const cardInput = popupElementAdd.querySelector("#card-name");
const linkInput = popupElementAdd.querySelector("#card-link");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const cardsContainer = document.querySelector(".cards__list");
const popups = Array.from(document.querySelectorAll(".popup"));
const inputs = Array.from(document.querySelectorAll(".popup__input"));

function setProfileInput() {
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
}

function openedEditForm() {
  setProfileInput();
  resetInputValidity(popupFormEdit, dataValidation);
  openedPopup(popupElementEdit);
}

function openedAddForm() {
  popupFormAdd.reset();
  resetInputValidity(popupFormAdd, dataValidation);
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

popups.forEach((element) => {
  element.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(element);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(element);
    }
  });
});

function closeOnEsc(evt) {
  if (evt.key === "Escape") {
    const openPopupElement = document.querySelector(".popup_opened");
    closePopup(openPopupElement);
  }
}

function activeLikeBtn(evt) {
  evt.target.classList.toggle("card__heart_active");
}

function deleteCardBtn(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

function showCardImage(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupPreviewImage.querySelector(".popup__image-text").textContent = name;
  openedPopup(popupPreviewImage);
}

function getCardElement(name, link) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = name;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;

  const btnLike = cardElement.querySelector(".card__heart");
  const btnDelete = cardElement.querySelector(".card__delete-button");

  btnLike.addEventListener("click", activeLikeBtn);
  btnDelete.addEventListener("click", deleteCardBtn);

  cardImage.addEventListener("click", () => {
    showCardImage(name, link);
  });
  return cardElement;
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  cardsContainer.prepend(getCardElement(cardInput.value, linkInput.value));
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

initialCards.forEach(function (element) {
  cardsContainer.append(getCardElement(element.name, element.link));
});
