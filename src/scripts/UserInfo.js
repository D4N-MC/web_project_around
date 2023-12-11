import { api } from "./api.js";

export class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._userAvatar = document.querySelector(".user-photo");
    this.userId;
  }

  getUserInfo() {
    this.getUserInfoApi();
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
  }
  getUserInfoApi() {
    return api
      .getUserInfo()
      .then((result) => {
        this._nameElement.textContent = result.name;
        this._aboutElement.textContent = result.about;
        this._userAvatar.src = result.avatar;
        this.userId = result._id;

        userData.name = result.name;
        userData.about = result.about;
        userData.avatar = result.avatar;
        userData._id = result._id;

        return result;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }
}

export const userData = {
  name: "",
  about: "",
  avatar: "",
  _id: "",
};

export function isOwner(userData, cardOwner) {
  return userData._id === cardOwner._id;
}
