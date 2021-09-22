//me comunico con el servicio de firestore
const db = firebase.firestore ()

const gaurdar_cliente = () => {

    const uncliente = {
        nombre: 'Juan',
        apellido: 'Perez',
        dni:37589632
    }

db.collection('cliente').doc().set(uncliente)

}

const boton = document.getElementById("btn_guardar")
boton.addEventListener ("click" , gaurdar_cliente)