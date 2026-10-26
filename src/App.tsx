import React, { useState, useEffect } from 'react';
import { Profile, ContactRequest } from './types';
import { INITIAL_PROFILES } from './data/initialProfiles';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { ProfileList } from './components/ProfileList';
import { ProfileDetailModal } from './components/ProfileDetailModal';
import { ContactModal } from './components/ContactModal';
import { CreateProfileModal } from './components/CreateProfileModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { EthicalCommitment } from './components/EthicalCommitment';
import { MarriageAdvice } from './components/MarriageAdvice';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

const STORAGE_PROFILES_KEY = 'le_chemin_nikah_profiles_v1';
const STORAGE_REQUESTS_KEY = 'le_chemin_nikah_requests_v1';

export default function App() {
  // Profiles state with local persistence
  const [profiles, setProfiles] = useState<Profile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PROFILES_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_PROFILES;
  });

  // Contact requests state
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_REQUESTS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'req-sample-01',
        profileId: 'prof-01',
        profileCode: 'NK-227-01',
        profileName: 'Fatima Z.',
        profileCity: 'Niamey',
        candidateName: 'Amadou Harouna',
        candidatePhone: '+227 96 12 34 56',
        candidateCity: 'Niamey',
        paymentMethod: 'airtel_money',
        transactionRef: 'AM-981042-998',
        status: 'verified',
        createdAt: '2026-10-24'
      }
    ];
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PROFILES_KEY, JSON.stringify(profiles));
    } catch {
      // ignore
    }
  }, [profiles]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_REQUESTS_KEY, JSON.stringify(contactRequests));
    } catch {
      // ignore
    }
  }, [contactRequests]);

  // Modals state
  const [detailProfile, setDetailProfile] = useState<Profile | null>(null);
  const [contactProfile, setContactProfile] = useState<Profile | null>(null);
  const [isCreateProfileOpen, setIsCreateProfileOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Profile actions
  const handleCreateProfile = (newProfile: Profile) => {
    setProfiles((prev) => [newProfile, ...prev]);
  };

  const handleApproveProfile = (profileId: string) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === profileId ? { ...p, isVerified: true } : p))
    );
  };

  const handleRejectProfile = (profileId: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== profileId));
  };

  const handleDeleteProfile = (profileId: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== profileId));
  };

  // Contact Request actions
  const handleSubmitContactRequest = (newRequest: Omit<ContactRequest, 'id' | 'createdAt'>) => {
    const fullRequest: ContactRequest = {
      ...newRequest,
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setContactRequests((prev) => [fullRequest, ...prev]);
  };

  const handleUpdateContactStatus = (requestId: string, status: ContactRequest['status']) => {
    setContactRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status } : r))
    );
  };

  const handleResetToDefaults = () => {
    setProfiles(INITIAL_PROFILES);
    localStorage.removeItem(STORAGE_PROFILES_KEY);
  };

  const pendingCount = profiles.filter((p) => !p.isVerified).length;

  const scrollToProfiles = () => {
    const el = document.getElementById('celibataires');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-800 selection:bg-amber-200 selection:text-emerald-950">
      
      {/* 3-Zone Header */}
      <Header
        onCreateProfile={() => setIsCreateProfileOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        pendingProfilesCount={pendingCount}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreProfiles={scrollToProfiles}
          onCreateProfile={() => setIsCreateProfileOpen(true)}
        />

        {/* The 6 Steps: Comment ça marche */}
        <HowItWorks
          onCreateProfile={() => setIsCreateProfileOpen(true)}
          onExploreProfiles={scrollToProfiles}
        />

        {/* Directory of verified singles */}
        <ProfileList
          profiles={profiles}
          onSelectProfile={(p) => setDetailProfile(p)}
          onRequestContact={(p) => setContactProfile(p)}
          onCreateProfile={() => setIsCreateProfileOpen(true)}
        />

        {/* Ethical commitment & zero tolerance */}
        <EthicalCommitment />

        {/* Marriage advice, pillars and FAQ */}
        <MarriageAdvice />
      </main>

      {/* Quiet, verified footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onCreateProfile={() => setIsCreateProfileOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Modals */}
      <ProfileDetailModal
        profile={detailProfile}
        onClose={() => setDetailProfile(null)}
        onRequestContact={(p) => {
          setDetailProfile(null);
          setContactProfile(p);
        }}
      />

      <ContactModal
        profile={contactProfile}
        onClose={() => setContactProfile(null)}
        onSubmitRequest={handleSubmitContactRequest}
      />

      <CreateProfileModal
        isOpen={isCreateProfileOpen}
        onClose={() => setIsCreateProfileOpen(false)}
        onSubmitProfile={handleCreateProfile}
      />

      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        profiles={profiles}
        contactRequests={contactRequests}
        onApproveProfile={handleApproveProfile}
        onRejectProfile={handleRejectProfile}
        onDeleteProfile={handleDeleteProfile}
        onUpdateContactStatus={handleUpdateContactStatus}
        onResetToDefaults={handleResetToDefaults}
      />

    </div>
  );
}
