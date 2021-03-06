export default class UserInfo {
  constructor({ name, profession, avatar }) {
    this._profileName = document.querySelector(name);
    this._profileProfession = document.querySelector(profession);
    this._profileAvatar = document.querySelector(avatar);
    this._profileId;
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      profession: this._profileProfession.textContent,
    };
  }

  setUserInfo({ name, about, _id, avatar }) {
    this._profileName.textContent = name;
    this._profileProfession.textContent = about;
    this._profileAvatar.src = avatar;
    this._profileId = _id;
  }

  getUserId() {
    return this._profileId;
  }
}
