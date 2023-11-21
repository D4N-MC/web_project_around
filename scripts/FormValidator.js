export let editValid = false;
export let addValid = false;

export class FormValidator {
  constructor(inputContainerSelector, inputSelector) {
    this._inputContainer = document.querySelector(inputContainerSelector);
    this._input = this._inputContainer.querySelector(inputSelector);
    this.enableValidation();
  }

  showInputError(message) {
    const errorElement = this._inputContainer.querySelector(".error-message");
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
    this.editSubmitHandler();
    this.addSubmitHandler();

    if (this._input.validity.valid) {
      this.hideInputError();
    } else {
      this.showInputError(this._input.validationMessage);
    }
  }

  editSubmitHandler() {
    if (
      document.getElementById("nombre").validity.valid &&
      document.getElementById("about").validity.valid
    ) {
      document
        .getElementById("guardar-buttonEdit")
        .classList.add("guardar-edit");
      document
        .getElementById("guardar-buttonEdit")
        .classList.remove("guardar-disabledEdit");
      editValid = true;
    } else {
      document
        .getElementById("guardar-buttonEdit")
        .classList.remove("guardar-edit");
      document
        .getElementById("guardar-buttonEdit")
        .classList.add("guardar-disabledEdit");
      editValid = false;
    }
  }

  addSubmitHandler() {
    if (
      document.getElementById("titulo").validity.valid &&
      document.getElementById("link").validity.valid
    ) {
      document.getElementById("guardar-buttonAdd").classList.add("guardar-add");
      document
        .getElementById("guardar-buttonAdd")
        .classList.remove("guardar-disabledAdd");
      addValid = true;
    } else {
      document
        .getElementById("guardar-buttonAdd")
        .classList.remove("guardar-add");
      document
        .getElementById("guardar-buttonAdd")
        .classList.add("guardar-disabledAdd");
      addValid = false;
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
