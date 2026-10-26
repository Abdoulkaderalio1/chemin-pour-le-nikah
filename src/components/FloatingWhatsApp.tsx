import React from 'react';
import { MessageSquare } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const phone = '22799614098';
  const message = 'Salam alaykoum l\'administration Le Chemin pour le Nikah. Je vous contacte pour des renseignements.';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <aside aria-label="Contact direct" className="fixed bottom-6 right-6 z-40">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium text-xs sm:text-sm rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
        title="Contacter l'administration sur WhatsApp (+227 99 61 40 98)"
      >
        <MessageSquare className="w-5 h-5 fill-white" />
        <span className="font-semibold whitespace-nowrap">WhatsApp Admin</span>
      </a>
    </aside>
  );
};
