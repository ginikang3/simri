import { TestData } from "./latin";

export const iqLow: TestData = {
  title: "Test de IQ: Nivel Básico 🟢",
  useImage: false,
  theme: {
    id: "iq-low-theme",
    logoText: "IQ EASY",
    primaryColor: "bg-green-500",
    primaryTextColor: "text-white",
  },
  resultThresholds: { high: 9, mid: 6 },
  questions: [
    { text: "¿Cuál es el océano más grande de la Tierra?", options: [{ text: "Pacífico", score: 1 }, { text: "Atlántico", score: 0 }, { text: "Índico", score: 0 }, { text: "Ártico", score: 0 }] },
    { text: "¿Cuánto suma la medida de los ángulos internos de un triángulo?", options: [{ text: "90°", score: 0 }, { text: "180°", score: 1 }, { text: "270°", score: 0 }, { text: "360°", score: 0 }] },
    { text: "¿Cuál es el planeta más grande del sistema solar?", options: [{ text: "Tierra", score: 0 }, { text: "Marte", score: 0 }, { text: "Júpiter", score: 1 }, { text: "Venus", score: 0 }] },
    { text: "¿Cuál es el símbolo químico del agua?", options: [{ text: "CO2", score: 0 }, { text: "O2", score: 0 }, { text: "H2O", score: 1 }, { text: "H2", score: 0 }] },
    { text: "¿Cuántos días tiene un año común?", options: [{ text: "360", score: 0 }, { text: "364", score: 0 }, { text: "365", score: 1 }, { text: "366", score: 0 }] },
    { text: "¿Qué números se usan en el sistema binario?", options: [{ text: "1, 2", score: 0 }, { text: "0, 1", score: 1 }, { text: "1, 10", score: 0 }, { text: "0, 9", score: 0 }] },
    { text: "¿Qué órgano bombea sangre a todo el cuerpo?", options: [{ text: "Pulmones", score: 0 }, { text: "Hígado", score: 0 }, { text: "Corazón", score: 1 }, { text: "Estómago", score: 0 }] },
    { text: "¿Cuál es el color más exterior del arcoíris?", options: [{ text: "Violeta", score: 0 }, { text: "Verde", score: 0 }, { text: "Rojo", score: 1 }, { text: "Amarillo", score: 0 }] },
    { text: "¿Cuál es el único satélite natural de la Tierra?", options: [{ text: "Sol", score: 0 }, { text: "Luna", score: 1 }, { text: "Marte", score: 0 }, { text: "Venus", score: 0 }] },
    { text: "¿A qué temperatura el hielo se convierte en agua?", options: [{ text: "-10°C", score: 0 }, { text: "0°C", score: 1 }, { text: "50°C", score: 0 }, { text: "100°C", score: 0 }] },
  ],
  results: [
    { min: 9, max: 10, title: "Oruga Inteligente 🐛", description: "¡Tienes una base sólida! Estás listo para el siguiente nivel." },
    { min: 6, max: 8, title: "Papa con Potencial 🥔", description: "No está mal, pero necesitas repasar algunos conceptos básicos." },
    { min: 0, max: 5, title: "Piedra de Río 🪨", description: "Parece que estabas distraído. ¡Inténtalo de nuevo!" },
  ],
};