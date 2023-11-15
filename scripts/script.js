const editButton = document.querySelector(".user__top-normal");
const addButton = document.querySelector(".user-add");
const formularioEdit = document.querySelector(".formulario-edit");
const formularioAdd = document.querySelector(".formulario-add");
const perfilNombre = document.querySelector(".user__top-name");
const perfilAbout = document.querySelector(".user__bottom");
let addFormOpen = false;
let editFormOpen = false;
const submitButtonEdit = document.getElementById("guardar-buttonEdit");
const submitButtonAdd = document.getElementById("guardar-buttonAdd");
let editFormSubmitted = false;
let addFormSubmitted = false;

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    CloseFormulario();
    document.querySelector(".image-popup").classList.remove("active");
  }
});

function OpenEditFormulario() {
  if (!editFormOpen) {
    formularioEdit.classList.add("popup_opened");
    const closebutton = document.querySelector(".block-edit__close");
    closebutton.addEventListener("click", CloseFormulario);

    const nombre = document.getElementById("nombre");
    const about = document.getElementById("about");
    const formTitulo = document.querySelector(".block-edit__text");

    formTitulo.textContent = "Editar perfil";
    nombre.placeholder = "Nombre";
    about.placeholder = "Acerca de mi";

    nombre.value = perfilNombre.textContent;
    about.value = perfilAbout.textContent;

    editFormSubmitted = true;

    hideInputError(nombre);
    hideInputError(about);

    enableValidation();

    function CheckGuardar() {
      if (editFormOpen) {
        checkInputValidity(nombre);
        checkInputValidity(about);

        if (nombre.validity.valid && about.validity.valid) {
          submitButtonEdit.classList.add("guardar-edit");
          submitButtonEdit.classList.remove("guardar-disabledEdit");
          submitButtonEdit.addEventListener("click", function (event) {
            SubmitFormulario();
          });
          editFormSubmitted = true;
        } else {
          submitButtonEdit.classList.remove("guardar-edit");
          submitButtonEdit.classList.add("guardar-disabledEdit");
          editFormSubmitted = false;
        }
      }
    }

    nombre.addEventListener("input", function () {
      hideInputError(nombre);
      CheckGuardar();
    });
    about.addEventListener("input", function () {
      hideInputError(about);
      CheckGuardar();
    });

    submitButtonEdit.addEventListener("click", function (event) {
      if (!nombre.validity.valid) {
        showInputError(nombre, "Este campo es obligatorio");
        editFormSubmitted = false;
      }

      if (!about.validity.valid) {
        showInputError(about, "Este campo es obligatorio");
        editFormSubmitted = false;
      }

      if (!nombre.validity.valid || !about.validity.valid) {
        event.preventDefault();
        editFormSubmitted = false;
      } else {
        SubmitFormulario();
        editFormSubmitted = true;
      }
    });

    nombre.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && editFormOpen) {
        if (editFormSubmitted === false) {
          event.preventDefault();
          CheckGuardar();
          return;
        }
        if (
          editFormSubmitted === true &&
          nombre.validity.valid &&
          about.validity.valid &&
          submitButtonEdit.classList.contains("guardar-edit") &&
          !submitButtonEdit.classList.contains("guardar-disabledEdit")
        ) {
          event.preventDefault();
          CheckGuardar();
          SubmitFormulario();
          editFormSubmitted = true;
        }
      }
    });

    about.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && editFormOpen) {
        if (editFormSubmitted === false) {
          event.preventDefault();
          CheckGuardar();
          return;
        }
        if (
          editFormSubmitted === true &&
          nombre.validity.valid &&
          about.validity.valid &&
          submitButtonEdit.classList.contains("guardar-edit") &&
          !submitButtonEdit.classList.contains("guardar-disabledEdit")
        ) {
          event.preventDefault();
          CheckGuardar();
          SubmitFormulario();
          editFormSubmitted = true;
        }
      }
    });

    const editBlock = document.querySelector(".block-edit");
    formularioEdit.addEventListener("mousedown", function (event) {
      if (!editBlock.contains(event.target)) {
        CloseFormulario();
      }
    });

    editFormOpen = true;
    addFormOpen = false;
  }
}

function OpenAddFormulario() {
  if (!addFormOpen) {
    formularioAdd.classList.add("popup_opened");
    const closebutton = document.querySelector(".block-add__close");
    closebutton.addEventListener("click", function () {
      CloseFormulario();
      submitButtonAdd.classList.add("guardar-add");
      submitButtonAdd.classList.remove("guardar-disabledAdd");
    });

    const titulo = document.getElementById("titulo");
    const link = document.getElementById("link");
    const formTitulo = document.querySelector(".block-add__text");

    formTitulo.textContent = "Nuevo Lugar";
    titulo.placeholder = "Titulo";
    link.placeholder = "URL de la Imagen";

    titulo.value = "";
    link.value = "";

    addFormSubmitted = false;

    hideInputError(titulo);
    hideInputError(link);

    enableValidation();

    CheckPost();
    addFormOpen = true;

    function CheckPost() {
      if (addFormOpen === true) {
        checkInputValidity(titulo);
        checkInputValidity(link);

        if (!titulo.validity.valid || !link.validity.valid) {
          submitButtonAdd.classList.remove("guardar-add");
          submitButtonAdd.classList.add("guardar-disabledAdd");
          addFormSubmitted = false;
        } else {
          submitButtonAdd.classList.add("guardar-add");
          submitButtonAdd.classList.remove("guardar-disabledAdd");
          submitButtonAdd.addEventListener("click", function (event) {
            handleGuardarClick();
          });
          addFormSubmitted = true;
        }
      }
    }

    submitButtonAdd.addEventListener("click", function (event) {
      if (!titulo.validity.valid) {
        showInputError(titulo, "Este campo es obligatorio");
        addFormSubmitted = false;
      }

      if (!link.validity.valid) {
        showInputError(link, "Ingrese una URL empezando por https://");
        addFormSubmitted = false;
      }

      if (!titulo.validity.valid || !link.validity.valid) {
        event.preventDefault();
        addFormSubmitted = false;
      } else {
        handleGuardarClick();
        addFormSubmitted = true;
      }
    });
    //
    titulo.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && addFormOpen) {
        if (addFormSubmitted === false) {
          event.preventDefault();
          CheckPost();
          return;
        }
        if (
          addFormSubmitted === true &&
          titulo.validity.valid &&
          link.validity.valid &&
          guardarButton.classList.contains("guardar-add") &&
          !guardarButton.classList.contains("guardar-disabledAdd")
        ) {
          event.preventDefault();
          handleGuardarClick();
          addFormSubmitted = true;
        }
      }
    });

    link.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && addFormOpen) {
        if (addFormSubmitted === false) {
          event.preventDefault();
          CheckPost();
          return;
        }
        if (
          addFormSubmitted === true &&
          titulo.validity.valid &&
          link.validity.valid &&
          guardarButton.classList.contains("guardar-add") &&
          !guardarButton.classList.contains("guardar-disabledAdd")
        ) {
          event.preventDefault();
          handleGuardarClick();
          addFormSubmitted = true;
        }
      }
    });

    titulo.addEventListener("input", function () {
      hideInputError(titulo);
      CheckPost();
    });

    link.addEventListener("input", function () {
      hideInputError(link);
      CheckPost();
    });

    function handleGuardarClick() {
      CheckPost();
      if (addFormOpen) {
        addPost(link.value, titulo.value);
        addFormOpen = false;
        submitButtonAdd.removeEventListener("click", handleGuardarClick);
      }
    }

    const addBlock = document.querySelector(".block-add");
    formularioAdd.addEventListener("mousedown", function (event) {
      if (!addBlock.contains(event.target)) {
        CloseFormulario();
      }
    });

    submitButtonAdd.addEventListener("click", handleGuardarClick);
    addFormOpen = true;
    editFormOpen = false;
  }
}

function CloseFormulario() {
  formularioEdit.classList.remove("popup_opened");
  formularioAdd.classList.remove("popup_opened");
  addFormOpen = false;
  editFormOpen = false;
  addFormSubmitted = false;
  editFormSubmitted = false;

  submitButtonEdit.classList.add("guardar-edit");
  submitButtonEdit.classList.remove("guardar-disabledEdit");
  submitButtonEdit.addEventListener("click", SubmitFormulario);
  submitButtonAdd.classList.remove("guardar-add");
  submitButtonAdd.classList.add("guardar-disabledAdd");
}

function SubmitFormulario() {
  if (editFormOpen) {
    const nombreValue = document.getElementById("nombre").value;
    const aboutValue = document.getElementById("about").value;

    perfilNombre.textContent = nombreValue;
    perfilAbout.textContent = aboutValue;
    CloseFormulario();
  }
}

function addPost(postSrc, postText) {
  const postTemplate = document.querySelector("#post-template").content;
  const postElement = postTemplate.querySelector(".post").cloneNode(true);

  postElement.querySelector(".post__image").src = postSrc;
  postElement.querySelector(".post__text").textContent = postText;
  postElement
    .querySelector(".post__like")
    .addEventListener("click", function (evt) {
      const likeButton = evt.target;
      const likeButtonHover = postElement.querySelector(".post__like-hover");
      likeButton.classList.toggle("post__liked");
      likeButtonHover.classList.toggle("post__liked");
    });

  postElement
    .querySelector(".post__image")
    .addEventListener("click", function (evt) {
      const postImage = evt.target;
      const imagePopup = document.querySelector(".image-popup");
      const bigImage = imagePopup.querySelector(".image-popup__image");
      const name = imagePopup.querySelector(".image-popup__name");
      const closePopup = imagePopup.querySelector(".image-popup__close");
      const imagePopupContent = document.querySelector(".image-popup__content");

      const imageUrl = postImage.src;
      const postName = postText;

      bigImage.src = imageUrl;
      name.textContent = postName;

      imagePopup.classList.add("active");

      imagePopup.addEventListener("mousedown", function (event) {
        if (!imagePopupContent.contains(event.target)) {
          imagePopup.classList.remove("active");
        }
      });

      closePopup.addEventListener("click", function () {
        imagePopup.classList.remove("active");
      });
    });

  const imagesSection = document.querySelector(".images");
  imagesSection.prepend(postElement);
  CloseFormulario();
}

editButton.addEventListener("click", OpenEditFormulario);
addButton.addEventListener("click", OpenAddFormulario);

const postTextElements = document.querySelectorAll(".post__text");
const postImageElements = document.querySelectorAll(".post__image");

addPost("images/images-post/zion-utah.jpg", "Zion Parque Nacional");
addPost("images/images-post/yellowstone.jpg", "Parque Yellowstone");
addPost("images/images-post/gran-cañon.jpg", "El Gran Cañon");
addPost(
  "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  "Montañas Calvas"
);
addPost("images/images-post/lago-louise.jpg", "Lago de Moraine");
addPost(
  "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  "Valle de Yosemite"
);

const imagesSection = document.querySelector(".images");

imagesSection.addEventListener("click", (event) => {
  const deleteIcon = event.target.closest(".post__delete");
  if (deleteIcon) {
    const post = deleteIcon.closest(".post");
    post.remove();
  }
});
