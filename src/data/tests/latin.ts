export interface TestData {
  title: string;
  description: string; // 💡 테스트 취지 설명 필드 추가
  useImage: boolean;
  theme: {
    id: string;
    logoText: string;
    primaryColor: string;
    primaryTextColor: string;
    shadowColor?: string;
  };
  resultThresholds: {
    high: number;
    mid: number;
  };
  questions: {
    id?: number;
    text: string;
    options: { text: string; score: number }[];
  }[];
  results: {
    min: number;
    max: number;
    title: string;
    description: string;
  }[];
}

export const latin: TestData = {
  title: "Prueba de Compatibilidad: Novio Coreano 🇰🇷",
  description: "¿Podrías salir con un coreano siguiendo su cultura de citas? Descúbrelo aquí.", // 💡 짧은 설명 추가
  useImage: true,
  theme: {
    id: "latin-theme",
    logoText: "AMOR KOREA",
    primaryColor: "bg-[#FF69B4]",
    primaryTextColor: "text-white",
    shadowColor: "shadow-[0_4px_0_0_#FF69B4]",
  },
  resultThresholds: { high: 8, mid: 4 },
  questions: [
    {
      id: 1,
      text: "Estás en una fiesta y tu novio coreano te dice que está 'ansioso' y te pide fotos cada 30 min. ¿Qué haces?",
      options: [
        { text: "Me encanta que se preocupe, le mando las fotos feliz.", score: 1 },
        { text: "¡Primero disfruto el momento! Le escribo todo después.", score: 0 },
      ],
    },
    {
      id: 2,
      text: "Mañana tienen una cita a las 6:00 PM. ¿A qué hora llegarías tú?",
      options: [
        { text: "5:50 PM. No quiero que espere, así que llego antes.", score: 1 },
        { text: "A las 6:00 PM o después. Cuando esté lista, es el momento perfecto.", score: 0 },
      ],
    },
    {
      id: 3,
      text: "Abrazaste a un amigo en la fiesta y tu novio se pone frío y deja de hablar por celos.",
      options: [
        { text: "¡Su humor es lo primero! Le pregunto qué pasa y lo consiento.", score: 1 },
        { text: "¿Por qué se pone así? Sigo disfrutando mi fiesta y lo dejo solo.", score: 0 },
      ],
    },
    {
      id: 4,
      text: "Después de una cena romántica llega la cuenta. ¿Cómo reaccionas?",
      options: [
        { text: "Respeto la etiqueta coreana y espero a que él pague.", score: 1 },
        { text: "¡Somos iguales! Saco mi cartera y pagamos juntos.", score: 0 },
      ],
    },
    {
      id: 5,
      text: "Usas un vestido súper sexy y él te dice 'es demasiado, tápate' y te ofrece su suéter.",
      options: [
        { text: "Me siento cuidada y valiosa, así que me pongo el suéter.", score: 1 },
        { text: "Me encanta cómo me veo hoy. Me quedo así sin el suéter.", score: 0 },
      ],
    },
    {
      id: 6,
      text: "Él te pide: 'Somos novios, así que por favor evita hablar tanto con tus amigos hombres'.",
      options: [
        { text: "Por confianza y amor, tomo un poco de distancia con mis amigos.", score: 1 },
        { text: "Mis amigos son parte de mi vida. Mantengo mis relaciones igual.", score: 0 },
      ],
    },
    {
      id: 1,
      text: "Llevan poco tiempo pero lo invitas a conocer a tu familia. Él dice que 'aún es mucha presión'.",
      options: [
        { text: "Entiendo que es porque se toma nuestra relación en serio.", score: 1 },
        { text: "¿Acaso no me quiere tanto? Me siento un poco herida.", score: 0 },
      ],
    },
    {
      id: 8,
      text: "Quieres darle un beso apasionado en la plaza, pero él tiene vergüenza y solo te da la mano.",
      options: [
        { text: "Entiendo la cultura conservadora de Corea y voy a su ritmo.", score: 1 },
        { text: "¡El amor se nota! Yo tomo la iniciativa y lo beso sin miedo.", score: 0 },
      ],
    },
    {
      id: 9,
      text: "Hablando con él sale el tema de los ex. ¿Qué tanto quieres compartir sobre tu pasado?",
      options: [
        { text: "El pasado es pasado. Prefiero no preguntar ni decir nada por respeto.", score: 1 },
        { text: "¿Qué hay que ocultar? Le cuento todo de forma directa y honesta.", score: 0 },
      ],
    },
  ],
  results: [
    { 
      min: 0, 
      max: 3, 
      title: "¡Alma Latina Pura! 🔥", 
      description: "Eres demasiado libre para las reglas coreanas. Tu espíritu aventurero no conoce límites. ¡No cambies tu esencia por nada!" 
    },
    { 
      min: 4, 
      max: 6, 
      title: "La Mezcla Perfecta 💃", 
      description: "Sabes equilibrar tu brillo latino con la cultura de tu Oppa. Eres adaptable y comprendes ambos mundos perfectamente." 
    },
    { 
      min: 7, 
      max: 9, 
      title: "La Novia Ideal 🇰🇷", 
      description: "¡Parece que naciste para estar con un coreano! Eres considerada, respetuosa y entiendes muy bien los códigos del amor en Corea." 
    },
  ],
};