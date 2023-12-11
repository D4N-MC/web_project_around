export class FormValidator {
  constructor(inputContainerSelector, inputSelector) {
    this._inputContainer = document.querySelector(inputContainerSelector);
    this._input = this._inputContainer.querySelector(inputSelector);
    this.enableValidation();
  }

  showInputError(message) {
    const errorElement = this._inputContainer.querySelector(".error-message");
    if (this._input === document.getElementById("link")) {
      message = "Ingrese una URL valida";
    }
    errorElement.textContent = message;
    this._input.setCustomValidity("");
    this._input.classList.add("error");
  }

  hideInputError() {
    const errorElement = this._inputContainer.querySelector(".error-message");
    errorElement.textContent = "";
    this._input.classList.remove("error");
  }

  checkInputValidity() {
    if (this._input.validity.valid) {
      this.hideInputError();
    } else {
      this.showInputError(this._input.validationMessage);
    }
  }

  enableValidation() {
    this._input.addEventListener("input", () => {
      this.checkInputValidity();
    });
  }
}

export const nombreFormValidator = new FormValidator(
  ".block-edit__nombre",
  "#nombre"
);
export const aboutFormValidator = new FormValidator(
  ".block-edit__about",
  "#about"
);
export const tituloFormValidator = new FormValidator(
  ".block-add__titulo",
  "#titulo"
);
export const linkFormValidator = new FormValidator(".block-add__link", "#link");
export const avatarFormValidator = new FormValidator(".profile-input", "#profileInput");
