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

  setEventListeners(formularioEdit, "block__input-nombre");
  setEventListeners(formularioEdit, "block__input-about");
  setEventListeners(formularioAdd, "block__input-titulo");
  setEventListeners(formularioAdd, "block__input-link");
};
