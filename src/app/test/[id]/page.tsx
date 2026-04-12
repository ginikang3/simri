"use client";

import React, { useState } from "react";
import { useMobileHeight } from "@/hooks/useMobileHeight";
import { tests } from "@/data/tests"; 

// ✅ 사장님, 클라이언트 컴포넌트에서는 Metadata export가 불가능하므로 
// 실제 SEO 적용을 위해서는 이 파일이 아닌 layout.tsx 혹은 별도의 서버 컴포넌트(page.tsx)에서 
// metadata를 정의해야 합니다. 우선 이 파일 내에서 로봇이 읽을 수 있는 최적화 작업을 진행했습니다.

export default function DynamicSimriPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const currentTestKey = id as keyof typeof tests;
  
  useMobileHeight();

  const [step, setStep] = useState<"intro" | "quiz" | "result">("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const testData = tests[currentTestKey] as any;

  if (!testData) return <div className="p-10 text-center">Test no encontrado.</div>;

  const handleAnswer = (score: number) => {
    const nextScore = totalScore + score;
    if (currentIdx + 1 < testData.questions.length) {
      setTotalScore(nextScore);
      setCurrentIdx(currentIdx + 1);
    } else {
      setTotalScore(nextScore);
      setStep("result");
    }
  };

  const resultData = step === "result"
    ? testData.results.find((r: any) => totalScore >= r.min && totalScore <= r.max) || testData.results[0]
    : null;

  // ✅ SEO: 구글 로봇용 구조화 데이터 생성
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": testData.title,
    "description": testData.description,
    "provider": {
      "@type": "Organization",
      "name": "Simri Lab"
    }
  };

  const animationClass = "animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out fill-mode-forwards";

  return (
    <main className={`mobile-min-h flex flex-col items-center justify-start px-6 pt-6 pb-6 transition-all duration-500 ${testData.theme?.id}`}>
      {/* ✅ SEO: 구조화 데이터 삽입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full max-w-sm flex flex-col items-center">
        
        <header className="w-full flex justify-center mb-8 pt-4">
          <button onPointerDown={() => window.location.href = "/"} className="active:scale-90 transition-transform duration-150 touch-none">
            <img src="/images/logo.png" alt="Simri Lab Logo" className="h-12 w-auto object-contain" />
          </button>
        </header>

        {/* 1. 인트로 섹션 */}
        {step === "intro" && (
          <div key="intro" className={`w-full flex flex-col items-center ${animationClass}`}>
            <div className="w-full aspect-video bg-gray-100 rounded-[2rem] mb-6 overflow-hidden shadow-lg border border-black/5">
              <img 
                src={`/images/${currentTestKey}/intro.webp`} 
                alt={testData.title} // ✅ SEO: Alt 태그 수정
                className="w-full h-full object-cover" 
                onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/800x450?text=Cargando..."; }}
              />
            </div>
            
            <h1 className="text-2xl font-black text-gray-900 mb-2 text-center leading-tight px-2 break-keep">
              {testData.title}
            </h1>

            <p className="text-sm font-bold text-gray-400 mb-8 text-center px-6 break-keep leading-snug">
              {testData.description}
            </p>

            <button
              onPointerDown={() => { setStep("quiz"); window.scrollTo(0, 0); }}
              className="w-full py-5 bg-[#FF69B4] text-white rounded-[1.25rem] font-black text-lg shadow-lg active:scale-95 transition-all duration-200 touch-none mb-16"
            >
              ¡Empezar ahora!
            </button>

            <section className="w-full opacity-10 mt-10">
              <div className="text-[10px] text-gray-400 leading-relaxed text-center break-keep px-4 pb-10">
                {/* ✅ SEO: 검색 로봇을 위한 스페인어 키워드 강화 */}
                Bienvenido a nuestro test de personalidad exclusivo. Descubre tu compatibilidad y rasgos únicos con Simri Lab. 
                Test de personalidad coreano, cultura coreana, y relaciones amorosas en español.
                {testData.description}
              </div>
            </section>
          </div>
        )}

        {/* 2. 퀴즈 섹션 */}
        {step === "quiz" && (
          <div key={`quiz-${currentIdx}`} className={`w-full flex flex-col items-center ${animationClass}`}>
            <div className="w-full bg-black/5 h-1.5 rounded-full mb-6 overflow-hidden">
              <div 
                className={`${testData.theme?.primaryColor} h-full transition-all duration-500 ease-in-out`} 
                style={{ width: `${((currentIdx + 1) / testData.questions.length) * 100}%` }} 
              />
            </div>
            
            <h2 className="text-xl font-bold mb-6 text-center text-gray-800 px-2 break-keep min-h-[56px] flex items-center justify-center">
              {testData.questions[currentIdx].text}
            </h2>

            {testData.useImage && (
              <div className="w-full aspect-video bg-gray-100 rounded-2xl mb-7 overflow-hidden border border-black/5 shadow-inner">
                <img 
                  src={`/images/${currentTestKey}/${currentIdx + 1}.webp`} 
                  alt={`Pregunta ${currentIdx + 1}`} // ✅ SEO: Alt 태그 수정
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex flex-col gap-3 w-full">
              {testData.questions[currentIdx].options.map((opt: any, i: number) => (
                <button
                  key={i}
                  onPointerDown={() => handleAnswer(opt.score)}
                  className="w-full py-4 px-6 bg-white border border-gray-100 rounded-xl font-semibold text-center shadow-sm active:bg-gray-50 active:scale-[0.98] transition-all duration-200 text-gray-700 touch-none"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 3. 결과 섹션 */}
        {step === "result" && resultData && (
          <div key="result" className={`w-full text-center flex flex-col items-center pt-2 ${animationClass}`}>
            <h2 className="text-3xl font-black text-[#FF69B4] mb-9 leading-tight break-keep px-4">{(resultData as any).title}</h2>
            <div className="w-52 h-52 bg-white rounded-[3rem] shadow-2xl mb-7 overflow-hidden border-8 border-white mx-auto">
              <img 
                src={`/images/${currentTestKey}/results/${testData.results.indexOf(resultData)}.webp`}
                alt="Resultado de personalidad" // ✅ SEO: Alt 태그 수정
                className="w-full h-full object-contain"
                onError={(e) => { e.currentTarget.src = "/images/logo.png"; }}
              />
            </div>
            <div className="bg-white p-7 rounded-[2rem] shadow-xl border border-white mb-7 w-full font-semibold text-gray-600 leading-relaxed break-keep">
              {(resultData as any).description}
            </div>

            <div className="flex flex-col gap-3.5 w-full">
              <button
                onPointerDown={() => {
                  const text = `¡Mira mi resultado en ${testData.title}! Soy: ${(resultData as any).title}. Haz el test aquí:`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + window.location.href)}`);
                }}
                className="w-full py-4.5 bg-[#25D366] text-white rounded-[1.25rem] font-black text-lg shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2.5 touch-none"
              >
                <span>Compartir en WhatsApp</span>
              </button>
              <button onPointerDown={() => window.location.href = "/"} className="w-full py-4.5 bg-gray-100 text-gray-400 rounded-[1.25rem] font-bold mt-2 active:scale-95 transition-all touch-none">
                Volver al inicio
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}