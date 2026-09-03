import React, { useEffect, useState } from 'react';

export const TalkToUs: React.FC = () => {
  const [canonicalUrl, setCanonicalUrl] = useState('');

  const PAGE_IDENTIFIER = 'nutriai-talk-to-us';

  useEffect(() => {
    // Determine the fixed canonical URL for the Talk to Us view
    const origin = typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://nutriai-lab.disqus.com';
    const pageUrl = `${origin}/#talk`;
    setCanonicalUrl(pageUrl);

    // Disqus Universal Code SPA Configuration & Reload Handler
    if (typeof window !== 'undefined') {
      const win = window as any;

      if (win.DISQUS) {
        // When switching back to this tab in SPA, reload thread with real fixed config
        win.DISQUS.reset({
          reload: true,
          config: function (this: any) {
            this.page.url = pageUrl;
            this.page.identifier = PAGE_IDENTIFIER;
            this.page.title = 'Talk to Us // NutriAI Precision Community & Feedback';
          },
        });
      } else {
        // First load initialization
        win.disqus_config = function (this: any) {
          this.page.url = pageUrl;
          this.page.identifier = PAGE_IDENTIFIER;
          this.page.title = 'Talk to Us // NutriAI Precision Community & Feedback';
        };

        // Inject Disqus embed script if not already in document
        if (!document.getElementById('dsq-embed-scr')) {
          const d = document;
          const s = d.createElement('script');
          s.id = 'dsq-embed-scr';
          s.src = 'https://nutriai-lab.disqus.com/embed.js';
          s.setAttribute('data-timestamp', String(+new Date()));
          (d.head || d.body).appendChild(s);
        }
      }
    }
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Editorial Header */}
      <div className="border-b-2 border-[#1a1a1a] pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-[1px] bg-[#ff3d00]"></span>
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-black text-[#ff3d00]">
              Universal Discussion & Feedback Channel
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-tight text-[#1a1a1a]">
            Talk to <span className="italic font-light text-[#ff3d00]">Us</span>
          </h1>
        </div>

        {/* Live Channel Status Badge */}
        <div className="flex items-center gap-3 border-2 border-[#1a1a1a] bg-[#f5f2eb] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff3d00] animate-pulse"></span>
            <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-[#1a1a1a]">
              Disqus Embed: nutriai-lab
            </span>
          </div>
        </div>
      </div>

      {/* Overview & Protocol Context */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border-2 border-[#1a1a1a] bg-[#f5f2eb] p-5 shadow-[3px_3px_0px_#1a1a1a]">
          <div className="font-sans text-[9px] uppercase tracking-widest text-[#1a1a1a]/60 font-bold mb-1">
            01 // Feature Inquiries
          </div>
          <p className="font-serif text-xs text-[#1a1a1a]/80 leading-relaxed">
            Suggest new restaurant integrations, macro tracking algorithms, or optical spectrometry enhancements.
          </p>
        </div>

        <div className="border-2 border-[#1a1a1a] bg-[#f5f2eb] p-5 shadow-[3px_3px_0px_#1a1a1a]">
          <div className="font-sans text-[9px] uppercase tracking-widest text-[#1a1a1a]/60 font-bold mb-1">
            02 // Metabolic Calibration
          </div>
          <p className="font-serif text-xs text-[#1a1a1a]/80 leading-relaxed">
            Discuss Mifflin-St Jeor formulas, 48h re-feed smoothing observations, and individual variance baselines.
          </p>
        </div>

        <div className="border-2 border-[#1a1a1a] bg-white p-5 shadow-[3px_3px_0px_#ff3d00] border-2">
          <div className="font-sans text-[9px] uppercase tracking-widest text-[#ff3d00] font-black mb-1">
            03 // Configuration Verified
          </div>
          <div className="font-mono text-[11px] text-[#1a1a1a] truncate">
            ID: <span className="font-bold">{PAGE_IDENTIFIER}</span>
          </div>
          <div className="font-mono text-[10px] text-[#1a1a1a]/60 truncate mt-0.5">
            URL: {canonicalUrl || 'Initializing...'}
          </div>
        </div>
      </div>

      {/* Disqus Embed Container Card */}
      <div className="border-2 border-[#1a1a1a] bg-white p-6 sm:p-8 md:p-10 shadow-[4px_4px_0px_#1a1a1a]">
        <div className="border-b border-[#1a1a1a]/20 pb-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <span className="font-sans text-[9px] uppercase tracking-widest text-[#ff3d00] font-black">
              Community Thread
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#1a1a1a] mt-0.5">
              NutriAI Lab Discussions
            </h2>
          </div>
          <div className="font-mono text-[10px] text-[#1a1a1a]/50">
            Powered by Disqus Universal Code
          </div>
        </div>

        {/* The Disqus Thread Target Div */}
        <div id="disqus_thread" className="min-h-[300px]" />

        {/* Noscript fallback */}
        <noscript>
          Please enable JavaScript to view the{' '}
          <a href="https://disqus.com/?ref_noscript" className="text-[#ff3d00] underline font-serif">
            comments powered by Disqus.
          </a>
        </noscript>
      </div>
    </div>
  );
};
