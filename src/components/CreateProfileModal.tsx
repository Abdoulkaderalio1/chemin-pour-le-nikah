import React, { useState } from 'react';
import { Profile, Gender, MaritalStatus, NigerCity } from '../types';
import { X, UserCheck, ShieldCheck, Camera, ArrowRight, ArrowLeft, Upload, CheckCircle2, AlertCircle } from 'lucide-react';

interface CreateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitProfile: (profile: Profile) => void;
}

export const CreateProfileModal: React.FC<CreateProfileModalProps> = ({
  isOpen,
  onClose,
  onSubmitProfile,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form Fields
  const [gender, setGender] = useState<Gender>('brother');
  const [fullName, setFullName] = useState('');
  const [publicName, setPublicName] = useState('');
  const [age, setAge] = useState<number>(28);
  const [city, setCity] = useState<NigerCity>('Niamey');
  const [quarter, setQuarter] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus>('Célibataire');
  const [childrenCount, setChildrenCount] = useState<number>(0);

  const [profession, setProfession] = useState('');
  const [education, setEducation] = useState('Licence / Bac+3');
  const [heightCm, setHeightCm] = useState<string>('175');
  const [religiousPractice, setReligiousPractice] = useState('');

  const [bio, setBio] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [familyValues, setFamilyValues] = useState('');
  const [mahramInfo, setMahramInfo] = useState('');

  // 2 Photos
  const [photo1, setPhoto1] = useState<string>('');
  const [photo2, setPhoto2] = useState<string>('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [createdProfileCode, setCreatedProfileCode] = useState<string>('');

  if (!isOpen) return null;

  const samplePhotos = {
    brother: [
      '/src/assets/images/profile_brother_ibrahim_1793002625266.jpg',
      '/src/assets/images/profile_brother_abdoul_1793002626486.jpg'
    ],
    sister: [
      '/src/assets/images/profile_sister_fatima_1793002626441.jpg',
      '/src/assets/images/profile_sister_aicha_1793002626832.jpg'
    ]
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Le nom complet est obligatoire (réservé à l\'administration).';
    if (!publicName.trim()) errs.publicName = 'Le prénom/pseudo public est requis.';
    if (!whatsapp.trim()) errs.whatsapp = 'Le numéro WhatsApp est requis pour la validation.';
    if (age < 18 || age > 75) errs.age = 'L\'âge doit être entre 18 et 75 ans.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!profession.trim()) errs.profession = 'Veuillez préciser votre profession ou statut.';
    if (!religiousPractice.trim()) errs.religiousPractice = 'Veuillez décrire votre pratique religieuse.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!bio.trim() || bio.trim().length < 20) errs.bio = 'Veuillez rédiger une brève présentation (min. 20 caractères).';
    if (!lookingFor.trim() || lookingFor.trim().length < 20) errs.lookingFor = 'Veuillez préciser vos attentes (min. 20 caractères).';
    if (!familyValues.trim()) errs.familyValues = 'Veuillez indiquer vos valeurs familiales.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep4 = () => {
    const errs: Record<string, string> = {};
    const finalP1 = photo1 || samplePhotos[gender][0];
    const finalP2 = photo2 || samplePhotos[gender][1];
    if (!finalP1 || !finalP2) {
      errs.photos = 'Deux photos récentes sont requises par notre charte.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, slot: 1 | 2) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          if (slot === 1) setPhoto1(event.target.result as string);
          if (slot === 2) setPhoto2(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep4()) return;

    const finalPhoto1 = photo1 || samplePhotos[gender][0];
    const finalPhoto2 = photo2 || samplePhotos[gender][1];

    const randomSuffix = Math.floor(10 + Math.random() * 90);
    const code = `NK-227-${randomSuffix}`;
    setCreatedProfileCode(code);

    const newProfile: Profile = {
      id: `prof-${Date.now()}`,
      referenceCode: code,
      gender,
      fullName: fullName.trim(),
      publicName: publicName.trim(),
      age: Number(age),
      city,
      quarter: quarter.trim() || undefined,
      profession: profession.trim(),
      education,
      maritalStatus,
      childrenCount: Number(childrenCount),
      religiousPractice: religiousPractice.trim(),
      heightCm: heightCm ? Number(heightCm) : undefined,
      bio: bio.trim(),
      lookingFor: lookingFor.trim(),
      familyValues: familyValues.trim(),
      mahramInfo: gender === 'sister' ? mahramInfo.trim() || 'Tuteur désigné par la famille' : undefined,
      photos: [finalPhoto1, finalPhoto2],
      isVerified: false, // Step 2 of the prompt: submitted for admin validation!
      createdAt: new Date().toISOString().split('T')[0]
    };

    onSubmitProfile(newProfile);
    setStep(5);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Header */}
        <div className="p-6 bg-[#FAF8F5] border-b border-stone-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-emerald-800 tracking-wider uppercase">
              Étape 1 sur le chemin du mariage
            </span>
            <h3 className="text-xl font-serif font-bold text-emerald-950">
              Créer votre profil
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Présentez-vous sincèrement pour trouver la personne qui vous correspond.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-200/60 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 5 && (
          <div className="px-6 py-3 bg-stone-50 border-b border-stone-100 flex items-center justify-between text-2xs sm:text-xs text-stone-500">
            <span className={step === 1 ? 'font-bold text-emerald-900' : ''}>1. Identité</span>
            <span>·</span>
            <span className={step === 2 ? 'font-bold text-emerald-900' : ''}>2. Métier & Foi</span>
            <span>·</span>
            <span className={step === 3 ? 'font-bold text-emerald-900' : ''}>3. Projet Nikah</span>
            <span>·</span>
            <span className={step === 4 ? 'font-bold text-emerald-900' : ''}>4. Deux Photos</span>
          </div>
        )}

        <div className="p-6 sm:p-8">
          
          {/* STEP 1: Identité */}
          {step === 1 && (
            <div className="space-y-4">
              {/* Gender selector */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  Vous êtes *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGender('brother')}
                    className={`py-2.5 px-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                      gender === 'brother'
                        ? 'bg-emerald-900 text-amber-300 border-emerald-900 shadow-2xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Un Frère
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('sister')}
                    className={`py-2.5 px-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                      gender === 'sister'
                        ? 'bg-emerald-900 text-amber-300 border-emerald-900 shadow-2xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Une Sœur
                  </button>
                </div>
              </div>

              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Prénom / Pseudo public *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Ibrahim M. ou Fatima"
                    value={publicName}
                    onChange={(e) => setPublicName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                  />
                  <span className="text-2xs text-stone-400">Affiché sur le site.</span>
                  {errors.publicName && <p className="text-red-600 text-xs">{errors.publicName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nom complet (Confidentiel) *
                  </label>
                  <input
                    type="text"
                    placeholder="Réservé à l'administration"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                  />
                  <span className="text-2xs text-stone-400">Jamais publié.</span>
                  {errors.fullName && <p className="text-red-600 text-xs">{errors.fullName}</p>}
                </div>
              </div>

              {/* Age & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Âge *
                  </label>
                  <input
                    type="number"
                    min={18}
                    max={75}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                  />
                  {errors.age && <p className="text-red-600 text-xs">{errors.age}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Téléphone WhatsApp (Confidentiel) *
                  </label>
                  <input
                    type="tel"
                    placeholder="+227 90 00 00 00"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                  />
                  {errors.whatsapp && <p className="text-red-600 text-xs">{errors.whatsapp}</p>}
                </div>
              </div>

              {/* City & Marital Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Ville au Niger *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value as NigerCity)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                  >
                    <option value="Niamey">Niamey</option>
                    <option value="Maradi">Maradi</option>
                    <option value="Zinder">Zinder</option>
                    <option value="Tahoua">Tahoua</option>
                    <option value="Agadez">Agadez</option>
                    <option value="Dosso">Dosso</option>
                    <option value="Diffa">Diffa</option>
                    <option value="Tillabéri">Tillabéri</option>
                    <option value="Diaspora (Extérieur)">Diaspora (Extérieur)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Situation matrimoniale *
                  </label>
                  <select
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value as MaritalStatus)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                  >
                    <option value="Célibataire">Célibataire</option>
                    <option value="Divorcé(e) sans enfant">Divorcé(e) sans enfant</option>
                    <option value="Divorcé(e) avec enfant(s)">Divorcé(e) avec enfant(s)</option>
                    <option value="Veuf / Veuve">Veuf / Veuve</option>
                  </select>
                </div>
              </div>

              {/* Navigation */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep1()) setStep(2);
                  }}
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-amber-50 bg-emerald-900 hover:bg-emerald-800 rounded-xl flex items-center gap-1.5"
                >
                  <span>Continuer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Profession & Spiritualité */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Profession / Statut *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Comptable, Enseignant, Commerçant..."
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                  />
                  {errors.profession && <p className="text-red-600 text-xs">{errors.profession}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Niveau d'études *
                  </label>
                  <select
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                  >
                    <option value="Études secondaires / Baccalauréat">Baccalauréat / Secondaire</option>
                    <option value="BTS / DUT / Bac+2">BTS / DUT (Bac+2)</option>
                    <option value="Licence / Bac+3">Licence (Bac+3)</option>
                    <option value="Master / Ingénieur / Bac+5">Master / Ingénieur (Bac+5)</option>
                    <option value="Doctorat / PhD">Doctorat / PhD</option>
                    <option value="Formation professionnelle / Autodidacte">Formation pro / Commerce</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Pratique religieuse & Spiritualité *
                </label>
                <textarea
                  rows={3}
                  placeholder="Décrivez votre assiduité aux prières, lecture coranique, fréquentation de la mosquée ou cours..."
                  value={religiousPractice}
                  onChange={(e) => setReligiousPractice(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                />
                {errors.religiousPractice && <p className="text-red-600 text-xs">{errors.religiousPractice}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Taille approximative (cm)
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 175"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nombre d'enfants à charge
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" /> Retour
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep2()) setStep(3);
                  }}
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-amber-50 bg-emerald-900 hover:bg-emerald-800 rounded-xl flex items-center gap-1.5"
                >
                  <span>Continuer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Présentation & Vision du Nikah */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Présentation personnelle (votre caractère, vos centres d'intérêt) *
                </label>
                <textarea
                  rows={3}
                  placeholder="Décrivez votre tempérament, ce que vos proches apprécient chez vous..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                />
                {errors.bio && <p className="text-red-600 text-xs">{errors.bio}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Ce que vous recherchez chez votre conjoint(e) *
                </label>
                <textarea
                  rows={3}
                  placeholder="Qualités morales, spiritualité, âge souhaité, projet de vie..."
                  value={lookingFor}
                  onChange={(e) => setLookingFor(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                />
                {errors.lookingFor && <p className="text-red-600 text-xs">{errors.lookingFor}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Votre vision du foyer et valeurs familiales *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Entente, concertation, éducation pieuse des enfants, paix du cœur..."
                  value={familyValues}
                  onChange={(e) => setFamilyValues(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                />
                {errors.familyValues && <p className="text-red-600 text-xs">{errors.familyValues}</p>}
              </div>

              {gender === 'sister' && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Tuteur légal (Mahram / Père / Frère) pour la mise en contact
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Mon père ou mon grand-frère (coordonnées communiquées après validation)"
                    value={mahramInfo}
                    onChange={(e) => setMahramInfo(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                  />
                </div>
              )}

              <div className="pt-4 flex items-center justify-between border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" /> Retour
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep3()) setStep(4);
                  }}
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-amber-50 bg-emerald-900 hover:bg-emerald-800 rounded-xl flex items-center gap-1.5"
                >
                  <span>Passer aux photos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Deux photos récentes */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200/60 text-xs text-amber-950 leading-relaxed">
                <strong className="font-semibold">Règle de notre plateforme :</strong> « Ajoutez deux photos récentes de vous. » Les photos doivent être décentes, récentes et sans filtres trompeurs. Vous pourrez activer le Mode Pudeur (flou) si vous le souhaitez.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Photo 1 */}
                <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 text-center flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-stone-800 block mb-2">Photo 1 (Portrait de face)</span>
                    <div className="w-24 h-24 rounded-xl mx-auto overflow-hidden bg-stone-200 border mb-3 flex items-center justify-center">
                      {photo1 ? (
                        <img src={photo1} alt="Aperçu 1" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-8 h-8 text-stone-400" />
                      )}
                    </div>
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      id="upload-p1"
                      className="hidden"
                      onChange={(e) => handlePhotoUpload(e, 1)}
                    />
                    <label
                      htmlFor="upload-p1"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg cursor-pointer hover:bg-stone-100"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{photo1 ? 'Changer' : 'Téléverser photo 1'}</span>
                    </label>
                  </div>
                </div>

                {/* Photo 2 */}
                <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 text-center flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-stone-800 block mb-2">Photo 2 (En pied ou second portrait)</span>
                    <div className="w-24 h-24 rounded-xl mx-auto overflow-hidden bg-stone-200 border mb-3 flex items-center justify-center">
                      {photo2 ? (
                        <img src={photo2} alt="Aperçu 2" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-8 h-8 text-stone-400" />
                      )}
                    </div>
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      id="upload-p2"
                      className="hidden"
                      onChange={(e) => handlePhotoUpload(e, 2)}
                    />
                    <label
                      htmlFor="upload-p2"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg cursor-pointer hover:bg-stone-100"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{photo2 ? 'Changer' : 'Téléverser photo 2'}</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Note about default demo photos */}
              {(!photo1 || !photo2) && (
                <div className="text-2xs text-stone-500 bg-stone-100 p-2.5 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-stone-400 shrink-0" />
                  <span>Si vous n'avez pas de photos sous la main pour le test, une photo portrait soignée conforme au genre choisi sera automatiquement assignée.</span>
                </div>
              )}

              {errors.photos && <p className="text-red-600 text-xs">{errors.photos}</p>}

              <div className="pt-4 flex items-center justify-between border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" /> Retour
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-amber-50 bg-emerald-900 hover:bg-emerald-800 rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>Soumettre mon profil</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Success & Validation Pending Notice */}
          {step === 5 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <ShieldCheck className="w-9 h-9" />
              </div>

              <div>
                <span className="font-mono text-xs font-semibold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Réf attribuée : {createdProfileCode}
                </span>
                <h4 className="mt-3 text-2xl font-serif font-bold text-emerald-950">
                  Profil soumis avec succès !
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  Conformément à l'étape 2 (<strong>« Votre profil est vérifié »</strong>), votre fiche est désormais entre les mains de notre équipe de modération.
                </p>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-stone-200 text-xs text-stone-700 text-left space-y-2 max-w-md mx-auto">
                <div className="font-semibold text-stone-900">Que se passe-t-il maintenant ?</div>
                <p>1. L'administration examine les photos et la cohérence de vos informations.</p>
                <p>2. Une fois validé, votre profil apparaîtra dans la liste des célibataires.</p>
                <p>3. Vous pouvez suivre la validation dans l'onglet <strong>Administration</strong> ci-dessus.</p>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-amber-50 bg-emerald-900 hover:bg-emerald-800 rounded-xl"
                >
                  Compris, fermer
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
