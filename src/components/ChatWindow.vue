<template>
<div v-if="error" class="chat-window">
    {{ error}}
</div>
<div v-if="documents" class="messages" ref="messages">
    <div  v-for="doc in formattedDocs" :key="doc.id">
        <span class="created-at" >{{doc.createdAt }} </span>
        <span class="name">{{ doc.name}} </span>
        <span class="message">{{ doc.message}} </span>

    </div>
</div>
  
</template>

<script>
import { formatDistanceToNow } from 'date-fns'
import getCollection from '../composables/getCollection'
import { computed, onUpdated, ref } from 'vue'
export default {
    setup() {
        const  { documents, error } = getCollection('messages')

        const formattedDocs = computed(() => {
            if (documents.value){
                return documents.value.map( doc => {
                    let formatedTime = formatDistanceToNow(doc.createdAt.toDate())
                    return { ...doc, createdAt: formatedTime}
                })
            }
            
        })

        //Autoscroll to bottom of messages
        const messages = ref(null)
        onUpdated(() => {
            messages.value.scrollTop =  messages.value.scrollHeight
        })

        return { error, documents, formattedDocs, messages }
    }
}
</script>

<style scoped>
 .chat-window {
    background: #fafafa;
    padding: 30px 20px;
  }
  .single {
    margin: 18px 0;
  }
  .created-at {
    display: block;
    color: #999;
    font-size: 12px;
    margin-bottom: 4px;
  }
  .name {
    font-weight: bold;
    margin-right: 6px;
  }
  .messages {
    max-height: 400px;
    overflow: auto;
  }
    .messages div{
        margin: 15px;
    }

</style>