import React from 'react';
import { MessageSquare, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onCreateProfile: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onCreateProfile }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-amber-300 flex items-center justify-center font-serif font-bold text-sm">
                ن
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Le Chemin pour le Nikah
              </span>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Plateforme matrimoniale de confiance pour les célibataires au Niger souhaitant faire une rencontre sérieuse avec l'intention de mariage (Nikah).
            </p>

            <div className="text-xs font-serif italic text-amber-300/90 pt-1">
              « Une rencontre aujourd'hui, peut-être un foyer demain. »
            </div>
          </div>

          {/* Links Col */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-100">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#comment-ca-marche" className="hover:text-amber-300 transition-colors">
                  Comment ça marche ?
                </a>
              </li>
              <li>
                <a href="#celibataires" className="hover:text-amber-300 transition-colors">
                  Découvrir les célibataires
                </a>
              </li>
              <li>
                <a href="#engagement" className="hover:text-amber-300 transition-colors">
                  Notre Engagement & Éthique
                </a>
              </li>
              <li>
                <a href="#conseils" className="hover:text-amber-300 transition-colors">
                  Conseils pour le Mariage au Niger
                </a>
              </li>
              <li>
                <button
                  onClick={onCreateProfile}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Déposer mon profil
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-100">
              Contact & Administration
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Pour l'envoi des preuves de paiement (5 000 FCFA), la vérification de profil ou toute assistance :
            </p>
            
            <a
              href="https://wa.me/22799614098?text=Salam%20alaykoum%20l'administration%20Le%20Chemin%20pour%20le%20Nikah"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-amber-300 font-mono text-xs hover:bg-emerald-900 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Business : +227 99 61 40 98</span>
            </a>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-2xs text-stone-400 hover:text-stone-200 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Accès Espace Modération / Administration</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} Le Chemin pour le Nikah · Niger (Niamey, Maradi, Zinder). Tous droits réservés.
          </div>
          <div className="text-2xs text-stone-400">
            Plateforme indépendante dédiée aux mariages musulmans sérieux et respectueux.
          </div>
        </div>

      </div>
    </footer>
  );
};
