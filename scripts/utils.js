import {
  Card,
  items,
  cardList,
  popupElement,
  popupImage,
  popupCloseButton,
  popupName
} from "./Card.js";
import { Popup, PopupWithForm} from "./Popup.js";
import {UserInfo} from "./UserInfo.js";
import { cardSection } from "./index.js";
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

export const editPopup = new PopupWithForm('.formulario-edit', (inputValues) => {
  console.log('Valores del Usuario:', inputValues);
});

export const userInfoInstance = new UserInfo({
  nameSelector: ".user__top-name",
  aboutSelector: ".user__bottom"
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
    const { name, about } = userInfoInstance.getUserInfo()
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

    editNombre.addEventListener("input", () => {
      if(editNombre.validity.valid && editAbout.validity.valid){
        this._enableSubmit();
      } else {                  
        this._disableSubmit();
      }
    });
    editAbout.addEventListener("input", () => {
      if(editNombre.validity.valid && editAbout.validity.valid){
        this._enableSubmit();
      } else {                  
        this._disableSubmit();
      }
    });
  }
  _handleEnterKeyPress() {
    if (editNombre.validity.valid && editAbout.validity.valid) {
      this._handleSubmitForm();
    }
  }
  _disableSubmit(){
    document
        .getElementById("guardar-buttonEdit")
        .classList.remove("guardar-edit");
      document
        .getElementById("guardar-buttonEdit")
        .classList.add("guardar-disabledEdit");
  }
  _enableSubmit(){
    document
        .getElementById("guardar-buttonEdit")
        .classList.add("guardar-edit");
      document
        .getElementById("guardar-buttonEdit")
        .classList.remove("guardar-disabledEdit");
  }

  _handleSubmitForm() {
    userInfoInstance.setUserInfo({
      name: this._nombreInput.value,
      about: this._aboutInput.value
    })
    editPopup.close();
  }
}

export const addPopup = new PopupWithForm('.formulario-add', (inputValues) => {
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
      if(addTitulo.validity.valid && addLink.validity.valid){
        this._enableSubmit();
      } else {
        this._disableSubmit();
      }
    });
    addLink.addEventListener("input", () => {
      if(addTitulo.validity.valid && addLink.validity.valid){
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

  _disableSubmit(){
    document
        .getElementById("guardar-buttonAdd")
        .classList.remove("guardar-add");
      document
        .getElementById("guardar-buttonAdd")
        .classList.add("guardar-disabledAdd");
  }
  _enableSubmit(){
    document.getElementById("guardar-buttonAdd").classList.add("guardar-add");
      document
        .getElementById("guardar-buttonAdd")
        .classList.remove("guardar-disabledAdd");
  }
  _emptyInputs() {
    this._titleInput.value = "";
    this._linkInput.value = "";
  }

  _handleSubmitForm() {
    const newCard = new Card(this._titleInput.value, this._linkInput.value);
    const newCardElement = newCard.generateCard();

    cardSection.addItem(newCardElement);

    addPopup.close();
  }
}
