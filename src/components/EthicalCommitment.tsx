import React from 'react';
import { ShieldCheck, UserX, Heart, MessageSquare, Lock, Scale } from 'lucide-react';

export const EthicalCommitment: React.FC = () => {
  return (
    <section id="engagement" className="py-16 lg:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          
          {/* Subtle Islamic Motif Decor */}
          <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 rounded-full bg-emerald-800/30 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-300">
              Éthique & Charte Morale
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Notre engagement
            </h2>

            <p className="mt-4 text-base sm:text-lg text-emerald-100/90 leading-relaxed">
              Nous souhaitons créer un espace sérieux, respectueux et sécurisé pour les personnes qui recherchent une relation ayant pour unique objectif le mariage (Nikah).
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 text-sm sm:text-base text-amber-100 font-serif italic">
              « Le Chemin pour le Nikah — Une rencontre aujourd'hui, peut-être un foyer demain. »
            </div>

            {/* Zero tolerance points */}
            <div className="mt-8 pt-8 border-t border-emerald-800/80 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                  <UserX className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    Tolérance Zéro
                  </h4>
                  <p className="text-xs text-emerald-200/80 mt-1 leading-relaxed">
                    Les faux profils, les fausses informations, le harcèlement et les comportements irrespectueux ne sont pas acceptés. Tout contrevenant est banni sans préavis.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-800/80 text-emerald-300 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    Validation Manuelle Préalable
                  </h4>
                  <p className="text-xs text-emerald-200/80 mt-1 leading-relaxed">
                    Chaque photo et description est vérifiée rigoureusement avant d'être rendue publique pour garantir le sérieux de notre communauté.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-800/80 text-emerald-300 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    Confidentialité & Bienséance
                  </h4>
                  <p className="text-xs text-emerald-200/80 mt-1 leading-relaxed">
                    Les noms complets et numéros de téléphone ne sont jamais divulgués publiquement. Seul l'accord formel déclenche la mise en relation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    Respect des Préceptes Islamiques
                  </h4>
                  <p className="text-xs text-emerald-200/80 mt-1 leading-relaxed">
                    Nous encourageons l'implication des tuteurs légaux (Mahram) pour les sœurs et le respect des convenances religieuses à chaque étape.
                  </p>
                </div>
              </div>

            </div>

            {/* Direct WhatsApp Contact Callout */}
            <div id="contact-admin" className="mt-10 p-6 rounded-2xl bg-black/25 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-amber-300 uppercase font-semibold tracking-wider">Assistance & Signalement</span>
                <div className="text-lg font-serif font-bold text-white mt-0.5">
                  Une question ou un signalement à faire ?
                </div>
                <div className="text-xs text-emerald-200/80">
                  L'administration est joignable directement sur WhatsApp Business.
                </div>
              </div>

              <a
                href="https://wa.me/22799614098?text=Salam%20alaykoum%20l'administration%2C%20je%20vous%20contacte%20concernant%20Le%20Chemin%20pour%20le%20Nikah."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-emerald-950 bg-amber-300 hover:bg-amber-200 rounded-xl transition-all shadow-sm whitespace-nowrap shrink-0"
              >
                <MessageSquare className="w-4 h-4 text-emerald-950" />
                <span>WhatsApp : +227 99 61 40 98</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
