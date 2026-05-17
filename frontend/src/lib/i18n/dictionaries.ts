import type { Locale } from "./types";

export type Dictionary = {
  site: {
    name: string;
    fullName: string;
    tagline: string;
    location: string;
    metaTitle: string;
  };
  nav: {
    products: string;
    services: string;
    works: string;
    articles: string;
    startConsultation: string;
    more: string;
    menu: string;
  };
  footer: {
    newsletter: string;
    bookConsultation: string;
    admin: string;
  };
  hero: {
    cards: { title: string; subtitle: string; href: string; badge?: string }[];
  };
  works: {
    title: string;
    items: { title: string; tag: string; label: string; sub: string; gradient: string }[];
  };
  stats: {
    paragraph1: string;
    paragraph2: string;
    clients: string[];
  };
  products: {
    title: string;
    items: { title: string; price: string }[];
  };
  articles: {
    title: string;
    categories: string[];
  };
  servicesCta: {
    title: string;
    description: string;
    packages: string;
    contact: string;
  };
  newsletter: {
    title: string;
    placeholder: string;
    subscribe: string;
    success: string;
    error: string;
    invalidEmail: string;
  };
  contact: {
    name: string;
    email: string;
    company: string;
    message: string;
    nameRequired: string;
    emailInvalid: string;
    messageMin: string;
    send: string;
    success: string;
    error: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    companyPlaceholder: string;
    messagePlaceholder: string;
  };
  blog: {
    title: string;
    description: string;
    backHome: string;
    backToBlog: string;
    read: string;
    minRead: string;
    byAuthor: string;
    notFound: string;
  };
  resources: {
    title: string;
    description: string;
    backHome: string;
    download: string;
    requestDownload: string;
    newsletterTitle: string;
    newsletterDesc: string;
    contactTitle: string;
    contactDesc: string;
  };
  lang: {
    switchTo: string;
    ar: string;
    en: string;
  };
};

const ar: Dictionary = {
  site: {
    name: "نبيل",
    fullName: "نبيل — استشاري وريادي أعمال",
    tagline:
      "أساعد المؤسسين والخبراء على بناء مشاريع استشارية مربحة وبيع الخبرة بدل الخدمة.",
    location: "دبي / عن بُعد",
    metaTitle: "استشاري وريادي أعمال",
  },
  nav: {
    products: "المنتجات",
    services: "الخدمات",
    works: "الأعمال",
    articles: "المقالات",
    startConsultation: "ابدأ باستشارة",
    more: "المزيد",
    menu: "القائمة",
  },
  footer: {
    newsletter: "نشرة",
    bookConsultation: "احجز استشارة",
    admin: "لوحة التحكم",
  },
  hero: {
    cards: [
      { title: "ابدأ معي", subtitle: "احجز استشارة", href: "/resources#contact", badge: "online" },
      { title: "مقالات", subtitle: "+١٥٠ مقال في بيع الخبرة", href: "/blog" },
      { title: "اعمل معي", subtitle: "خدماتي وباقاتي", href: "/#services" },
    ],
  },
  works: {
    title: "أحدث أعمالي",
    items: [
      {
        title: "أكاديمية حضور",
        tag: "منصة تدريبية",
        label: "سهام الحضور",
        sub: "web design + branding",
        gradient: "from-[#c4a88a] to-[#8b7355]",
      },
      {
        title: "مشروع داخلي",
        tag: "هوية بصرية",
        label: "تصميم داخلي",
        sub: "branding + web",
        gradient: "from-[#3d3530] to-[#1a1614]",
      },
    ],
  },
  stats: {
    paragraph1:
      "خلال ٧ سنوات ساعدت +٨٠ مؤسس على بناء مشاريع استشارية. عملائي حققوا عوائد تصل إلى ٤٠٠٪ من خلال استراتيجية تمركز ومنتجات رقمية تُباع بدل ساعات الاستشارة.",
    paragraph2:
      "أقدّم خدمات في بناء العلامة، تصميم المواقع، وأنظمة المحتوى — مع فريق يضمن جودة تنفيذ عالية.",
    clients: ["McKinsey", "RASF", "wfrah", "MECA", "Hudoor", "Nashra"],
  },
  products: {
    title: "أحدث المنتجات",
    items: [
      { title: "كتب رقمية تفاعلية", price: "٣٥$" },
      { title: "دورة مسجّلة", price: "١٩٩$" },
      { title: "ورشة مسجّلة", price: "٩٩$" },
    ],
  },
  articles: {
    title: "آخر المقالات",
    categories: [
      "بناء المشروع والمنتجات",
      "الاستراتيجية والتمركز",
      "النمو والتسويق",
      "العملاء والمبيعات",
      "الإنتاجية والعادات",
      "العقلية والتحفيز",
    ],
  },
  servicesCta: {
    title: "تبحث عن خدماتي؟",
    description:
      "أعمل مع المؤسسين والخبراء على بناء مشاريع استشارية، منتجات رقمية، ومواقع احترافية تبيع الخبرة بدل الوقت—مع فريق تنفيذ متخصص.",
    packages: "الخدمات والباقات",
    contact: "تواصل معي",
  },
  newsletter: {
    title: "أحدث مقالاتي مباشرة في بريدك الإلكتروني",
    placeholder: "بريدك@example.com",
    subscribe: "اشترك",
    success: "تم الاشتراك بنجاح.",
    error: "حدث خطأ. حاول مرة أخرى.",
    invalidEmail: "يرجى إدخال بريد إلكتروني صحيح",
  },
  contact: {
    name: "الاسم",
    email: "البريد",
    company: "الشركة",
    message: "تفاصيل المشروع",
    nameRequired: "الاسم مطلوب",
    emailInvalid: "بريد إلكتروني صحيح",
    messageMin: "أخبرنا أكثر عن مشروعك",
    send: "إرسال",
    success: "شكراً—سنتواصل خلال يوم عمل.",
    error: "تعذّر الإرسال. راسلنا عبر البريد مباشرة.",
    namePlaceholder: "اسمك",
    emailPlaceholder: "you@email.com",
    companyPlaceholder: "اختياري",
    messagePlaceholder: "ما الذي تريد بناءه؟",
  },
  blog: {
    title: "المقالات",
    description: "رؤى عملية في بيع الخبرة وبناء المشاريع الاستشارية.",
    backHome: "الرئيسية",
    backToBlog: "العودة للمقالات",
    read: "اقرأ",
    minRead: "دقائق",
    byAuthor: "بقلم",
    notFound: "المقال غير موجود",
  },
  resources: {
    title: "المنتجات والموارد",
    description: "أدلة وقوالب مجانية—بالإضافة إلى منتجات رقمية مدفوعة قريباً.",
    backHome: "الرئيسية",
    download: "تحميل",
    requestDownload: "طلب التحميل",
    newsletterTitle: "النشرة البريدية",
    newsletterDesc: "أحدث المقالات مباشرة في بريدك.",
    contactTitle: "تواصل معي",
    contactDesc: "أخبرني عن مشروعك—أرد خلال يوم عمل.",
  },
  lang: {
    switchTo: "English",
    ar: "العربية",
    en: "English",
  },
};

const en: Dictionary = {
  site: {
    name: "Nabeel",
    fullName: "Nabeel — Consultant & Entrepreneur",
    tagline:
      "I help founders and experts build profitable consulting businesses and sell expertise—not hours.",
    location: "Dubai / Remote",
    metaTitle: "Consultant & Entrepreneur",
  },
  nav: {
    products: "Products",
    services: "Services",
    works: "Work",
    articles: "Articles",
    startConsultation: "Book a call",
    more: "More",
    menu: "Menu",
  },
  footer: {
    newsletter: "Newsletter",
    bookConsultation: "Book a call",
    admin: "Dashboard",
  },
  hero: {
    cards: [
      { title: "Start here", subtitle: "Book a consultation", href: "/resources#contact", badge: "online" },
      { title: "Articles", subtitle: "150+ posts on selling expertise", href: "/blog" },
      { title: "Work with me", subtitle: "Services & packages", href: "/#services" },
    ],
  },
  works: {
    title: "Latest work",
    items: [
      {
        title: "Hudoor Academy",
        tag: "Training platform",
        label: "Hudoor Presence",
        sub: "web design + branding",
        gradient: "from-[#c4a88a] to-[#8b7355]",
      },
      {
        title: "Internal project",
        tag: "Visual identity",
        label: "Interior design",
        sub: "branding + web",
        gradient: "from-[#3d3530] to-[#1a1614]",
      },
    ],
  },
  stats: {
    paragraph1:
      "Over 7 years I've helped 80+ founders build consulting businesses. Clients have seen returns up to 400% through focused positioning and digital products that sell expertise—not billable hours.",
    paragraph2:
      "Services include brand building, web design, and content systems—with a team that delivers execution at a high standard.",
    clients: ["McKinsey", "RASF", "wfrah", "MECA", "Hudoor", "Nashra"],
  },
  products: {
    title: "Latest products",
    items: [
      { title: "Interactive digital books", price: "$35" },
      { title: "Recorded course", price: "$199" },
      { title: "Recorded workshop", price: "$99" },
    ],
  },
  articles: {
    title: "Latest articles",
    categories: [
      "Product building",
      "Strategy & positioning",
      "Growth & marketing",
      "Clients & sales",
      "Productivity & habits",
      "Mindset & motivation",
    ],
  },
  servicesCta: {
    title: "Looking for my services?",
    description:
      "I partner with founders and experts to build consulting businesses, digital products, and professional websites that sell expertise—not time—with a dedicated execution team.",
    packages: "Services & packages",
    contact: "Get in touch",
  },
  newsletter: {
    title: "Get my latest articles in your inbox",
    placeholder: "you@email.com",
    subscribe: "Subscribe",
    success: "You're subscribed. Welcome aboard.",
    error: "Something went wrong. Try again.",
    invalidEmail: "Please enter a valid email",
  },
  contact: {
    name: "Name",
    email: "Email",
    company: "Company",
    message: "Project details",
    nameRequired: "Name is required",
    emailInvalid: "Valid email required",
    messageMin: "Tell us more about your project",
    send: "Send",
    success: "Thanks—we'll reply within one business day.",
    error: "Unable to send. Please email us directly.",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@email.com",
    companyPlaceholder: "Optional",
    messagePlaceholder: "What are you looking to build?",
  },
  blog: {
    title: "Articles",
    description: "Practical insights on selling expertise and building consulting businesses.",
    backHome: "Home",
    backToBlog: "Back to articles",
    read: "Read",
    minRead: "min read",
    byAuthor: "By",
    notFound: "Article not found",
  },
  resources: {
    title: "Products & resources",
    description: "Free guides and templates—plus paid digital products coming soon.",
    backHome: "Home",
    download: "Download",
    requestDownload: "Request download",
    newsletterTitle: "Newsletter",
    newsletterDesc: "Latest articles delivered to your inbox.",
    contactTitle: "Get in touch",
    contactDesc: "Tell me about your project—I reply within one business day.",
  },
  lang: {
    switchTo: "العربية",
    ar: "العربية",
    en: "English",
  },
};

const dictionaries: Record<Locale, Dictionary> = { ar, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.ar;
}
