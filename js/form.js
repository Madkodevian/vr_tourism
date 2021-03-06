//Presionar F1 para abrir ventana arriba, live server.
//Iniciar el MAIN (la función main), llamado "inicialize":
window.onload = inicialize;
//Variables globales:
var form;
var refForm;
var tbodyTableForm;
var rowsToShow;
var CREATE = "Añadir formulario";
var UPDATE = "Modificar formulario";
var wayToSee = CREATE;
var refRowToEdit;
var refRowToErase;
var rowKeyToErase;

function inicialize() {
  //FORM CONTACT
  form = document.getElementById("form");
  form.addEventListener("submit", sendFormToFirebase, false);

  //Coger el elemento tbody de la tabla:
  tbodyTableForm = document.getElementById("tbody-table-form");
  //Referencia a la base de datos:
  refForm = firebase.database().ref().child("form");
  //Se indica "child" porque es un hijo del nodo raíz de la bbdd, es decir, del form.
  showFormToFirebase();

  //INICIAR SESIÓN
  var signIn = document.getElementById("sign-in");
  signIn.addEventListener("click", login);
  var signOut = document.getElementById("sign-out");
  signOut.addEventListener("click", logout);
  checkIfUserIsLoggedIn();
}

//FORM. CONTACTOS
//CRUD: CREATE, READ, UPDATE, DELETE.
//CREATE:
//Enviar el formulario a la base de datos:
function sendFormToFirebase(event) {
  event.preventDefault();
  switch (wayToSee) {
    case CREATE:
      refForm.push({
        name: event.target.name.value,
        surname: event.target.surname.value,
        phone: event.target.phone.value,
        email: event.target.email.value,
        comment: event.target.comment.value
      });
      break;
    case UPDATE:
      refRowToEdit.update({
        name: event.target.name.value,
        surname: event.target.surname.value,
        phone: event.target.phone.value,
        email: event.target.email.value,
        comment: event.target.comment.value
      });
      wayToSee = CREATE;
      document.getElementById("button-send").value = CREATE;
      break;
  }
  form.reset();
}

//READ:
function showFormToFirebase() {
  //El snap devuelve el valor de la refForm del propio form.
  refForm.on("value", function (snap) {
    var info = snap.val();
    rowsToShow = "";
    //FOR EACH. Por cada clave en los datos:
    for (var key in info) {
      //muestra una fila. Es una String para realizar (concatenar) las filas (con tr). Y celdas (td).
      rowsToShow += "<tr>" +
        "<td>" + info[key].name + "</td>" +
        "<td>" + info[key].surname + "</td>" +
        "<td>" + info[key].phone + "</td>" +
        "<td>" + info[key].email + "</td>" +
        "<td>" + info[key].comment + "</td>" +
        //UPDATE:
        "<td>" +
        '<button type="button" class="btn btn-primary editButton" data-form="' + key + '">' +
        '<i class="fas fa-pencil-alt editButton" data-form="' + key + '">' + '</i>' +
        '</button>' +
        "</td>" +
        //DELETE:
        '<td>' +
        '<button type="button" class="btn btn-danger eraseButton" data-form="' + key + '">' +
        '<i class="fas fa-eraser eraseButton" data-form="' + key + '">' + '</i>' +
        '</button>' +
        '</td>' +
        "</tr>";
    }
    //(.innerHTML)Devuelve o establece la sintaxis HTML describiendo los descendientes del elemento.
    //En este caso, manda los datos de "rowstoshow" al tbody para mostrarlos.
    tbodyTableForm.innerHTML = rowsToShow;
    console.log("innerHTML")

    if (rowsToShow != "") {
      var i;
      var editElements = document.getElementsByClassName("editButton");
      for (i = 0; i < editElements.length; i++) {
        editElements[i].addEventListener("click", editRowOnFirebase, false);
        console.log("if edit")
      }
      var eraseElements = document.getElementsByClassName("eraseButton");
      for (i = 0; i < eraseElements.length; i++) {
        eraseElements[i].addEventListener("click", eraseRowOnFirebase, false);
        console.log("if remove")
      }
    }
  })
}

//DELETE:
//El icono para borrar, está en el mismo apartado que el de [READ]. <i class="fas fa-trash erase"...>
function eraseRowOnFirebase(event) {
  console.log("IN eraseRowOnFirebase")
  rowKeyToErase = event.target.getAttribute("data-form");
  console.log("Elemento a borrar: "+rowKeyToErase)
  refRowToErase = refForm.child(rowKeyToErase);
  refRowToErase.remove();
  console.log("function eraseRowOnFirebase")
}

//UPDATE:
//El icono para editar, está en el mismo apartado que el de [READ]. <i class="fas fa-pencil-alt edit"...>
function editRowOnFirebase(event) {
  var rowKeyToEdit = event.target.getAttribute("data-form");
  refRowToEdit = refForm.child(rowKeyToEdit);
  refRowToEdit.once("value", function (snap) {
    var data = snap.val();
    document.getElementById("name").value = data.name;
    document.getElementById("surname").value = data.surname;
    document.getElementById("phone").value = data.phone;
    document.getElementById("email").value = data.email;
    document.getElementById("comment").value = data.comment;
  });
  document.getElementById("button-send").value = UPDATE;
  wayToSee = UPDATE;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//INICIO DE SESIÓN
function checkIfUserIsLoggedIn() {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("User is signed in.")
      console.log(user.email)
      document.getElementById("sign-in").style.display = "none";
      document.getElementById("sign-up").style.display = "none";
      document.getElementById("sign-out").style.display = "block";
    } else {
      console.log("No user is signed in.")
      document.getElementById("sign-in").style.display = "block";
      document.getElementById("sign-up").style.display = "block";
      document.getElementById("sign-out").style.display = "none";
    }
  });
}

function login() {
  var email = "madkodevian@gmail.com";
  var password = "123456";

  firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
    console.log("User logged in");
  }).catch(error => {
    console.log(error.message)
  });
}

function logout() {
  firebase.auth().signOut().then(() => {
    console.log("user logged out")
  }).catch((error) => {
    console.log(error.message)
  });
}

//PAGINA INICIO SESION
function show() {
  var p = document.getElementById('pwd');
  p.setAttribute('type', 'text');
}

function hide() {
  var p = document.getElementById('pwd');
  p.setAttribute('type', 'password');
}

var pwShown = 0;

document.getElementById("eye").addEventListener("click", function () {
  if (pwShown == 0) {
      pwShown = 1;
      show();
  } else {
      pwShown = 0;
      hide();
  }
}, false);