"use client";

import React, { useEffect, useState } from "react";
import { useMobileHeight } from "@/hooks/useMobileHeight";
import { supabase } from "@/lib/supabase";

export default function DynamicSimriPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  useMobileHeight();

  const [testData, setTestData] = useState<any>(null);
  const [step, setStep] = useState<"intro" | "quiz" | "result">("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const { data } = await supabase
          .from('tests')
          .select('*')
          .eq('id', id)
          .single();
        if (data) setTestData(data);
      } catch (err) {
        console.error("Error fetching test data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestData();
  }, [id]);

  if (loading) return <div className="p-10 text-center text-gray-400 font-bold">Cargando...</div>;
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

  const animationClass = "animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out fill-mode-forwards";

  return (
    <main className="mobile-min-h flex flex-col items-center justify-start px-6 pt-6 pb-6 bg-white transition-all duration-500">
      <div className="w-full max-w-sm flex flex-col items-center">
        
        <header className="w-full flex justify-center mb-8 pt-4">
          <button onPointerDown={() => window.location.href = "/"} className="active:scale-95 transition-transform duration-150 touch-none">
            <img src="/images/logo.png" alt="Simri Lab" className="h-10 w-auto object-contain" />
          </button>
        </header>

        {/* 1. 인트로 섹션 */}
        {step === "intro" && (
          <div key="intro" className={`w-full flex flex-col items-center ${animationClass}`}>
            {testData.thumbnail_url && (
              <div className="w-full aspect-video bg-gray-100 rounded-[2rem] mb-6 overflow-hidden shadow-sm border border-black/5">
                <img 
                  src={testData.thumbnail_url} 
                  alt="Intro"
                  className="w-full h-full object-cover" 
                />
              </div>
            )}
            
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
          </div>
        )}

        {/* 2. 퀴즈 섹션 */}
        {step === "quiz" && (
          <div key={`quiz-${currentIdx}`} className={`w-full flex flex-col items-center ${animationClass}`}>
            <div className="w-full bg-black/5 h-1.5 rounded-full mb-6 overflow-hidden">
              <div 
                className="bg-[#FF69B4] h-full transition-all duration-500 ease-in-out" 
                style={{ width: `${((currentIdx + 1) / testData.questions.length) * 100}%` }} 
              />
            </div>
            
            <h2 className="text-xl font-bold mb-6 text-center text-gray-800 px-2 break-keep min-h-[56px] flex items-center justify-center">
              {testData.questions[currentIdx].text}
            </h2>

            {/* ✅ 수정 포인트: 이미지 로딩 에러 시 display:none 시키는 로직 제거 (캐시 꼬임 방지) */}
            {testData.questions[currentIdx].image_url && testData.questions[currentIdx].image_url.trim() !== "" && (
              <div className="w-full aspect-video bg-gray-100 rounded-2xl mb-7 overflow-hidden border border-black/5 shadow-inner">
                <img 
                  src={testData.questions[currentIdx].image_url} 
                  alt="Question"
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
            <h2 className="text-3xl font-black text-[#FF69B4] mb-9 leading-tight break-keep px-4">{resultData.title}</h2>
            
            {resultData.image_url && (
              <div className="w-52 h-52 bg-white rounded-[3rem] shadow-2xl mb-7 overflow-hidden border-8 border-white mx-auto">
                <img 
                  src={resultData.image_url}
                  alt="Result"
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            <div className="bg-white p-7 rounded-[2rem] shadow-xl border border-white mb-7 w-full font-semibold text-gray-600 leading-relaxed break-keep">
              {resultData.description}
            </div>

            <div className="flex flex-col gap-3.5 w-full">
              <button
                onPointerDown={() => {
                  const text = `¡Mira mi resultado en ${testData.title}! Soy: ${resultData.title}. Haz el test aquí:`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + window.location.href)}`);
                }}
                className="w-full py-4.5 bg-[#25D366] text-white rounded-[1.25rem] font-black text-lg shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2.5 touch-none"
              >
                <span>Compartir en WhatsApp</span>
              </button>

              <button
                onPointerDown={() => {
                  const shareUrl = encodeURIComponent(window.location.href);
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, "_blank", "width=600,height=400");
                }}
                className="w-full py-4.5 bg-[#1877F2] text-white rounded-[1.25rem] font-black text-lg shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2.5 touch-none"
              >
                <span>Compartir en Facebook</span>
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