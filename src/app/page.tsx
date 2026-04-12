"use client";

import React from "react";
import { useMobileHeight } from "@/hooks/useMobileHeight";
import { tests } from "@/data/tests";
import Link from "next/link";

export default function SimriHomePage() {
  useMobileHeight();

  // 💡 쫀득한 애니메이션 클래스
  const expensiveAnimation = "animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out fill-mode-forwards";

  return (
    <main className="mobile-min-h flex flex-col items-center justify-start px-6 pt-6 pb-6 bg-white">
      <div className="w-full max-w-sm flex flex-col items-center">
        
        {/* 헤더 */}
        <header className="w-full flex justify-center mb-12 pt-4">
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
        </header>

        {/* 테스트 목록 섹션 */}
        <div key="home" className={`w-full space-y-10 ${expensiveAnimation}`}>
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xs font-black text-gray-300 uppercase tracking-widest px-1">Tests Disponibles</h2>
              <div className="flex-1 h-[1px] bg-gray-100"></div>
            </div>

            <div className="grid gap-4">
              {Object.keys(tests).map((key) => (
                <Link
                  key={key}
                  href={`/test/${key}`}
                  onPointerDown={() => {}}
                  className="w-full p-5 bg-white border border-gray-100 rounded-[2rem] text-left shadow-sm active:scale-[0.97] transition-all duration-200 flex justify-between items-center group touch-none overflow-hidden"
                >
                  {/* 왼쪽: 텍스트 정보 */}
                  <div className="flex-1 pr-4">
                    <span className="text-[17px] font-bold text-gray-800 leading-tight block">
                      {tests[key as keyof typeof tests].title}
                    </span>
                    <p className="text-[10px] text-pink-400 font-black mt-2 opacity-80 group-active:opacity-100 transition-opacity uppercase tracking-tighter">
                      START TEST →
                    </p>
                  </div>

                  {/* 오른쪽 끝: 썸네일 이미지 */}
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-black/5">
                    <img 
                      src={`/images/${key}/intro.webp`} 
                      alt="Thumbnail" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { e.currentTarget.src = "/images/logo.png"; }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* 하단 홍보 섹션 */}
          <div className="bg-pink-50 rounded-[2rem] p-8 text-center border border-pink-100/50">
            <p className="text-sm font-bold text-pink-400 leading-relaxed">
              ¿Quieres saber más sobre ti? <br/>
              ¡Prueba nuestros tests exclusivos!
            </p>
          </div>
        </div>

        {/* 푸터 */}
        <footer className="w-full text-center mt-20 pb-12 space-y-6">
          <div className="flex justify-center gap-6 text-[11px] text-gray-400 font-bold uppercase tracking-wider">
            <a href="/about" className="hover:text-pink-400 transition-colors">About</a>
            <a href="/privacy" className="hover:text-pink-400 transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-pink-400 transition-colors">Terms</a>
          </div>
          <p className="text-[9px] text-gray-300 font-bold tracking-[0.4em] uppercase">
            © 2026 SIMRI LAB
          </p>
        </footer>
      </div>
    </main>
  );
}