function showInputError(input, message) {
  const errorElement = input.nextElementSibling;
  errorElement.textContent = message;
  input.setCustomValidity("");
  input.classList.add("error");
}

function checkInputValidity(input) {
  if (input.validity.valid) {
    hideInputError(input);
  } else {
    showInputError(input, input.validationMessage);
  }
}

function hideInputError(input) {
  const errorElement = input.nextElementSibling;
  errorElement.textContent = "";
  input.classList.remove("error");
}

const setEventListeners = (formElement, inputClassName) => {
  const inputList = Array.from(
    formElement.querySelectorAll(`.${inputClassName}`)
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(inputElement);
    });
  });
};

const enableValidation = () => {
  formularioEdit.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });

  formularioAdd.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });

  setEventListeners(formularioEdit, "block-edit__nombre");
  setEventListeners(formularioEdit, "block-edit__about");
  setEventListeners(formularioAdd, "block-add__titulo");
  setEventListeners(formularioAdd, "block-add__link");
};
