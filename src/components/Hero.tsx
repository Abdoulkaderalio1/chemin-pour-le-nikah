import React from 'react';
import { ArrowDown, MessageCircle, Heart, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onExploreProfiles: () => void;
  onCreateProfile: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProfiles, onCreateProfile }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200/80 bg-gradient-to-b from-[#FAF8F5] via-amber-50/20 to-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle trust kicker */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-800 mb-4">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-600"></span>
          <span>Plateforme matrimoniale islamique au Niger</span>
          <span aria-hidden="true">·</span>
          <span>Niamey, Maradi, Zinder & toutes régions</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Value proposition */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-emerald-950 tracking-tight leading-[1.15] text-balance">
              Trouvez la personne qui vous correspond pour construire un foyer
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Bienvenue sur <strong className="font-semibold text-emerald-900">Le Chemin pour le Nikah</strong>, une plateforme de rencontre destinée aux célibataires au Niger qui souhaitent faire une rencontre sérieuse avec une intention sincère de mariage.
            </p>

            {/* Quote of faith */}
            <div className="p-4 bg-emerald-900/5 rounded-xl border border-emerald-900/10 text-stone-700 text-sm italic font-serif leading-relaxed">
              « Une rencontre aujourd'hui, peut-être un foyer demain. »
              <div className="mt-1 text-xs text-emerald-800 not-italic font-sans font-medium">
                Orienté vers le Nikah dans le respect des préceptes islamiques et de nos familles.
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onExploreProfiles}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-amber-50 bg-emerald-900 hover:bg-emerald-800 active:scale-[0.99] rounded-xl shadow-sm transition-all whitespace-nowrap"
              >
                <span>Découvrir les célibataires</span>
                <ArrowDown className="w-4 h-4 text-amber-300" />
              </button>

              <button
                onClick={onCreateProfile}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-emerald-950 bg-amber-100/80 hover:bg-amber-100 active:scale-[0.99] border border-amber-300/60 rounded-xl transition-all whitespace-nowrap"
              >
                <span>Créer mon profil</span>
              </button>

              <a
                href="https://wa.me/22799614098?text=Salam%20alaykoum%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20Le%20Chemin%20pour%20le%20Nikah"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-stone-600 hover:text-emerald-900 hover:bg-stone-100/70 rounded-xl transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>+227 99 61 40 98</span>
              </a>
            </div>

            {/* Unboxed metadata guarantees */}
            <div className="pt-4 border-t border-stone-200/60 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-stone-500">
              <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Profils vérifiés avant publication
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Intention exclusive de Nikah</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Confidentialité préservée</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Modération rigoureuse</span>
            </div>
          </div>

          {/* Right Column: Hero Visual */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-amber-900/10 shadow-lg bg-stone-900 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
              <img
                src="/src/assets/images/hero_nikah_niger_1793002625180.jpg"
                alt="Mariage traditionnel au Niger - Le Chemin pour le Nikah"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/20 to-transparent"></div>
              
              <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                <p className="text-xs font-serif text-amber-200/90 italic">
                  « Et parmi Ses signes Il a créé de vous, pour vous, des épouses pour que vous viviez en tranquillité avec elles... »
                </p>
                <div className="mt-1 flex items-center justify-between text-xs text-stone-200">
                  <span>Sourate Ar-Rum, verset 21</span>
                  <span className="text-amber-300 font-medium">Niger · Foi & Foyer</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
