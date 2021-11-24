<template>
    <div>
        <h5>Catalogo admin</h5>
        <div class="row">
            <div class="col-4">
                <div class="mb-3">
                    <label class="form-label" for="">descripcion</label>
                    <input v-model="descripcion" class="form-control" type="text" placeholder="ingrese descrpcion">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="">precio</label>
                    <input v-model="precio" class="form-control" type="number" placeholder="ingrese precio">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="">descuento</label>
                    <input v-model="descuento" class="form-control" type="number" placeholder="ingrese descuento">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="">categoria</label>
                    <input v-model="categoria" class="form-control" type="text" placeholder="ingrese categoria">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="">stock</label>
                    <input v-model="stock" class="form-control" type="text" placeholder="ingrese stock">
                </div>
                <div class="mb-3">
                    <select v-model="estado" class="form-select" aria-label="ingrese estado">
                    <option selected>Open this select menu</option>
                    <option value="0">inactivo</option>
                    <option value="1">activo</option>
                    </select>
                </div>
                 <div class="mb-3">
                    <input id="inp_imagen" class="form-file" type="file">
                </div>
                <button v-if="estado==0" @click="guardar_catalogo" class="btn btn-success">Guardar</button>
                <button v-if="estado ==1" @click="actualizar_catalogo()" class="btn btn-primary">Actualizar</button>
            </div>
            <div class="col-8">
                <table class="table">
                    <thead>
                        <tr>
                            <th>img</th>
                            <th>descripcion</th>
                            <th>precio</th>
                            <th>porcentaje de descuento</th>
                            <th>categoria</th>
                            <th>stock</th>
                            <th>estado</th>
                            <th>acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="catalogo of lista_catalogo" v-bind:key="catalogo.id">
                            <td>
                                <img style="width:6rem" :src="catalogo.url" alt="">
                            </td>
                            <td>{{catalogo.descripcion}}</td>
                            <td>{{catalogo.precio}}</td>
                            <td>{{catalogo.descuento}}</td>
                            <td>{{catalogo.categoria}}</td>
                            <td>{{catalogo.stock}}</td>
                            <td>{{catalogo.estado}}</td>
                            <td>
                                <button @click="eliminar_catalogo (catalogo.id)" class="btn btn-danger btn-sm">x</button>
                                <button @click="editar_catalogo(catalogo)" class="btn btn-primary btn- ms-1">Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { db, storage } from '../utlis/firebase.js'
import { addDoc, collection, onSnapshot, deleteDoc, doc, updateDoc} from 'firebase/firestore'
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage'

export default {
    name:'CatalogoAdminForm',
    data () {
        return {
            titulo: 'CRUD con VUE y Firebase',
            descripcion: '',
            precio: null,
            descuento: null,
            categoria: '',
            stock: '',
            estado: 0,
            url: null,
            lista_catalogo:[]
        }
    },
    methods :{
        async subir_imagen () {
            const file = document.getElementById("inp_imagen").files[0]
            //indicar o hacer referencia en que 
            //sitio del storage a guardar la imagen 
            const referencia = ref (storage, 'catalogoadmin/'+file.name)
            await uploadBytes(referencia, file).then( () => {
                alert ('Operacion exitosa!')
            })
            this.url = await getDownloadURL(referencia)
        },
        async guardar_catalogo ()
        {
            await this.subir_imagen()

            const objeto = {
            descripcion: this.descripcion,
            precio: this.precio,
            descuento: this.descuento,
            categoria: this.categoria,
            stock: this.stock,
            estado: this.estado,
            url: this.url
            }
            const coleccion = collection(db,'catalogoadmin')
            addDoc(coleccion,objeto)
            //despues de guardar vaciamos los atributos
            this.descripcion = '';
            this.precio = null;
            this.descuento = null;
            this.categoria = '';
            this.stock = '';
            this.estado = '';
        },
        obtener_catalogo()
        {
            onSnapshot (collection(db,'catalogoadmin'), (snapshot) => {
                this.lista_catalogo = []
                snapshot.docs.map(( doc ) => {
                    this.lista_catalogo.push({ ...doc.data(), id:doc.id })
                })
            })
        },
        eliminar_catalogo (id)
        {
            deleteDoc (doc( db, 'catalogoadmin',id))
        },
        editar_catalogo (catalogo)
        {
            this.descripcion = catalogo.descripcion;
            this.precio = catalogo.precio;
            this.descuento = catalogo.descuento;
            this.categoria = catalogo.categoria;
            this.stock = catalogo.stock;
            this.estado = catalogo.estado;

            this.estado = 1;
        },
        actualizar_catalogo ()
        {
            //conformamos el objeto con los datos modificados a enviar.
            const catalogoActualizado = {
            descripcion: this.descripcion,
            precio: this.precio,
            descuento: this.descuento,
            categoria: this.categoria,
            stock: this.stock,
            estado: this.estado
        }
        /*
            para actualizar un documento debemos especificar la DB,
            la coleccion a la cual pertenece
            y el ID del documento a modificar.    
        */
        updateDoc(doc(db, 'catalogoadmin',this.id),catalogoActualizado)
        this.estado = 0;
        }
    },
    mounted ()
    {
        this.obtener_catalogo ()
    }
}
</script>
