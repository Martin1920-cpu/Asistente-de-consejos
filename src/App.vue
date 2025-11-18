<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px">
      <div v-for="(message, index) in messages" :key="index">
        <q-chat-message
          :name="message.name"
          :avatar="message.avatar"
          :text="[message.text]"
          :stamp="message.stamp"
          :sent="message.sent"
          :text-color="message.textColor"
          :bg-color="message.bgColor"
        />
      </div>
      <div class="q-mt-md">
        <q-input
          v-model="userInput"
          label="Pregunta al Asistente de Consejos"
          outlined
          @keyup.enter="sendMessage"
        />
        <q-btn
          label="Enviar"
          color="primary"
          @click="sendMessage"
          class="q-mt-sm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'App',
  setup() {
    const userInput = ref('')
    const messages = ref([
      {
        name: 'Asistente',
        avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
        text: '¡Hola! Soy tu Asistente de Vida de Consejos. ¿Qué pregunta tienes?',
        stamp: new Date().toLocaleTimeString(),
        sent: false,
        textColor: 'white',
        bgColor: 'primary'
      }
    ])

    const sendMessage = async () => {
      if (userInput.value.trim() === '') return

      // Agregar mensaje del usuario
      messages.value.push({
        name: 'Tú',
        avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
        text: userInput.value,
        stamp: new Date().toLocaleTimeString(),
        sent: true,
        bgColor: 'amber-7'
      })

      const question = userInput.value
      userInput.value = ''

      // Generar respuesta mala con Gemini (usando función global)
      const advice = await window.generateBadAdvice(question)

      // Agregar respuesta del asistente
      messages.value.push({
        name: 'Asistente',
        avatar: 'https://cdn.quasar.dev/img/avatar5.jpg',
        text: advice,
        stamp: new Date().toLocaleTimeString(),
        sent: false,
        textColor: 'white',
        bgColor: 'primary'
      })
    }

    return {
      userInput,
      messages,
      sendMessage
    }
  }
}
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
