//Presionar F1 para abrir ventana arriba, live server.
//Iniciar los métodos:
window.onload = inicialize;
//Variables globales:
var form;
var refForm;
var tbodyTableForm;

function inicialize() {
    form = document.getElementById("form");
    form.addEventListener("submit", sendFormToFirebase, false);

    //Coger el elemento tbody de la tabla:
    tbodyTableForm = document.getElementById("tbody-table-form");
    //Referencia a la base de datos:
    refForm = firebase.database().ref().child("form");
    //Se indica "child" porque es un hijo del nodo raíz de la bbdd, es decir, del form.
    showFormToFirebase();
}

//CRUD: CREATE, READ, UPDATE, DELETE.
//CREATE:
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

//READ:
function showFormToFirebase() {
    //El snap devuelve el valor de la refForm del propio form.
    refForm.on("value", function (snap) {
        var info = snap.val();
        var rowsToShow = "";
        //FOR EACH. Por cada clave en los datos:
        for(var key in info){
            //muestra una fila. Es una String para realizar (concatenar) las filas (con tr). Y celdas (td).
            rowsToShow += "<tr>" +
                                "<td>"+ info[key].name +"</td>" +
                                "<td>"+ info[key].surname +"</td>" +
                                "<td>"+ info[key].phone +"</td>" +
                                "<td>"+ info[key].email +"</td>" +
                                "<td>"+ info[key].comment +"</td>" +
                                "<td></td>" +
                                //DELETE:
                                '<td>' +
                                    '<button class="btn btn-danger">' +
                                        '<span class="glyphicon glyphicon-trash"></span>' +
                                    '</button>' +
                                '</td>' +
                          "</tr>";
        }
        //(.innerHTML)Devuelve o establece la sintaxis HTML describiendo los descendientes del elemento.
        //En este caso, manda los datos de "rowstoshow" al tbody para mostrarlos.
        tbodyTableForm.innerHTML = rowsToShow;
    })
}

//UPDATE:

//DELETE:
//El icono para borrar, está en el mismo apartado que el de [READ]. glyphicon-trash.