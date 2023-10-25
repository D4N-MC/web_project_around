const editButton = document.querySelector(".user__top-normal");
const addButton = document.querySelector(".user-add");
const formulario = document.querySelector(".formulario");
const perfilNombre = document.querySelector(".user__top-name");
const perfilAbout = document.querySelector(".user__bottom");
let addFormOpen = false;
let editFormOpen = false;

function OpenEditFormulario() {
  if (!editFormOpen) {
    formulario.classList.add("popup_opened");
    const closebutton = document.querySelector(".block__close");
    closebutton.addEventListener("click", CloseFormulario);

    const nombre = document.getElementById("nombre");
    const about = document.getElementById("about");
    const formTitulo = document.querySelector(".block__text");

    formTitulo.textContent = "Editar perfil";
    nombre.placeholder = "Nombre";
    about.placeholder = "Acerca de mi";

    nombre.value = perfilNombre.textContent;
    about.value = perfilAbout.textContent;

    const submit = document.querySelector(".Guardar");

    function CheckGuardar() {
      if (editFormOpen) {
        if (nombre.value === "" || about.value === "") {
          submit.classList.remove("Guardar");
          submit.classList.add("Guardar-disabled");
        } else {
          submit.classList.add("Guardar");
          submit.classList.remove("Guardar-disabled");
          submit.addEventListener("click", SubmitFormulario);
        }
      }
    }

    CheckGuardar();

    nombre.addEventListener("input", CheckGuardar);
    about.addEventListener("input", CheckGuardar);

    submit.addEventListener("click", SubmitFormulario);

    editFormOpen = true;
    addFormOpen = false;
  }
}

function OpenAddFormulario() {
  if (!addFormOpen) {
    formulario.classList.add("popup_opened");
    const closebutton = document.querySelector(".block__close");
    closebutton.addEventListener("click", function(){
      CloseFormulario();
     guardarButton.classList.add("Guardar");
     guardarButton.classList.remove("Guardar-disabled"); 
    });

    const titulo = document.getElementById("nombre");
    const link = document.getElementById("about");
    const formTitulo = document.querySelector(".block__text");

    formTitulo.textContent = "Nuevo Lugar";
    titulo.placeholder = "Titulo";
    link.placeholder = "URL de la Imagen";

    titulo.value = "";
    link.value = "";

    let guardarButton = document.querySelector(".Guardar");

    guardarButton.classList.remove("Guardar");
    guardarButton.classList.add("Guardar-disabled");

    CheckPost();

    function CheckPost() {
      if (addFormOpen) {
        if (titulo.value === "" || link.value === "") {
          guardarButton.classList.remove("Guardar");
          guardarButton.classList.add("Guardar-disabled");
        } else {
          guardarButton.classList.add("Guardar");
          guardarButton.classList.remove("Guardar-disabled");
        }
      }
    }

    //
    titulo.addEventListener("keydown", function (event) {
      if (titulo.value !== "" && link.value !== "" && event.key === "Enter" && addFormOpen) {
        event.preventDefault();
        handleGuardarClick();
      }
    });
    
    link.addEventListener("keydown", function (event) {
      if (titulo.value !== "" && link.value !== "" && event.key === "Enter" && addFormOpen) {
        event.preventDefault();
        handleGuardarClick();
      }
    });
    //

    titulo.addEventListener("input", CheckPost);
    link.addEventListener("input", CheckPost);

    function handleGuardarClick() {
      if (addFormOpen) {
        addPost(link.value, titulo.value);
        addFormOpen = false;
        guardarButton.removeEventListener("click", handleGuardarClick); // Eliminar el evento después de usarlo
      } 
    }

    guardarButton.addEventListener("click", handleGuardarClick);
    addFormOpen = true;
    editFormOpen = false;
  }
}

function CloseFormulario() {
  formulario.classList.remove("popup_opened");
  addFormOpen = false;
  editFormOpen = false;
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

      const imageUrl = postImage.src;
      const postName = postText;

      bigImage.src = imageUrl;
      name.textContent = postName;

      imagePopup.classList.add("active");

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
