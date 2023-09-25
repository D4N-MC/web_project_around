let editbutton = document.querySelector(".user__top-normal");
let formulario = document.querySelector(".formulario");
let PerfilNombre = document.querySelector(".user__top-name");
let PerfilAbout = document.querySelector(".user__bottom");

function OpenFormulario(){
    formulario.innerHTML =
       `<div class="Edit">
            <div class="block">
                <img class="block__close" src="images/iconos/Close Icon.svg" alt="Cerrar formulario">
                <img class="block__close-hover" src="images/iconos/Close Icon Hover.svg" alt="Cerrar formulario">
                <h4 class="block__text">Editar perfil</h4>
                <input type="text" id="nombre" placeholder="Nombre">
                <input type="text" id="about" placeholder="Acerca de mi">
                <button type="button" class="Guardar">Guardar</button>
            </div>
        </div>`
        let closebutton = document.querySelector(".block__close");
        closebutton.addEventListener("click", CloseFormulario);

        let nombre = document.getElementById("nombre");
        let about = document.getElementById("about");
        nombre.value = PerfilNombre.textContent;
        about.value = PerfilAbout.textContent;

        let submit = document.querySelector(".Guardar");

        function CheckGuardar() { if(nombre.value === "" || about.value === ""){
            submit.classList.remove("Guardar");
            submit.classList.add("Guardar-disabled");
            }else{
                submit.classList.add("Guardar");
                submit.classList.remove("Guardar-disabled");
                submit.addEventListener("click", SubmitFormulario);
            }
        }

        CheckGuardar();

        nombre.addEventListener("input", CheckGuardar);
        about.addEventListener("input", CheckGuardar);

        submit.addEventListener("click", SubmitFormulario);

}

function CloseFormulario(){
    formulario.innerHTML = "";
}


function SubmitFormulario(){
    let nombreValue = document.getElementById("nombre").value;
    let aboutValue = document.getElementById("about").value;
        
    PerfilNombre.textContent = nombreValue;
    PerfilAbout.textContent = aboutValue;
    CloseFormulario();
}

editbutton.addEventListener("click", OpenFormulario);