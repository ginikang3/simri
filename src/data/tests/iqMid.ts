import { TestData } from "./latin";

export const iqMid: TestData = {
  title: "Test de IQ: Nivel Medio 🟡",
  // ✅ 요구사항: 테스트 취지 설명 추가
  description: "Desafía tu cultura general y lógica con preguntas de nivel intermedio.",
  useImage: false,
  theme: {
    id: "iq-mid-theme",
    logoText: "IQ MEDIUM",
    primaryColor: "bg-yellow-500",
    primaryTextColor: "text-white",
  },
  resultThresholds: { high: 9, mid: 6 },
  questions: [
    { text: "¿Cuál es el país más poblado del mundo actualmente?", options: [{ text: "China", score: 0 }, { text: "EE.UU.", score: 0 }, { text: "India", score: 1 }, { text: "Indonesia", score: 0 }] },
    { text: "¿Qué gas es el más abundante en la atmósfera (78%)?", options: [{ text: "Oxígeno", score: 0 }, { text: "Nitrógeno", score: 1 }, { text: "CO2", score: 0 }, { text: "Hidrógeno", score: 0 }] },
    { text: "Si x^2 = 16, ¿cuál es la suma de todos los valores posibles de x?", options: [{ text: "4", score: 0 }, { text: "8", score: 0 }, { text: "0", score: 1 }, { text: "16", score: 0 }] },
    { text: "¿Cuánto tarda la luz del Sol en llegar a la Tierra?", options: [{ text: "1.3 seg", score: 0 }, { text: "8 min 20 seg", score: 1 }, { text: "30 min", score: 0 }, { text: "1 hora", score: 0 }] },
    { text: "¿Quién fue el primer humano en pisar la Luna?", options: [{ text: "Yuri Gagarin", score: 0 }, { text: "Neil Armstrong", score: 1 }, { text: "Buzz Aldrin", score: 0 }, { text: "Elon Musk", score: 0 }] },
    { text: "¿Qué metal representa el símbolo químico 'Au'?", options: [{ text: "Plata", score: 0 }, { text: "Cobre", score: 0 }, { text: "Hierro", score: 0 }, { text: "Oro", score: 1 }] },
    { text: "¿En qué cordillera se encuentra el Monte Everest?", options: [{ text: "Andes", score: 0 }, { text: "Alpes", score: 0 }, { text: "Himalaya", score: 1 }, { text: "Rocosas", score: 0 }] },
    { text: "¿Quién pintó la 'Mona Lisa'?", options: [{ text: "Miguel Ángel", score: 0 }, { text: "Leonardo da Vinci", score: 1 }, { text: "Picasso", score: 0 }, { text: "Dalí", score: 0 }] },
    { text: "¿Cuánto dura aproximadamente la rotación de la Tierra?", options: [{ text: "12 horas", score: 0 }, { text: "24 horas", score: 1 }, { text: "48 horas", score: 0 }, { text: "365 días", score: 0 }] },
    { text: "¿Quién inventó el teléfono?", options: [{ text: "Thomas Edison", score: 0 }, { text: "Alexander Graham Bell", score: 1 }, { text: "Tesla", score: 0 }, { text: "James Watt", score: 0 }] },
  ],
  results: [
    { min: 0, max: 5, title: "Perrito Curioso 🐶", description: "¡Buen esfuerzo! Pero aún hay mucho por descubrir." },
    { min: 6, max: 8, title: "Delfín Inteligente 🐬", description: "Eres muy rápido y astuto. Tienes una gran agudeza mental." },
    { min: 9, max: 10, title: "Primate Evolucionado 🐒", description: "¡Increíble! Tu capacidad de análisis es muy superior al promedio." },
],
};