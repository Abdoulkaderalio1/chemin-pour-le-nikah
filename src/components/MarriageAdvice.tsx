import React, { useState } from 'react';
import { BookOpen, HelpCircle, ChevronDown, Heart, Shield, Check } from 'lucide-react';

export const MarriageAdvice: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Pourquoi la mise en contact est-elle payante ?',
      a: 'La participation aux frais (5 000 FCFA) permet avant tout de filtrer les personnes indécises ou peu sérieuses, afin de protéger les frères et sœurs inscrits. Elle finance également la modération manuelle, la vérification des profils et le temps consacré à la prise de contact avec les tuteurs légaux.'
    },
    {
      q: 'Quels sont les moyens de paiement acceptés au Niger ?',
      a: 'Vous pouvez effectuer votre règlement via Airtel Money Niger (+227 99 61 40 98), Moov Flooz (+227 99 61 40 98), ou par transfert d\'agence Al Izza Express et Nita. Envoyez simplement la référence ou la capture du reçu sur notre WhatsApp Business.'
    },
    {
      q: 'Comment sont protégées mes deux photos ?',
      a: 'Nos membres peuvent à tout moment activer le « Mode Pudeur » qui floute les visages. Vos photos ne sont jamais diffusées sur des réseaux sociaux tiers et sont réservées aux membres ayant une démarche de mariage.'
    },
    {
      q: 'Comment se passe la prise de contact après le paiement ?',
      a: 'Dès réception de votre preuve de paiement sur WhatsApp Business, l\'administration prend attache avec la personne convoitée (ou son tuteur s\'il s\'agit d\'une sœur). Si l\'intérêt est mutuel, les coordonnées respectives sont partagées pour organiser un échange licite.'
    },
    {
      q: 'Que se passe-t-il si la personne n\'est pas intéressée ?',
      a: 'Le mariage reposant sur le consentement mutuel, si la personne décline la demande, l\'administration vous propose de reporter vos frais de mise en contact sur un autre profil de votre choix.'
    }
  ];

  return (
    <section id="conseils" className="py-16 lg:py-24 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-amber-700">
            Éclairages & Sagesse
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-emerald-950 tracking-tight">
            Conseils pour réussir son Nikah au Niger
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Le mariage est la moitié de notre foi. Voici des repères islamiques et pratiques pour aborder cette étape avec sérénité et piété.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-serif text-lg font-bold mb-4">
              01
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">
              La Mouqabala Licite
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              La rencontre doit se faire en présence d'un mahram ou dans un cadre public respectueux. C'est l'occasion de vérifier l'affinité, la clarté du projet et le bon comportement sans isolement interdit (khalwa).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-serif text-lg font-bold mb-4">
              02
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">
              La Facilitation de la Dot
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Le Prophète (SAW) a enseigné : « La femme la plus bénie est celle dont la dot est la plus facile. » Au Niger, facilitons le mariage sans exiger des dépenses somptuaires qui freinent la jeunesse pieuse.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center font-serif text-lg font-bold mb-4">
              03
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">
              Questions Indispensables
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Abordez sans fausse pudeur la vision de la pratique religieuse, la gestion financière du foyer, les relations avec les belles-familles, l'éducation des enfants et le lieu de résidence prévu.
            </p>
          </div>

        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-serif font-bold text-emerald-950">
              Questions Fréquentes
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Tout ce que vous devez savoir sur le fonctionnement du Chemin pour le Nikah
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200 bg-white overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-stone-900 hover:text-emerald-950"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-emerald-800' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
