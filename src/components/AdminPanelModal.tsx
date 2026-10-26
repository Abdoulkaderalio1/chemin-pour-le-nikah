import React, { useState } from 'react';
import { Profile, ContactRequest } from '../types';
import { X, ShieldCheck, Check, Trash2, MessageSquare, AlertCircle, RefreshCw, Eye, EyeOff } from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: Profile[];
  contactRequests: ContactRequest[];
  onApproveProfile: (profileId: string) => void;
  onRejectProfile: (profileId: string) => void;
  onDeleteProfile: (profileId: string) => void;
  onUpdateContactStatus: (requestId: string, status: ContactRequest['status']) => void;
  onResetToDefaults: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  profiles,
  contactRequests,
  onApproveProfile,
  onRejectProfile,
  onDeleteProfile,
  onUpdateContactStatus,
  onResetToDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'published' | 'requests'>('pending');

  if (!isOpen) return null;

  const pendingProfiles = profiles.filter((p) => !p.isVerified);
  const publishedProfiles = profiles.filter((p) => p.isVerified);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Header */}
        <div className="p-6 bg-emerald-950 text-white flex items-center justify-between sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-300" />
              <h3 className="text-xl font-serif font-bold text-white">
                Espace Administration & Modération
              </h3>
            </div>
            <p className="text-xs text-stone-300 mt-1">
              Validation des profils avant publication (Étape 2) & Suivi des paiements WhatsApp (+227 99 61 40 98)
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="px-6 py-3 bg-stone-100 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
                activeTab === 'pending'
                  ? 'bg-white text-emerald-950 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              En attente de vérification ({pendingProfiles.length})
            </button>
            <button
              onClick={() => setActiveTab('published')}
              className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
                activeTab === 'published'
                  ? 'bg-white text-emerald-950 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Profils validés ({publishedProfiles.length})
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
                activeTab === 'requests'
                  ? 'bg-white text-emerald-950 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Demandes de mise en contact ({contactRequests.length})
            </button>
          </div>

          <button
            onClick={onResetToDefaults}
            title="Réinitialiser avec les données par défaut"
            className="inline-flex items-center gap-1 text-stone-500 hover:text-stone-800 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Réinitialiser</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6">
          
          {/* TAB 1: En attente de validation */}
          {activeTab === 'pending' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                <strong>Règle de validation :</strong> Vérifiez la décence des photos, la cohérence des renseignements, et le respect de la charte du Nikah avant d'approuver.
              </div>

              {pendingProfiles.length === 0 ? (
                <div className="text-center py-12 text-stone-500 text-xs sm:text-sm">
                  Aucun profil en attente de vérification pour le moment.
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingProfiles.map((p) => (
                    <div
                      key={p.id}
                      className="p-5 rounded-2xl border border-stone-200 bg-[#FAF8F5] flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-200 border shrink-0">
                          <img src={p.photos[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-semibold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                              {p.referenceCode}
                            </span>
                            <span className="font-semibold text-stone-900 text-sm">
                              {p.publicName} ({p.fullName})
                            </span>
                            <span className="text-xs text-stone-500">
                              · {p.gender === 'brother' ? 'Frère' : 'Sœur'}, {p.age} ans
                            </span>
                          </div>

                          <div className="text-xs text-stone-600">
                            <strong>Ville :</strong> {p.city} · <strong>Profession :</strong> {p.profession} · <strong>Statut :</strong> {p.maritalStatus}
                          </div>

                          <p className="text-xs text-stone-600 italic line-clamp-2">
                            « {p.bio} »
                          </p>

                          {p.mahramInfo && (
                            <div className="text-2xs text-emerald-800">
                              Tuteur : {p.mahramInfo}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Approval buttons */}
                      <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                        <button
                          onClick={() => onApproveProfile(p.id)}
                          className="px-4 py-2 text-xs font-semibold text-amber-50 bg-emerald-900 hover:bg-emerald-800 rounded-xl flex items-center gap-1.5 transition-colors"
                        >
                          <Check className="w-3.5 h-3.5 text-amber-300" />
                          <span>Valider & Publier</span>
                        </button>
                        <button
                          onClick={() => onRejectProfile(p.id)}
                          className="px-3 py-2 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                        >
                          Rejeter
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Profils validés */}
          {activeTab === 'published' && (
            <div className="space-y-3">
              {publishedProfiles.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-xl border border-stone-200 bg-white flex items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img src={p.photos[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <div className="font-semibold text-stone-900">
                        {p.publicName} <span className="font-mono text-stone-500 font-normal">({p.referenceCode})</span>
                      </div>
                      <div className="text-stone-500">
                        {p.city} · {p.profession} · {p.maritalStatus}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-2xs text-emerald-800 bg-emerald-50 px-2 py-1 rounded font-medium">
                      En ligne
                    </span>
                    <button
                      onClick={() => onDeleteProfile(p.id)}
                      className="p-2 text-stone-400 hover:text-red-700 rounded-lg transition-colors"
                      title="Supprimer ce profil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Demandes de mise en contact */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-emerald-900/10 rounded-xl border border-emerald-900/20 text-xs text-emerald-950">
                Ces demandes ont été soumises avec référence de paiement. Vous pouvez contacter les candidats directement par WhatsApp pour finaliser la mise en relation.
              </div>

              {contactRequests.length === 0 ? (
                <div className="text-center py-12 text-stone-500 text-xs sm:text-sm">
                  Aucune demande de mise en contact enregistrée pour l'instant.
                </div>
              ) : (
                <div className="space-y-4">
                  {contactRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-5 rounded-2xl border border-stone-200 bg-[#FAF8F5] space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-2">
                        <div>
                          <span className="text-2xs font-semibold uppercase text-emerald-800 tracking-wider">Demande de contact</span>
                          <h4 className="font-bold text-stone-900 text-sm">
                            Pour le profil <span className="font-mono text-emerald-900">{req.profileCode}</span> ({req.profileName} · {req.profileCity})
                          </h4>
                        </div>
                        <span className="text-2xs text-stone-400 font-mono">
                          Reçue le {req.createdAt}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                        <div>
                          <strong>Demandeur :</strong> {req.candidateName}
                        </div>
                        <div>
                          <strong>Ville du demandeur :</strong> {req.candidateCity}
                        </div>
                        <div>
                          <strong>WhatsApp :</strong> {req.candidatePhone}
                        </div>
                        <div>
                          <strong>Moyen de paiement :</strong> {req.paymentMethod}
                        </div>
                        <div className="sm:col-span-2 font-mono bg-white p-2 rounded border border-stone-200 text-2xs">
                          <strong>Réf / Reçu :</strong> {req.transactionRef}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="text-stone-500">Statut :</span>
                          <select
                            value={req.status}
                            onChange={(e) => onUpdateContactStatus(req.id, e.target.value as ContactRequest['status'])}
                            className="bg-white border border-stone-200 rounded px-2 py-1 text-xs"
                          >
                            <option value="pending">En attente de vérification</option>
                            <option value="verified">Paiement vérifié</option>
                            <option value="contacted">Mise en contact effectuée</option>
                          </select>
                        </div>

                        <a
                          href={`https://wa.me/${req.candidatePhone.replace(/[^0-9]/g, '')}?text=Salam%20alaykoum%20${encodeURIComponent(req.candidateName)}%2C%20administration%20Le%20Chemin%20pour%20le%20Nikah.%20Nous%20avons%20bien%20re%C3%A7u%20votre%20demande%20de%20mise%20en%20contact.`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-lg transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Contacter sur WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
