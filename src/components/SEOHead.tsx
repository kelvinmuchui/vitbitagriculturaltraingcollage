import { useEffect } from 'react';

interface SEOHeadProps {
  currentView: string;
}

const SEO_MAP: Record<string, { title: string; description: string; keywords: string }> = {
  home: {
    title: "Best Coffee School in Nairobi | VIBIT Agricultural Training College Kenya",
    description: "VIBIT is the premier accredited coffee school in Nairobi, Kenya. TVET-certified courses in Barista Skills, Coffee Cupping & Q-Grading, Commercial Roasting, and Agribusiness in Westlands, Nairobi. Enroll today!",
    keywords: "coffee school in nairobi, coffee college nairobi, barista school nairobi, best coffee school in nairobi, barista training in nairobi kenya, coffee cupping course nairobi"
  },
  courses: {
    title: "Barista Courses & Coffee Training in Nairobi | VIBIT Coffee School Catalog",
    description: "Explore accredited barista courses, coffee roasting masterclasses, cupping certificates, and agribusiness diplomas at VIBIT Coffee School in Westlands, Nairobi.",
    keywords: "coffee courses nairobi, barista training courses nairobi, coffee roasting school nairobi, coffee cupping certification kenya, barista diploma nairobi"
  },
  admissions: {
    title: "Apply to VIBIT Coffee School Nairobi | Admissions & Tuition Fees",
    description: "Apply online for barista training, coffee processing, and agribusiness programs at VIBIT Coffee College Nairobi. View flexible fee structures and admission requirements.",
    keywords: "coffee school admissions nairobi, barista course fees nairobi, join coffee college kenya, vibit admissions westlands"
  },
  about: {
    title: "About VIBIT | The Premier Coffee & Agriscience Training College in Nairobi",
    description: "Learn about VIBIT Agricultural Training College in Nairobi, Kenya. TVET-accredited institution dedicated to specialty coffee excellence, barista mastery, and agronomy.",
    keywords: "about vibit coffee college, coffee school history nairobi, top barista institute kenya, accredited agricultural college nairobi"
  },
  contact: {
    title: "Contact VIBIT Coffee School Nairobi | Westlands Location, Phone & WhatsApp",
    description: "Get in touch with VIBIT Coffee School in Nairobi. Located at Leomar Court, Westlands Road No. 45. Call or WhatsApp +254 708 137992 or email info@vibitcollege.ac.ke.",
    keywords: "contact coffee school nairobi, vibit location westlands, barista training whatsapp contact nairobi"
  },
  admin: {
    title: "Registrar Portal | VIBIT Coffee College Management",
    description: "VIBIT College internal administrative portal.",
    keywords: "vibit admin"
  }
};

export default function SEOHead({ currentView }: SEOHeadProps) {
  useEffect(() => {
    const meta = SEO_MAP[currentView] || SEO_MAP.home;
    document.title = meta.title;

    // Update Meta Description
    let descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', meta.description);
    } else {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      descMeta.setAttribute('content', meta.description);
      document.head.appendChild(descMeta);
    }

    // Update Meta Keywords
    let kwMeta = document.querySelector('meta[name="keywords"]');
    if (kwMeta) {
      kwMeta.setAttribute('content', meta.keywords);
    } else {
      kwMeta = document.createElement('meta');
      kwMeta.setAttribute('name', 'keywords');
      kwMeta.setAttribute('content', meta.keywords);
      document.head.appendChild(kwMeta);
    }
  }, [currentView]);

  return null;
}
