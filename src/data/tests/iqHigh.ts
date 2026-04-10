import { TestData } from "./latin";

export const iqHigh: TestData = {
  title: "Test de IQ: Nivel Experto 🔴",
  useImage: false,
  theme: {
    id: "iq-high-theme",
    logoText: "IQ EXPERT",
    primaryColor: "bg-red-600",
    primaryTextColor: "text-white",
  },
  resultThresholds: { high: 9, mid: 6 },
  questions: [
    { text: "En E=mc^2, ¿qué representa la letra 'c'?", options: [{ text: "Masa", score: 0 }, { text: "Energía", score: 0 }, { text: "Velocidad de la luz", score: 1 }, { text: "Gravedad", score: 0 }] },
    { text: "¿Qué evento inició la Primera Guerra Mundial?", options: [{ text: "Watergate", score: 0 }, { text: "Atentado de Sarajevo", score: 1 }, { text: "Boston Tea Party", score: 0 }, { text: "Día D", score: 0 }] },
    { text: "¿En qué tipo de triángulo se aplica el Teorema de Pitágoras?", options: [{ text: "Equilátero", score: 0 }, { text: "Isósceles", score: 0 }, { text: "Rectángulo", score: 1 }, { text: "Obtusángulo", score: 0 }] },
    { text: "¿Qué orgánulo es la 'central de energía' de la célula?", options: [{ text: "Ribosoma", score: 0 }, { text: "Mitocondria", score: 1 }, { text: "Cloroplasto", score: 0 }, { text: "Núcleo", score: 0 }] },
    { text: "¿Cuál es la 1ra Ley de Movimiento de Newton?", options: [{ text: "Ley de Inercia", score: 1 }, { text: "F=ma", score: 0 }, { text: "Acción y Reacción", score: 0 }, { text: "Gravedad", score: 0 }] },
    { text: "¿En qué país comenzó la Revolución Industrial?", options: [{ text: "EE.UU.", score: 0 }, { text: "Alemania", score: 0 }, { text: "Reino Unido", score: 1 }, { text: "Francia", score: 0 }] },
    { text: "¿Quién acuñó el término 'La mano invisible'?", options: [{ text: "Adam Smith", score: 1 }, { text: "Karl Marx", score: 0 }, { text: "John Keynes", score: 0 }, { text: "Ricardo", score: 0 }] },
    { text: "¿Cuál es la estrella más cercana a la Tierra (sin contar al Sol)?", options: [{ text: "Estrella Polar", score: 0 }, { text: "Sirio", score: 0 }, { text: "Próxima Centauri", score: 1 }, { text: "Andrómeda", score: 0 }] },
    { text: "¿Qué ciudad-estado es la cuna de la democracia?", options: [{ text: "Roma", score: 0 }, { text: "Atenas", score: 1 }, { text: "Esparta", score: 0 }, { text: "Cartago", score: 0 }] },
    { text: "¿Qué matemático inventó los logaritmos?", options: [{ text: "Euler", score: 0 }, { text: "John Napier", score: 1 }, { text: "Newton", score: 0 }, { text: "Descartes", score: 0 }] },
  ],
  results: [
    { min: 9, max: 10, title: "Einstein Reencarnado 🧠", description: "¡Nivel Dios! Tu intelecto está fuera de este mundo." },
    { min: 6, max: 8, title: "Genio del 1% 💎", description: "Tienes una mente brillante y un conocimiento enciclopédico." },
    { min: 0, max: 5, title: "Ciudadano Promedio 👤", description: "Tienes buena inteligencia, pero este nivel era realmente difícil." },
  ],
};