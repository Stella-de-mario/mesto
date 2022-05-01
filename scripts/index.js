const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const popups = document.querySelectorAll(".popup");
const popupFormEdit = document.querySelector(".popup__form_edit");
const popupFormAdd = document.querySelector(".popup__form_add");
const popupElementEdit = document.querySelector(".popup_edit-item");
const popupElementAdd = document.querySelector(".popup_add-item");
const popupPreviewImage = document.querySelector(".popup_preview-image");
const popupImage = popupPreviewImage.querySelector(".popup__image");
const closeEditBtn = popupElementEdit.querySelector(".popup__close-button");
const closeAddBtn = popupElementAdd.querySelector(".popup__close-button");
const closePreviewImageBtn = popupPreviewImage.querySelector(
  ".popup__close-button"
);
const popupFormElementEdit = popupElementEdit.querySelector(".popup__form");
const popupFormElementAdd = popupElementAdd.querySelector(".popup__form");
const cardTemplate = document.querySelector("#card-template").content;
const nameInput = popupElementEdit.querySelector("#profile-name");
const professionInput = popupElementEdit.querySelector("#profile-profession");
const cardInput = popupElementAdd.querySelector("#card-name");
const linkInput = popupElementAdd.querySelector("#card-link");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const сardsList = document.querySelector(".cards__list");

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

editBtn.addEventListener("click", openedEditForm);
addBtn.addEventListener("click", openedAddForm);

function closePopup(element) {
  element.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEsc);
}

closeEditBtn.addEventListener("click", () => {
  closePopup(popupElementEdit);
});

closeAddBtn.addEventListener("click", () => {
  closePopup(popupElementAdd);
});

closePreviewImageBtn.addEventListener("click", () => {
  closePopup(popupPreviewImage);
});

function closeOnOverlay(evt, popupElement) {
  if (evt.target === evt.currentTarget) {
    closePopup(popupElement);
  }
}

function closeOnEsc(evt) {
  if (evt.key === "Escape") {
    const openPopupElement = document.querySelector(".popup_opened");
    closePopup(openPopupElement);
  }
}

popups.forEach((popupElement) => {
  popupElement.addEventListener("mousedown", (evt) => {
    closeOnOverlay(evt, popupElement);
  });
});

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

  const likeBtn = cardElement.querySelector(".card__heart");
  const deleteBtn = cardElement.querySelector(".card__delete-button");

  likeBtn.addEventListener("click", activeLikeBtn);
  deleteBtn.addEventListener("click", deleteCardBtn);

  cardImage.addEventListener("click", () => {
    showCardImage(name, link);
  });
  return cardElement;
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  сardsList.prepend(getCardElement(cardInput.value, linkInput.value));
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
  сardsList.append(getCardElement(element.name, element.link));
});
