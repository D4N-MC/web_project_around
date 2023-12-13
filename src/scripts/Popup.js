export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._content = this._popup.querySelector(".contentPopup");

    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._handleMouseDown = this._handleMouseDown.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this.removeEventListeners();
  }

  setEventListeners() {
    this._popup.addEventListener("click", this._handleCloseButtonClick);
    document.addEventListener("keydown", this._handleKeyDown);
    this._popup.addEventListener("mousedown", this._handleMouseDown);
  }

  removeEventListeners() {
    this._popup.removeEventListener("click", this._handleCloseButtonClick);
    document.removeEventListener("keydown", this._handleKeyDown);
    this._popup.removeEventListener("mousedown", this._handleMouseDown);
  }

  _handleCloseButtonClick(event) {
    if (event.target.classList.contains("closeButton")) {
      this.close();
    }
  }

  _handleKeyDown(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleMouseDown(event) {
    if (!this._content.contains(event.target)) {
      this.close();
    }
  }
}

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".image-popup__image");
    this._popupCaption = this._popup.querySelector(".image-popup__name");
  }

  open(imageSrc, imageCaption) {
    super.open();
    this._popupImage.src = imageSrc;
    this._popupImage.alt = imageCaption;
    this._popupCaption.textContent = imageCaption;
  }
}

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._inputList = this._popup.querySelectorAll(".input");
    this.setSubmitListener();
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.id] = input.value;
    });
    return inputValues;
  }

  setSubmitListener() {
    this._popup.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitCallback(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
  }
}