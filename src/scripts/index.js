import { Section } from "./Section.js";
import {
  editButton,
  addButton,
  editFormElement,
  addFormElement,
  FormEdit,
  FormAdd,
  editPopup,
  addPopup,
} from "./utils.js";

import {
  nombreFormValidator,
  aboutFormValidator,
  tituloFormValidator,
  linkFormValidator,
} from "./FormValidator.js";

import { Card, items } from "./Card.js";

export const cardSection = new Section(
  {
    items: items,
    renderer: (item) => {
      const card = new Card(item.text, item.image);
      card.generateCard();
      cardSection.addItem(card._element);
    },
  },
  ".images"
);

cardSection.render();

//formulario Edit
const editForm = new FormEdit(editFormElement);

editButton.addEventListener("click", () => {
  editPopup.open();
  editForm.setInitialValues();
  editForm._enableSubmit();
  nombreFormValidator.checkInputValidity();
  aboutFormValidator.checkInputValidity();
  nombreFormValidator.hideInputError();
  aboutFormValidator.hideInputError();
});

//formulario Add
const addForm = new FormAdd(addFormElement);
addButton.addEventListener("click", () => {
  addPopup.open();
  addForm._emptyInputs();
  addForm._disableSubmit();
  tituloFormValidator.hideInputError();
  linkFormValidator.hideInputError();
});
