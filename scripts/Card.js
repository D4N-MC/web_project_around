import { Popup, PopupWithImage} from "./Popup.js";
import { Section } from "./Section.js";
export const items = [
  {
    image: "images/images-post/zion-utah.jpg",
    text: "Zion Parque Nacional",
  },
  {
    image: "images/images-post/yellowstone.jpg",
    text: "Parque Yellowstone",
  },
  {
    image: "images/images-post/gran-cañon.jpg",
    text: "El Gran Cañon",
  },
  {
    image:
      "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
    text: "Montañas Calvas",
  },
  {
    image: "images/images-post/lago-louise.jpg",
    text: "Lago de Moraine",
  },
  {
    image:
      "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
    text: "Valle de Yosemite",
  },
];

export const cardList = document.querySelector(".images");
export const popupElement = document.querySelector(".image-popup");
export const popupImage = document.querySelector(".image-popup__image");
export const popupCloseButton = document.querySelector(".image-popup__close");
export const popupName = document.querySelector(".image-popup__name");

const popupWithImage = new PopupWithImage(".image-popup");

export class Card {
  constructor(cardName, image, altText = cardName) {
    this._cardName = cardName;
    this._image = image;
    this._altText = altText;
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

  _handleCardClick(){
      popupWithImage.open(this._image, this._cardName);
  }

  _handleLike() {
    const likeButton = this._element.querySelector(".post__like");
    const likeButtonHover = this._element.querySelector(".post__like-hover");

    likeButton.classList.toggle("post__liked");
    likeButtonHover.classList.toggle("post__liked");
  }
  _handleDelete() {
    this._element.remove();
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

//items.forEach((item) => {
  //const card = new Card(item.text, item.image);
 // card.generateCard();
 // cardList.appendChild(card._element);
//});
