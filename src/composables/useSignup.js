import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)

const signup = async(email, password, displayName) => {
    error.value = null //Reset the value to null before 
    try {
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)

        if (!res) throw Error('Could not complete the signup, please try again')

        await res.user.updateProfile({ displayName })
        error.value = null

        return res

    } catch (err) {
        console.log('Error message: ', err.message)
        error.value = err.message
    }
}
const useSignup = () => {
    return { error, signup }
}

export default useSignup