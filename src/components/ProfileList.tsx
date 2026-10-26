import React, { useState, useMemo } from 'react';
import { Profile, Gender, NigerCity } from '../types';
import { ProfileCard } from './ProfileCard';
import { Search, Filter, SlidersHorizontal, EyeOff, RotateCcw } from 'lucide-react';

interface ProfileListProps {
  profiles: Profile[];
  onSelectProfile: (profile: Profile) => void;
  onRequestContact: (profile: Profile) => void;
  onCreateProfile: () => void;
}

export const ProfileList: React.FC<ProfileListProps> = ({
  profiles,
  onSelectProfile,
  onRequestContact,
  onCreateProfile,
}) => {
  const [selectedGender, setSelectedGender] = useState<'all' | Gender>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModestyBlurEnabled, setIsModestyBlurEnabled] = useState<boolean>(false);

  const cities: NigerCity[] = [
    'Niamey',
    'Maradi',
    'Zinder',
    'Tahoua',
    'Agadez',
    'Dosso',
    'Diffa',
    'Tillabéri',
    'Diaspora (Extérieur)'
  ];

  // Filter only verified profiles for the public list
  const verifiedProfiles = useMemo(() => {
    return profiles.filter((p) => p.isVerified);
  }, [profiles]);

  const filteredProfiles = useMemo(() => {
    return verifiedProfiles.filter((profile) => {
      // Gender filter
      if (selectedGender !== 'all' && profile.gender !== selectedGender) {
        return false;
      }
      // City filter
      if (selectedCity !== 'all' && profile.city !== selectedCity) {
        return false;
      }
      // Status filter
      if (selectedStatus !== 'all' && profile.maritalStatus !== selectedStatus) {
        return false;
      }
      // Text search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matches =
          profile.publicName.toLowerCase().includes(query) ||
          profile.profession.toLowerCase().includes(query) ||
          profile.city.toLowerCase().includes(query) ||
          profile.education.toLowerCase().includes(query) ||
          profile.lookingFor.toLowerCase().includes(query) ||
          profile.referenceCode.toLowerCase().includes(query) ||
          profile.bio.toLowerCase().includes(query);
        if (!matches) return false;
      }
      return true;
    });
  }, [verifiedProfiles, selectedGender, selectedCity, selectedStatus, searchQuery]);

  const handleResetFilters = () => {
    setSelectedGender('all');
    setSelectedCity('all');
    setSelectedStatus('all');
    setSearchQuery('');
  };

  const isFiltered = selectedGender !== 'all' || selectedCity !== 'all' || selectedStatus !== 'all' || searchQuery.trim() !== '';

  return (
    <section id="celibataires" className="py-16 lg:py-24 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-700">
              Rencontres sérieuses au Niger
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-serif font-bold text-emerald-950 tracking-tight">
              Découvrez les célibataires
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-2xl">
              Consultez les profils vérifiés de frères et sœurs engagés dans une démarche pieuse orientée vers le Nikah.
            </p>
          </div>

          {/* Modesty blur global toggle */}
          <button
            onClick={() => setIsModestyBlurEnabled(!isModestyBlurEnabled)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-xl border transition-colors self-start md:self-auto ${
              isModestyBlurEnabled
                ? 'bg-emerald-900 text-amber-300 border-emerald-800'
                : 'bg-white text-stone-600 border-stone-200 hover:text-stone-900'
            }`}
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>Mode Pudeur {isModestyBlurEnabled ? '(Actif)' : '(Inactif)'}</span>
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-2xs mb-8 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Rechercher par métier, ville, référence ou mots-clés..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-colors"
              />
            </div>

            {/* Gender Segmented Control */}
            <div className="md:col-span-3 flex items-center p-1 bg-stone-100 rounded-xl">
              <button
                onClick={() => setSelectedGender('all')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedGender === 'all'
                    ? 'bg-white text-emerald-950 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setSelectedGender('brother')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedGender === 'brother'
                    ? 'bg-white text-emerald-950 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Frères
              </button>
              <button
                onClick={() => setSelectedGender('sister')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedGender === 'sister'
                    ? 'bg-white text-emerald-950 shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Sœurs
              </button>
            </div>

            {/* City Select */}
            <div className="md:col-span-2">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-colors"
              >
                <option value="all">Toutes les villes</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Marital Status Select */}
            <div className="md:col-span-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-colors"
              >
                <option value="all">Toute situation</option>
                <option value="Célibataire">Célibataire</option>
                <option value="Divorcé(e) sans enfant">Divorcé(e) sans enfant</option>
                <option value="Divorcé(e) avec enfant(s)">Divorcé(e) avec enfant(s)</option>
                <option value="Veuf / Veuve">Veuf / Veuve</option>
              </select>
            </div>

          </div>

          {/* Active Filter status indicator */}
          <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
            <span className="font-mono tabular-nums">
              <strong className="font-semibold text-emerald-950">{filteredProfiles.length}</strong> profil(s) vérifié(s) correspondant à vos critères
            </span>

            {isFiltered && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-amber-800 hover:text-amber-950 font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Réinitialiser les filtres</span>
              </button>
            )}
          </div>

        </div>

        {/* Profiles Grid */}
        {filteredProfiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onSelect={onSelectProfile}
                onRequestContact={onRequestContact}
                isModestyBlurEnabled={isModestyBlurEnabled}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-stone-200/90 max-w-xl mx-auto">
            <Filter className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-stone-800 mb-1">
              Aucun profil ne correspond à ces critères
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mb-6">
              Essayez d'élargir la ville ou la situation matrimoniale pour découvrir d'autres prétendants sérieux.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
              >
                Réinitialiser les filtres
              </button>
              <button
                onClick={onCreateProfile}
                className="px-4 py-2.5 text-xs font-semibold text-amber-50 bg-emerald-900 hover:bg-emerald-800 rounded-xl transition-colors"
              >
                Déposer mon profil
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
