import {
  editButton,
  addButton,
  userName,
  userAbout,
  editFormElement,
  editHeader,
  editNombre,
  editAbout,
  editClose,
  editSave,
  editBlock,
  addFormElement,
  addHeader,
  addTitulo,
  addLink,
  addClose,
  addSave,
  addBlock,
  Form,
  FormEdit,
  FormAdd,
} from "./utils.js";

import {
  nombreFormValidator,
  aboutFormValidator,
  tituloFormValidator,
  linkFormValidator
} from "./FormValidator.js";

//formulario Edit
const editForm = new FormEdit(editFormElement, userName, userAbout);

editButton.addEventListener("click", () => {
  editForm.handleOpenForm();
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
  addForm.handleOpenForm();
  addForm._emptyInputs();
  addForm._disableSubmit();
  tituloFormValidator.hideInputError();
  linkFormValidator.hideInputError();
});
