"use client";

import { useState, useEffect } from 'react';
import { Trophy, Store, Mail, MessageSquareDashed, Sun, Moon, ShoppingBag, X, Menu, LogIn, User } from 'lucide-react';

export default function Beranda() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [topUsers, setTopUsers] = useState([]);
  const [userData, setUserData] = useState(null);

  // FETCH DATA LEADERBOARD ASLI
useEffect(() => {
    let isMounted = true;
    async function fetchLeaderboard() {
      try {
        const res = await fetch('/api/leaderboard');
        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        if (isMounted && !data.error) {
          setTopUsers(data);
        }
      } catch (err) {
        console.error("Gagal load leaderboard:", err);
      }
    }
    fetchLeaderboard();
    return () => { isMounted = false };
  }, []); 

  const handleLogin = () => {
    setUserData({ id: 7846387511, name: 'Audrey Irene', koin: 195997250 });
    setIsMenuOpen(false);
  };

  const nmItems = [
    { name: '3x Pin Gratis', normal: 9000, disc: 4500, label: '50%' },
    { name: 'Tanpa Jeda', normal: 5000, disc: 2000, label: '60%' },
    { name: 'Title Menfess', normal: 6000, disc: 3000, label: '50%' },
  ];

  const theme = {
    bg: isDark ? "bg-[#14050c]" : "bg-[#fdf2f8]",
    card: isDark ? "bg-[#250d18]" : "bg-white",
    textMain: isDark ? "text-pink-100" : "text-pink-950",
    textSub: isDark ? "text-pink-400" : "text-pink-600",
    border: isDark ? "border-pink-900/50" : "border-pink-200",
    inputBg: isDark ? "bg-[#14050c]" : "bg-pink-50",
  };

  return (
    <main className={`min-h-screen ${theme.bg} ${theme.textMain} transition-colors duration-500 overflow-x-hidden pb-20`}>
      
      {/* FLOATING MENU */}
      <button onClick={() => setIsMenuOpen(true)} className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all">
        <Menu size={28} />
      </button>

      {/* POP-UP MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`${theme.card} border ${theme.border} w-full max-w-sm rounded-[2.5rem] p-8 relative shadow-2xl`}>
            <button onClick={() => setIsMenuOpen(false)} className={`absolute top-6 right-6 ${theme.textSub}`}><X size={28} /></button>
            <div className="flex items-center gap-2 text-pink-500 font-black text-xl mb-6"><MessageSquareDashed /> 48MESSAGE</div>

            {userData ? (
              <div className="bg-pink-500/10 p-4 rounded-2xl mb-6 flex items-center gap-4 border border-pink-500/20">
                <div className="bg-pink-500 p-2 rounded-full text-white"><User size={20}/></div>
                <div><p className="text-sm font-black">{userData.name}</p><p className="text-xs text-pink-500 font-bold">{userData.koin.toLocaleString()} Koin</p></div>
              </div>
            ) : (
              <button onClick={handleLogin} className="w-full bg-blue-500 text-white font-black p-4 rounded-2xl mb-6 flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-md"><LogIn size={20} /> Login with Telegram</button>
            )}

            <div className="flex flex-col gap-2 font-bold text-lg mb-6">
              <span className="text-pink-500 bg-pink-500/10 p-4 rounded-2xl cursor-pointer">Beranda</span>
              <span className={`${theme.textSub} p-4 hover:bg-pink-500/5 rounded-2xl transition cursor-pointer`}>Pasar Malam</span>
            </div>

            <button onClick={() => setIsDark(!isDark)} className={`w-full p-4 rounded-2xl ${isDark ? 'bg-pink-900/50 text-yellow-400' : 'bg-pink-100 text-pink-600'} flex gap-3 items-center justify-center font-bold`}>
              {isDark ? <Moon size={20} /> : <Sun size={20} />} Mode {isDark ? 'Malam' : 'Siang'}
            </button>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-12 flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 z-0">
          <img src="https://i.ibb.co/Cs6qwDc6/Purple-Blue-Yellow-Comic-Cartoon-Illustration-Opening-Soon-Banner-1.png" className={`w-full h-full object-cover ${isDark ? 'opacity-10 grayscale' : 'opacity-20'}`} />
          <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#14050c]' : 'from-[#fdf2f8]'} via-transparent`}></div>
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className={`inline-block mb-4 px-4 py-1.5 rounded-full text-[10px] font-bold border ${theme.border} ${isDark ? 'bg-pink-900/20' : 'bg-pink-100'} text-pink-500 uppercase tracking-widest`}>Bot JKT48 @ofc48message</div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight italic">48MESSAGE</h1>
          <p className={`${theme.textSub} font-semibold text-sm md:text-lg mb-8 opacity-80 leading-relaxed`}>Ruang anonim para penggemar. Kirim menfess, pantau peringkat, dan belanja item eksklusif!</p>
        </div>
      </section>

      {/* CONTENT GRID */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-20">
        
        {/* LEADERBOARD */}
        <div className={`${theme.card} border ${theme.border} rounded-[2.5rem] p-8 shadow-xl flex flex-col min-h-[500px]`}>
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-yellow-400/20 p-3 rounded-2xl text-yellow-600"><Trophy /></div>
            <h3 className="text-2xl font-black">Leaderboard</h3>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scroll">
            {topUsers.length > 0 ? topUsers.map((u, i) => (
              <div key={i} className={`flex justify-between items-center ${theme.inputBg} p-4 rounded-2xl border ${theme.border} hover:scale-[1.02] transition-transform`}>
                <div className="flex items-center gap-4">
                  <span className={`font-black text-lg w-6 ${i === 0 ? 'text-yellow-500' : theme.textSub}`}>#{u.rank}</span>
                  <span className="font-bold text-sm">{u.name}</span>
                </div>
                <span className="bg-yellow-400 text-black font-black px-3 py-1 rounded-lg text-[10px] shadow-sm">{u.score} MSG</span>
              </div>
            )) : <div className="text-center py-20 opacity-40 font-bold italic">Menghubungkan ke MongoDB...</div>}
          </div>
        </div>

        {/* PASAR MALAM */}
        <div className={`${theme.card} border ${theme.border} rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden flex flex-col min-h-[500px]`}>
          <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-black px-4 py-2 rounded-bl-2xl uppercase shadow-md">Open</div>
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-blue-100 p-3 rounded-2xl text-blue-600"><Store /></div>
            <h3 className="text-2xl font-black">Pasar Malam</h3>
          </div>
          <div className="space-y-4 overflow-y-auto flex-1 pr-2">
            {nmItems.map((item, i) => (
              <div key={i} className={`${theme.inputBg} p-5 rounded-2xl border ${theme.border}`}>
                <div className="flex justify-between mb-4"><span className="font-bold text-sm">{item.name}</span><span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded font-black">-{item.label}</span></div>
                <div className="flex justify-between items-end">
                  <div><span className={`line-through ${theme.textSub} text-[10px] font-bold`}>{item.normal}</span><p className="text-blue-500 font-black text-xl">{item.disc.toLocaleString()}</p></div>
                  <button className="bg-blue-500 text-white p-2.5 rounded-xl shadow-lg hover:bg-blue-600 transition"><ShoppingBag size={20} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KIRIM PESAN */}
        <div className={`${theme.card} border ${theme.border} rounded-[2.5rem] p-8 shadow-xl flex flex-col min-h-[500px]`}>
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-pink-100 p-3 rounded-2xl text-pink-500"><Mail /></div>
            <h3 className="text-2xl font-black">Kirim Pesan</h3>
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <input type="text" placeholder="Nama Samaran..." className={`${theme.inputBg} border ${theme.border} rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-pink-300 outline-none`} />
            <textarea placeholder="Pesanmu..." className={`${theme.inputBg} border ${theme.border} rounded-2xl p-4 text-sm font-bold flex-1 resize-none outline-none focus:ring-2 focus:ring-pink-300`}></textarea>
            <button className="bg-pink-500 text-white font-black py-5 rounded-2xl shadow-lg shadow-pink-300 hover:bg-pink-600 transition-all uppercase tracking-widest text-xs">Kirim Menfess</button>
          </div>
        </div>

      </section>
    </main>
  );
}