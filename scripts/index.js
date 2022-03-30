let popupElement = document.querySelector(".popup");
let editBtn = document.querySelector(".profile__edit-button");
let closeBtn = popupElement.querySelector(".popup__close-button");
let nameInput = document.querySelector("#user-name");
let professionInput = document.querySelector("#user-profession");
let profileName = document.querySelector(".profile__name");
let profileProfession = document.querySelector(".profile__profession");
// let formElement = popupElement.querySelector(".popup__container");

function togglePopup() {
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;

  popupElement.classList.toggle("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;

  togglePopup();
}

editBtn.addEventListener("click", togglePopup);

closeBtn.addEventListener("click", togglePopup);

formElement.addEventListener("submit", formSubmitHandler);
