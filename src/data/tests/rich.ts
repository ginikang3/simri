import { TestData } from "./latin";

export const rich: TestData = {
  title: "¿Tienes Mentalidad de Millonario? 💸",
  // ✅ 요구사항: 테스트 취지 설명 추가
  description: "Descubre si tienes los hábitos y el pensamiento necesarios para alcanzar el éxito financiero.",
  useImage: false,
  theme: {
    id: "rich-theme",
    logoText: "RICH MIND",
    primaryColor: "bg-amber-500",
    primaryTextColor: "text-white",
  },
  resultThresholds: { high: 9, mid: 6 },
  questions: [
    { 
      text: "Si recibes un bono inesperado de $1,000 USD, ¿qué haces?", 
      options: [
        { text: "Compro ropa o gadgets nuevos.", score: 0 },
        { text: "Lo guardo en una cuenta de ahorros.", score: 0 },
        { text: "Lo invierto en mi educación o en un negocio.", score: 1 }
      ] 
    },
    { 
      text: "¿Cómo reaccionas ante un fracaso o error?", 
      options: [
        { text: "Me rindo y busco otra cosa.", score: 0 },
        { text: "Me deprimo y culpo a la mala suerte.", score: 0 },
        { text: "Analizo la causa y lo uso como lección.", score: 1 }
      ] 
    },
    { 
      text: "¿Qué tipo de contenido consumes más en redes sociales?", 
      options: [
        { text: "Chismes y memes graciosos.", score: 0 },
        { text: "Fotos de la vida diaria de amigos.", score: 0 },
        { text: "Educación financiera y negocios.", score: 1 }
      ] 
    },
    { 
      text: "Quieres algo muy caro, ¿cuál es tu estrategia?", 
      options: [
        { text: "Lo compro a cuotas con tarjeta de crédito.", score: 0 },
        { text: "Ahorro dinero por mucho tiempo.", score: 0 },
        { text: "Busco una forma de generar ingresos extra.", score: 1 }
      ] 
    },
    { 
      text: "¿Qué piensas cuando ves a una persona rica?", 
      options: [
        { text: "Tuvo suerte o hizo algo malo.", score: 0 },
        { text: "Simplemente vive en otro mundo.", score: 0 },
        { text: "Quiero aprender sus hábitos y sistema.", score: 1 }
      ] 
    },
    { 
      text: "¿Cuánto tiempo dedicas a aprender algo nuevo cada día?", 
      options: [
        { text: "Casi nada, prefiero descansar.", score: 0 },
        { text: "A veces, cuando tengo ganas.", score: 0 },
        { text: "Mínimo 30 minutos sin falta.", score: 1 }
      ] 
    },
    { 
      text: "¿Conoces exactamente en qué gastas tu dinero al mes?", 
      options: [
        { text: "No, gasto según lo que tengo en la cuenta.", score: 0 },
        { text: "Tengo una idea aproximada en mi mente.", score: 0 },
        { text: "Sí, registro cada centavo en una app o diario.", score: 1 }
      ] 
    },
    { 
      text: "¿Cuál es tu meta financiera definitiva?", 
      options: [
        { text: "Pagar mis deudas y llegar a fin de mes.", score: 0 },
        { text: "Tener un trabajo estable hasta jubilarme.", score: 0 },
        { text: "Lograr la libertad financiera absoluta.", score: 1 }
      ] 
    },
    { 
      text: "Si te ofrecen una inversión con riesgo pero buen retorno:", 
      options: [
        { text: "La rechazo de inmediato por miedo.", score: 0 },
        { text: "Dudo tanto que pierdo la oportunidad.", score: 0 },
        { text: "Analizo el riesgo y decido estratégicamente.", score: 1 }
      ] 
    },
    { 
      text: "¿Quién es el responsable de tu situación económica?", 
      options: [
        { text: "El gobierno, la economía o mi jefe.", score: 0 },
        { text: "Mi familia o el entorno donde crecí.", score: 0 },
        { text: "Yo mismo y mis decisiones pasadas.", score: 1 }
      ] 
    }
  ],
  results: [
    { 
      min: 0, 
      max: 4, 
      title: "Consumidor Impulsivo 🛍️", 
      description: "Vives el día a día sin un plan. Tu mentalidad actual te mantiene lejos de la riqueza. ¡Es hora de cambiar tus hábitos!" 
    },
    { 
      min: 5, 
      max: 8, 
      title: "Ahorrador en Camino 📈", 
      description: "Sabes cuidar el dinero, pero te falta aprender a multiplicarlo. ¡Un poco más de riesgo te llevará al siguiente nivel!" 
    },
    { 
      min: 9, 
      max: 10, 
      title: "Futuro Magnate 👑", 
      description: "¡Felicidades! Tienes la mentalidad del 1%. Ves oportunidades donde otros ven problemas. Estás destinado al éxito." 
    }
  ]
};