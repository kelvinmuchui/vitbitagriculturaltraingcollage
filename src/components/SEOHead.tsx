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

const BASE_URL = 'https://vbitschoolofcoffeeandagribusiness.co.ke';

const SEO_MAP: Record<string, PageMeta> = {
  home: {
    title: "VIBIT Agricultural Training College | Coffee & Agribusiness Training Kenya",
    description: "VIBIT Agricultural Training College offers practical coffee, agriculture and agribusiness training in Kenya, preparing students for careers and entrepreneurship.",
    keywords: "VIBIT Agricultural Training College, VIBIT School of Coffee and Agribusiness, coffee school in nairobi, coffee college nairobi, barista school nairobi, best coffee school in nairobi, barista training in nairobi kenya, coffee training school nairobi, coffee cupping course nairobi, coffee roasting school westlands nairobi, tvet coffee courses nairobi, agribusiness courses kenya",
    path: "/",
    ogType: "website"
  },
  courses: {
    title: "Agriculture, Coffee & Agribusiness Courses in Kenya | VIBIT",
    description: "Explore TVET-accredited barista training, commercial coffee roasting, cupping, agronomy, and agribusiness management diploma courses at VIBIT in Nairobi, Kenya.",
    keywords: "coffee courses nairobi, barista training courses nairobi, coffee roasting school nairobi, coffee cupping certification kenya, barista diploma nairobi, agribusiness diploma kenya, tvet agriculture courses nairobi",
    path: "/courses",
    ogType: "website"
  },
  admissions: {
    title: "VIBIT Admissions 2026 | Courses, Requirements & Application",
    description: "Apply for 2026 intake at VIBIT Agricultural Training College. Check entry requirements, fee structures, and download application forms for coffee and agriculture courses.",
    keywords: "vibit admissions 2026, coffee school admissions nairobi, barista course fees nairobi, join coffee college kenya, vibit admissions westlands, agriculture college application kenya",
    path: "/admissions",
    ogType: "website"
  },
  about: {
    title: "About VIBIT Agricultural Training College | Nairobi, Kenya",
    description: "Learn about VIBIT Agricultural Training College in Nairobi, Kenya. TVET-accredited institution with SCA-aligned sensory labs, commercial roastery, and agronomy campus.",
    keywords: "about vibit agricultural training college, vibit school of coffee and agribusiness, coffee school history nairobi, top barista institute kenya, accredited agricultural college nairobi",
    path: "/about",
    ogType: "website"
  },
  contact: {
    title: "Contact VIBIT Agricultural Training College | Nairobi, Kenya",
    description: "Get in touch with VIBIT Agricultural Training College. Visit our campus at Leomar Court, Westlands Road No. 45, Nairobi. Call or WhatsApp +254 708 137992.",
    keywords: "contact vibit agricultural training college, vibit location westlands nairobi, coffee school whatsapp contact nairobi, barista training nairobi phone",
    path: "/contact",
    ogType: "website"
  },
  admin: {
    title: "Registrar Administration Portal | VIBIT Agricultural Training College",
    description: "VIBIT Agricultural Training College secure registrar and academic admissions portal.",
    keywords: "vibit admin portal",
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

