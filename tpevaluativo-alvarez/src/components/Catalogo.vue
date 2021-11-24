<template>
    <h5>catalogo public</h5>
    <div class="row">
        <div v-for="p of lista_catalogo" v-bind:key="p.id" class="col-3">
            <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img :src="p.url" class="img-fluid rounded-start">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{p.descripcion}}</h5>
                        <p class="card-text">{{p.precio}}</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
            </div> 
        </div>
    </div>
</template>
<script>
import { db, } from '../utlis/firebase.js'
import {  collection, onSnapshot,} from 'firebase/firestore'
export default {
    name:'Catalogo',
    data(){
        return{
            lista_catalogo:[] 
        }
    },
    methods:{
         obtener_catalogo()
        {
            onSnapshot (collection(db,'catalogoadmin'), (snapshot) => {
                this.lista_catalogo = []
                snapshot.docs.map(( doc ) => {
                    this.lista_catalogo.push({ ...doc.data(), id:doc.id })
                })
            })
        }
    },
    mounted(){
        this.obtener_catalogo ()
    }
}
</script>