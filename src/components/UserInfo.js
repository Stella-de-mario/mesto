export default class UserInfo {
  constructor({ name, profession }) {
    this._profileName = document.querySelector(name);
    this._profileProfession = document.querySelector(profession);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      profession: this._profileProfession.textContent,
    };
  }

  setUserInfo(userData) {
    this._profileName.textContent = userData.name;
    this._profileProfession.textContent = userData.profession;
  }
}
