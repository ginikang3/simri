"use client";

import React, { useState } from "react";
import { useMobileHeight } from "@/hooks/useMobileHeight";
import { latin } from "@/data/tests/latin";

// 모든 테스트 데이터를 통합 관리 (현재는 라틴 테스트만)
const tests = { latin };

export default function SimriPage() {
  useMobileHeight();

  const [currentTestKey, setCurrentTestKey] = useState<keyof typeof tests | null>(null);
  const [step, setStep] = useState<"home" | "quiz" | "result">("home");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  // 현재 테마 설정
  const currentTheme = currentTestKey ? tests[currentTestKey].theme : {
    id: "default-theme",
    logoText: "SIMRI",
    primaryColor: "bg-gray-900",
    primaryTextColor: "text-gray-900"
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

  const reset = () => {
    setStep("home");
    setCurrentTestKey(null);
  };

  const resultData = step === "result" && currentTestKey
    ? tests[currentTestKey].results.find(r => totalScore >= r.min && totalScore <= r.max) || tests[currentTestKey].results[0]
    : null;

  return (
    // 💡 변경 포인트: pt-20을 pt-10으로 줄여서 상단 여백 확보, pb-16을 pb-6으로 최소화
    <main className={`mobile-min-h flex flex-col items-center justify-start px-6 pt-10 pb-6 transition-all duration-500 ${currentTheme.id}`}>
      <div className="w-full max-w-sm flex flex-col items-center">
        
        {/* STEP 1: 홈 화면 */}
        {step === "home" && (
          <div className="w-full space-y-12 animate-in fade-in duration-700 pt-10">
            <header className="text-center py-6">
              <h1 className="text-6xl font-black tracking-tighter text-gray-900">SIMRI</h1>
              <p className="text-gray-400 font-bold text-[10px] tracking-[0.3em] uppercase mt-2">Psychology Lab</p>
            </header>

            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xs font-black text-gray-300 uppercase tracking-widest">Available Tests</h2>
                <div className="flex-1 h-[1px] bg-gray-100"></div>
              </div>
              <button
                onPointerDown={() => handleStart('latin')}
                className="w-full p-6 bg-white border border-gray-100 rounded-3xl text-left shadow-sm active:scale-[0.97] transition-all flex justify-between items-center group"
              >
                <div>
                  <span className="text-lg font-bold text-gray-800">{tests.latin.title}</span>
                  <p className="text-[10px] text-pink-400 font-bold mt-1">START TEST →</p>
                </div>
              </button>
            </section>
          </div>
        )}

        {/* STEP 2: 퀴즈 화면 (한 화면 고정용 콤팩트 디자인) */}
        {step === "quiz" && currentTestKey && (
          <div className="w-full flex flex-col items-center animate-in slide-in-from-bottom-4 duration-500">
            {/* 💡 변경 포인트: mb-8을 mb-5로 여백 단축 */}
            <div className="w-full bg-black/5 h-1.5 rounded-full mb-5 overflow-hidden">
              <div 
                className={`${currentTheme.primaryColor} h-full transition-all duration-500`} 
                style={{ width: `${((currentIdx + 1) / tests[currentTestKey].questions.length) * 100}%` }}
              />
            </div>
            
            {/* 💡 변경 포인트: text-2xl을 text-xl로 줄이고, mb-8을 mb-4로 줄여서 한 화면 고정 */}
            <h2 className="text-xl font-bold mb-4 text-center break-keep leading-snug text-gray-800 min-h-[48px] px-1">
              {tests[currentTestKey].questions[currentIdx].text}
            </h2>

            {/* 💡 변경 포인트: aspect-[4/3]을 aspect-video(16:9)로 줄여서 사진 세로 크기 단축, mb-8을 mb-6으로 단축 */}
            <div className="w-full aspect-video bg-gray-100 rounded-2xl mb-6 overflow-hidden border border-black/5">
              <img 
                src={`/images/latin/${currentIdx + 1}.jpg`} 
                alt="quiz"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x225?text=AMOR+KOREA"; }}
              />
            </div>

            {/* 💡 변경 포인트: gap-3을 gap-2.5로 줄임 */}
            <div className="flex flex-col gap-2.5 w-full">
              {tests[currentTestKey].questions[currentIdx].options.map((opt, i) => (
                <button
                  key={i}
                  onPointerDown={() => handleAnswer(opt.score)}
                  // 💡 변경 포인트: py-5 px-6을 py-3.5 px-5로 줄여서 버튼 크기 콤팩트화
                  className="w-full py-3.5 px-5 bg-white border border-gray-100 rounded-xl font-semibold text-center shadow-sm active:bg-gray-50 active:scale-[0.98] transition-all text-gray-700 text-sm leading-tight"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: 결과 화면 */}
        {step === "result" && resultData && (
          <div className="w-full text-center flex flex-col items-center animate-in zoom-in-95 duration-500 pt-6">
            <h2 className="text-4xl font-black text-[#FF69B4] mb-8 leading-tight">{resultData.title}</h2>
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-[2rem] shadow-xl border border-white mb-12 w-full">
              <p className="text-gray-600 leading-relaxed break-keep text-lg font-medium">{resultData.description}</p>
            </div>
            <button
              onPointerDown={reset}
              className="w-full py-5 bg-[#FF69B4] text-white rounded-2xl font-black text-lg shadow-lg active:scale-95 transition-transform"
            >
              다시 하기
            </button>
          </div>
        )}

      </div>
      {/* 💡 변경 포인트: footer 여백 줄임 */}
      <footer className="w-full text-center mt-12 text-[9px] text-gray-300 font-bold tracking-[0.4em] uppercase">© 2026 SIMRI LAB</footer>
    </main>
  );
}