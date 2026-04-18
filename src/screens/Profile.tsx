import { motion } from "motion/react";
import { User, LogOut, Settings, Award, Layers, Share2 } from "lucide-react";
import {useUser} from "@/context/UserContext.tsx";

export function Profile() {
  const { user, logout } = useUser();

  return (
    <div className="min-h-full flex flex-col p-6 pt-12 relative overflow-hidden">
      <header className="flex justify-between items-center mb-10 z-10">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3 drop-shadow-white-glow">
            Profile <User className="w-8 h-8 text-pink-400 fill-pink-400/30 drop-shadow-pink-glow" />
          </h1>
        </div>
        <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-slate-300 hover:text-white hover:bg-white/10 transition-all shadow-glass-light backdrop-blur-md">
          <Settings className="w-6 h-6" />
        </button>
      </header>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 shadow-glass backdrop-blur-md flex flex-col items-center gap-5 relative mb-10"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500 rounded-full mix-blend-screen filter blur-[60px] opacity-20 pointer-events-none" />

        <div className="w-28 h-28 bg-gradient-to-br from-lime-400 to-lime-600 border-4 border-slate-950 rounded-[2rem] flex items-center justify-center overflow-hidden -mt-16 shadow-lime-glow-md rotate-3">
          <span className="text-5xl font-black text-white drop-shadow-lg">{user?.username?.[0]?.toUpperCase() || "?"}</span>
        </div>
        <div className="text-center z-10">
          <h2 className="text-3xl font-black text-white drop-shadow-white-glow-sm">{user?.username}</h2>
          <span className="text-[10px] font-black bg-violet-500/20 text-violet-300 px-4 py-1.5 rounded-xl border border-violet-400/30 uppercase tracking-widest mt-3 inline-block shadow-violet-glow-sm">Pro Complainer</span>
        </div>

        <div className="w-full grid grid-cols-3 gap-4 mt-6 z-10">
          <StatBox icon={<Layers className="w-6 h-6 text-lime-400 drop-shadow-[0_0_8px_rgba(163,230,53,0.5)]" />} label="Templates" value={user?.templateSalvati || 0} />
          <StatBox icon={<Share2 className="w-6 h-6 text-violet-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]" />} label="Shared" value={user?.storieCondivise || 0} />
          <StatBox icon={<Award className="w-6 h-6 text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.5)]" />} label="Published" value={user?.storiePubblicate || 0} />
        </div>
      </motion.div>

      <div className="space-y-4 pb-24 z-10 hide-scrollbar">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Account Actions</h3>
        
        <button className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center hover:bg-white/10 transition-all backdrop-blur-md group shadow-glass-light">
          <span className="font-bold text-white uppercase tracking-widest text-sm">Edit Profile</span>
          <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-lime-400 group-hover:translate-x-1 transition-all" />
        </button>
        
        <button
          onClick={logout}
          className="w-full p-5 bg-red-500/10 border border-red-500/20 rounded-2xl flex justify-between items-center hover:bg-red-500/20 hover:border-red-500/40 transition-all backdrop-blur-md group shadow-red-glow-light hover:shadow-red-glow"
        >
          <span className="font-bold text-red-400 uppercase tracking-widest text-sm">Logout</span>
          <LogOut className="w-6 h-6 text-red-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function StatBox({ icon, label, value }: { icon: React.ReactNode, label: string, value: number }) {
  return (
    <div className="bg-black/20 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center backdrop-blur-sm">
      {icon}
      <span className="text-2xl font-black text-white mt-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{value}</span>
      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{label}</span>
    </div>
  );
}

function ArrowRight(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
}
