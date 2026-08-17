import { useEffect } from 'react';

interface SEOHeadProps {
  currentView: string;
}

interface PageMeta {
  title: string;
  description: string;
  keywords: string;
  path: string;
  ogType: string;
  isNoIndex?: boolean;
}

const BASE_URL = 'https://vibitagriculturaltrainingcollege.co.ke';

const SEO_MAP: Record<string, PageMeta> = {
  home: {
    title: "VIBIT Agricultural Training College Kenya | Agriculture Courses & Training",
    description: "VIBIT Agricultural Training College offers practical agricultural education and training in Kenya. Explore agriculture courses, admissions, fees, entry requirements and how to apply.",
    keywords: "VIBIT Agricultural Training College, agricultural training college Kenya, agricultural college Kenya, agriculture college Nairobi, agriculture courses Kenya, coffee training Kenya, barista training Kenya, barista training Nairobi, agribusiness courses Kenya, coffee technology course Kenya",
    path: "/",
    ogType: "website"
  },
  courses: {
    title: "Agriculture, Coffee & Agribusiness Courses in Kenya | VIBIT Agricultural Training College",
    description: "Explore accredited courses in coffee technology, barista skills, commercial coffee roasting, cupping, agronomy, and agribusiness management at VIBIT in Nairobi, Kenya.",
    keywords: "agriculture courses Kenya, coffee courses Kenya, barista training Nairobi, coffee roasting training Kenya, coffee cupping course Kenya, agribusiness training Kenya, vocational agricultural training Nairobi",
    path: "/courses",
    ogType: "website"
  },
  admissions: {
    title: "VIBIT Admissions | Courses, Requirements & Application",
    description: "Apply for upcoming intakes at VIBIT Agricultural Training College. View admission requirements, course schedules, tuition fee structures, and application procedures.",
    keywords: "VIBIT admissions, agricultural college intake Kenya, coffee school admissions Nairobi, barista course fees Nairobi, agriculture college application Kenya",
    path: "/admissions",
    ogType: "website"
  },
  about: {
    title: "About VIBIT Agricultural Training College | Nairobi, Kenya",
    description: "Learn about VIBIT Agricultural Training College in Nairobi, Kenya. TVET-accredited institution specializing in practical agriculture, specialty coffee labs, and agribusiness leadership.",
    keywords: "about VIBIT Agricultural Training College, accredited agricultural college Nairobi, coffee school Nairobi, agricultural education Kenya, VIBIT college profile",
    path: "/about",
    ogType: "website"
  },
  contact: {
    title: "Contact VIBIT Agricultural Training College | Nairobi, Kenya",
    description: "Contact VIBIT Agricultural Training College. Located at Leomar Court, 45 Westlands Road, Nairobi. Call or WhatsApp 0708 137992 or email vbitschoolofcoffeagribusiness@gmail.com.",
    keywords: "contact VIBIT Agricultural Training College, VIBIT location Westlands Nairobi, coffee school phone Nairobi, barista training WhatsApp contact, agricultural college address",
    path: "/contact",
    ogType: "website"
  },
  resources: {
    title: "Agricultural Training & Career Guides Kenya | VIBIT Agricultural Training College",
    description: "Comprehensive agricultural education guides in Kenya. Explore top agriculture courses, agribusiness ventures, coffee & barista careers, entry requirements, and admission steps.",
    keywords: "agriculture courses in Kenya, agribusiness in Kenya, agricultural careers in Kenya, coffee school Nairobi, barista training Kenya requirements, agriculture college fees Kenya",
    path: "/resources",
    ogType: "article"
  },
  admin: {
    title: "Registrar Administration Portal | VIBIT Agricultural Training College",
    description: "VIBIT Agricultural Training College internal registrar and student administration portal.",
    keywords: "VIBIT admin portal",
    path: "/admin",
    ogType: "website",
    isNoIndex: true
  }
};

export default function SEOHead({ currentView }: SEOHeadProps) {
  useEffect(() => {
    const meta = SEO_MAP[currentView] || SEO_MAP.home;
    const pageUrl = `${BASE_URL}${meta.path === '/' ? '' : meta.path}`;
    const pageImage = `${BASE_URL}/og-image.jpg`;

    // 1. Page Title
    document.title = meta.title;

    // Helper for meta tags
    const updateOrCreateMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.querySelector(selector);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute(isProperty ? 'property' : 'name', name);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };

    // 2. Standard Meta Tags
    updateOrCreateMeta('description', meta.description);
    updateOrCreateMeta('keywords', meta.keywords);
    updateOrCreateMeta('author', 'VIBIT Agricultural Training College');
    updateOrCreateMeta('robots', meta.isNoIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 3. Open Graph Tags
    updateOrCreateMeta('og:title', meta.title, true);
    updateOrCreateMeta('og:description', meta.description, true);
    updateOrCreateMeta('og:url', pageUrl, true);
    updateOrCreateMeta('og:type', meta.ogType, true);
    updateOrCreateMeta('og:site_name', 'VIBIT Agricultural Training College', true);
    updateOrCreateMeta('og:image', pageImage, true);
    updateOrCreateMeta('og:locale', 'en_KE', true);

    // 4. Twitter Tags
    updateOrCreateMeta('twitter:card', 'summary_large_image');
    updateOrCreateMeta('twitter:title', meta.title);
    updateOrCreateMeta('twitter:description', meta.description);
    updateOrCreateMeta('twitter:image', pageImage);

    // 5. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', pageUrl);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', pageUrl);
      document.head.appendChild(canonical);
    }

    // 6. Dynamic Breadcrumb & WebPage Structured Data
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": BASE_URL
        },
        ...(meta.path !== '/' ? [{
          "@type": "ListItem",
          "position": 2,
          "name": currentView.charAt(0).toUpperCase() + currentView.slice(1),
          "item": pageUrl
        }] : [])
      ]
    };

    let schemaScript = document.getElementById('dynamic-page-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'dynamic-page-schema';
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(breadcrumbSchema);

  }, [currentView]);

  return null;
}

