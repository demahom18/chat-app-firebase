import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCXzmjMfZBe-HyROTXbxGYEdL1eaZCdtwU",
    authDomain: "vue-firebase-sites.firebaseapp.com",
    projectId: "vue-firebase-sites",
    storageBucket: "vue-firebase-sites.appspot.com",
    messagingSenderId: "448989400590",
    appId: "1:448989400590:web:b134e7db7dd42729e3765f"
};

//init firebase

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { timestamp, projectFirestore, projectAuth }