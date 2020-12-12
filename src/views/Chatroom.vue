<template>
  <div  class="container">
    <Navbar /> 
    <ChatWindow />
    <NewChatForm />
  </div>
</template>
/**@logout="handleLogout" */


<script>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import NewChatForm from '../components/NewChatForm.vue'
import ChatWindow from '../components/ChatWindow.vue'
import getUser from '../composables/getUser'

export default {
  components: { Navbar, NewChatForm, ChatWindow },
  setup() {
    const { user } = getUser()
    const currentUser = user
    const router = useRouter()
    
    //With custom event
    // const handleLogout = () => {
    //     console.log('User redirected to the welcome page')
    //     router.push({name: 'Welcome'})
    // }
    
    //No custom event required
    watch(user, () => {
      if(!user.value) router.push({name: 'Welcome'})
    })

    console.log('user in chatroom: ', user.value.email)
    
    
    return { user /**, handleLogout */ }
  }
}
</script>

<style>

</style>