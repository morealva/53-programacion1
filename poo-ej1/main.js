import Bhaskara from "./bhaskara.js"

const mostrar = () => {


    const a = document.getElementById("inp_a").value
    const b = document.getElementById("inp_b").value
    const c = document.getElementById("inp_c").value

    //1_se crea la instancia
    //2_se envian los datos al constructor
    //3_se ejecuta el contructor
   const bhaskara = new Bhaskara (a,b,c)

   /*
    haciendo uso de la instancia, accedo al metodo
    calcular_raiz, para ejecutarlo
    */
   const raiz1 = bhaskara.calcular_raiz1()
   const raiz2 = bhaskara.calcular_raiz2()

   document.getElementById("r1").textContent = 'raiz 1 ='+raiz1;
   document.getElementById("r2").textContent = 'raiz 2 ='+raiz2;

}

const boton = document.getElementById("btn_calcular")

boton.addEventListener("click", mostrar)




