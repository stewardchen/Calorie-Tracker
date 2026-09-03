import React, { useState, useEffect } from 'react';
import { DiscussionEmbed } from 'disqus-react';

interface ArticleItem {
  id: string;
  title: string;
  url: string;
  category: string;
  description: string;
}

const ARTICLES: ArticleItem[] = [
  {
    id: 'nutriai-precision-hub',
    title: 'NutriAI 智能熱量與精準營養討論區 (Precision Nutrition Hub)',
    url: typeof window !== 'undefined' ? window.location.href : 'https://nutriai-lab.vercel.app/discussion',
    category: '綜合討論',
    description: '分享每日熱量赤字心得、微量營養素配比與個人化代謝校準策略。',
  },
  {
    id: 'nutriai-refeed-protocol',
    title: '48小時高碳再補給協議 (48h Caloric Re-feed Protocol)',
    url: typeof window !== 'undefined' ? `${window.location.origin}/#refeed` : 'https://nutriai-lab.vercel.app/#refeed',
    category: '進階策略',
    description: '打破長期赤字代謝適應，透過平滑熱量波形保護瘦體重與甲狀腺機能。',
  },
  {
    id: 'nutriai-smart-dining',
    title: '外食點餐與餐廳熱量空間智慧 (Smart Dining & Cartography)',
    url: typeof window !== 'undefined' ? `${window.location.origin}/#dining` : 'https://nutriai-lab.vercel.app/#dining',
    category: '外食指南',
    description: '如何在各類餐廳精準客製化點餐、菜單光譜辨識與熱量容錯規劃。',
  },
];

interface DiscussionForumProps {
  currentArticle?: {
    id: string;
    title: string;
    url: string;
  };
}

export const DiscussionForum: React.FC<DiscussionForumProps> = ({ currentArticle }) => {
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem>(() => {
    if (currentArticle) {
      return {
        id: currentArticle.id,
        title: currentArticle.title,
        url: currentArticle.url,
        category: '當前討論',
        description: '當前頁面主題討論。',
      };
    }
    return ARTICLES[0];
  });

  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const articleConfig = {
    url: selectedArticle.url || currentUrl || 'https://nutriai-lab.vercel.app',
    identifier: selectedArticle.id,
    title: selectedArticle.title,
    language: 'zh_TW', // Traditional Chinese (Taiwan) as specified
  };

  return (
    <div id="disqus-discussion-container" className="space-y-8 animate-fadeIn">
      {/* Editorial Header */}
      <div className="border-b-2 border-[#1a1a1a] pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-[1px] bg-[#ff3d00]"></span>
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-black text-[#ff3d00]">
              Disqus Community Integration // 社群即時討論
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-tight text-[#1a1a1a]">
            社群 <span className="italic font-light text-[#ff3d00]">Discussion</span> 論壇
          </h1>
        </div>

        {/* Status Capsule */}
        <div className="flex items-center gap-3 border-2 border-[#1a1a1a] bg-[#f5f2eb] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff3d00] animate-pulse"></span>
            <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-[#1a1a1a]">
              Disqus: nutriai-lab (zh_TW)
            </span>
          </div>
        </div>
      </div>

      {/* Topic Switcher Bar */}
      <div className="border-2 border-[#1a1a1a] bg-[#f5f2eb] p-4 shadow-[3px_3px_0px_#1a1a1a]">
        <div className="font-sans text-[9px] uppercase tracking-widest text-[#1a1a1a]/60 font-bold mb-3">
          選擇討論主題 // Select Topic Thread
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {ARTICLES.map((art) => {
            const isSelected = selectedArticle.id === art.id;
            return (
              <button
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className={`p-3 text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-2 border-[#1a1a1a] bg-[#1a1a1a] text-white shadow-[2px_2px_0px_#ff3d00]'
                    : 'border-[#1a1a1a] bg-white text-[#1a1a1a] hover:bg-[#fdfcf8]'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span
                    className={`font-sans text-[8px] uppercase tracking-widest font-black px-1.5 py-0.5 border ${
                      isSelected
                        ? 'border-white/30 text-white bg-white/10'
                        : 'border-[#1a1a1a]/20 text-[#ff3d00] bg-[#ff3d00]/10'
                    }`}
                  >
                    {art.category}
                  </span>
                  <span className="font-mono text-[9px] opacity-60">ID: {art.id.slice(0, 10)}</span>
                </div>
                <div className="font-serif font-bold text-xs truncate">{art.title}</div>
                <div
                  className={`font-serif text-[11px] line-clamp-2 mt-1 ${
                    isSelected ? 'text-white/70' : 'text-[#1a1a1a]/60'
                  }`}
                >
                  {art.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Discussion Embedded Container */}
      <div className="border-2 border-[#1a1a1a] bg-white p-6 sm:p-8 md:p-10 shadow-[4px_4px_0px_#1a1a1a] min-h-[420px]">
        {/* Topic Header inside box */}
        <div className="border-b border-[#1a1a1a]/20 pb-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="font-sans text-[9px] uppercase tracking-widest text-[#ff3d00] font-black">
                Active Thread // 目前主題
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] mt-1">
                {selectedArticle.title}
              </h2>
            </div>
            <div className="text-right">
              <span className="font-mono text-[10px] text-[#1a1a1a]/50 block">
                Shortname: nutriai-lab
              </span>
              <span className="font-mono text-[10px] text-[#1a1a1a]/50 block">
                Lang: zh_TW
              </span>
            </div>
          </div>
          <p className="font-serif italic text-xs text-[#1a1a1a]/70 mt-2">
            {selectedArticle.description}
          </p>
        </div>

        {/* Disqus Embed Component */}
        <div className="disqus-embed-wrapper relative">
          <DiscussionEmbed
            shortname="nutriai-lab"
            config={articleConfig}
          />
        </div>
      </div>

      {/* Helper Note for Disqus Configuration */}
      <div className="border border-[#1a1a1a]/20 bg-[#f5f2eb] p-4 text-xs font-serif text-[#1a1a1a]/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <span className="font-sans text-[9px] uppercase tracking-widest font-black text-[#1a1a1a] block mb-1">
            ℹ️ Disqus Integration Parameters
          </span>
          <span>
            已配置 shortname <code className="bg-white px-1.5 py-0.5 border border-[#1a1a1a]/30 font-mono text-[10px]">nutriai-lab</code>，語言模式 <code className="bg-white px-1.5 py-0.5 border border-[#1a1a1a]/30 font-mono text-[10px]">zh_TW</code>。留言板將自動綁定並同步討論串。
          </span>
        </div>
        <a
          href="https://disqus.com/admin"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 border border-[#1a1a1a] bg-white px-3 py-1.5 font-sans text-[9px] uppercase font-bold tracking-widest hover:bg-[#1a1a1a] hover:text-white transition-colors"
        >
          Disqus Admin
        </a>
      </div>
    </div>
  );
};
