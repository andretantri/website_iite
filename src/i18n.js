import { createContext, createElement, useContext } from 'react'

const translations = {
  id: {
    nav: {
      home: 'Home',
      about: 'Tentang',
      activities: 'Kegiatan',
      timeline: 'Timeline',
      contact: 'Kontak',
      contactBtn: 'Hubungi Kami',
      languageLabel: 'EN',
    },
    hero: {
      badge: 'International Innovation Technology Expo',
      description: '"Innovative products from the green industry to address future skills, social, and demographic challenges." Bergabung dalam acara hibrida yang menghubungkan ide teknologi hijau global.',
      time: 'Waktu',
      location: 'Lokasi',
      organizer: 'Penyelenggara',
      summary: 'Aksi inovasi hijau, seminar internasional, kompetisi produk, poster akademik, dan penghargaan MSMEs di satu platform digital futuristik.',
      cta: 'Daftar Sekarang',
      countdown: 'Countdown menuju IITE 2026',
      sliderLabel: 'Spotlight',
      sliderHeading: 'Sampul acara dan agenda unggulan',
      slides: [
        {
          title: 'Highlight 1',
          subtitle: 'Seminar internasional dan panel diskusi teknologi hijau',
        },
        {
          title: 'Highlight 2',
          subtitle: 'Kompetisi inovasi untuk generasi ready-for-future',
        },
        {
          title: 'Highlight 3',
          subtitle: 'Pameran poster dan proceeding dari riset berkelanjutan',
        },
      ],
    },
    about: {
      tag: 'Tentang Acara',
      heading: 'Inovasi industri hijau untuk kompetensi dan tantangan masa depan',
      description: 'IITE 2026 menghadirkan platform bagi inovator, akademisi, dan pelaku industri untuk memperlihatkan solusi ramah lingkungan yang relevan terhadap perubahan sosial, demografi, dan kebutuhan keterampilan masa depan.',
      programTitle: 'Fokus Program',
      programText: 'Menyatukan kegiatan kompetisi, seminar internasional, ekspose proceeding, dan penghargaan IKM untuk memperkuat ekosistem teknologi hijau yang inklusif dan berkelanjutan.',
      benefitTitle: 'Manfaat Peserta',
      benefitText: 'Peserta mendapatkan wawasan global, jaringan internasional, dan pengalaman digital hybrid untuk mempersiapkan diri dalam menghadapi tantangan demografis dan sosial di era industri hijau.',
    },
    activities: {
      tag: 'Kegiatan Utama',
      heading: 'Empat kategori acara yang mendukung ekosistem hijau',
      description: 'Setiap kategori dirancang untuk menampilkan inovasi teknologi, hasil penelitian, dan pemberdayaan UMKM dengan semangat keberlanjutan.',
      cards: [
        {
          title: 'Innovation Competition',
          description: 'Kompetisi produk inovatif berbasis industri hijau untuk solusi keterampilan masa depan dan tantangan sosial.',
          accent: 'cyan',
        },
        {
          title: 'Proceeding & Poster',
          description: 'Publikasi akademik dan poster penelitian yang memvisualisasikan strategi teknologi ramah lingkungan.',
          accent: 'emerald',
        },
        {
          title: 'International Seminar',
          description: 'Sesi internasional dengan pembicara ahli untuk membahas tren teknologi hijau dan transformasi demografi.',
          accent: 'cyan',
        },
        {
          title: 'MSMEs Award',
          description: 'Penghargaan untuk pelaku UMKM yang menunjukkan inovasi bisnis hijau dan dampak sosial di komunitas.',
          accent: 'emerald',
        },
      ],
    },
    timeline: {
      tag: 'Timeline',
      heading: 'Fase pendaftaran dan acara',
      description: 'Kalender kegiatan IITE 2026 yang membantu peserta merencanakan pendaftaran, persiapan, dan keikutsertaan pada acara utama.',
      milestones: [
        {
          label: 'Pendaftaran dibuka',
          date: '20 Maret 2026',
          detail: 'Registrasi peserta dan pengumpulan abstrak untuk seluruh kategori acara.',
        },
        {
          label: 'Review proposal',
          date: 'April - Mei 2026',
          detail: 'Tim juri menilai inovasi, proposal poster, dan hasil proceeding secara objektif.',
        },
        {
          label: 'Pengumuman finalis',
          date: 'Awal Juli 2026',
          detail: 'Peserta yang lolos akan dipersiapkan untuk presentasi dan seminar internasional.',
        },
        {
          label: 'Acara utama',
          date: '22 - 23 Juli 2026',
          detail: 'Sesi seminar, kompetisi, presentasi poster, dan pengumuman pemenang MSMEs Award.',
        },
      ],
    },
    contact: {
      tag: 'Kontak',
      heading: 'Hubungi Panitia IITE 2026',
      description: 'Dapatkan informasi pendaftaran, panduan teknis, dan bantuan langsung dari tim penyelenggara acara.',
      address: 'Alamat',
      phone: 'Telepon',
      socialTitle: 'Sosial Media',
      instagram: 'Instagram: @iite2026',
      linkedin: 'LinkedIn: Politeknik Indonusa Surakarta',
      zoom: 'Zoom Hybrid Event Link akan diumumkan via email',
    },
    footer: {
      copy1: '© 2026 Politeknik Indonusa Surakarta. IITE 2026.',
      copy2: 'Desain SPA responsif dengan React + Vite + Tailwind CSS.',
    },
    countdown: {
      title: 'Countdown menuju IITE 2026',
      labels: ['Hari', 'Jam', 'Menit', 'Detik'],
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      activities: 'Activities',
      timeline: 'Timeline',
      contact: 'Contact',
      contactBtn: 'Contact Us',
      languageLabel: 'ID',
    },
    hero: {
      badge: 'International Innovation Technology Expo',
      description: '"Innovative products from the green industry to address future skills, social, and demographic challenges." Join a hybrid event that connects global green technology ideas.',
      time: 'Time',
      location: 'Location',
      organizer: 'Organizer',
      summary: 'Green innovation action, international seminars, product competitions, academic posters, and MSMEs awards in one futuristic digital platform.',
      cta: 'Register Now',
      countdown: 'Countdown to IITE 2026',
      sliderLabel: 'Spotlight',
      sliderHeading: 'Event cover and featured agenda',
      slides: [
        {
          title: 'Highlight 1',
          subtitle: 'International seminar and green technology discussion panels',
        },
        {
          title: 'Highlight 2',
          subtitle: 'Innovation competition for future-ready generations',
        },
        {
          title: 'Highlight 3',
          subtitle: 'Poster exhibition and proceedings from sustainable research',
        },
      ],
    },
    about: {
      tag: 'About Event',
      heading: 'Green industry innovation for future skills and challenges',
      description: 'IITE 2026 provides a platform for innovators, academics, and industry players to showcase eco-friendly solutions relevant to social, demographic, and future skills changes.',
      programTitle: 'Program Focus',
      programText: 'Bringing together competitions, international seminars, proceeding showcases, and MSMEs awards to strengthen an inclusive green technology ecosystem.',
      benefitTitle: 'Participant Benefits',
      benefitText: 'Participants gain global insights, international networks, and hybrid digital experience to prepare for demographic and social challenges in the green industry era.',
    },
    activities: {
      tag: 'Main Activities',
      heading: 'Four event categories supporting the green ecosystem',
      description: 'Each category is designed to showcase technology innovation, research outcomes, and MSMEs empowerment with sustainability spirit.',
      cards: [
        {
          title: 'Innovation Competition',
          description: 'Innovative product competition based on the green industry for future skills and social challenge solutions.',
          accent: 'cyan',
        },
        {
          title: 'Proceeding & Poster',
          description: 'Academic publication and poster research visualizing environmentally friendly strategies.',
          accent: 'emerald',
        },
        {
          title: 'International Seminar',
          description: 'International sessions with expert speakers to discuss green technology trends and demographic transformation.',
          accent: 'cyan',
        },
        {
          title: 'MSMEs Award',
          description: 'Award for MSMEs that demonstrate green business innovation and social impact in the community.',
          accent: 'emerald',
        },
      ],
    },
    timeline: {
      tag: 'Timeline',
      heading: 'Registration and event phases',
      description: 'The IITE 2026 activity calendar helps participants plan registration, preparation, and attendance at the main event.',
      milestones: [
        {
          label: 'Registration opens',
          date: 'March 20, 2026',
          detail: 'Participant registration and abstract submission for all event categories.',
        },
        {
          label: 'Proposal review',
          date: 'April - May 2026',
          detail: 'Judges review innovation, poster proposals, and proceeding work objectively.',
        },
        {
          label: 'Finalist announcement',
          date: 'Early July 2026',
          detail: 'Participants who pass will be prepared for presentations and international seminar sessions.',
        },
        {
          label: 'Main event',
          date: 'July 22 - 23, 2026',
          detail: 'Seminar sessions, competitions, poster presentations, and MSMEs Award winners announcement.',
        },
      ],
    },
    contact: {
      tag: 'Contact',
      heading: 'Contact the IITE 2026 Committee',
      description: 'Get registration information, technical guidance, and direct support from the event organizing team.',
      address: 'Address',
      phone: 'Phone',
      socialTitle: 'Social Media',
      instagram: 'Instagram: @iite2026',
      linkedin: 'LinkedIn: Politeknik Indonusa Surakarta',
      zoom: 'Zoom Hybrid Event Link will be announced via email',
    },
    footer: {
      copy1: '© 2026 Politeknik Indonusa Surakarta. IITE 2026.',
      copy2: 'Responsive SPA design with React + Vite + Tailwind CSS.',
    },
    countdown: {
      title: 'Countdown to IITE 2026',
      labels: ['Days', 'Hours', 'Minutes', 'Seconds'],
    },
  },
}

const LanguageContext = createContext({
  language: 'id',
  toggleLanguage: () => {},
})

export function LanguageProvider({ language, toggleLanguage, children }) {
  return createElement(LanguageContext.Provider, { value: { language, toggleLanguage } }, children)
}

export function useLanguage() {
  return useContext(LanguageContext)
}

export function useTranslation() {
  const { language } = useContext(LanguageContext)
  return translations[language] || translations.id
}
