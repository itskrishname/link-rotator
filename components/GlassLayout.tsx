import React from 'react';
import { Zap } from 'lucide-react';

export default function GlassLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden font-mono">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
        <div className="bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1 mb-6 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
          <span className="text-green-400 text-[10px] font-bold tracking-widest uppercase">Bot Is Online</span>
        </div>

        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />
          <Zap className="w-16 h-16 text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-6 tracking-tight">
          Sᴇᴄʀᴇᴄᴛ 𝐁ᴏᴛ 𝐔ᴘᴅᴀᴛᴇs
        </h1>

        <div className="w-full text-white/70 mb-8">
          {children}
        </div>

        <div className="mt-auto pt-6 border-t border-white/5 w-full">
          <p className="text-xs text-muted-foreground text-white/30">
            Created by 𝚂𝚑𝚛𝚎𝚎 ꪎ 𝙺ʀɪ𝚜ʜɴᴀ ჯ ↝
          </p>
        </div>
      </div>
    </div>
  );
}
