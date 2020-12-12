<template>
  <form>
      <textarea 
        @keypress.enter="handleSend"
        placeholder="Write a message"
        v-model="message"
        autofocus="true"
        maxlength="150"
      ></textarea>
      <button @click.prevent="handleSend" class="send">Send</button>
  </form>
  <div class="error">
      {{ error }}
  </div>
</template>

<script>
import { ref } from 'vue'
import getUser from '../composables/getUser'
import useCollection from '../composables/useCollection'
import { timestamp } from '../firebase/config'
export default {
    setup() {
        const { user } = getUser()
        const { addDoc, error } = useCollection('messages')
        const message = ref('')

        const handleSend = async () => {
            const chat = {
                name: user.value.displayName,
                message: message.value,
                createdAt: timestamp()
            }
            console.log('The chat: ',chat)

            await addDoc(chat)
            
            //Reset the message field after sent if there is no error
            if(!error.value) message.value = ''
        }
        return { handleSend, message, error }
    }
}
</script>

<style scoped>
  form {
    margin: 10px;
  }
  textarea {
    width: 100%;
    max-width: 100%;
    margin-bottom: 6px;
    padding: 10px;
    box-sizing: border-box;
    border:0;
    box-shadow: -.5px .3px 0px 0 rgba(0, 0, 255, .2), -1px .6px 0px 0 rgba(0, 0, 255, .2);
    border-radius: 5px;
    font-family: inherit;
    outline: none;
  }
  button.send{
    text-decoration: none;
    background: #5ae4ca;
    color: white;
    font-weight: bold;
    margin-bottom: 20px;
    border: 0;
    border-radius: 20px;
    padding: 10px 20px;
}

  
</style>