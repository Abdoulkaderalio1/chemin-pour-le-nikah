import React, { useState } from 'react';
import { Profile } from '../types';
import { X, MapPin, Briefcase, GraduationCap, HeartHandshake, ShieldCheck, User, Users, BookOpen, Heart, Eye, EyeOff } from 'lucide-react';

interface ProfileDetailModalProps {
  profile: Profile | null;
  onClose: () => void;
  onRequestContact: (profile: Profile) => void;
}

export const ProfileDetailModal: React.FC<ProfileDetailModalProps> = ({
  profile,
  onClose,
  onRequestContact,
}) => {
  const [activePhoto, setActivePhoto] = useState<number>(0);
  const [blurPhoto, setBlurPhoto] = useState<boolean>(false);

  if (!profile) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-600 hover:text-stone-900 shadow-md flex items-center justify-center transition-all"
          aria-label="Fermer la fiche"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & Photos Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-b border-stone-200 bg-stone-50">
          
          {/* Main Photo Column */}
          <div className="md:col-span-5 relative bg-stone-950 aspect-[4/3] md:aspect-auto min-h-[300px]">
            <img
              src={profile.photos[activePhoto] || profile.photos[0]}
              alt={`Photo de ${profile.publicName}`}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-all ${
                blurPhoto ? 'blur-lg scale-105 select-none' : 'blur-0'
              }`}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-white bg-black/50 px-2.5 py-1 rounded-md">
                Réf: {profile.referenceCode}
              </span>
            </div>

            <div className="absolute top-3 right-14 md:right-3 flex items-center gap-1">
              <button
                onClick={() => setBlurPhoto(!blurPhoto)}
                className="px-2.5 py-1 text-xs font-medium text-white bg-black/50 hover:bg-black/70 backdrop-blur-xs rounded-md flex items-center gap-1.5 transition-colors"
              >
                {blurPhoto ? <Eye className="w-3.5 h-3.5 text-amber-300" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{blurPhoto ? 'Afficher' : 'Pudeur'}</span>
              </button>
            </div>

            {/* Thumbnail selector for 2 photos */}
            {profile.photos.length > 1 && (
              <div className="absolute bottom-3 inset-x-3 flex items-center justify-center gap-2 z-10">
                {profile.photos.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      activePhoto === i ? 'border-amber-300 scale-105 shadow-md' : 'border-white/50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Header Summary Column */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Profil validé par l'administration Le Chemin pour le Nikah</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950 mb-1">
                {profile.publicName}
              </h2>

              <div className="text-base font-semibold text-stone-700 mb-4">
                {profile.age} ans · {profile.maritalStatus} {profile.childrenCount > 0 ? `(${profile.childrenCount} enfant)` : ''}
              </div>

              {/* Specs grid */}
              <div className="space-y-2.5 text-xs sm:text-sm text-stone-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span><strong>Ville :</strong> {profile.city} {profile.quarter ? `· ${profile.quarter}` : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span><strong>Profession :</strong> {profile.profession}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span><strong>Niveau d'études :</strong> {profile.education}</span>
                </div>
                {profile.heightCm && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span><strong>Taille :</strong> {profile.heightCm} cm</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick action button */}
            <div className="pt-6 mt-6 border-t border-stone-200">
              <button
                onClick={() => {
                  onClose();
                  onRequestContact(profile);
                }}
                className="w-full py-3.5 px-4 text-sm font-semibold text-amber-50 bg-emerald-900 hover:bg-emerald-800 active:scale-[0.99] rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <HeartHandshake className="w-4 h-4 text-amber-300" />
                <span>Demander une mise en contact</span>
              </button>
              <p className="mt-2 text-center text-2xs text-stone-500">
                Mise en relation confidentielle et protégée par l'administration.
              </p>
            </div>

          </div>

        </div>

        {/* Modal Detailed Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Section: Présentation Personnelle */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-900 mb-3">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Présentation Personnelle & Caractère</span>
            </h4>
            <div className="bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-stone-200/80 text-stone-700 text-sm leading-relaxed">
              {profile.bio}
            </div>
          </div>

          {/* Section: Pratique religieuse & Spiritualité */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-900 mb-3">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Pratique Religieuse & Principes Islamiques</span>
            </h4>
            <div className="bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-stone-200/80 text-stone-700 text-sm leading-relaxed">
              {profile.religiousPractice}
            </div>
          </div>

          {/* Section: Ce que la personne recherche */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-900 mb-3">
              <Heart className="w-4 h-4 text-amber-600" />
              <span>Attentes & Critères chez le/la futur(e) époux(se)</span>
            </h4>
            <div className="bg-amber-50/40 p-4 sm:p-5 rounded-2xl border border-amber-200/60 text-stone-800 text-sm leading-relaxed">
              {profile.lookingFor}
            </div>
          </div>

          {/* Section: Valeurs du foyer */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-900 mb-3">
              <Users className="w-4 h-4 text-amber-600" />
              <span>Vision de la Vie de Famille & Valeurs</span>
            </h4>
            <div className="bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-stone-200/80 text-stone-700 text-sm leading-relaxed">
              {profile.familyValues}
            </div>
          </div>

          {/* Mahram / Tuteur information for sisters */}
          {profile.mahramInfo && (
            <div>
              <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-900 mb-3">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Modalités de Contact & Tuteur Légal (Mahram)</span>
              </h4>
              <div className="bg-emerald-900/5 p-4 sm:p-5 rounded-2xl border border-emerald-900/10 text-emerald-950 text-sm leading-relaxed">
                {profile.mahramInfo}
              </div>
            </div>
          )}

          {/* Bottom Action Reminder */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200">
            <span className="text-xs text-stone-500">
              Réf : <strong className="font-mono text-stone-800">{profile.referenceCode}</strong> · Enregistré pour un projet de Nikah sérieux.
            </span>

            <button
              onClick={() => {
                onClose();
                onRequestContact(profile);
              }}
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-amber-50 bg-emerald-900 hover:bg-emerald-800 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <HeartHandshake className="w-4 h-4 text-amber-300" />
              <span>Demander la mise en contact</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
