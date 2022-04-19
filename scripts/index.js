const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const popupEditItem = document.querySelector(".popup_edit_item");
const popupAddItem = document.querySelector(".popup_add_item");
const popupPreviewImage = document.querySelector(".popup_preview-image");

const closeEditBtn = popupEditItem.querySelector(".popup__close-button");
const closeAddBtn = popupAddItem.querySelector(".popup__close-button");
const closePreviewImageBtn = popupPreviewImage.querySelector(
  ".popup__close-button"
);
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const profileInfo = document.querySelector(".profile__info");
const popupForm = document.querySelector(".popup__form");
const popupFormEditName = popupForm.querySelector(".popup__input-name");
const popupFormAddProfission = popupForm.querySelector(
  ".popup__input-profession"
);
const popupFormNewCard = document.querySelector(".popup__form_add-card");
const popupFormCardName = popupFormNewCard.querySelector(".popup__input-card");
const popupFormCardLink = popupFormNewCard.querySelector(".popup__input-link");
const popupImage = document.querySelector(".popup__image");
const popupImageText = document.querySelector(".popup__image-text");
const сardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");
const nameInput = popupEditItem.querySelector("input[name=name]");
const professionInput = popupEditItem.querySelector("input[name=profession]");
const cardInput = popupAddItem.querySelector("#card-name");
const linkInput = popupAddItem.querySelector("#card-link");

function getCardItem(element) {
  const cardItem = cardTemplate.content.cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");
  const likeBtn = cardItem.querySelector(".card__heart");
  const deleteBtn = cardItem.querySelector(".card__delete-button");

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;

  likeBtn.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__heart_active");
  });
  deleteBtn.addEventListener("click", (evt) => {
    const card = evt.target.closest(".card");
    card.remove();
  });
  cardImage.addEventListener("click", () => {
    showCardImage(element);
  });
  return cardItem;
}

function openedPopup(element) {
  element.classList.add("popup_opened");
}
function closePopup(element) {
  element.classList.remove("popup_opened");
}

editBtn.addEventListener("click", function () {
  popupFormEditName.value = profileName.textContent;
  popupFormAddProfission.value = profileProfession.textContent;
  openedPopup(popupEditItem);
});

closeEditBtn.addEventListener("click", function () {
  closePopup(popupEditItem);
});

popupForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = popupFormEditName.value;
  profileProfession.textContent = popupFormAddProfission.value;
  closePopup(popupEditItem);
});

addBtn.addEventListener("click", function () {
  openedPopup(popupAddItem);
});

popupFormNewCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  cardsArrray(
    {
      name: popupFormCardName.value,
      link: popupFormCardLink.value,
    },
    сardsList,
    true
  );
  closePopup(popupAddItem);
  popupFormNewCard.reset();
});

closeAddBtn.addEventListener("click", function () {
  closePopup(popupAddItem);
});

function showCardImage(popupShowCard) {
  openedPopup(popupPreviewImage);
  popupPreviewImageText = popupShowCard.name;
  popupImage.src = popupShowCard.link;
  popupImage.alt = popupShowCard.name;
}

closePreviewImageBtn.addEventListener("click", () => {
  closePopup(popupPreviewImage);
});

function renderCard() {
  const html = initialCards.map(getCardItem);
  сardsList.prepend(...html);
}
renderCard();

function cardsArrray(cardItem, cardAdd, cardNew) {
  const item = getCardItem(cardItem);
  if (cardNew) {
    cardAdd.prepend(item);
  }
}
renderCard();
