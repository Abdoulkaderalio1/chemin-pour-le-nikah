import React, { useState } from 'react';
import { Profile } from '../types';
import { ShieldCheck, Eye, EyeOff, MapPin, Briefcase, GraduationCap, HeartHandshake, ChevronRight, Sparkles } from 'lucide-react';

interface ProfileCardProps {
  profile: Profile;
  onSelect: (profile: Profile) => void;
  onRequestContact: (profile: Profile) => void;
  isModestyBlurEnabled: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onSelect,
  onRequestContact,
  isModestyBlurEnabled,
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [localUnblur, setLocalUnblur] = useState(false);

  const isBlurred = isModestyBlurEnabled && !localUnblur;
  const currentPhoto = profile.photos[activePhotoIdx] || profile.photos[0];

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group">
      
      {/* Top Media Section */}
      <div>
        <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
          <img
            src={currentPhoto}
            alt={`Profil ${profile.publicName} au Niger`}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover object-top transition duration-300 ${
              isBlurred ? 'blur-md scale-105 select-none pointer-events-none' : 'blur-0'
            }`}
          />

          {/* Photo Scrim & Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

          {/* Top Overlays */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between">
            <span className="font-mono text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
              Réf: {profile.referenceCode}
            </span>

            <button
              onClick={() => setLocalUnblur(!localUnblur)}
              title={isBlurred ? "Afficher la photo" : "Flouter par pudeur"}
              className="px-2 py-1 text-xs font-medium text-white/90 bg-black/40 hover:bg-black/60 backdrop-blur-xs rounded-md transition-colors flex items-center gap-1.5"
            >
              {isBlurred ? (
                <>
                  <Eye className="w-3.5 h-3.5 text-amber-300" />
                  <span>Afficher</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-stone-300" />
                  <span>Pudeur</span>
                </>
              )}
            </button>
          </div>

          {/* Photo Swapper if 2 photos */}
          {profile.photos.length > 1 && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 z-10">
              {profile.photos.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhotoIdx(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activePhotoIdx === i ? 'bg-amber-300 w-5' : 'bg-white/60 hover:bg-white'
                  }`}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Bottom Overlay Title on Image */}
          <div className="absolute bottom-3 right-3 text-right">
            <span className="text-xs font-medium text-amber-200 drop-shadow-sm flex items-center gap-1 justify-end">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Profil vérifié</span>
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          
          {/* Header Name & Age */}
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="text-xl font-serif font-bold text-emerald-950 group-hover:text-emerald-800 transition-colors">
              {profile.publicName}
            </h3>
            <span className="text-sm font-semibold text-stone-700">
              {profile.age} ans
            </span>
          </div>

          {/* Unboxed Metadata Line with typographic separators */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-500 mb-3">
            <span className="flex items-center gap-1 text-stone-700 font-medium">
              <MapPin className="w-3 h-3 text-emerald-700 shrink-0" />
              {profile.city} {profile.quarter ? `(${profile.quarter})` : ''}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1 text-stone-700">
              <Briefcase className="w-3 h-3 text-stone-400 shrink-0" />
              {profile.profession}
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{profile.maritalStatus}</span>
          </div>

          {/* Education & Religious Practice Snippet */}
          <div className="text-xs text-stone-600 space-y-1.5 mb-4">
            <div className="flex items-center gap-1.5 text-stone-600 line-clamp-1">
              <GraduationCap className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>{profile.education}</span>
            </div>
            <p className="line-clamp-2 text-stone-600 italic bg-stone-50 p-2.5 rounded-lg border border-stone-100">
              « {profile.bio} »
            </p>
          </div>

          {/* Looking For snippet */}
          <div className="text-xs text-emerald-950/80 mb-2">
            <span className="font-semibold text-emerald-900">Recherche : </span>
            <span className="line-clamp-1">{profile.lookingFor}</span>
          </div>

        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-2 border-t border-stone-100 mt-2">
        <button
          onClick={() => onSelect(profile)}
          className="w-full py-2.5 px-3 text-xs font-semibold text-stone-700 hover:text-emerald-950 hover:bg-stone-100 rounded-xl transition-colors flex items-center justify-center gap-1"
        >
          <span>Voir détails</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onRequestContact(profile)}
          className="w-full py-2.5 px-3 text-xs font-semibold text-amber-50 bg-emerald-900 hover:bg-emerald-800 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <HeartHandshake className="w-3.5 h-3.5 text-amber-300" />
          <span>Mise en contact</span>
        </button>
      </div>

    </div>
  );
};
