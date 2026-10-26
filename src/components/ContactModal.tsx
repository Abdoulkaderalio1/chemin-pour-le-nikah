import React, { useState } from 'react';
import { Profile, PaymentMethod, ContactRequest } from '../types';
import { X, CheckCircle2, Copy, Check, MessageSquare, ShieldCheck, ArrowRight, ArrowLeft, Smartphone, CreditCard } from 'lucide-react';

interface ContactModalProps {
  profile: Profile | null;
  onClose: () => void;
  onSubmitRequest: (request: Omit<ContactRequest, 'id' | 'createdAt'>) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  profile,
  onClose,
  onSubmitRequest,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form state
  const [candidateName, setCandidateName] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [candidateCity, setCandidateCity] = useState('');
  const [pledgeAccepted, setPledgeAccepted] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('airtel_money');
  const [transactionRef, setTransactionRef] = useState('');
  const [proofFileName, setProofFileName] = useState('');

  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!profile) return null;

  const feeAmount = '5 000 FCFA';
  const adminWhatsApp = '+227 99 61 40 98';
  const cleanPhone = '22799614098';

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!candidateName.trim()) errs.candidateName = 'Veuillez saisir votre nom et prénom.';
    if (!candidatePhone.trim()) errs.candidatePhone = 'Veuillez saisir votre numéro WhatsApp.';
    if (!candidateCity.trim()) errs.candidateCity = 'Veuillez préciser votre ville.';
    if (!pledgeAccepted) errs.pledge = 'Vous devez attester de votre intention sincère de mariage.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!transactionRef.trim() && !proofFileName) {
      errs.transaction = 'Veuillez indiquer le code de transaction ou joindre une preuve.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      // Save request to app state
      onSubmitRequest({
        profileId: profile.id,
        profileCode: profile.referenceCode,
        profileName: profile.publicName,
        profileCity: profile.city,
        candidateName,
        candidatePhone,
        candidateCity,
        paymentMethod,
        transactionRef: transactionRef.trim() || 'Reçu téléversé',
        proofPhoto: proofFileName,
        status: 'pending',
      });
      setStep(3);
    }
  };

  // Preformatted WhatsApp message
  const paymentMethodLabel = 
    paymentMethod === 'airtel_money' ? 'Airtel Money Niger' :
    paymentMethod === 'moov_flooz' ? 'Moov Flooz Niger' :
    paymentMethod === 'al_izza' ? 'Al Izza Express Transfert' : 'Nita Transfert';

  const whatsappMessage = `Salam alaykoum l'administration Le Chemin pour le Nikah.

Je souhaite demander une mise en contact officielle pour un projet de mariage :
• Profil visé : Réf ${profile.referenceCode} (${profile.publicName}, ${profile.age} ans, ${profile.city})

Mes coordonnées de demandeur :
• Nom complet : ${candidateName}
• Téléphone WhatsApp : ${candidatePhone}
• Ville de résidence : ${candidateCity}

Paiement des frais de mise en contact (${feeAmount}) :
• Moyen utilisé : ${paymentMethodLabel}
• Réf / Code de transaction : ${transactionRef || 'Preuve ci-jointe'}

Je m'engage sur l'honneur au respect de l'éthique islamique et à une intention sincère de Nikah. Merci de bien vouloir me recontacter pour la suite de la démarche.`;

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsappMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofFileName(e.target.files[0].name);
    }
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
              Protocole de mise en relation
            </span>
            <h3 className="text-xl font-serif font-bold text-emerald-950">
              Demande de mise en contact
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Profil visé : <strong className="text-stone-800">{profile.publicName}</strong> (Réf: {profile.referenceCode} · {profile.city})
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-200/60 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progression Bar */}
        <div className="px-6 py-3 bg-stone-50 border-b border-stone-100 flex items-center justify-between text-xs">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-emerald-900 font-semibold' : 'text-stone-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-emerald-900 text-amber-300' : 'bg-stone-200 text-stone-600'}`}>
              1
            </span>
            <span>Vos informations</span>
          </div>
          <div className="w-8 h-px bg-stone-300"></div>
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-emerald-900 font-semibold' : 'text-stone-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-emerald-900 text-amber-300' : 'bg-stone-200 text-stone-600'}`}>
              2
            </span>
            <span>Paiement ({feeAmount})</span>
          </div>
          <div className="w-8 h-px bg-stone-300"></div>
          <div className={`flex items-center gap-1.5 ${step === 3 ? 'text-emerald-900 font-semibold' : 'text-stone-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${step === 3 ? 'bg-emerald-900 text-amber-300' : 'bg-stone-200 text-stone-600'}`}>
              3
            </span>
            <span>WhatsApp Business</span>
          </div>
        </div>

        {/* Modal Body depending on step */}
        <div className="p-6 sm:p-8">
          
          {/* STEP 1: Candidate Identification */}
          {step === 1 && (
            <form onSubmit={handleNextToPayment} className="space-y-4">
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200/60 text-xs text-amber-950 leading-relaxed">
                <strong className="font-semibold">Objectif mariage uniquement :</strong> Vos informations restent strictement confidentielles et ne sont transmises qu'après validation de votre profil et accord du prétendant ou de son tuteur légal.
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Votre nom complet (Prénom et Nom) *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Moussa Abdoulaye"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                />
                {errors.candidateName && <p className="text-red-600 text-xs mt-1">{errors.candidateName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Votre numéro WhatsApp *
                  </label>
                  <input
                    type="tel"
                    placeholder="Ex: +227 90 00 00 00"
                    value={candidatePhone}
                    onChange={(e) => setCandidatePhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                  />
                  {errors.candidatePhone && <p className="text-red-600 text-xs mt-1">{errors.candidatePhone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Votre ville de résidence *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Niamey, Maradi, Zinder..."
                    value={candidateCity}
                    onChange={(e) => setCandidateCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800"
                  />
                  {errors.candidateCity && <p className="text-red-600 text-xs mt-1">{errors.candidateCity}</p>}
                </div>
              </div>

              {/* Islamic Pledge Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pledgeAccepted}
                    onChange={(e) => setPledgeAccepted(e.target.checked)}
                    className="mt-0.5 rounded text-emerald-800 focus:ring-emerald-800"
                  />
                  <span className="text-xs text-stone-600 leading-relaxed select-none">
                    Je jure par Allah que ma démarche est sincère, sérieuse et vise exclusivement le mariage (Nikah). Je m'engage à faire preuve de respect, de pudeur et de bienséance.
                  </span>
                </label>
                {errors.pledge && <p className="text-red-600 text-xs mt-1">{errors.pledge}</p>}
              </div>

              {/* Submit to Step 2 */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-amber-50 bg-emerald-900 hover:bg-emerald-800 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <span>Passer au paiement</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment Details */}
          {step === 2 && (
            <form onSubmit={handleConfirmPayment} className="space-y-4">
              
              <div className="p-4 bg-emerald-950 text-white rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-300 font-medium uppercase tracking-wider">Frais de mise en relation</span>
                  <div className="text-2xl font-serif font-bold text-white mt-0.5">{feeAmount}</div>
                  <p className="text-2xs text-stone-300">Filtre contre les faux profils et suivi personnalisé par l'administration.</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-900 flex items-center justify-center text-amber-300">
                  <CreditCard className="w-6 h-6" />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  Choisissez votre moyen de paiement au Niger :
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'airtel_money', label: 'Airtel Money', note: '+227 99 61 40 98' },
                    { id: 'moov_flooz', label: 'Moov Flooz', note: '+227 99 61 40 98' },
                    { id: 'al_izza', label: 'Al Izza Transfert', note: 'Agence Niamey' },
                    { id: 'nita', label: 'Nita Transfert', note: 'Agence Niamey' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as PaymentMethod)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        paymentMethod === m.id
                          ? 'border-emerald-800 bg-emerald-50/50 ring-2 ring-emerald-800/10'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-stone-800">{m.label}</div>
                      <div className="text-2xs text-stone-500 mt-0.5">{m.note}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Instructions box */}
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-1">
                <div className="font-semibold text-stone-900">Consignes de paiement :</div>
                <p>1. Effectuez le transfert de <strong className="text-emerald-900">{feeAmount}</strong> sur le compte indiqué :</p>
                <div className="p-2 bg-white rounded border border-stone-200 font-mono text-xs font-semibold text-stone-900 flex items-center justify-between">
                  <span>Numéro officiel : +227 99 61 40 98</span>
                  <span className="text-2xs text-emerald-800 font-sans font-medium">Administration Nikah</span>
                </div>
                <p>2. Renseignez ci-dessous la référence de votre transaction SMS ou importez une capture :</p>
              </div>

              {/* Transaction Ref Input */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Référence ou Code de la transaction *
                </label>
                <input
                  type="text"
                  placeholder="Ex: AM261026.0123 ou ID Flooz / Al Izza"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 font-mono"
                />
                {errors.transaction && <p className="text-red-600 text-xs mt-1">{errors.transaction}</p>}
              </div>

              {/* Optional Photo receipt */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Ou joindre la capture d'écran du paiement (optionnel)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-xs text-stone-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200"
                />
                {proofFileName && (
                  <p className="text-emerald-800 text-xs mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Reçu : {proofFileName}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-between border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retour</span>
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-amber-50 bg-emerald-900 hover:bg-emerald-800 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <span>Confirmer & Contacter l'Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

          {/* STEP 3: WhatsApp Contact */}
          {step === 3 && (
            <div className="space-y-5 text-center">
              
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-serif font-bold text-emerald-950">
                  Demande enregistrée avec succès !
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
                  Veuillez maintenant envoyer votre message et preuve sur notre WhatsApp Business officiel :
                </p>
                <div className="mt-2 font-mono text-base font-bold text-emerald-900">
                  {adminWhatsApp}
                </div>
              </div>

              {/* Direct WhatsApp button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.99] rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Ouvrir WhatsApp Business</span>
                </a>

                <button
                  onClick={handleCopy}
                  className="w-full sm:w-auto px-5 py-3.5 text-xs sm:text-sm font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Message copié !' : 'Copier le message'}</span>
                </button>
              </div>

              {/* Message preview box */}
              <div className="text-left bg-stone-50 p-4 rounded-xl border border-stone-200 text-2xs sm:text-xs text-stone-600 font-mono whitespace-pre-wrap max-h-40 overflow-y-auto">
                {whatsappMessage}
              </div>

              <div className="pt-2 text-2xs text-stone-500">
                L'administration vous répondra sous 24h ouvrées pour organiser la mise en relation avec le prétendant ou son tuteur légal.
              </div>

              <div className="pt-3 border-t border-stone-100">
                <button
                  onClick={onClose}
                  className="px-6 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900"
                >
                  Fermer cette fenêtre
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
