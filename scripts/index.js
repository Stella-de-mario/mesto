let popupElement = document.querySelector(".popup");
let editBtn = document.querySelector(".profile__edit-button");
let closeBtn = popupElement.querySelector(".popup__close-button");
let nameInput = popupElement.querySelector('#user-name');
let professionInput = popupElement.querySelector('#user-profession');
let profileName = document.querySelector(".profile__name");
let profileProfession = document.querySelector(".profile__profession");
let formElement = popupElement.querySelector(".popup__container");

function openPopup() {
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;

  popupElement.classList.add("popup_opened");
}

function closePopup() {
  popupElement.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;

  closePopup();
}

editBtn.addEventListener("click", openPopup);

closeBtn.addEventListener("click", closePopup);

formElement.addEventListener("submit", formSubmitHandler);
