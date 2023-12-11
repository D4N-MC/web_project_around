import "../index.css";
import { Card, addNewCard } from "./Card.js";
import { Popup, PopupWithForm } from "./Popup.js";
import { UserInfo } from "./UserInfo.js";
import { cardSection } from "./index.js";
import { api } from "./api.js";
import { avatarFormValidator } from "./FormValidator.js";
//Seccion del perfil del usuario
export const editButton = document.querySelector(".user__top-normal");
export const addButton = document.querySelector(".user-add");
export const userName = document.querySelector(".user__top-name");
export const userAbout = document.querySelector(".user__bottom");
//Seccion del formulario edit
export const editFormElement = document.querySelector(".formulario-edit");
export const editHeader = document.querySelector(".block-edit__text");
export const editNombre = document.querySelector("#nombre");
export const editAbout = document.querySelector("#about");
export const editSave = document.querySelector("#guardar-buttonEdit");
export const editBlock = document.querySelector(".block-edit");
//Seccion del formulario add
export const addFormElement = document.querySelector(".formulario-add");
export const addHeader = document.querySelector(".block-add__text");
export const addTitulo = document.querySelector("#titulo");
export const addLink = document.querySelector("#link");
export const addSave = document.querySelector("#guardar-buttonAdd");
export const addBlock = document.querySelector(".block-add");

export class Form {
  constructor(formElement) {
    this._formElement = formElement;
  }
}

export const changePhotoPopup = new Popup(".profilePopup");

export class FormChangePhoto extends Form {
  constructor(formElement) {
    super(formElement);
    this._urlInput = formElement.querySelector("#profileInput");
    this._submitButton = formElement.querySelector(
      ".profilePopup-block__button"
    );
    this._userPhoto = document.querySelector(".user-photo");

    this._setEventListeners();
  }

  submitChangedPhoto() {
    const newAvatarUrl = this._urlInput.value;

    this._submitButton.textContent = "Guardando...";
    this._submitButton.disabled = true;

    api
      .updateAvatar(newAvatarUrl)
      .then((userData) => {
        this.updatePhoto(newAvatarUrl);
      })
      .catch((error) => {
        console.error("Error al actualizar la foto de perfil:", error);
      })
      .finally(() => {
        this._submitButton.textContent = "Guardar";
        this._submitButton.disabled = false;

        changePhotoPopup.close();
      });
  }
  updatePhoto(newImageUrl) {
    this._userPhoto.src = newImageUrl;
  }
  setInitialValue() {
    this._urlInput.value = "";
  }

  _setEventListeners() {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.submitChangedPhoto();
    });
    this._formElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this._handleEnterKeyPress();
        avatarFormValidator.checkInputValidity();
      }
    });

    this._urlInput.addEventListener("input", () => {
      if (this._urlInput.validity.valid) {
        this.enableSubmit();
        avatarFormValidator.hideInputError();
      } else {
        this.disableSubmit();
      }
    });
  }
  _handleEnterKeyPress() {
    if (this._urlInput.validity.valid) {
      this.submitChangedPhoto();
    } else {
    }
  }
  enableSubmit() {
    document
      .getElementById("submitAvatar")
      .classList.add("profilePopup-block__button");
    document
      .getElementById("submitAvatar")
      .classList.remove("profilePopup-block__buttonDisabled");
  }
  disableSubmit() {
    document
      .getElementById("submitAvatar")
      .classList.add("profilePopup-block__buttonDisabled");
    document
      .getElementById("submitAvatar")
      .classList.remove("profilePopup-block__button");
  }
}

export const editPopup = new PopupWithForm(
  ".formulario-edit",
  (inputValues) => {
    console.log("Valores del Usuario:", inputValues);
  }
);

export const userInfoInstance = new UserInfo({
  nameSelector: ".user__top-name",
  aboutSelector: ".user__bottom",
});

export class FormEdit extends Form {
  constructor(formElement) {
    super(formElement);
    this._nombreInput = formElement.querySelector("#nombre");
    this._aboutInput = formElement.querySelector("#about");
    this._submitButton = formElement.querySelector("#guardar-buttonEdit");

    this.setInitialValues();
    this._setEventListeners();
  }

  setInitialValues() {
    const { name, about } = userInfoInstance.getUserInfo();
    this._nombreInput.value = name;
    this._aboutInput.value = about;
  }

  _setEventListeners() {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleSubmitForm();
    });

    this._formElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this._handleEnterKeyPress();
      }
    });

    this._nombreInput.addEventListener("input", () => {
      this._handleInputValidation();
    });

    this._aboutInput.addEventListener("input", () => {
      this._handleInputValidation();
    });
  }

  _handleInputValidation() {
    if (this._nombreInput.validity.valid && this._aboutInput.validity.valid) {
      this._enableSubmit();
    } else {
      this._disableSubmit();
    }
  }

  _handleEnterKeyPress() {
    if (this._nombreInput.validity.valid && this._aboutInput.validity.valid) {
      this._handleSubmitForm();
    }
  }

  _disableSubmit() {
    this._submitButton.classList.remove("guardar-edit");
    this._submitButton.classList.add("guardar-disabledEdit");
  }

  _enableSubmit() {
    this._submitButton.textContent = "Guardar";
    this._submitButton.disabled = false;
    this._submitButton.classList.add("guardar-edit");
    this._submitButton.classList.remove("guardar-disabledEdit");
  }

  _handleSubmitForm() {
    const newName = this._nombreInput.value;
    const newAbout = this._aboutInput.value;

    this._submitButton.textContent = "Guardando...";
    this._submitButton.disabled = true;

    fetch("https://around.nomoreparties.co/v1/web_es_08/users/me", {
      method: "PATCH",
      headers: {
        authorization: "cebd400e-cb13-478f-a576-1969697c9570",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        about: newAbout,
      }),
    })
      .then((response) => response.json())
      .then((updatedUserData) => {
        userInfoInstance.setUserInfo({
          name: updatedUserData.name,
          about: updatedUserData.about,
        });

        editPopup.close();
      })
      .catch((error) => {
        console.error("Error al actualizar el perfil:", error);
      })
      .finally(() => {
        this._enableSubmit();
      });
  }
}

export const addPopup = new PopupWithForm(".formulario-add", (inputValues) => {
  ///no es necesario mostrar los valores de addPopup
});

export class FormAdd extends Form {
  constructor(formElement) {
    super(formElement);
    this._titleInput = formElement.querySelector("#titulo");
    this._linkInput = formElement.querySelector("#link");
    this._submitButton = formElement.querySelector("#guardar-buttonAdd");
    this._setEventListenersAdd();
  }
  _setEventListenersAdd() {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleSubmitForm();
    });

    this._formElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this._handleEnterKeyPress();
      }
    });

    addTitulo.addEventListener("input", () => {
      if (addTitulo.validity.valid && addLink.validity.valid) {
        this._enableSubmit();
      } else {
        this._disableSubmit();
      }
    });
    addLink.addEventListener("input", () => {
      if (addTitulo.validity.valid && addLink.validity.valid) {
        this._enableSubmit();
      } else {
        this._disableSubmit();
      }
    });
  }

  _handleEnterKeyPress() {
    if (addTitulo.validity.valid && addLink.validity.valid) {
      this._handleSubmitForm();
    }
  }

  _disableSubmit() {
    document
      .getElementById("guardar-buttonAdd")
      .classList.remove("guardar-add");
    document
      .getElementById("guardar-buttonAdd")
      .classList.add("guardar-disabledAdd");
  }
  _enableSubmit() {
    document.getElementById("guardar-buttonAdd").classList.add("guardar-add");
    document
      .getElementById("guardar-buttonAdd")
      .classList.remove("guardar-disabledAdd");
    document.getElementById("guardar-buttonAdd").disabled = false;
    document.getElementById("guardar-buttonAdd").textContent = "Guardar";
  }
  _emptyInputs() {
    this._titleInput.value = "";
    this._linkInput.value = "";
  }

  _handleSubmitForm() {
    document.getElementById("guardar-buttonAdd").disabled = true;
    document.getElementById("guardar-buttonAdd").textContent = "Guardando...";
    addNewCard(this._titleInput.value, this._linkInput.value);

    setTimeout(() => {
      this._enableSubmit();

      addPopup.close();
    }, 400);
  }
}
