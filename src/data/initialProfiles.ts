import { Profile } from '../types';

export const INITIAL_PROFILES: Profile[] = [
  {
    id: 'prof-01',
    referenceCode: 'NK-227-01',
    gender: 'sister',
    fullName: 'Fatima Zahra Alio',
    publicName: 'Fatima Z.',
    age: 27,
    city: 'Niamey',
    quarter: 'Plateau / Koira Kano',
    profession: 'Enseignante au secondaire & Formatrice',
    education: 'Master en Sciences de l\'Éducation',
    maritalStatus: 'Célibataire',
    childrenCount: 0,
    religiousPractice: 'Pratiquante assidue, prières à l\'heure, cours de tajwid et de fiqh le week-end',
    heightCm: 168,
    bio: 'Femme calme, bienveillante et attachée aux valeurs traditionnelles nigériennes et islamiques. J\'aime la lecture, la cuisine en famille et l\'engagement associatif au profit des orphelins.',
    lookingFor: 'Un frère sérieux, pieux, ayant la crainte d\'Allah, doux de caractère et responsable, âgé de 28 à 38 ans, prêt pour le mariage dans les mois à venir.',
    familyValues: 'Le respect mutuel, la concertation (Choura) au sein du couple, l\'éducation des enfants dans l\'amour d\'Allah et de Son Prophète (SAW).',
    mahramInfo: 'Mon père (joignable via l\'administration lors de la mise en contact formelle).',
    photos: [
      '/src/assets/images/profile_sister_fatima_1793002626441.jpg',
      '/src/assets/images/profile_sister_fatima_1793002626441.jpg'
    ],
    isVerified: true,
    createdAt: '2026-10-20'
  },
  {
    id: 'prof-02',
    referenceCode: 'NK-227-02',
    gender: 'brother',
    fullName: 'Ibrahim Mahamane',
    publicName: 'Ibrahim M.',
    age: 30,
    city: 'Niamey',
    quarter: 'Yantala',
    profession: 'Ingénieur Télécom & Réseaux',
    education: 'Diplôme d\'Ingénieur (Bac+5)',
    maritalStatus: 'Célibataire',
    childrenCount: 0,
    religiousPractice: 'Prières en groupe à la mosquée du quartier, jeûnes surérogatoires, étude de la Sirah',
    heightCm: 178,
    bio: 'Simple, travailleur et tourné vers l\'avenir. Je vis et travaille à Niamey dans une entreprise de la place. J\'accorde une grande importance à la piété et au bien-être de mes proches.',
    lookingFor: 'Une sœur pudique, respectueuse, ayant un bon comportement (Husn al-khouluq) et le désir sincère de bâtir un foyer stable et harmonieux.',
    familyValues: 'Entente cordiale, bienveillance avec les belles-familles, simplicité et soutien réciproque dans l\'épreuve comme dans la facilité.',
    photos: [
      '/src/assets/images/profile_brother_ibrahim_1793002625266.jpg',
      '/src/assets/images/profile_brother_ibrahim_1793002625266.jpg'
    ],
    isVerified: true,
    createdAt: '2026-10-21'
  },
  {
    id: 'prof-03',
    referenceCode: 'NK-227-03',
    gender: 'sister',
    fullName: 'Aïchatou Souleymane',
    publicName: 'Aïchatou S.',
    age: 25,
    city: 'Maradi',
    quarter: 'Zongo',
    profession: 'Comptable dans une structure sanitaire',
    education: 'Licence en Finance & Comptabilité',
    maritalStatus: 'Célibataire',
    childrenCount: 0,
    religiousPractice: 'Voile légiféré, assiduité spirituelle, écoute régulière de conférences islamiques',
    heightCm: 165,
    bio: 'Originaire de Maradi, je suis une personne posée, souriante et attachée au respect des aînés. Je souhaite trouver un compagnon de vie pour cheminer ensemble vers le Paradis.',
    lookingFor: 'Un homme croyant, honnête, autonome financièrement et compréhensif, résidant à Maradi, Niamey ou prêt à s\'installer d\'un commun accord.',
    familyValues: 'Communication ouverte, fidélité aux préceptes coraniques, générosité et tranquillité du foyer.',
    mahramInfo: 'Mon grand frère aîné assure le rôle de tuteur en accord avec notre famille.',
    photos: [
      '/src/assets/images/profile_sister_aicha_1793002626832.jpg',
      '/src/assets/images/profile_sister_aicha_1793002626832.jpg'
    ],
    isVerified: true,
    createdAt: '2026-10-22'
  },
  {
    id: 'prof-04',
    referenceCode: 'NK-227-04',
    gender: 'brother',
    fullName: 'Abdoul-Kader Moussa',
    publicName: 'Abdoul-Kader M.',
    age: 34,
    city: 'Zinder',
    quarter: 'Birni',
    profession: 'Cadre administratif & Entrepreneur agricole',
    education: 'Master en Gestion de Projets',
    maritalStatus: 'Divorcé(e) sans enfant',
    childrenCount: 0,
    religiousPractice: 'Très régulier dans les obligations religieuses, membre du comité de gestion de la mosquée',
    heightCm: 182,
    bio: 'Homme d\'honneur, expérimenté et posé. Après une épreuve de vie passée sans animosité, je cherche à refaire ma vie sur des bases saines, sincères et conformes à l\'Islam.',
    lookingFor: 'Une femme mûre (24-34 ans), pieuse, compréhensive, désireuse d\'avoir des enfants et de construire un foyer chaleureux à Zinder ou Niamey.',
    familyValues: 'La paix du cœur (Sakina), la loyauté absolue, la clarté et l\'entraide quotidienne.',
    photos: [
      '/src/assets/images/profile_brother_abdoul_1793002626486.jpg',
      '/src/assets/images/profile_brother_abdoul_1793002626486.jpg'
    ],
    isVerified: true,
    createdAt: '2026-10-23'
  }
];
