import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import  {getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDriwuIVoVA0MZsjTRU1E9dpajOezhcuDs",
    authDomain: "m-alvarez-cet30.firebaseapp.com",
    projectId: "m-alvarez-cet30",
    storageBucket: "m-alvarez-cet30.appspot.com",
    messagingSenderId: "766971859726",
    appId: "1:766971859726:web:58917d681994bad8a6bd5f",
    measurementId: "G-QTENX6YQ9Z"
  };
//estamos ejecutando la fincion encargada de inicializar la conexion con FIREBASE

const app = initializeApp (firebaseConfig)

//conexion con nuestra base de datos firestore
const db = getFirestore() 

const storage = getStorage (app)

const auth = getAuth()

export { db, storage , auth}