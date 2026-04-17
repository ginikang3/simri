"use client";

import React, { useEffect, useState } from "react";
import { useMobileHeight } from "@/hooks/useMobileHeight";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function SimriHomePage() {
  useMobileHeight();
  const [testList, setTestList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // DB에서 테스트 목록 가져오기
  useEffect(() => {
    const fetchTests = async () => {
      const { data } = await supabase
        .from('tests')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setTestList(data);
    };
    fetchTests();
  }, []);

  // 검색 필터링 로직
  const filteredTests = testList.filter(test => 
    test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const expensiveAnimation = "animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out fill-mode-forwards";

  return (
    <main className="mobile-min-h flex flex-col items-center justify-start px-5 pt-6 pb-10 bg-white">
      <div className="w-full max-w-md flex flex-col items-center">
        
        {/* 로고 */}
        <header className="w-full flex justify-center mb-6 pt-4">
          <img src="/images/logo.png" alt="Simri Lab" className="h-10 w-auto object-contain" />
        </header>

        {/* 1. 검색창 섹션 */}
        <div className="w-full mb-8">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Buscar tests..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-pink-300 transition-all outline-none text-gray-700 shadow-sm"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
          </div>
        </div>

        {/* 2. 테스트 그리드 (2열 구조) */}
        <div className={`w-full ${expensiveAnimation}`}>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-[11px] font-black text-gray-300 uppercase tracking-widest px-1">Explorar Tests</h2>
            <div className="flex-1 h-[px] bg-gray-100"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {filteredTests.map((test) => (
              <Link
                key={test.id}
                href={`/test/${test.id}`}
                className="group flex flex-col bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm active:scale-[0.96] transition-all duration-200"
              >
                {/* 썸네일 이미지 영역 */}
                <div className="aspect-square w-full overflow-hidden bg-gray-50 relative">
                  <img 
                    src={test.thumbnail_url} 
                    alt={test.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* 참여자 수 뱃지 (Social Proof) */}
                  <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">
                    <span className="text-[9px] text-white font-bold">
                      👤 {(test.views + 1250).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* 텍스트 영역 */}
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-[14px] font-extrabold text-gray-800 leading-tight line-clamp-2 mb-2">
                    {test.title}
                  </span>
                  <div className="mt-auto">
                    <span className="text-[9px] text-pink-400 font-black uppercase tracking-tighter">
                      Empezar →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredTests.length === 0 && (
            <div className="text-center py-20 text-gray-400 font-bold">
              No se encontraron resultados.
            </div>
          )}
        </div>

        {/* 하단 홍보 & 푸터 (기존 동일) */}
        <footer className="w-full text-center mt-20 space-y-4">
          <div className="flex justify-center gap-6 text-[10px] text-gray-400 font-bold">
            <a href="/about">About</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
          <p className="text-[8px] text-gray-300 font-bold tracking-[0.4em]">© 2026 SIMRI LAB</p>
        </footer>
      </div>
    </main>
  );
}