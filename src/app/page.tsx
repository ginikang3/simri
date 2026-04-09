"use client";

import React, { useState } from "react";
import { useMobileHeight } from "@/hooks/useMobileHeight";
import { latin } from "@/data/tests/latin";

const tests = { latin };

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

  // 홈으로 완전히 초기화하는 함수
  const goHome = () => {
    setStep("home");
    setCurrentTestKey(null);
    setCurrentIdx(0);
    setTotalScore(0);
    window.scrollTo(0, 0);
  };

  const handleStart = (key: keyof typeof tests) => {
    setCurrentTestKey(key);
    setStep("quiz");
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

  return (
    <main className={`mobile-min-h flex flex-col items-center justify-start px-6 pt-6 pb-6 transition-all duration-500 ${currentTheme.id}`}>
      <div className="w-full max-w-sm flex flex-col items-center">
        
        {/* 상단 로고 이미지 (클릭 시 홈으로 이동) */}
        <header className="w-full flex justify-center mb-8 pt-4">
          <button onPointerDown={goHome} className="active:scale-95 transition-transform touch-none">
            <img 
              src="/images/logo.png" 
              alt="SIMRI LOGO" 
              className="h-12 w-auto object-contain"
              onError={(e) => {
                // 이미지가 없을 경우를 대비한 텍스트 대체 로직
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) parent.innerHTML = '<h1 class="text-4xl font-black tracking-tighter text-gray-900">SIMRI</h1>';
              }}
            />
          </button>
        </header>

        {step === "home" && (
          <div className="w-full space-y-12 animate-in fade-in duration-700">
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xs font-black text-gray-300 uppercase tracking-widest">Available Tests</h2>
                <div className="flex-1 h-[1px] bg-gray-100"></div>
              </div>
              <button
                onPointerDown={() => {
  setCurrentTestKey('latin');
  setStep("intro");
  window.scrollTo(0, 0);
}}
                className="w-full p-6 bg-white border border-gray-100 rounded-3xl text-left shadow-sm active:scale-[0.97] transition-all flex justify-between items-center group touch-none"
              >
                <div>
                  <span className="text-lg font-bold text-gray-800">{tests.latin.title}</span>
                  <p className="text-[10px] text-pink-400 font-bold mt-1">START TEST →</p>
                </div>
              </button>
            </section>
          </div>
        )}
 {/* 💡 이 위치에 삽입하세요: step === "home" 섹션 바로 아래 */}
{step === "intro" && currentTestKey && (
  <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="w-full aspect-video bg-gray-100 rounded-[2rem] mb-6 overflow-hidden shadow-lg border border-black/5">
      <img 
        src="/images/latin/intro.webp" 
        alt="Intro" 
        className="w-full h-full object-cover" 
        onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/800x450?text=K-Love+Test"; }}
      />
    </div>
    
    <h1 className="text-2xl font-black text-gray-900 mb-4 text-center break-keep">
      ¿Eres compatible con el amor de Corea?
    </h1>
    
    <div className="bg-white/80 p-6 rounded-2xl border border-gray-100 mb-8 text-gray-600 text-[15px] leading-relaxed shadow-sm">
    
      <p className="font-medium text-gray-800">
        ¿Te gustaría tener un novio coreano? 🇰🇷 <br/>
    ¿Podrás superar las diferencias culturales y lograr una relación exitosa? <br/>
    ¡Descúbrelo ahora mismo con este test!
      </p>
    </div>

    <button
      onPointerDown={() => {
        setStep("quiz");
        window.scrollTo(0, 0);
      }}
      className="w-full py-5 bg-[#FF69B4] text-white rounded-2xl font-black text-lg shadow-lg active:scale-95 transition-transform touch-none"
    >
      ¡Empezar ahora!
    </button>
  </div>
)}
        {step === "quiz" && currentTestKey && (
          <div className="w-full flex flex-col items-center animate-in slide-in-from-bottom-4 duration-500">
            <div className="w-full bg-black/5 h-1.5 rounded-full mb-5 overflow-hidden">
              <div 
                className={`${currentTheme.primaryColor} h-full transition-all duration-500`} 
                style={{ width: `${((currentIdx + 1) / tests[currentTestKey].questions.length) * 100}%` }}
              />
            </div>
            
            <h2 className="text-xl font-bold mb-4 text-center break-keep leading-snug text-gray-800 min-h-[48px] px-1">
              {tests[currentTestKey].questions[currentIdx].text}
            </h2>

            <div className="w-full aspect-video bg-gray-100 rounded-2xl mb-6 overflow-hidden border border-black/5 shadow-inner">
              <img 
                src={`/images/latin/${currentIdx + 1}.webp`} 
                alt="quiz"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x225?text=AMOR+KOREA"; }}
              />
            </div>

            <div className="flex flex-col gap-2.5 w-full">
              {tests[currentTestKey].questions[currentIdx].options.map((opt, i) => (
                <button
                  key={i}
                  onPointerDown={() => handleAnswer(opt.score)}
                  className="w-full py-3.5 px-5 bg-white border border-gray-100 rounded-xl font-semibold text-center shadow-sm active:bg-gray-50 active:scale-[0.98] transition-all text-gray-700 text-sm leading-tight touch-none"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "result" && resultData && (
  <div className="w-full text-center flex flex-col items-center animate-in zoom-in-95 duration-500 pt-2">
    {/* 결과 타이틀 */}
    <h2 className="text-3xl font-black text-[#FF69B4] mb-8 leading-tight px-4">{resultData.title}</h2>
    
    {/* 결과 이미지 (latin/results 폴더에 넣은 이미지 호출) */}
    <div className="w-64 h-64 bg-white rounded-[3rem] shadow-2xl mb-8 overflow-hidden border-8 border-white">
      <img 
        src={`/images/latin/results/result-${totalScore > 8 ? 'high' : totalScore > 4 ? 'mid' : 'low'}.webp`} 
        alt="result"
        className="w-full h-full object-cover"
        onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/300?text=AMOR+KOREA"; }}
      />
    </div>

    {/* 점수 게이지 바 (애드센스 승인용 전문성 추가) */}
    <div className="w-full bg-gray-100 h-8 rounded-2xl mb-8 relative overflow-hidden shadow-inner border border-black/5">
      <div 
        className="absolute left-0 top-0 h-full bg-gradient-to-r from-pink-300 to-pink-500 transition-all duration-1000"
        style={{ width: `${(totalScore / 9) * 100}%` }} 
      />
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white drop-shadow-sm">
        COMPATIBILIDAD: {Math.floor((totalScore / 9) * 100)}%
      </span>
    </div>

    {/* 결과 설명 */}
    <div className="bg-white/90 backdrop-blur-md p-8 rounded-[2rem] shadow-xl border border-white mb-10 w-full">
      <p className="text-gray-600 leading-relaxed break-keep text-base font-medium">{resultData.description}</p>
    </div>

    {/* 액션 버튼들 (와츠앱 공유 추가) */}
    <div className="flex flex-col gap-3 w-full">
      <button
        onPointerDown={() => {
          const text = `¡Mira mi resultado! Soy: ${resultData.title}. ¿Y tú?`;
          window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + window.location.href)}`);
        }}
        className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-black text-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 touch-none"
      >
        <span>Compartir en WhatsApp</span>
      </button>

      <button
        onPointerDown={goHome}
        className="w-full py-4 bg-gray-100 text-gray-400 rounded-2xl font-bold text-base active:scale-95 transition-transform touch-none"
      >
        Volver al inicio
      </button>
    </div>
  </div>
)}

      </div>
      <footer className="w-full text-center mt-12 text-[9px] text-gray-300 font-bold tracking-[0.4em] uppercase">© 2026 SIMRI LAB</footer>
    </main>
  );
}