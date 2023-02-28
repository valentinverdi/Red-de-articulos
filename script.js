const btnCrearArituclo = document.querySelector(".header__i");
const sectionModal = document.getElementById("sectionmodal");
const modal = document.getElementById("modal");
const btnPublicar = document.querySelector(".publicar");
const btnCancelar = document.querySelector(".cancelar");
const textareaAutor = document.querySelector(".modal__autor");
const textareaTitulo = document.querySelector(".modal__titulo");
const textareaInfo = document.querySelector(".modal__info");
const sectionPublicaciones = document.getElementById("publicaciones");



btnCrearArituclo.addEventListener("click",()=>{
    sectionModal.classList.remove("sectionmodalnovisible");
    sectionModal.classList.add("sectionmodal");
    modal.classList.remove("modalnovisible");
    modal.classList.add("modal");
})

btnCancelar.addEventListener("click",()=>{
    sectionModal.classList.remove("sectionmodal");
    sectionModal.classList.add("sectionmodalnovisible");
    modal.classList.remove("modal");
    modal.classList.add("modalnovisible");

    textareaAutor.value = "";
    textareaTitulo.value = "";
    textareaInfo.value = "";
})

btnPublicar.addEventListener("click",()=>{
    if (textareaAutor.value.length > 0 & textareaTitulo.value.length > 0 & textareaInfo.value.length > 0) {
        sectionModal.classList.remove("sectionmodal");
        sectionModal.classList.add("sectionmodalnovisible");
        modal.classList.remove("modal");
        modal.classList.add("modalnovisible");

        agregarObjeto({
            autor : textareaAutor.value,
            titulo : textareaTitulo.value,
            contenido : textareaInfo.value
        })

        textareaAutor.value = "";
        textareaTitulo.value = "";
        textareaInfo.value = "";
    } else {
        alert("Completá todos los campos para publicar tu artículo")
    }

})


const IDBRequest = indexedDB.open("database1")

IDBRequest.addEventListener("upgradeneeded", ()=>{
    const db = IDBRequest.result;
    db.createObjectStore("Articulos",{
        autoIncrement : true
    })
})

IDBRequest.addEventListener("success",()=>{
    leerObjetos()
})

function agregarObjeto(objeto) {
    const db = IDBRequest.result;
    const IDBTransaction = db.transaction("Articulos", "readwrite");
    const objectStore = IDBTransaction.objectStore("Articulos");
    objectStore.add(objeto);

    let div = document.createElement("DIV");
    let divH4 = document.createElement("H4");
    let divP = document.createElement("P"); 
    let divP2 = document.createElement("P"); 

    sectionPublicaciones.appendChild(div);
    div.appendChild(divH4);
    div.appendChild(divP);
    div.appendChild(divP2);
    
    div.classList.add("publicacion");
    divH4.classList.add("publicacion__h4");
    divP.classList.add("publicacion__p");
    divP2.classList.add("publicacion__p2");

    divP2.textContent = textareaAutor.value;
    divH4.textContent = textareaTitulo.value;
    divP.textContent = textareaInfo.value;
}

function leerObjetos() {
    const db = IDBRequest.result;
    const IDBTransaction = db.transaction("Articulos", "readonly");
    const objectStore = IDBTransaction.objectStore("Articulos");
    const cursor = objectStore.openCursor()
    cursor.addEventListener("success",()=>{
        if (cursor.result) {
            crearPublicacion(cursor.result.value.autor, cursor.result.value.titulo, cursor.result.value.contenido);
            cursor.result.continue()
        }
    })
}

function crearPublicacion(autor, titulo, contenido) {
    let div = document.createElement("DIV");
    let divH4 = document.createElement("H4");
    let divP = document.createElement("P"); 
    let divP2 = document.createElement("P"); 

    sectionPublicaciones.appendChild(div);
    div.appendChild(divH4);
    div.appendChild(divP);
    div.appendChild(divP2);
    
    div.classList.add("publicacion");
    divH4.classList.add("publicacion__h4");
    divP.classList.add("publicacion__p");
    divP2.classList.add("publicacion__p2");

    divP2.textContent = autor;
    divH4.textContent = titulo;
    divP.textContent = contenido;
}