
"use client";

import React, { useState, useEffect } from 'react';
import { OnboardingFlow } from "@/components/Onboarding/OnboardingFlow";
import { Sidebar } from "@/components/Dashboard/Sidebar";
import { Header } from "@/components/Dashboard/Header";
import { ToolboxGrid } from "@/components/Dashboard/Toolbox";
import { ChatInterface } from "@/components/Dashboard/ChatInterface";
import { YoutubePremium } from "@/components/Dashboard/YoutubePremium";
import { DevInfo } from "@/components/Dashboard/DevInfo";
import { HelpCenter } from "@/components/Dashboard/HelpCenter";
import { Settings } from "@/components/Dashboard/Settings";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useAppStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, Rocket, Zap, Star, LayoutGrid, 
  Bot, Youtube, ShieldCheck, Download, 
  Settings as SettingsIcon, User, Info, MessageSquareCode, Trash2, FileText, Heart
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

type ViewState = 'dashboard' | 'ai-assistant' | 'toolbox' | 'youtube-premium' | 'dev-info' | 'help-center' | 'settings' | 'workspace' | 'downloads' | 'favorites';

export default function Home() {
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const [activeView, setActiveView] = useState<ViewState>('dashboard');
  const store = useAppStore();

  useEffect(() => {
    const complete = store.get('onboarding_complete');
    setIsOnboarded(!!complete);
  }, []);

  if (isOnboarded === null) return null;

  if (!isOnboarded) {
    return (
      <>
        <OnboardingFlow onComplete={() => setIsOnboarded(true)} />
        <LanguageSwitcher />
      </>
    );
  }

  const isImmersiveView = activeView !== 'dashboard' && activeView !== 'workspace' && activeView !== 'downloads' && activeView !== 'favorites';

  const handleDeleteFile = (id: string) => {
    const ws = store.getWorkspace();
    const updated = ws.filter(f => f.id !== id);
    store.set('workspace', updated);
    toast({ title: "طھظ… ط§ظ„ط­ط°ظپ", description: "طھظ…طھ ط¥ط²ط§ظ„ط© ط§ظ„ظ…ظ„ظپ ظ…ظ† ظ…ط³ط§ط­ط© ط§ظ„ط¹ظ…ظ„ ط§ظ„ظ…ط­ظ„ظٹط©." });
    // Force refresh
    setActiveView(activeView);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'ai-assistant':
        return <div className="view-transition h-screen w-full fixed inset-0 z-[60] bg-[#020408]"><ChatInterface onBack={() => setActiveView('dashboard')} /></div>;
      case 'toolbox':
        return <div className="view-transition h-screen w-full fixed inset-0 z-[60] bg-[#020408]"><ToolboxGrid onBack={() => setActiveView('dashboard')} /></div>;
      case 'youtube-premium':
        return <div className="view-transition h-screen w-full fixed inset-0 z-[60] bg-[#020408]"><YoutubePremium onBack={() => setActiveView('dashboard')} /></div>;
      case 'dev-info':
        return <div className="view-transition h-screen w-full fixed inset-0 z-[60] bg-[#020408]"><DevInfo onBack={() => setActiveView('dashboard')} /></div>;
      case 'help-center':
        return <div className="view-transition h-screen w-full fixed inset-0 z-[60] bg-[#020408]"><HelpCenter onBack={() => setActiveView('dashboard')} /></div>;
      case 'settings':
        return <div className="view-transition h-screen w-full fixed inset-0 z-[60] bg-[#020408]"><Settings onBack={() => setActiveView('dashboard')} /></div>;
      case 'workspace':
      case 'downloads':
      case 'favorites':
        const files = store.getWorkspace();
        const title = activeView === 'workspace' ? 'ظ…ط³ط§ط­ط© ط§ظ„ط¹ظ…ظ„ (Local Hub)' : activeView === 'downloads' ? 'ط§ظ„طھط­ظ…ظٹظ„ط§طھ ط§ظ„ط°ظ‡ط¨ظٹط©' : 'ط§ظ„ظ…ظپط¶ظ„ط§طھ ط§ظ„ظ…ط­ظپظˆط¸ط©';
        return (
          <div className="space-y-8 md:space-y-12 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-8 gap-4 text-right">
                <div className="space-y-1">
                  <h2 className="text-2xl md:text-5xl font-black font-headline text-white">{title}</h2>
                  <p className="text-muted-foreground text-xs md:text-sm">ط¥ط¯ط§ط±ط© ط§ظ„ظ…ط­طھظˆظ‰ ط§ظ„ظ…ظƒطھط´ظپ ظˆط§ظ„ظ…ط¹ط§ظ„ط¬ ط¯ط§ط®ظ„ ط¨ظٹط¦ط© LWESMO</p>
                </div>
                <Button variant="outline" onClick={() => setActiveView('dashboard')} className="rounded-xl border-white/10 text-white font-bold">ط§ظ„ط¹ظˆط¯ط© ظ„ظ„ط±ط¦ظٹط³ظٹط©</Button>
            </div>
            
            {files.length === 0 ? (
                <div className="h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[3rem] opacity-30 text-white">
                    {activeView === 'favorites' ? <Heart size={64} className="mb-4" /> : <FileText size={64} className="mb-4" />}
                    <p className="text-xl font-bold">ظ„ط§ طھظˆط¬ط¯ ط¨ظٹط§ظ†ط§طھ ظ…ط³ط¬ظ„ط© ظ‡ظ†ط§ ط­ط§ظ„ظٹط§ظ‹</p>
                    <p className="text-sm mt-2">ط§ط¨ط¯ط£ ط¨ط§ط³طھط®ط¯ط§ظ… ط§ظ„ط£ط¯ظˆط§طھ ظ„ظ…ظ„ط، ظ‡ط°ط§ ط§ظ„ظ‚ط³ظ…</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {files.map(file => (
                        <Card key={file.id} className="bg-white/5 border-white/10 p-6 md:p-8 rounded-[2.5rem] flex flex-col justify-between group hover:bg-white/10 transition-all border-none glass shadow-2xl">
                            <div className="flex justify-between items-start mb-6">
                              <div className="p-4 bg-primary/20 rounded-2xl text-primary">
                                <Download size={24} />
                              </div>
                              <Button variant="ghost" size="icon" className="text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-xl" onClick={() => handleDeleteFile(file.id)}>
                                <Trash2 size={18} />
                              </Button>
                            </div>
                            <div className="space-y-1 text-right">
                                <h4 className="text-lg font-black text-white truncate">{file.name}</h4>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{file.type} â€¢ {file.size}</p>
                                <p className="text-[9px] text-muted-foreground/60">{file.date}</p>
                            </div>
                            <Button className="mt-6 w-full rounded-xl bg-white/5 border border-white/10 hover:bg-primary text-white font-bold" onClick={() => toast({ title: "طھطµط¯ظٹط± ط§ظ„ظ…ظ„ظپ", description: "ط¬ط§ط±ظٹ ظ†ظ‚ظ„ ط§ظ„ظ…ظ„ظپ ظ„ظ…ط¬ظ„ط¯ ط§ظ„طھظ†ط²ظٹظ„ط§طھ ط§ظ„ط¹ط§ظ…..." })}>
                                ظپطھط­ ظپظٹ ظ…ط¯ظٹط± ط§ظ„ظ…ظ„ظپط§طھ
                            </Button>
                        </Card>
                    ))}
                </div>
            )}
          </div>
        );
      default:
        return (
          <div className="space-y-12 md:space-y-24 pb-20 view-transition max-w-screen-2xl mx-auto px-4 md:px-0">
            {/* Ultra Hero Section */}
            <section className="relative pt-12 md:pt-20">
              <div className="absolute -inset-40 bg-gradient-to-r from-primary/30 via-blue-500/10 to-secondary/20 blur-[180px] rounded-full opacity-60" />
              <div className="relative space-y-8 md:space-y-12 text-right">
                <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-3 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-secondary mb-4 animate-float shadow-2xl backdrop-blur-2xl">
                  <Star size={16} className="fill-secondary" />
                  NEURAL CAT v2.1 GOLD EDITION
                </div>
                
                <div className="space-y-6">
                  <h1 className="text-5xl sm:text-7xl md:text-[8.5rem] font-black font-headline tracking-tighter leading-[0.85] text-white">
                    ط§ظ„ظ…ط±ظƒط² <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary animate-pulse">
                      ط§ظ„ط¹طµط¨ظٹ ط§ظ„ط°ظ‡ط¨ظٹ
                    </span>
                  </h1>
                </div>

                <p className="max-w-4xl text-muted-foreground text-lg md:text-3xl font-medium leading-relaxed opacity-80 mr-0">
                  ط¨ظٹط¦ط© ط¹ظ…ظ„ ط§ط³طھط«ظ†ط§ط¦ظٹط© طھط¯ظ…ط¬ ظ‚ظˆط© ظ…ط¹ط§ظ„ط¬ط© ط§ظ„ظپظٹط¯ظٹظˆطŒ ط¥ط¯ط§ط±ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ظ…ط´ظپط±ط©طŒ ظˆط§ظ„ط°ظƒط§ط، ط§ظ„ط§طµط·ظ†ط§ط¹ظٹ ط§ظ„طھظˆظ„ظٹط¯ظٹ ظپظٹ ظ…ظ†طµط© ظˆط§ط­ط¯ط© طھط¹ظ…ظ„ ط¨ط®طµظˆطµظٹط© طھط§ظ…ط© ط¹ظ„ظ‰ ط¹طھط§ط¯ ط¬ظ‡ط§ط²ظƒ.
                </p>

                <div className="flex flex-wrap gap-6 md:gap-10 pt-10 justify-start">
                  <Button 
                    className="h-18 md:h-28 px-12 md:px-20 rounded-2xl md:rounded-[3rem] font-black text-xl md:text-3xl bg-primary hover:bg-primary/80 glow-primary transition-all hover:scale-105 group text-white shadow-[0_20px_50px_rgba(59,130,246,0.3)]" 
                    onClick={() => setActiveView('toolbox')}
                  >
                     <LayoutGrid className="mr-4 group-hover:rotate-90 transition-transform w-8 h-8 md:w-10 md:h-10" />
                     ط§ط³طھظƒط´ط§ظپ ط§ظ„ط£ط¯ظˆط§طھ
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-18 md:h-28 px-12 md:px-20 rounded-2xl md:rounded-[3rem] font-black text-xl md:text-3xl border-white/10 hover:bg-white/5 backdrop-blur-3xl transition-all group text-white border-2" 
                    onClick={() => setActiveView('ai-assistant')}
                  >
                     <Sparkles className="mr-4 text-secondary group-hover:animate-pulse w-8 h-8 md:w-10 md:h-10" />
                     ط§ظ„ظ…ط³ط§ط¹ط¯ ط§ظ„ط¹طµط¨ظٹ
                  </Button>
                </div>
              </div>
            </section>

            {/* Premium Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              <Card 
                className="bg-card/40 border-white/5 p-10 md:p-14 rounded-[3rem] md:rounded-[5rem] hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden glass shadow-2xl border-none" 
                onClick={() => setActiveView('toolbox')}
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-[100px] rounded-full" />
                <div className="flex justify-between items-start mb-12">
                  <div className="p-6 bg-primary/20 rounded-3xl text-primary group-hover:scale-110 transition-transform shadow-[0_15px_30px_rgba(59,130,246,0.2)]">
                    <Rocket size={40} />
                  </div>
                  <Zap className="text-secondary animate-pulse" size={28} />
                </div>
                <h3 className="text-3xl md:text-5xl font-black mb-6 text-right text-white font-headline tracking-tighter">ظ…ط±ظƒط² ط§ظ„ط¥ظ†طھط§ط¬ظٹط©</h3>
                <p className="text-muted-foreground text-base md:text-xl font-medium leading-relaxed text-right opacity-70">ط±ظ†ط¯ط± ظپظٹط¯ظٹظˆ ظپظˆط±ظٹطŒ ظ…ط¹ط§ظ„ط¬ط© ظ…ظ„ظپط§طھ ط¶ط®ظ…ط©طŒ ظˆط£ظ†ط¸ظ…ط© طھط´ظپظٹط± AES-256 ظ…طھظƒط§ظ…ظ„ط© طھط¹ظ…ظ„ ط¨ط¹طھط§ط¯ ط¬ظ‡ط§ط²ظƒ.</p>
              </Card>

              <Card 
                className="bg-card/40 border-white/5 p-10 md:p-14 rounded-[3rem] md:rounded-[5rem] hover:border-secondary/50 transition-all cursor-pointer group relative overflow-hidden glass shadow-2xl border-none" 
                onClick={() => setActiveView('ai-assistant')}
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/10 blur-[100px] rounded-full" />
                <div className="flex justify-between items-start mb-12">
                  <div className="p-6 bg-secondary/20 rounded-3xl text-secondary group-hover:scale-110 transition-transform shadow-[0_15px_30px_rgba(234,179,8,0.2)]">
                    <Bot size={40} />
                  </div>
                  <Sparkles className="text-primary animate-pulse" size={28} />
                </div>
                <h3 className="text-3xl md:text-5xl font-black mb-6 text-right text-white font-headline tracking-tighter">ط§ظ„ظ…ط­ط±ظƒ ط§ظ„ط¹طµط¨ظٹ</h3>
                <p className="text-muted-foreground text-base md:text-xl font-medium leading-relaxed text-right opacity-70">طھط­ط§ظˆط± ظ…ط¹ ط°ظƒط§ط، LWESMOطŒ ظ„ط®طµ ط§ظ„ظ…ط³طھظ†ط¯ط§طھطŒ ظˆظˆظ„ط¯ ظ†طµظˆطµط§ظ‹ ط¥ط¨ط¯ط§ط¹ظٹط© ظ…ط±طھط¨ط·ط© ط¨ط¨ظˆطھ طھظ„ط¬ط±ط§ظ… ط§ظ„ط®ط§طµ ط¨ظƒ.</p>
              </Card>

              <Card 
                className="bg-card/40 border-white/5 p-10 md:p-14 rounded-[3rem] md:rounded-[5rem] hover:border-red-500/50 transition-all cursor-pointer group relative overflow-hidden glass shadow-2xl border-none" 
                onClick={() => setActiveView('youtube-premium')}
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/10 blur-[100px] rounded-full" />
                <div className="flex justify-between items-start mb-12">
                  <div className="p-6 bg-red-500/20 rounded-3xl text-red-500 group-hover:scale-110 transition-transform shadow-[0_15px_30px_rgba(239,68,68,0.2)]">
                    <Youtube size={40} />
                  </div>
                  <Badge className="bg-red-600 font-black px-6 py-2 text-[10px] border-none text-white shadow-xl">PREMIUM GOLD</Badge>
                </div>
                <h3 className="text-3xl md:text-5xl font-black mb-6 text-right text-white font-headline tracking-tighter">LWESMO Tube</h3>
                <p className="text-muted-foreground text-base md:text-xl font-medium leading-relaxed text-right opacity-70">ظ…ط´ط§ظ‡ط¯ط© ط¨ظ„ط§ ط¥ط¹ظ„ط§ظ†ط§طھطŒ طھط´ط؛ظٹظ„ ظپظٹ ط§ظ„ط®ظ„ظپظٹط©طŒ ظˆطھظ†ط²ظٹظ„ ظ…ط¨ط§ط´ط± ظ„ظ„ظˆط³ط§ط¦ط· ط¨ط¬ظˆط¯ط© ظپط§ط¦ظ‚ط© ط¹ط¨ط± Invidious API.</p>
              </Card>
            </div>

            {/* Footer Trust Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-16 border-t border-white/5 opacity-60">
               <div className="flex items-center gap-6">
                  <ShieldCheck size={32} className="text-green-500" />
                  <span className="text-[10px] md:text-sm font-black uppercase tracking-[0.5em] text-white">طھط´ظپظٹط± AES-256 ظ…ط­ظ„ظٹ ط¨ط§ظ„ظƒط§ظ…ظ„</span>
               </div>
               <div className="flex items-center gap-8">
                  <Button variant="ghost" className="text-[10px] md:text-sm font-black text-white hover:text-primary" onClick={() => setActiveView('dev-info')}>
                     <User size={18} className="ml-3" />
                     ط§ظ„ظ…ط·ظˆط±: ط¬ظ…ط§ظ„ ظ…ظ„ظˆظƒظٹ
                  </Button>
                  <Button variant="ghost" className="text-[10px] md:text-sm font-black text-white hover:text-primary" onClick={() => setActiveView('help-center')}>
                     <Info size={18} className="ml-3" />
                     ط³ظٹط§ط³ط© ط§ظ„ط®طµظˆطµظٹط© ظˆط§ظ„ط¯ط¹ظ…
                  </Button>
               </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#020408] overflow-hidden text-foreground selection:bg-primary/40 font-body" dir="rtl">
      {!isImmersiveView && (
        <Sidebar onNavigate={(view) => setActiveView(view as ViewState)} currentView={activeView} />
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none" />
        
        {!isImmersiveView && <Header onNavigate={(view) => setActiveView(view as ViewState)} />}
        
        <main className={`flex-1 overflow-y-auto custom-scrollbar relative ${isImmersiveView ? 'p-0' : 'p-4 sm:p-10 md:p-16'}`}>
          {renderContent()}
        </main>
      </div>

      <LanguageSwitcher />
    </div>
  );
                              }
