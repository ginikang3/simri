"use client";

import React, { useState } from "react";
import { useMobileHeight } from "@/hooks/useMobileHeight";
import { latin } from "@/data/tests/latin";

const tests = { latin };

export default function SimriPage() {
  useMobileHeight();

  const [currentTestKey, setCurrentTestKey] = useState<keyof typeof tests | null>(null);
  const [step, setStep] = useState<"home" | "quiz" | "result">("home");
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
                onPointerDown={() => handleStart('latin')}
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
            <h2 className="text-3xl font-black text-[#FF69B4] mb-8 leading-tight px-4">{resultData.title}</h2>
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-[2rem] shadow-xl border border-white mb-12 w-full">
              <p className="text-gray-600 leading-relaxed break-keep text-lg font-medium">{resultData.description}</p>
            </div>
            <button
              onPointerDown={goHome}
              className="w-full py-5 bg-[#FF69B4] text-white rounded-2xl font-black text-lg shadow-lg active:scale-95 transition-transform touch-none"
            >
              다시 하기
            </button>
          </div>
        )}

      </div>
      <footer className="w-full text-center mt-12 text-[9px] text-gray-300 font-bold tracking-[0.4em] uppercase">© 2026 SIMRI LAB</footer>
    </main>
  );
}