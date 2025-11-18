import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Inicializar Gemini globalmente
const apiKey = import.meta.env.VITE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

// Función global para generar consejos malos
async function generateBadAdvice(question) {
  try {
    const prompt = `Eres un asistente que da consejos malos, sarcásticos y humorísticos. Responde de manera breve y directa a esta pregunta con un consejo malo: ${question}`
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error generando consejo:', error)
    return 'Lo siento, no pude generar un consejo malo en este momento. Inténtalo de nuevo.'
  }
}

// Hacer disponible globalmente
window.generateBadAdvice = generateBadAdvice

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {},
})

myApp.mount('#app')
