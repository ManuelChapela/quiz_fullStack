
// -------- Botones de continuar y atrás en el logIn ---------
const btnContinuar = document.getElementById("continueBtn");
const btnAtras = document.getElementById("backBtn");
const inputMail = document.getElementById("inputEmail")
const inputPass = document.getElementById("inputPass")



/*
1 - Cuando hacemos clic en continuar, addeventlistener de click. 
2 - Comprobar que los datos introducidos son correctos con back.
3 - Comprobar por validación que los datos son correctos
4 - Comunicarse con la base de datos para comprobar que los datos son correctos. 
5 - Si no son correctos nos vuelve a llevar a logIn
6 - Si son correctos, redirecciona al area privada
7 - Pintar todas las preguntas con sus dos botones de eliminar y editar. 

*/



btnContinuar.addEventListener("click", logInUser);

function logInUser(){
    // Petición desde front a back. Back nos devolverá una respuesta. 
    console.log("1", inputMail.value, inputPass.value);
    
    fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
            email: inputMail.value,
            password: inputPass.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.status == 400){
            alert(data.data)
        }
        else if (data.status == 200) {
            alert(data.alert)
            window.location.href = data.url
        }
        else {
            alert(data.alert)
            window.location.href = data.url

        }
    } )
   
    .catch(err => console.log("Algo va mal...", err))
};
