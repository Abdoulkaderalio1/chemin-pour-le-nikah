import React from 'react';
import { Heart, UserPlus, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onCreateProfile: () => void;
  onOpenAdmin: () => void;
  pendingProfilesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onCreateProfile,
  onOpenAdmin,
  pendingProfilesCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-20">
        
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="flex items-center gap-2 group whitespace-nowrap shrink-0">
          <div className="w-9 h-9 rounded-full bg-emerald-900 text-amber-300 flex items-center justify-center font-serif text-lg font-bold shadow-sm">
            ن
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-emerald-950 group-hover:text-emerald-800 transition-colors">
            Le Chemin pour le Nikah
          </span>
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
          <a href="#comment-ca-marche" className="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0">
            Comment ça marche
          </a>
          <a href="#celibataires" className="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0">
            Célibataires
          </a>
          <a href="#engagement" className="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0">
            Notre Engagement
          </a>
          <a href="#conseils" className="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0">
            Conseils Nikah
          </a>
          <a href="#contact-admin" className="hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0">
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAdmin}
            title="Espace administration et modération"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-600 hover:text-emerald-950 bg-stone-100/80 hover:bg-stone-200/70 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span className="hidden sm:inline">Administration</span>
            {pendingProfilesCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500" title={`${pendingProfilesCount} en attente`} />
            )}
          </button>

          <button
            onClick={onCreateProfile}
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-amber-50 bg-emerald-900 hover:bg-emerald-800 active:scale-[0.99] rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            <UserPlus className="w-4 h-4 text-amber-300" />
            <span>Créer mon profil</span>
          </button>
        </div>

      </div>
    </header>
  );
};
