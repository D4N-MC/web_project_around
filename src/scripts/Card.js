import { Popup, PopupWithImage } from "./Popup.js";
import { cardSection, identifyCard } from "./index.js";
import { api } from "./api.js";
import { UserInfo, isOwner, userData } from "./UserInfo.js";
import zionImage from "../images/images-post/zion-utah.jpg";
import yellowstoneImage from "../images/images-post/yellowstone.jpg";
import granCanonImage from "../images/images-post/gran-cañon.jpg";
import lagoLouiseImage from "../images/images-post/lago-louise.jpg";

export const items = [
  {
    image: zionImage,
    text: "Zion Parque Nacional",
  },
];

export const cardList = document.querySelector(".images");
export const popupElement = document.querySelector(".image-popup");
export const popupImage = document.querySelector(".image-popup__image");
export const popupCloseButton = document.querySelector(".image-popup__close");
export const popupName = document.querySelector(".image-popup__name");

const popupWithImage = new PopupWithImage(".image-popup");
const popupDeleteCard = new Popup(".eliminatePopup");

export class Card {
  constructor(cardName, image, cardInfo, altText = cardName) {
    this._cardName = cardName;
    this._image = image;
    this._altText = altText;
    this._deletePopup = document.querySelector(".eliminatePopup");
    this._deleteButton = this._deletePopup.querySelector(
      ".beforeEliminate-button"
    );
    this._cardInfo = cardInfo;
  }
  _getTemplate() {
    const cardElement = document
      .getElementById("post-template")
      .content.querySelector(".post")
      .cloneNode(true);

    const cardNameElement = cardElement.querySelector(".post__text");
    const cardImageElement = cardElement.querySelector(".post__image");

    cardNameElement.textContent = this._cardName;
    cardImageElement.src = this._image;
    cardImageElement.alt = this._altText;
    return cardElement;
  }

  _handleCardClick() {
    popupWithImage.open(this._image, this._cardName);
  }

  _handleLike() {
    const likeButton = this._element.querySelector(".post__like");
    const likeButtonHover = this._element.querySelector(".post__like-hover");
    const likesCountElement = this._element.querySelector(".post__like-count");

    const currentLikes = parseInt(likesCountElement.textContent);
    const isLiked = likeButton.classList.contains("post__liked");

    const cardId = this._cardInfo.id;

    if (isLiked) {
      api
        .removeLike(cardId)
        .then((updatedCardData) => {
          likesCountElement.textContent =
            updatedCardData.likes.length.toString();
          likeButton.classList.remove("post__liked");
          likeButtonHover.classList.remove("post__liked");
        })
        .catch((error) => {
          console.error('Error al quitar "me gusta" de la tarjeta:', error);
        });
    } else {
      api
        .addLike(cardId)
        .then((updatedCardData) => {
          likesCountElement.textContent =
            updatedCardData.likes.length.toString();
          likeButton.classList.add("post__liked");
          likeButtonHover.classList.add("post__liked");
        })
        .catch((error) => {
          console.error('Error al dar "me gusta" a la tarjeta:', error);
        });
    }
  }
  _handleDelete() {
    const deleteButton = this._deleteButton;

    popupDeleteCard.open();

    const handleDeleteEvent = () => {
      deleteButton.disabled = true;
      deleteButton.textContent = "Eliminando...";

      const currentCardInfo = this._cardInfo;
      const cardId = currentCardInfo.id;

      isOwner(userData, currentCardInfo.owner);

      deleteButton.removeEventListener("click", handleDeleteEvent);

      api
        .deleteCard(cardId)
        .then((data) => {
          if (data.message && data.message === "This post has been deleted") {
            console.log("Tarjeta eliminada:", data);

            if (this._element) {
              this._element.remove();
            }
          } else {
            throw new Error(
              "Error al eliminar la tarjeta: Respuesta inesperada del servidor"
            );
          }
        })
        .catch((error) => {
          console.error("Error al eliminar la tarjeta:", error);
        })
        .finally(() => {
          popupDeleteCard.close();
          deleteButton.textContent = "Sí";
          deleteButton.disabled = false;
        });
    };

    deleteButton.addEventListener("click", handleDeleteEvent);
  }

  _setEventListeners() {
    this._element
      .querySelector(".post__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });

    this._element.querySelector(".post__like").addEventListener("click", () => {
      this._handleLike();
    });

    this._element
      .querySelector(".post__delete")
      .addEventListener("click", () => {
        this._handleDelete();
      });
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    return this._element;
  }
}

export function addNewCard(name, link) {
  api
    .addCard(name, link)
    .then((newCardData) => {
      const cardInfo = {
        name: newCardData.name,
        link: newCardData.link,
        owner: newCardData.owner,
        id: newCardData._id,
        likes: newCardData.likes,
      };

      identifyCard(cardInfo);

      const newCard = new Card(newCardData.name, newCardData.link, cardInfo);
      newCard.generateCard();

      cardSection.addNewItem(newCard._element);

      const isCurrentUserOwner = isOwner(userData, cardInfo.owner);
    })
    .catch((error) => {
      console.error("Error al añadir la nueva tarjeta:", error);
    });
}
