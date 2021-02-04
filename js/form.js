window.onload = inicialize;
var form1;
var refForm;

function inicialize() {
    form1 = document.getElementById("form-1");
    form1.addEventListener("submit", sendFormToFirebase, false);

    refForm = firebase.database().ref().child("form");
    // alert("Hola");
    showFormToFirebase();
}

function showFormToFirebase() {
    refForm.on("value", function (snap) {
        console.log(snap.val())
    })
}

function sendFormToFirebase(event) {
    event.preventDefault();
    refForm.push({
        name: event.target.name.value,
        surname1: event.target["surname1"].value,
        surname2: event.target["surname2"].value,
        address: event.target.address.value
    });
    form1.reset();
}

//botón EDITAR
// $(document).on("click", ".btnEdit", function () {
//     file = $(this).closest("tr");
//     id = parseInt(file.find("id").text());
//     name1 = file.find('td:eq(1)').text();
//     country = file.find('td:eq(2)').text();
//     age = parseInt(fila.find('td:eq(3)').text());

//     $("#name").val(name1);
//     $("#country").val(country);
//     $("#age").val(age);
//     option = 2;

//     $(".modal-header").css("background-color", "#26A679");
//     $(".modal-header").css("color", "white");
//     $(".modal-title").text("Edit People");
//     $("#modalCRUD").modal("show");
// });

//botón BORRAR
$(document).on("click", ".btnDelete", function () {
    file = $(this).closest("tr");
    id = parseInt(fila.find("td:eq(0)").text());
    option = 3; //borrar
    var answer = confirm("¿Está seguro que desea eliminar el registro" + id + "?");
    if (answer) {
        $.ajax({
            url: "bd/crud.php",
            type: "POST",
            dataType: "json",
            data: { option: option, id: id },
            success: function () {
                tablePeople.row(file.parents("tr").remove().draw());
            }
        });
    }
});