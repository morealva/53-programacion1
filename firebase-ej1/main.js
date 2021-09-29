//me comunico con el servicio de firestore
const db = firebase.firestore ()

const vaciar = () => {

    document.getElementById("inp_nom").value = ''
    document.getElementById("inp_ape").value = ''
    document.getElementById("inp_dni").value = ''

}

const gaurdar_cliente = () => {
    
    const nom = document.getElementById("inp_nom").value
    const ape = document.getElementById("inp_ape").value
    const dni = document.getElementById("inp_dni").value

    const unCliente = {
        nombre: nom,
        apellido: ape,
        dni:dni
    }

db.collection('cliente').doc().set(unCliente)
//reset del formulario 
vaciar()

}

const boton = document.getElementById("btn_guardar")
boton.addEventListener ("click" , gaurdar_cliente)

const listar_cliente = async () => {

    const lista = await  db.collection("cliente").get()

    let lc = [] 
    let lista_definitiva = lista.docs.map( (doc) => {
        lc = doc.data ()
        lc.id = doc.id 
        return lc;
    })

    let bolsita_tr = []
    lista_definitiva.forEach(element => {
        let fila = `
         <tr>
            <td>${element.nombre}</td>
            <td>${element.apellido}</td>
            <td>${element.dni}</td>
            <td>
                <button class="btn-danger btn-sm">x</button>
            </td>
         </tr>
        `

        bolsita_tr.push(fila)
    });

    document.getElementById("tbody").innerHTML = bolsita_tr.join('')
}

//llamar o ejecutar la funcion encargada de listar
listar_cliente();


