export default class Anime {

    constructor () {}

    async obtenerDatos ()
    {
        const datos = await fetch ("https://api.jikan.moe/v3/search/anime?q=inuyasha")

        const datos_json = await datos.json ()

        //aca accedimos a results, que seria nuestro arreglo a recorrer
        const lista = datos_json.results 

        let micatalogo = []

        lista.forEach(element => {
           
            let columna = `
                <div class="col-4">
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                        <img src="${element.image_url}" class="img-fluid rounded-start" alt="${element.title}">
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">${element.synopsis}</p>
                            <p class="card-text"><small class="text-muted">Episodio: ${element.episodes}</small></p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            `;

            micatalogo.push(columna)
        });

        document.getElementById("catalogo").innerHTML = micatalogo.join(``)
    }

}