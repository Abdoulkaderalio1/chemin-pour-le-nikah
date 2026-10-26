export type Gender = 'brother' | 'sister';

export type MaritalStatus = 
  | 'Célibataire' 
  | 'Divorcé(e) sans enfant' 
  | 'Divorcé(e) avec enfant(s)' 
  | 'Veuf / Veuve';

export type NigerCity = 
  | 'Niamey'
  | 'Maradi'
  | 'Zinder'
  | 'Tahoua'
  | 'Agadez'
  | 'Dosso'
  | 'Diffa'
  | 'Tillabéri'
  | 'Diaspora (Extérieur)';

export interface Profile {
  id: string;
  referenceCode: string;
  gender: Gender;
  fullName: string; // Restreint à l'administration
  publicName: string; // Ex: Ibrahim M., Fatima A.
  age: number;
  city: NigerCity;
  quarter?: string;
  profession: string;
  education: string;
  maritalStatus: MaritalStatus;
  childrenCount: number;
  religiousPractice: string;
  heightCm?: number;
  bio: string;
  lookingFor: string;
  familyValues: string;
  mahramInfo?: string; // Tuteur pour les sœurs
  photos: [string, string]; // 2 photos récentes requises
  isVerified: boolean; // Statut de validation par l'administration
  createdAt: string;
}

export type PaymentMethod = 'airtel_money' | 'moov_flooz' | 'al_izza' | 'nita';

export interface ContactRequest {
  id: string;
  profileId: string;
  profileCode: string;
  profileName: string;
  profileCity: string;
  candidateName: string;
  candidatePhone: string;
  candidateCity: string;
  paymentMethod: PaymentMethod;
  transactionRef: string;
  proofPhoto?: string;
  status: 'pending' | 'verified' | 'contacted';
  notes?: string;
  createdAt: string;
}
