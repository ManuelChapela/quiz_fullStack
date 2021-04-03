
/////// PRIMERA PARTE EJERCICIO \\\\\\\
/////////////////// CONST DE HTML ///////////////////
const form = document.getElementById("formContainer");
const container = document.getElementById("mainContainerQuiz");
const image = document.getElementById("imageQuiz");
const div = document.getElementById("divContainer")

/////////////////// VARIABLES ///////////////////
let counter = 0;
let j = 0;

/////////////////// FUNCIÓN BORRADORA ///////////////////
function removeBody(){
    document.getElementById("formContainer").querySelectorAll("*").forEach(elem => elem.remove())
}

/////////////////// LEER LAS PREGUNTAS PARA PODER HACER EL QUIZ POR ORDEN /////////////////// 
function readQuestions() {
    fetch('/guestReadQuestions')
    .then(response => response.json())
    .then(data => {
        imprimePregunta(data.results)
    })
    .catch(err => console.log(err))
}
function imprimePregunta(elemAll) { 
    // PREGUNTA
    if( j < elemAll.length) {

    let crearPregunta = document.createElement("p")
    crearPregunta.setAttribute("class", "classPregunta")  
    crearPregunta.textContent = elemAll[j].pregunta;
    form.appendChild(crearPregunta);
    
    // RESPUESTAS [j]
    for(let i = 0; i < elemAll[j].respuesta.length; i++) {
        let answerCreation = document.createElement("button")
        answerCreation.setAttribute("class", "respuestasLabel") 
        answerCreation.setAttribute("value", i) 
        answerCreation.textContent = elemAll[j].respuesta[i]
        form.appendChild(answerCreation);

            answerCreation.addEventListener("click", () => {
            
                if(elemAll[j].correcta == i) {
                console.log("Respuesta correcta")
                answerCreation.classList.remove("respuestasLabel")
                answerCreation.classList.add("respuestasInputCorrecta")
                counter++
                j++
                removeBody()
                readQuestions()

                }else{
                console.log("Respuesta incorrecta")
                answerCreation.classList.remove("respuestasLabel")
                answerCreation.classList.add("respuestasInputIncorrecta")
                j++
                removeBody()
                readQuestions()
                }
            
        })
        }   
    }else{
        removeBody()
        sawResults(elemAll, counter)
        console.log("Se acabó el quizzzzz")
    }
    }

    function sawResults(elementosTotales , counter){
        
        let score = document.createElement("p")
        score.textContent = "Has acabado el quiz, ¡Enhorabuena!"
        score.setAttribute("class", "classPregunta")    // CAMBIAR CLASE AQUÍ // TODO
        form.appendChild(score);

        let yourScore = document.createElement("p")
        yourScore.textContent = counter + " / " + elementosTotales.length;
        yourScore.setAttribute("class", "classPregunta")    // CAMBIAR CLASE AQUÍ // TODO
        form.appendChild(yourScore)

        let reInitiate = document.createElement("button");
        reInitiate.textContent = "Reiniciar el quiz"
        reInitiate.setAttribute("class", "respuestasLabel") 
        reInitiate.setAttribute("href", "quiz.html")
        form.appendChild(reInitiate)

        let bye = document.createElement("a");
        bye.textContent = "Volver a pantalla inicial"
        bye.setAttribute("class", "respuestasLabel") 
        bye.setAttribute("href", "index.html")
        bye.setAttribute("type", "button")
        form.appendChild(bye)
    }




    readQuestions()





/*












let i = 0;
let arrayEliminar = [] // ----> Array vacío para llenar con difrentes elementos ( label, input, p)
let sumatorioCorrectas = 0;

function imprimePregunta(unaPregunta) {
    if (i < questions.length) {


        let crearPregunta = document.createElement("p")
            crearPregunta.setAttribute("class", "classPregunta") // ACABO DE CAMBIAR ESTO +[i]
            crearPregunta.textContent = unaPregunta.pregunta;
            form.appendChild(crearPregunta);

            arrayEliminar.push(crearPregunta); // Para añadir información al arrayEliminar.


      



        for (let j = 0; j < unaPregunta.respuesta.length; j++) {

            let crearRespuestasLabel = document.createElement("label");
                crearRespuestasLabel.setAttribute("class", "respuestasLabel");
                crearRespuestasLabel.textContent = unaPregunta.respuesta[j];
                crearRespuestasLabel.setAttribute("for", "respuesta" + [i] + [j]);
                div.appendChild(crearRespuestasLabel);

                arrayEliminar.push(crearRespuestasLabel); // Para añadir información al arrayEliminar.


            let crearRespuestasInput = document.createElement("input")
                crearRespuestasInput.setAttribute("class", "respuestasInput");
                crearRespuestasInput.setAttribute("type", "radio");
                crearRespuestasInput.setAttribute("id", "respuesta" + [i] + [j]);
                crearRespuestasInput.textContent = unaPregunta.respuesta[j];
                div.appendChild(crearRespuestasInput);

                arrayEliminar.push(crearRespuestasInput); // Para añadir información al arrayEliminar.


            crearRespuestasLabel.addEventListener("click", () => {
                if (j == unaPregunta.correcta) {
                    crearRespuestasLabel.setAttribute("class", "respuestasInputCorrecta") //Clase nueva= .respuestasInputCorrecta
                    sumatorioCorrectas++
                    // console.log(sumatorioCorrectas)

                } else {
                    crearRespuestasLabel.setAttribute("class", "respuestasInputIncorrecta")
                }

                //FUNCIONAMIENTO DE SET TIME OUT setTimeout(function(){ alert("Hello"); }, 3000);
                setTimeout(() => borrarCont(arrayEliminar), 1000)
                setTimeout(() => imprimePregunta(questions[++i]), 1000) // OJO! Para que esto funcione, no puede ser multirespuesta

                // Crear un boton que nos reinicie i


            }

            )
}} else {

        // let imprimeEsto = ""
        function sumatorioFinal(sum) {

            // let imprimePuntuacion;
            let imprimeTexto;

            if (sum < 2) {
                imprimePuntuacion = sum + " / 5";
                imprimeTexto = "Eres un looser" 

            } else if (sum == 2) {
                imprimePuntuacion = sum + " / 5";
                imprimeTexto = "Eres un poco chenco"

            } else if (sum == 3) {
                imprimePuntuacion = sum + " / 5";
                imprimeTexto = "Venga, vuelve a intentarlo."

            } else if (sum == 4) {
                imprimePuntuacion = sum + " / 5";
                imprimeTexto = "Estás a una de nivel dios";

            } else if (sum == 5) {
                imprimePuntuacion = sum + " / 5";
                imprimeTexto = "¡Nivel dios alcanzado!"
            }


            let btnFinal = document.createElement("a")
                btnFinal.setAttribute("class", "btnFinal");
                btnFinal.setAttribute("id", "btnFinal");
                btnFinal.setAttribute("href" , "index.html");
                btnFinal.textContent = "Volver a jugar";
                form.appendChild(btnFinal);

            let crearTextoFinal = document.createElement("p")
                crearTextoFinal.setAttribute("class", "textoFinal")
                crearTextoFinal.textContent = imprimeTexto;
                form.appendChild(crearTextoFinal);


            let crearPuntuacionFinal = document.createElement("p")
            crearPuntuacionFinal.setAttribute("class", "puntuacionFinal")
            crearPuntuacionFinal.textContent = imprimePuntuacion;
            form.appendChild(crearPuntuacionFinal);

        }

        sumatorioFinal(sumatorioCorrectas)

        // sumatorioFinal(sumatorioCorrectas)


        }
    }



function borrarCont(arrayEliminar) {
    for (let i = 0; i < arrayEliminar.length; i++) {
        arrayEliminar[i].remove()
    }
}

// imprimePregunta(questions[i]);






 // console.log('hola');












// HAz esto al final cuando tengas los valores finales sumados. 







/*






            // function initialState(){
            //     if(unaPregunta !== 0){
            //         document.getElementById("respuesta" + [i]).classList.remove("classPregunta")
            //     }
            // }


            // if(unaPregunta[i] === unaPregunta[0]) {
            //     unaPregunta[i] = unaPregunta[1];
            // }else if (unaPregunta[i] === unaPregunta[1]){
            //     unaPregunta = 2;
            // }else if (unaPregunta === 2) {
            //     unaPregunta = 3;
            // } else if (unaPregunta === 3) {
            //     unaPregunta = 4;
            // }




        })

    }

}


/*
// FUNCIÓN VALIDADORA
function funcionValidadora





*/






// boton.addEventListener("click", changeState);
// function changeState(){
//     if(bombillaColor === 0) {
//         bombillaColor = 1;
//         semaforo1.classList.add("red");
//         semaforo2.classList.remove("yellow");
//         semaforo3.classList.remove("green");

//     }else if (bombillaColor === 1){
//         bombillaColor = 2;
//         semaforo1.classList.remove("red");
//         semaforo2.classList.add("yellow");
//         semaforo3.classList.remove("green");

//     }else if (bombillaColor === 2){
//         bombillaColor = 3;
//         semaforo1.classList.remove("red");
//         semaforo2.classList.remove("yellow");
//         semaforo3.classList.add("green");

//     }else if (bombillaColor === 3){
//         bombillaColor = 1;
//         semaforo1.classList.add("red");
//         semaforo2.classList.remove("yellow");
//         semaforo3.classList.remove("green");
//     }
// }



// const hola = document.getElementById

//     hola.classList.add("red");
//     hola.classList.remove("blue")







// function imprimeArray (listaDeStrings) {
//     // let total = [];
//     for(let i= 0; i < listaDeStrings.length; i++) {

//         let crearPregunta = document.createElement("p")
//         crearPregunta.setAttribute("class", "classPregunta")
//         crearPregunta.textContent = listaDeStrings[i].pregunta ;  // Propiedad no función
//         form.appendChild(crearPregunta);

//                 for(let j = 0; j < listaDeStrings[i].respuesta.length; j++){

//                 let crearRespuestasLabel = document.createElement("label");
//                 crearRespuestasLabel.setAttribute("class", "respuestasLabel");
//                 crearRespuestasLabel.textContent = listaDeStrings[i].respuesta[j];
//                 crearRespuestasLabel.setAttribute("for", "respuesta" + [i] + [j] );
//                 form.appendChild(crearRespuestasLabel);

//                 let crearRespuestasInput = document.createElement("input")
//                 crearRespuestasInput.setAttribute("class", "respuestasInput");
//                 crearRespuestasInput.setAttribute("type", "radio");
//                 crearRespuestasInput.setAttribute("id", "respuesta" + [i] + [j]);
//                 crearRespuestasInput.setAttribute("name", "name" + [i]);
//                 crearRespuestasInput.setAttribute("value", i + "" + j);
//                 crearRespuestasInput.textContent = listaDeStrings[i].respuesta[j];
//                 form.appendChild(crearRespuestasInput);

//                 }

//     //             if (questions[i].correcta ==



//     }
// }

// imprimeArray(questions);










