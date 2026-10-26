import React from 'react';
import { UserCheck, Shield, Search, HeartHandshake, CreditCard, MessageSquare, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onCreateProfile: () => void;
  onExploreProfiles: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onCreateProfile, onExploreProfiles }) => {
  const steps = [
    {
      number: '01',
      title: 'Créez votre profil',
      description: 'Présentez-vous sincèrement (vos valeurs, votre profession, votre vision du foyer) et ajoutez deux photos récentes de vous.',
      icon: UserCheck,
      actionText: 'Remplir ma fiche',
      action: onCreateProfile
    },
    {
      number: '02',
      title: 'Votre profil est vérifié',
      description: 'Chaque profil est soumis à une validation manuelle et rigoureuse par notre équipe avant sa mise en ligne pour garantir le sérieux.',
      icon: Shield,
    },
    {
      number: '03',
      title: 'Découvrez les célibataires',
      description: 'Consultez les profils disponibles au Niger (Niamey, Maradi, Zinder, etc.) et filtrez selon vos affinités et vos critères.',
      icon: Search,
      actionText: 'Voir le catalogue',
      action: onExploreProfiles
    },
    {
      number: '04',
      title: 'Demandez une mise en contact',
      description: 'Lorsque vous êtes sincèrement intéressé(e) par un profil pour un projet de mariage, faites une demande de mise en relation officielle.',
      icon: HeartHandshake,
    },
    {
      number: '05',
      title: 'Effectuez le paiement',
      description: 'La mise en contact est payante afin de filtrer les plaisantins. Réglez par Airtel Money, Moov Flooz, Al Izza ou Nita.',
      icon: CreditCard,
    },
    {
      number: '06',
      title: 'Contactez l\'administration',
      description: 'Après votre règlement, transmettez votre preuve de paiement sur WhatsApp Business au +227 99 61 40 98 pour l\'introduction officielle.',
      icon: MessageSquare,
      highlightPhone: '+227 99 61 40 98'
    }
  ];

  return (
    <section id="comment-ca-marche" className="py-16 lg:py-24 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-amber-700">
            Protocole & Démarche
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-emerald-950 tracking-tight">
            Comment ça marche ?
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Un processus clair, pudique et sécurisé en 6 étapes pour vous accompagner avec respect vers la concrétisation de votre mariage.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="group relative p-6 sm:p-7 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 hover:border-amber-700/30 hover:bg-amber-50/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-2xl font-bold text-emerald-900/60 group-hover:text-emerald-900 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-emerald-800 shadow-2xs group-hover:bg-emerald-900 group-hover:text-amber-300 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    {step.description}
                  </p>

                  {step.highlightPhone && (
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-900 text-amber-300 font-mono text-xs font-semibold">
                      WhatsApp: {step.highlightPhone}
                    </div>
                  )}
                </div>

                {step.actionText && step.action && (
                  <div className="mt-6 pt-4 border-t border-stone-200/60">
                    <button
                      onClick={step.action}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-900 hover:text-emerald-700 transition-colors"
                    >
                      <span>{step.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
