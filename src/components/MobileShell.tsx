import { Outlet, NavLink } from "react-router";
import { Home, Compass, Bookmark, User } from "lucide-react";
import { clsx } from "clsx";

export function MobileShell() {
  return (
    <div className="flex flex-col h-screen mx-auto bg-slate-950 text-slate-200 relative overflow-hidden font-[Nunito]">
      {/* Dark modern background effects */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[50%] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[50%] bg-lime-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-24 z-10 relative">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full bg-slate-900/80 backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] px-6 py-4 pb-10 flex justify-between items-center z-50 rounded-t-3xl">
        <NavItem to="/" icon={<Home className="w-6 h-6" />} label="Home" />
        <NavItem to="/explore" icon={<Compass className="w-6 h-6" />} label="Explore" />
        <NavItem to="/saved" icon={<Bookmark className="w-6 h-6" />} label="Saved" />
        <NavItem to="/profile" icon={<User className="w-6 h-6" />} label="Profile" />
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) => clsx(
        "flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all duration-300",
        isActive ? "text-lime-400" : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
      )}
    >
      {({ isActive }) => (
        <>
          <div className={clsx(
            "transition-transform",
            isActive && "scale-110",
            isActive && "drop-shadow-[0_0_10px_rgba(163,230,53,0.7)]"
          )}>
            {icon}
          </div>
          <span className={clsx(
            "text-[10px] font-bold tracking-widest uppercase transition-all",
            isActive && "drop-shadow-[0_0_8px_rgba(163,230,53,0.6)]"
          )}>{label}</span>
        </>
      )}
    </NavLink>
  );
}
