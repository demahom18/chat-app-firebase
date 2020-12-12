import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getCollection = (collection) => {
    const error = ref(null)
    const documents = ref(null)

    let collectionRef = projectFirestore.collection(collection)
        .orderBy('createdAt')

    const unsub = collectionRef.onSnapshot((snap) => {
        console.log('snapshot')
        let results = []

        snap.docs.forEach(doc => {
            //We create a timestamp first 
            doc.data().createdAt && //The following code fires only if the previous line is executed
                results.push({...doc.data(), id: doc.id })
        })
        documents.value = results
        error.value = null
    }, (err) => {
        console.log('Error on getting collection: ', err.message)
        error.value = 'Could not fetch data'
    })

    //unsubscribe from prev collection when watcher is stopped/component unmounted
    watchEffect('onInvalidate', () => {
        oninvalidate(() => unsub())
    })

    return { documents, error }
}


export default getCollection