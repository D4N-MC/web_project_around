export class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._content = this._popup.querySelector("#contentPopup");
      this.setEventListeners();
    }
  
    open() {
      this._popup.classList.add('popup_opened');
    }
  
    close() {
      this._popup.classList.remove('popup_opened');
    }
  
    setEventListeners() {
      this._popup.addEventListener('click', (event) => {
        if (event.target.classList.contains('closeButton')) {
          this.close();
        }
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === 'Escape') {
          this.close();
        }
      })

      this._popup.addEventListener("mousedown", (event) => {
        if (!this._content.contains(event.target)) {
            this.close();
        }
    })
    }
  }

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._popupImage = this._popup.querySelector('.image-popup__image');
      this._popupCaption = this._popup.querySelector('.image-popup__name');
    }
  
    open(imageSrc, imageCaption) {
      this._popupImage.src = imageSrc;
      this._popupImage.alt = imageCaption;
      this._popupCaption.textContent = imageCaption;
      this._popup.classList.add('active');
      super.open();
    }
    close(){
      this._popup.classList.remove('active');
    }
  }

  export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
      super(popupSelector);
      this._submitCallback = submitCallback;
      this._inputList = this._popup.querySelectorAll('.input');
    }

    _getInputValues() {
      const inputValues = {};
      this._inputList.forEach(input => {
        inputValues[input.id] = input.value;
      });
      return inputValues;
    }
  
    setEventListeners() {
      super.setEventListeners();
      this._popup.addEventListener('submit', (event) => {
        event.preventDefault();
        this._submitCallback(this._getInputValues());
        this.close();
      });
    }
  
    close() {
      super.close();
    }
}
