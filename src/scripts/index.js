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
  changePhotoPopup,
  FormChangePhoto,
} from "./utils.js";

import {
  nombreFormValidator,
  aboutFormValidator,
  tituloFormValidator,
  linkFormValidator,
  avatarFormValidator,
} from "./FormValidator.js";

import { Card, items } from "./Card.js";
import { UserInfo, userData, isOwner } from "./UserInfo.js";
import { api } from "./api.js";

const changePhotoElement = document.querySelector(".profilePopup");
const changePhoto = new FormChangePhoto(changePhotoElement);
const userProfileButton = document.querySelector(".user-photoBack");

userProfileButton.addEventListener("click", () => {
  changePhotoPopup.open();
  changePhoto.setInitialValue();
  avatarFormValidator.hideInputError();
  changePhoto.disableSubmit();
});

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

cardSection.clear();

api
  .getUserInfo()
  .then((userInfo) => {
    userData.name = userInfo.name;
    userData.about = userInfo.about;
    userData.avatar = userInfo.avatar;
    userData._id = userInfo._id;

    return api.getInitialCards();
  })
  .then((cardsData) => {
    cardsData.forEach((cardData) => {
      const cardInfo = {
        name: cardData.name,
        link: cardData.link,
        owner: cardData.owner,
        id: cardData._id,
        likes: cardData.likes,
      };

      identifyCard(cardInfo);

      const card = new Card(cardData.name, cardData.link, cardInfo);
      card.generateCard();
      cardSection.addItem(card._element);

      const deleteIcon = card._element.querySelector(".post__delete");
      const deleteIconHover = card._element.querySelector(
        ".post__delete-hover"
      );

      const isCurrentUserOwner = isOwner(userData, cardInfo.owner);

      deleteIcon.style.display = isCurrentUserOwner ? "block" : "none";
      deleteIconHover.style.display = isCurrentUserOwner ? "block" : "none";

      const likesCountElement =
        card._element.querySelector(".post__like-count");
      likesCountElement.textContent = cardInfo.likes.length.toString();

      const likeButton = card._element.querySelector(".post__like");
      if (cardInfo.likes.some((user) => user._id === userData._id)) {
        likeButton.classList.add("post__liked");
      }
    });
  })
  .catch((error) => {
    console.error("Error al obtener las tarjetas:", error);
  });

export function identifyCard(cardContainer) {
  //console.log("ID de la tarjeta identifiada", cardContainer.id);
}
