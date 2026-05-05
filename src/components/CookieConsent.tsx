"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent) {
      setPreferences(JSON.parse(consent));
    } else {
      setShowBanner(true);
    }

    // Listen for open events from the footer
    const handleOpenSettings = () => setShowSettings(true);
    window.addEventListener("openCookieSettings", handleOpenSettings);
    return () => window.removeEventListener("openCookieSettings", handleOpenSettings);
  }, []);

  const saveConsent = (prefs: typeof preferences) => {
    localStorage.setItem("cookieConsent", JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  };

  const saveSettings = () => {
    saveConsent(preferences);
  };

  if (!showBanner && !showSettings) return null;

  return (
    <>
      {showBanner && !showSettings && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 pb-20 md:pb-6 pointer-events-none">
          <div className="max-w-4xl mx-auto bg-zinc-950 text-white p-6 md:p-8 rounded-2xl shadow-2xl pointer-events-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-black uppercase tracking-tighter mb-2">Používame Cookies</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Tento web používa súbory cookies pre zabezpečenie základných funkcií webu a pre analýzu návštevnosti. 
                Svoj súhlas môžete kedykoľvek zmeniť.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button 
                onClick={() => setShowSettings(true)}
                className="px-6 py-3 text-xs font-bold uppercase tracking-widest bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors whitespace-nowrap"
              >
                Nastavenia
              </button>
              <button 
                onClick={acceptAll}
                className="px-6 py-3 text-xs font-bold uppercase tracking-widest bg-primary text-zinc-950 hover:bg-white rounded-xl transition-colors whitespace-nowrap"
              >
                Prijať všetky
              </button>
            </div>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
          <div className="bg-white text-zinc-950 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-8">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Nastavenia Cookies</h3>
              <p className="text-zinc-600 text-sm mb-8">Vyberte si, ktoré súbory cookies chcete povoliť.</p>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-widest">Nevyhnutné</h4>
                    <p className="text-xs text-zinc-500 mt-1">Zabezpečujú základné fungovanie webu.</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 rounded-full bg-primary opacity-50 cursor-not-allowed">
                    <span className="absolute left-[26px] top-1 w-4 h-4 rounded-full bg-white transition-all"></span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-widest">Analytické</h4>
                    <p className="text-xs text-zinc-500 mt-1">Pomáhajú nám analyzovať návštevnosť.</p>
                  </div>
                  <button 
                    onClick={() => setPreferences(prev => ({...prev, analytics: !prev.analytics}))}
                    className={`relative inline-block w-12 h-6 rounded-full transition-colors ${preferences.analytics ? 'bg-primary' : 'bg-zinc-200'}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${preferences.analytics ? 'left-[26px]' : 'left-[2px]'}`}></span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-widest">Marketingové</h4>
                    <p className="text-xs text-zinc-500 mt-1">Slúžia na zobrazenie relevantnej reklamy.</p>
                  </div>
                  <button 
                    onClick={() => setPreferences(prev => ({...prev, marketing: !prev.marketing}))}
                    className={`relative inline-block w-12 h-6 rounded-full transition-colors ${preferences.marketing ? 'bg-primary' : 'bg-zinc-200'}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${preferences.marketing ? 'left-[26px]' : 'left-[2px]'}`}></span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-zinc-50 p-6 flex justify-end gap-3 border-t border-zinc-100">
              <button 
                onClick={acceptAll}
                className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-zinc-600 hover:text-zinc-950 transition-colors"
              >
                Prijať všetky
              </button>
              <button 
                onClick={saveSettings}
                className="px-6 py-3 text-xs font-bold uppercase tracking-widest bg-zinc-950 text-white hover:bg-primary hover:text-zinc-950 rounded-xl transition-all shadow-sm"
              >
                Uložiť výber
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
