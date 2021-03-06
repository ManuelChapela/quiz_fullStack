
const main = document.querySelector("main");
const btnCreate = document.getElementById("btnCreate")



//////////////////////////// FETCH PARA LEER LAS PREGUNTAS ////////////////////////////
function readQuestions() {
    fetch('/readQuestions')
    .then(response => response.json())
    .then(data => printQuestionsLogOut(data.data))
    .catch(err => console.log(err))
}

//////////////////////////// DOM PARA PINTAR BTN LOGOUT  +  INVOCAR LOG OUT  +  LEER AUTOMATICAMENTE PREGUNTAS ////////////////////////////
function printQuestionsLogOut(elem) {
let logOutBtn = document.createElement("button");
    logOutBtn.textContent = "LogOut";
    logOutBtn.setAttribute("id", "logOutBtn");
    logOutBtn.setAttribute("class", "logContainer");
    main.appendChild(logOutBtn);
    
    elem.map(elem => printQuestions(elem))

    logOutBtn.addEventListener("click", () => {
        console.log("Has hecho logOut")
        logOutUser()
    })
}

//////////////////////////// DOM PARA PINTAR PREGUNTAS + BTN (DELETE / UPDATE) ////////////////////////////
function printQuestions(elem){


    let questTitle = document.createElement("h2");
    questTitle.textContent = elem.pregunta;
    questTitle.setAttribute("id", "questTitle");
    questTitle.setAttribute("class", "logText");
    main.appendChild(questTitle);

    let questDelete = document.createElement("button");
    questDelete.textContent = "Eliminar";
    questDelete.setAttribute("type", "button");
    questDelete.setAttribute("class", "logContainer");
    main.appendChild(questDelete)

        questDelete.addEventListener("click", () => {
            deleteAnswer(elem.pregunta)
        })
    
    let questUpdate = document.createElement("button");
    questUpdate.textContent = "Actualizar";
    questUpdate.setAttribute("type", "button");
    questUpdate.setAttribute("class", "logContainer");
    main.appendChild(questUpdate)
   
        questUpdate.addEventListener("click", () => {
            editAnswer(elem)         
        })
}

readQuestions() // INVOCAMOS DIRECTAMENTE AL ABRIR EL DOCUMENTO



//////////////////////////// FUNCI??N BORRADORA UNIVERSAL DEL DOM ////////////////////////////
function removeBody(){
    document.querySelector("main").querySelectorAll("*").forEach(elem => elem.remove())
}


//////////////////////////// CREAR LAS PREGUNTAS FRONT////////////////////////////
btnCreate.addEventListener("click", createAnswer)


function createAnswer(){
    
    removeBody()
    

    // T??tulo
    let inputTitle = document.createElement("input");
    inputTitle.setAttribute("placeholder", "Inserta aqu?? un t??tulo");
    inputTitle.setAttribute("class", "inputsEntradaLog");
    main.appendChild(inputTitle);

    // Respuestas
    let inputAns1 = document.createElement("input");
    inputAns1.setAttribute("placeholder", "Inserta aqu?? tu primera respuesta");
    inputAns1.setAttribute("class", "inputsEntradaLog");
    main.appendChild(inputAns1);

    let inputAns2 = document.createElement("input");
    inputAns2.setAttribute("placeholder", "Inserta aqu?? tu segunda respuesta");
    inputAns2.setAttribute("class", "inputsEntradaLog");
    main.appendChild(inputAns2);

    let inputAns3 = document.createElement("input");
    inputAns3.setAttribute("placeholder", "Inserta aqu?? tu tercera respuesta");
    inputAns3.setAttribute("class", "inputsEntradaLog");
    main.appendChild(inputAns3);

    let inputAns4 = document.createElement("input");
    inputAns4.setAttribute("placeholder", "Inserta aqu?? tu cuarta respuesta");
    inputAns4.setAttribute("class", "inputsEntradaLog");
    main.appendChild(inputAns4);

    // Selector
    let selectorAns = document.createElement("select");
    selectorAns.setAttribute("id", "select");
    main.appendChild(selectorAns);

                // Las opciones del selectorAns anterior, pre??adas en el propio selector y con valores y texto como yo elija.
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
    submitBtn.setAttribute("class", "logContainer");
    main.appendChild(submitBtn);

    
    let backBtn = document.createElement("button");
    backBtn.textContent = "Volver atr??s";
    backBtn.setAttribute("id", "backBtn");
    backBtn.setAttribute("class", "logContainer");
    main.appendChild(backBtn);
    
    submitBtn.addEventListener("click", () => {
        submitNewAnswer(inputTitle.value, inputAns1.value, inputAns2.value, inputAns3.value, inputAns4.value, Number(selectorAns.value))
    })

    backBtn.addEventListener("click", () =>{
    removeBody();
    readQuestions()
})
    
    
}


//////////////////////////// PINTAR NUEVAS RESPUESTAS FRONT ////////////////////////////
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
        console.log("1", data)
        if(data.status == 400){
            alert(data.data)
        }
        else {
            alert(data.data)
            window.location.href = data.url
            console.log(data.url)
        }
    } )
   
    .catch(err => console.log("Algo est?? yendo mal...", err)) 
}












//////////////////////////// BORRAR PREGUNTAS ////////////////////////////

function deleteAnswer(pregunta) {
    fetch('/deleteQuestion', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({pregunta: pregunta})
    })
    .then(response => response.json())
    .then(data => {
        if(data.status == 400){
            alert(data.data)
            console.log("1", data)
        }
        else {
            alert(data.data)
            console.log("2", data)
            window.location.href = data.url      //"admin.html"
        }
    } )
   
    .catch(err => console.log("Algo est?? yendo mal...", err)) 
}















//////////////////////////// EDITAR LAS RESPUESTAS ////////////////////////////

function editAnswer(elem){

    removeBody()

    // T??tulo
    let inputTitle = document.createElement("input");
    inputTitle.setAttribute("value", elem.pregunta);
    inputTitle.setAttribute("class", "inputsEntradaLog");
    main.appendChild(inputTitle);

    // Respuestas
    let inputAns1 = document.createElement("input");
    inputAns1.setAttribute("value", elem.respuesta[0]);
    inputAns1.setAttribute("class", "inputsEntradaLog");
    main.appendChild(inputAns1);

    let inputAns2 = document.createElement("input");
    inputAns2.setAttribute("value", elem.respuesta[1]);
    inputAns2.setAttribute("class", "inputsEntradaLog");
    main.appendChild(inputAns2);

    let inputAns3 = document.createElement("input");
    inputAns3.setAttribute("value", elem.respuesta[2]);
    inputAns3.setAttribute("class", "inputsEntradaLog");
    main.appendChild(inputAns3);

    let inputAns4 = document.createElement("input");
    inputAns4.setAttribute("value", elem.respuesta[3]);
    inputAns4.setAttribute("class", "inputsEntradaLog");
    main.appendChild(inputAns4);

    // Selector
    let selectorAns = document.createElement("select");
    selectorAns.setAttribute("id", "select");
    selectorAns.setAttribute("id", "select");
    main.appendChild(selectorAns);

                // Las opciones del selectorAns anterior, pre??adas en el propio selector y con valores y texto como yo elija.
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
    submitBtn.setAttribute("class", "logContainer");
    main.appendChild(submitBtn);

    
    let backBtn2 = document.createElement("button");
    backBtn2.textContent = "Volver atr??s";
    backBtn2.setAttribute("id", "backBtn");
    backBtn2.setAttribute("class", "logContainer");
    main.appendChild(backBtn2);
    
    submitBtn.addEventListener("click", () => {
    editDBAnswer(inputTitle.value, inputAns1.value, inputAns2.value, inputAns3.value, inputAns4.value, Number(selectorAns.value), elem._id)
    })   
        
    backBtn2.addEventListener("click", () => { 
        removeBody();
        readQuestions()
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
    .catch(err => console.log("Algo est?? yendo mal...", err)) 
}






//////////////////////////// LOG OUT FUNCTION [UNDERCONSTRUCTION] [primera parte hecha, comprobarlo] ////////////////////////////


function logOutUser(){
    
    fetch('/logout', {
        method: 'PUT',
        headers: {
          'Content-Type': `Bearer:${localStorage.getItem('token')}`
        }})
        .then(response => response.json())
        .then(data => {
            if (data.status == 200){
                alert(data.data)
                localStorage.removeItem('token') // Se pasa la clave
                setTimeout(window.location.href = data.url, 1500)
            }
            else if (data.status == 400){
                alert(data.data)
                setTimeout(window.location.href = data.url, 1500)
            }
            else if (data.status == 401){
                console.log(data);
                alert(data.data)
                setTimeout(window.location.href = data.url, 1500)
            }
            // if (data.status == 401){
            //     alert(data.data)
            //     setTimeout(window.location.href = data.url, 1500)
            // }
            // if (data.status == 500){
            //     alert(data.data)
            // }
        })
        .catch(err => console.log("Se ha producido un error, vuelta a intentarlo m??s tarde", err))
    }

















