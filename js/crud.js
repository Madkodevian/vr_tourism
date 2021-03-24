//Presionar F1 para abrir ventana arriba, live server.
//Llamada a un método.
window.onload = initializeForm;
const db = firebase.firestore();
var refForm;

//MAIN
function initializeForm() {
    const form = document.getElementById("form");
    form.addEventListener("submit", sendFormToFirebase, false);
    refForm = firebase.firestore().ref().child("form");
    console.log("holi")
    showFormToFirebase();
}

function showFormToFirebase() {
    refForm.on("value", function (snap) {
        console.log(snap.val())
        })
}

// guardar el contenido introducido
function sendFormToFirebase(event) {
    form.addEventListener("submit", async (e)=> {
        e.preventDefault();
        const name = form["name"].value;
        const surname1 = form["surname-1"].value;
        const surname2 = form["surname-2"].value;
        const address = form["address"].value;
        const response = await db.collection("Tasks").doc().set({
            name,
            surname1,
            surname2,
            address
        })
        console.log(response)
        form.reset();
        //console.log(name,surname1)
    })
}