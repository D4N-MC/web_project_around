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
  FormValidator,
  nombreFormValidator,
  aboutFormValidator,
  tituloFormValidator,
  linkFormValidator,
  editValid,
  addValid,
} from "./FormValidator.js";

//formulario Edit
const editForm = new FormEdit(editFormElement, userName, userAbout);

editButton.addEventListener("click", () => {
  editForm.handleOpenForm();
  editForm.setInitialValues();
  nombreFormValidator.checkInputValidity();
  aboutFormValidator.checkInputValidity();
  nombreFormValidator.hideInputError();
  aboutFormValidator.hideInputError();
  editValid = true;
});
//formulario Add
const addForm = new FormAdd(addFormElement);
addButton.addEventListener("click", () => {
  addForm.handleOpenForm();
  addForm._emptyInputs();
  tituloFormValidator.hideInputError();
  linkFormValidator.hideInputError();
  addSave.classList.remove("guardar-add");
  addSave.classList.add("guardar-disabledAdd");
  addValid = false;
});
