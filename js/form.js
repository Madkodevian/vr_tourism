//Presionar F1 para abrir ventana arriba, live server.
//Iniciar los métodos:
window.onload = inicialize;
//Variables globales:
var form;
var refForm;

function inicialize() {
    form = document.getElementById("form");
    form.addEventListener("submit", sendFormToFirebase, false);
    //Referencia a la base de datos:
    refForm = firebase.database().ref().child("form");
    //Se indica "child" porque es un hijo del nodo raíz de la bbdd, es decir, del form.
    showFormToFirebase();
}

function showFormToFirebase() {
    refForm.on("value", function (snap) {
        console.log(snap.val())
    })
}

//Enviar el formulario a la base de datos:
function sendFormToFirebase(event) {
    event.preventDefault();
    refForm.push({
        name: event.target.name.value,
        surname: event.target.surname.value,
        phone: event.target.phone.value,
        email: event.target.email.value,
        comment: event.target.comment.value
    });
    form.reset();
}