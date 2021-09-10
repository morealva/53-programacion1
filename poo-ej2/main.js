import Suma from "./area.js";

const mostrar = () => {

    const Base_inferior = document.getElementById("inp_b.i").value
    const Base_superior = document.getElementById("inp_b.s").value
    const altura = document.getElementById("inp_h").value

    const instancia = new Suma ()

    instancia.bi= Base_inferior; 
    instancia.bs = Base_superior;
    instancia.h = altura;

    const respuesta = instancia.calcularSuma ()

    document.getElementById("r").textContent = respuesta
    
}



const boton = document.getElementById("btn_calcular")
boton.addEventListener("click", mostrar)