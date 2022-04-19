const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const popupEditItem = document.querySelector(".popup_edit_item");
const popupAddItem = document.querySelector(".popup_add_item");
const popupForm = document.querySelector(".popup__form");
const closeEditBtn = popupEditItem.querySelector(".popup__close-button");
const nameInput = popupEditItem.querySelector("input[name=name]");
const professionInput = popupEditItem.querySelector("input[name=profession]");
const closeAddBtn = popupAddItem.querySelector(".popup__close-button");
const cardInput = popupAddItem.querySelector("#card-name");
const linkInput = popupAddItem.querySelector("#card-link");
const popupPreviewImage = document.querySelector(".popup_preview-image");
const popupImage = document.querySelector(".popup__image");
const popupImageText = document.querySelector(".popup__image-text");
const closePreviewImageBtn = popupPreviewImage.querySelector(
".popup__close-button"
);
const cardTemplate = document.querySelector("#card-template");
const сardsList = document.querySelector(".cards__list");
const сardElement = document.querySelectorAll('.card');



function getCardItem(element) {
  const cardItem = cardTemplate.content.cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");
  const deleteBtn = cardItem.querySelector(".card__delete-button");
  const likeBtn = cardItem.querySelector(".card__heart");

  cardTitle.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;
  deleteBtn.addEventListener("click", deleteCard);
  likeBtn.addEventListener("click", likeCard);

  cardImage.addEventListener("click", () => {
  showCardImage(element);
  });
  return cardItem;
};

function renderCard() {
  const cardsFromArray = initialCards.map(getCardItem);
  сardsList.append(...cardsFromArray);
}
renderCard();

function cardAddSubmit (evt) {
  evt.preventDefault();
  const card = getCardItem({name: cardInput.value, link: linkInput.value});
  сardsList.prepend(card);
  cardInput.value = '';
  linkInput.value = '';
  сlosePopup(popupAddItem);
}

function deleteCard(evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

function likeCard(evt) {
  const like = evt.target.closest('.card__heart');
  like.classList.toggle('card__heart_active');
}

function openCardPopap (element) { 
  popupImage.src = element.link;
  popupImage.alt = element.name;
  popupImageText.textContent = element.name;
  openedPopup(popupPreviewImage); 
}

function openedPopup(element) {
  element.classList.add('popup_opened');
}

function сlosePopup(element) {
  element.classList.remove('popup_opened');
}

function handlerFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  сlosePopup(popupEditItem);
}

editBtn.addEventListener('click', function() {
  nameInput.value = nameInput.textContent;
  professionInput.value.value = profileProfession.textContent;
  openedPopup(popupEditItem);
});

closeEditBtn.addEventListener('click', function() {
  сlosePopup(popupEditItem);
});

addBtn.addEventListener('click', function() {
  openedPopup(popupAddItem);
});

closeAddBtn.addEventListener('click', function() {
  сlosePopup(popupAddItem);
});

closePreviewImageBtn.addEventListener('click', function() {
  сlosePopup(popupPreviewImage);
});

popupForm.addEventListener('submit', handlerFormSubmit);

popupAddItem.addEventListener('submit', cardAddSubmit);

