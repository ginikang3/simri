"use client";

import React, { useState } from "react";
import { useMobileHeight } from "@/hooks/useMobileHeight";
import { tests } from "@/data/tests"; 

export default function SimriPage() {
  useMobileHeight();

  const [currentTestKey, setCurrentTestKey] = useState<keyof typeof tests | null>(null);
  const [step, setStep] = useState<"home" | "intro" | "quiz" | "result">("home");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const currentTheme = currentTestKey ? tests[currentTestKey].theme : {
    id: "default-theme",
    logoText: "SIMRI",
    primaryColor: "bg-gray-900",
    primaryTextColor: "text-gray-900"
  };

  const goHome = () => {
    setStep("home");
    setCurrentTestKey(null);
    setCurrentIdx(0);
    setTotalScore(0);
    window.scrollTo(0, 0);
  };

  const handleAnswer = (score: number) => {
    const nextScore = totalScore + score;
    const test = tests[currentTestKey!];
    if (currentIdx + 1 < test.questions.length) {
      setTotalScore(nextScore);
      setCurrentIdx(currentIdx + 1);
    } else {
      setTotalScore(nextScore);
      setStep("result");
    }
  };

  const resultData = step === "result" && currentTestKey
    ? tests[currentTestKey].results.find(r => totalScore >= r.min && totalScore <= r.max) || tests[currentTestKey].results[0]
    : null;

  // 💡 쫀득한 애니메이션 클래스 정의
  const expensiveAnimation = "animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out fill-mode-forwards";

  return (
    <main className={`mobile-min-h flex flex-col items-center justify-start px-6 pt-6 pb-6 transition-all duration-500 ${currentTheme.id}`}>
      <div className="w-full max-w-sm flex flex-col items-center">
        
        <header className="w-full flex justify-center mb-8 pt-4">
          <button onPointerDown={goHome} className="active:scale-90 transition-transform duration-150 touch-none">
            <img 
              src="/images/logo.png" 
              alt="SIMRI LOGO" 
              className="h-12 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) parent.innerHTML = '<h1 class="text-4xl font-black tracking-tighter text-gray-900">SIMRI</h1>';
              }}
            />
          </button>
        </header>

        {/* 1. 홈 섹션 */}
        {step === "home" && (
          <div key="home" className={`w-full space-y-12 ${expensiveAnimation}`}>
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xs font-black text-gray-300 uppercase tracking-widest px-1">Available Tests</h2>
                <div className="flex-1 h-[1px] bg-gray-100"></div>
              </div>
              <div className="grid gap-4">
                {Object.keys(tests).map((key) => (
                  <button
                    key={key}
                    onPointerDown={() => {
                      setCurrentTestKey(key as keyof typeof tests);
                      setStep("intro");
                      window.scrollTo(0, 0);
                    }}
                    className="w-full p-6 bg-white border border-gray-100 rounded-3xl text-left shadow-sm active:scale-[0.97] transition-all duration-200 flex justify-between items-center group touch-none"
                  >
                    <div>
                      <span className="text-lg font-bold text-gray-800">{tests[key as keyof typeof tests].title}</span>
                      <p className="text-[11px] text-pink-400 font-bold mt-1.5 opacity-80 group-active:opacity-100 transition-opacity uppercase">START TEST →</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* 2. 인트로 섹션 */}
        {step === "intro" && currentTestKey && (
          <div key={`intro-${currentTestKey}`} className={`w-full flex flex-col items-center ${expensiveAnimation}`}>
            <div className="w-full aspect-video bg-gray-100 rounded-[2rem] mb-6 overflow-hidden shadow-lg border border-black/5">
              <img 
                src={`/images/${currentTestKey}/intro.webp`} 
                alt="Intro" 
                className="w-full h-full object-cover" 
                onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/800x450?text=Intro"; }}
              />
            </div>
            
            <h1 className="text-2xl font-black text-gray-900 mb-4 text-center break-keep leading-tight px-2">
              {tests[currentTestKey].title}
            </h1>
            
            <div className="bg-white p-7 rounded-[1.5rem] border border-gray-100 mb-8 text-gray-700 text-[15px] shadow-sm text-center font-semibold text-gray-800 break-keep leading-relaxed">
              {currentTestKey === 'latin' ? (
                <>¿Te gustaría tener un novio coreano? 🇰🇷 <br/>¿Podrás superar las diferencias culturales? <br/>¡Descúbrelo ahora!</>
              ) : (
                <>Pon a prueba tu conocimiento general. <br/>¿Qué tan inteligente eres realmente? <br/>¡Empieza el desafío!</>
              )}
            </div>

            <button
              onPointerDown={() => { setStep("quiz"); window.scrollTo(0, 0); }}
              className="w-full py-5 bg-[#FF69B4] text-white rounded-[1.25rem] font-black text-lg shadow-lg active:scale-95 transition-all duration-200 touch-none"
            >
              ¡Empezar ahora!
            </button>
            {/* 인트로 버튼 아래에 슬쩍 추가 */}
<div className="mt-12 text-left space-y-4 border-t border-gray-100 pt-8 opacity-60">
  <h3 className="text-sm font-black text-gray-400">Preguntas Frecuentes</h3>
  <div className="text-[11px] text-gray-400 space-y-3 leading-relaxed">
    <p><strong>¿Es precisa esta prueba?</strong><br/> Nuestras pruebas están diseñadas por expertos en contenido cultural para ofrecer una experiencia entretenida y reflexiva basada en tendencias actuales.</p>
    <p><strong>¿Mis datos están seguros?</strong><br/> En SIMRI LAB respetamos tu privacidad. No almacenamos información personal identificable durante el proceso del test.</p>
    <p><strong>¿Puedo compartir mis resultados?</strong><br/> ¡Claro! Al finalizar, recibirás un análisis detallado que puedes compartir directamente en WhatsApp o Instagram.</p>
  </div>
</div>
          </div>
        )}

        {/* 3. 퀴즈 섹션 (💡 key={currentIdx} 추가: 문제마다 애니메이션 재생) */}
        {step === "quiz" && currentTestKey && (
          <div key={`quiz-${currentIdx}`} className={`w-full flex flex-col items-center ${expensiveAnimation}`}>
            <div className="w-full bg-black/5 h-1.5 rounded-full mb-6 overflow-hidden">
              <div 
                className={`${currentTheme.primaryColor} h-full transition-all duration-500 ease-in-out`} 
                style={{ width: `${((currentIdx + 1) / tests[currentTestKey].questions.length) * 100}%` }}
              />
            </div>
            
            <h2 className="text-xl font-bold mb-6 text-center break-keep leading-snug text-gray-800 min-h-[48px] px-2 flex items-center justify-center">
              {tests[currentTestKey].questions[currentIdx].text}
            </h2>

            {tests[currentTestKey].useImage ? (
              <div className="w-full aspect-video bg-gray-100 rounded-2xl mb-7 overflow-hidden border border-black/5 shadow-inner">
                <img 
                  src={`/images/${currentTestKey}/${currentIdx + 1}.webp`} 
                  alt="quiz"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x225?text=QUIZ"; }}
                />
              </div>
            ) : (
              <div className="mb-4" /> 
            )}

            <div className="flex flex-col gap-3 w-full">
              {tests[currentTestKey].questions[currentIdx].options.map((opt, i) => (
                <button
                  key={i}
                  onPointerDown={() => handleAnswer(opt.score)}
                  className="w-full py-4 px-6 bg-white border border-gray-100 rounded-xl font-semibold text-center shadow-sm active:bg-gray-50 active:scale-[0.98] transition-all duration-200 text-gray-700 text-[14px] leading-tight touch-none"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4. 결과 섹션 */}
        {step === "result" && resultData && currentTestKey && (
          <div key="result" className={`w-full text-center flex flex-col items-center pt-2 ${expensiveAnimation}`}>
            <h2 className="text-3xl font-black text-[#FF69B4] mb-9 leading-tight px-4 break-keep">{resultData.title}</h2>
            
            <div className="w-52 h-52 bg-white rounded-[3rem] shadow-2xl mb-7 overflow-hidden border-8 border-white mx-auto">
  <img 
    src={`/images/${currentTestKey}/results/${tests[currentTestKey].results.findIndex(r => r.title === resultData.title)}.webp`}
    alt={resultData.title}
    className="w-full h-full object-contain"
    onError={(e) => { e.currentTarget.src = "/images/logo.png"; }}
  />
</div>

            <div className="w-full bg-gray-100 h-9 rounded-full mb-7 relative overflow-hidden shadow-inner border border-black/5">
              <div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-pink-300 to-pink-500 transition-all duration-1000 ease-out"
                style={{ width: `${(totalScore / tests[currentTestKey].questions.length) * 100}%` }} 
              />
              <span className="absolute inset-0 flex items-center justify-center text-[11px] font-black text-white drop-shadow-sm uppercase tracking-wider">
                COMPATIBILIDAD: {Math.floor((totalScore / tests[currentTestKey].questions.length) * 100)}%
              </span>
            </div>

            <div className="bg-white p-7 rounded-[2rem] shadow-xl border border-white mb-7 w-full break-keep font-semibold text-gray-600 leading-relaxed text-base">
              {resultData.description}
            </div>

            <div className="flex flex-col gap-3.5 w-full">
              <button
                onPointerDown={() => {
                  const text = `¡Mira mi resultado en ${tests[currentTestKey].title}! Soy: ${resultData.title}.`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + window.location.href)}`);
                }}
                className="w-full py-4.5 bg-[#25D366] text-white rounded-[1.25rem] font-black text-lg shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2.5 touch-none"
              >
                <span>Compartir en WhatsApp</span>
              </button>
              <button onPointerDown={goHome} className="w-full py-4.5 bg-gray-100 text-gray-400 rounded-[1.25rem] font-bold text-base active:scale-95 transition-all duration-200 touch-none">
                Volver al inicio
              </button>
            </div>
          </div>
        )}

      </div> {/* 기존 컨테이너 닫는 div */}

      {/* 💡 기존 footer를 지우고 아래 내용을 넣으세요 */}
      <footer className="w-full text-center mt-14 pb-12 space-y-6">
        <div className="flex justify-center gap-6 text-[11px] text-gray-400 font-bold uppercase tracking-wider">
          <a href="/about" className="hover:text-pink-400 transition-colors">About</a>
          <a href="/privacy" className="hover:text-pink-400 transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-pink-400 transition-colors">Terms</a>
        </div>
        
        <p className="text-[9px] text-gray-300 font-bold tracking-[0.4em] uppercase">
          © 2026 SIMRI LAB
        </p>
      </footer>

    </main>
  );
}