
const main = document.querySelector("main");
const btnCreate = document.getElementById("btnCreate")



//////////////////////////// FETCH PARA LEER LAS PREGUNTAS ////////////////////////////
function readQuestions() {
    fetch('/readQuestions')
    .then(response => response.json())
    .then(data => {
        console.log(data.data);
        data.data.map(elem => printQuestions(elem))
    })
    .catch(err => console.log(err))
}


//////////////////////////// DOM PARA PINTAR PREGUNTAS + BTN (DELETE / UPDATE) ////////////////////////////
function printQuestions(elem){

    let questTitle = document.createElement("h2");
    questTitle.textContent = elem.pregunta;
    questTitle.setAttribute("id", "questTitle");
    questTitle.setAttribute("class", "questTitle");
    main.appendChild(questTitle);

    let questDelete = document.createElement("button");
    questDelete.textContent = "Eliminar";
    questDelete.setAttribute("type", "button");
    questDelete.setAttribute("class", "btnDom");
    main.appendChild(questDelete)

    questDelete.addEventListener("click", () => {
        deleteAnswer(elem.pregunta)
    })
    
    let questUpdate = document.createElement("button");
    questUpdate.textContent = "Actualizar";
    questUpdate.setAttribute("type", "button");
    questUpdate.setAttribute("class", "btnDom");
    main.appendChild(questUpdate)
   
    questUpdate.addEventListener("click", () => {
        editAnswer(elem) 
    //----> sustituir placeholder por value.preguntas / value.respuestas
    
    })
}

readQuestions() // INVOCAMOS DIRECTAMENTE AL ABRIR EL DOCUMENTO



//////////////////////////// FUNCIÓN BORRADORA UNIVERSAL DEL DOM ////////////////////////////
function removeBody(){
    document.querySelector("main").querySelectorAll("*").forEach(elem => elem.remove())
}


//////////////////////////// LOS 3 EVENTOS DE LA PÁGINA ////////////////////////////
// btnDelete.addEventListener("click", deleteAnswer)
// btnUpdate.addEventListener("click", updateAnswer)
btnCreate.addEventListener("click", createAnswer)



function createAnswer(){

    removeBody()

    // Título
    let inputTitle = document.createElement("input");
    inputTitle.setAttribute("placeholder", "Inserta aquí un título");
    inputTitle.setAttribute("class", "inputTitle");
    main.appendChild(inputTitle);

    // Respuestas
    let inputAns1 = document.createElement("input");
    inputAns1.setAttribute("placeholder", "Inserta aquí tu primera respuesta");
    inputAns1.setAttribute("class", "inputAns");
    main.appendChild(inputAns1);

    let inputAns2 = document.createElement("input");
    inputAns2.setAttribute("placeholder", "Inserta aquí tu segunda respuesta");
    inputAns2.setAttribute("class", "inputAns");
    main.appendChild(inputAns2);

    let inputAns3 = document.createElement("input");
    inputAns3.setAttribute("placeholder", "Inserta aquí tu tercera respuesta");
    inputAns3.setAttribute("class", "inputAns");
    main.appendChild(inputAns3);

    let inputAns4 = document.createElement("input");
    inputAns4.setAttribute("placeholder", "Inserta aquí tu cuarta respuesta");
    inputAns4.setAttribute("class", "inputAns");
    main.appendChild(inputAns4);

    // Selector
    let selectorAns = document.createElement("select");
    selectorAns.setAttribute("id", "select");
    main.appendChild(selectorAns);

                // Las opciones del selectorAns anterior, preñadas en el propio selector y con valores y texto como yo elija.
                let opt1 = document.createElement("option");
                opt1.textContent = "1";
                opt1.setAttribute("value", 0);
                opt1.setAttribute("id", "opt1");
                selectorAns.appendChild(opt1);

                let opt2 = document.createElement("option");
                opt2.textContent = "2";
                opt2.setAttribute("value", 1);
                opt2.setAttribute("id", "opt2");
                selectorAns.appendChild(opt2);

                let opt3 = document.createElement("option");
                opt3.textContent = "3";
                opt3.setAttribute("value", 2);
                opt3.setAttribute("id", "opt3");
                selectorAns.appendChild(opt3);

                let opt4 = document.createElement("option");
                opt4.textContent = "4";
                opt4.setAttribute("value", 3);
                opt4.setAttribute("id", "opt4");
                selectorAns.appendChild(opt4);

    // Boton de enviar pregunta + 4 respuestas + valor correcto
    let submitBtn = document.createElement("button");
    submitBtn.textContent = "Enviar pregunta";
    submitBtn.setAttribute("id", "submitBtn");
    main.appendChild(submitBtn);

    submitBtn.addEventListener("click", () => {
        submitNewAnswer(inputTitle.value, inputAns1.value, inputAns2.value, inputAns3.value, inputAns4.value, Number(selectorAns.value))
    })
    
    
}



//////////////////////////// PINTAR NUEVAS RESPUESTAS ////////////////////////////
function submitNewAnswer(elemTitle, elemAns1, elemAns2, elemAns3, elemAns4, elemSelect){

    fetch('/saveQuestions', {
        method: 'POST',
        body: JSON.stringify({
            pregunta: elemTitle,
            respuesta: [elemAns1, elemAns2, elemAns3, elemAns4],
            correcta: elemSelect,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    })    
    .then(response => response.json())
    .then(data => {
        if(data.status == 400){
            alert(data.data)
            console.log(data)
        }
        else {
            alert(data.data)
            window.location.href = "admin.html"
        }
    } )
   
    .catch(err => console.log("Algo está yendo mal...", err)) 
}



function deleteAnswer(pregunta) {
    fetch('/delete', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({pregunta: pregunta})
    })
}















//////////////////////////// EDITAR LAS RESPUESTAS ////////////////////////////

function editAnswer(elem){

    removeBody()

    // Título
    let inputTitle = document.createElement("input");
    inputTitle.setAttribute("value", elem.pregunta);
    inputTitle.setAttribute("class", "inputTitle");
    main.appendChild(inputTitle);

    // Respuestas
    let inputAns1 = document.createElement("input");
    inputAns1.setAttribute("value", elem.respuesta[0]);
    inputAns1.setAttribute("class", "inputAns");
    main.appendChild(inputAns1);

    let inputAns2 = document.createElement("input");
    inputAns2.setAttribute("value", elem.respuesta[1]);
    inputAns2.setAttribute("class", "inputAns");
    main.appendChild(inputAns2);

    let inputAns3 = document.createElement("input");
    inputAns3.setAttribute("value", elem.respuesta[2]);
    inputAns3.setAttribute("class", "inputAns");
    main.appendChild(inputAns3);

    let inputAns4 = document.createElement("input");
    inputAns4.setAttribute("value", elem.respuesta[3]);
    inputAns4.setAttribute("class", "inputAns");
    main.appendChild(inputAns4);

    // Selector
    let selectorAns = document.createElement("select");
    selectorAns.setAttribute("id", "select");
    main.appendChild(selectorAns);

                // Las opciones del selectorAns anterior, preñadas en el propio selector y con valores y texto como yo elija.
                let opt1 = document.createElement("option");
                opt1.textContent = "1";
                opt1.setAttribute("value", 0);
                opt1.setAttribute("id", "opt1");
                selectorAns.appendChild(opt1);

                let opt2 = document.createElement("option");
                opt2.textContent = "2";
                opt2.setAttribute("value", 1);
                opt2.setAttribute("id", "opt2");
                selectorAns.appendChild(opt2);

                let opt3 = document.createElement("option");
                opt3.textContent = "3";
                opt3.setAttribute("value", 2);
                opt3.setAttribute("id", "opt3");
                selectorAns.appendChild(opt3);

                let opt4 = document.createElement("option");
                opt4.textContent = "4";
                opt4.setAttribute("value", 3);
                opt4.setAttribute("id", "opt4");
                selectorAns.appendChild(opt4);

    // Boton de enviar pregunta + 4 respuestas + valor correcto
    let submitBtn = document.createElement("button");
    submitBtn.textContent = "Enviar pregunta";
    submitBtn.setAttribute("id", "submitBtn");
    main.appendChild(submitBtn);

    submitBtn.addEventListener("click", () => {
        editDBAnswer(inputTitle.value, inputAns1.value, inputAns2.value, inputAns3.value, inputAns4.value, Number(selectorAns.value), elem._id)
    })
    
    
}

function editDBAnswer(elemTitle, elemAns1, elemAns2, elemAns3, elemAns4, elemSelect, id){

    fetch('/editQuestion', {
        method: 'PUT',
        body: JSON.stringify({
            pregunta: elemTitle,
            respuesta: [elemAns1, elemAns2, elemAns3, elemAns4],
            correcta: elemSelect,
            _id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    })    
    .then(response => response.json())
    .then(data => {
        if(data.status == 400){
            alert(data.data)
            console.log(data)
        }
        else {
            alert(data.data)
            window.location.href = "admin.html"
        }
    } )
   
    .catch(err => console.log("Algo está yendo mal...", err)) 
}
