import Card from "./card.js";
import {
  items,
  cardList,
  popupElement,
  popupImage,
  popupCloseButton,
  popupName,
} from "./card.js";
import {
  FormValidator,
  nombreFormValidator,
  aboutFormValidator,
  tituloFormValidator,
  linkFormValidator,
  editValid,
  addValid,
} from "./FormValidator.js";
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
export const editClose = document.querySelector(".block-edit__close");
export const editSave = document.querySelector("#guardar-buttonEdit");
export const editBlock = document.querySelector(".block-edit");
//Seccion del formulario add
export const addFormElement = document.querySelector(".formulario-add");
export const addHeader = document.querySelector(".block-add__text");
export const addTitulo = document.querySelector("#titulo");
export const addLink = document.querySelector("#link");
export const addClose = document.querySelector(".block-add__close");
export const addSave = document.querySelector("#guardar-buttonAdd");
export const addBlock = document.querySelector(".block-add");

export class Form {
  constructor(formElement) {
    this._formElement = formElement;
    this._setEventListeners();
  }

  handleOpenForm() {
    this._formElement.classList.add("popup_opened");
  }

  handleCloseForm() {
    this._formElement.classList.remove("popup_opened");
  }

  _setEventListeners() {
    // Cerrar el formulario al presionar la tecla "esc"
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.handleCloseForm();
      }
    });
  }
}

export class FormEdit extends Form {
  constructor(formElement, userNameElement, userAboutElement) {
    super(formElement);
    this._userNameElement = userNameElement;
    this._userAboutElement = userAboutElement;
    this._nombreInput = formElement.querySelector("#nombre");
    this._aboutInput = formElement.querySelector("#about");
    this._submitButton = formElement.querySelector("#guardar-buttonEdit");

    this.setInitialValues();
    this._setEventListeners();
  }

  setInitialValues() {
    this._nombreInput.value = this._userNameElement.textContent;
    this._aboutInput.value = this._userAboutElement.textContent;
  }

  _setEventListeners() {
    super._setEventListeners();
    const closeButton = this._formElement.querySelector(".block-edit__close");
    closeButton.addEventListener("click", () => {
      this.handleCloseForm();
    });

    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleSubmitForm();
    });

    document.addEventListener("mousedown", (event) => {
      if (
        this._formElement.classList.contains("popup_opened") &&
        !editBlock.contains(event.target)
      ) {
        this.handleCloseForm();
      }
    });
    this._formElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this._handleEnterKeyPress();
      }
    });
  }
  _handleEnterKeyPress() {
    if (editValid === true) {
      this._handleSubmitForm();
    }
  }

  _handleSubmitForm() {
    this._userNameElement.textContent = this._nombreInput.value;
    this._userAboutElement.textContent = this._aboutInput.value;
    this.handleCloseForm();
  }
}

export class FormAdd extends Form {
  constructor(formElement) {
    super(formElement);
    this._titleInput = formElement.querySelector("#titulo");
    this._linkInput = formElement.querySelector("#link");
    this._submitButton = formElement.querySelector("#guardar-buttonAdd");

    this._setEventListenersAdd();
  }
  _setEventListenersAdd() {
    const closeButtonAdd = this._formElement.querySelector(".block-add__close");
    closeButtonAdd.addEventListener("click", () => {
      this.handleCloseForm();
    });

    this._formElement.addEventListener("submit", (event) => {
      console.log("submit listened");
      event.preventDefault();
      this._handleSubmitForm();
    });

    document.addEventListener("mousedown", (event) => {
      if (
        this._formElement.classList.contains("popup_opened") &&
        !addBlock.contains(event.target)
      ) {
        this.handleCloseForm();
      }
    });
    this._formElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this._handleEnterKeyPress();
      }
    });
  }

  _handleEnterKeyPress() {
    if (addValid === true) {
      this._handleSubmitForm();
    }
  }
  _emptyInputs() {
    this._titleInput.value = "";
    this._linkInput.value = "";
  }

  _handleSubmitForm() {
    const newCard = new Card(this._titleInput.value, this._linkInput.value);
    newCard.generateCard();
    cardList.insertBefore(newCard._element, cardList.firstChild);
    this.handleCloseForm();
  }
}
