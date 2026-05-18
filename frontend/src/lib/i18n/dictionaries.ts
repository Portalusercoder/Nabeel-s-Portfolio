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
    badgeLabel: string;
    badgeYear: string;
    loadMore: string;
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
    badgeYear: string;
    badgeLabel: string;
    heroTitle: string;
    heroSubtitle: string;
    getFileCta: string;
    previewTopics: { title: string; excerpt: string }[];
    highlights: string[];
    formHeading: string;
    firstNamePlaceholder: string;
    emailPlaceholder: string;
    downloadCta: string;
    formSuccess: string;
    formError: string;
    firstNameRequired: string;
    emailInvalid: string;
  };
  lang: {
    switchTo: string;
    ar: string;
    en: string;
  };
  admin: {
    title: string;
    loginTitle: string;
    loginDesc: string;
    email: string;
    password: string;
    login: string;
    loggingIn: string;
    invalidLogin: string;
    strapiLink: string;
    strapiAdmin: string;
    logout: string;
    posts: string;
    subscribers: string;
    newPost: string;
    editPost: string;
    save: string;
    titleLabel: string;
    slugLabel: string;
    excerptLabel: string;
    contentLabel: string;
    category: string;
    date: string;
    actions: string;
    loading: string;
    noSubscribers: string;
    strapiNote: string;
    emailCol: string;
    nameCol: string;
    sourceCol: string;
    subscribedCol: string;
    validationTitle: string;
    validationContent: string;
    deleteConfirm: string;
    deleteFailed: string;
    blogPostsStat: string;
    newsletterStat: string;
    strapiBackend: string;
    strapiConnected: string;
    strapiOffline: string;
    strapiOfflineShort: string;
    syncFromSite: string;
    syncing: string;
    syncFailed: string;
    localOnly: string;
    inStrapi: string;
    statusCol: string;
    localOnlyHint: string;
    readTimeLabel: string;
    publishToStrapi: string;
    publishToStrapiHint: string;
    loginUserHint: string;
    loginWrongUser: string;
    loginUnreachable: string;
    loginMisconfigured: string;
  };
};

const ar: Dictionary = {
  site: {
    name: "نبيل",
    fullName: "نحو تحويل الأفكار إلى قصص نجاح رقمية",
    tagline: "نساعدك على تحقيق رؤيتك في عالم التسويق والتجارة الإلكترونية",
    location: "نبيل الجابري — أخصائي تسويق وتجارة إلكترونية ومؤثر",
    metaTitle: "خبير تسويق وتجارة إلكترونية",
  },
  nav: {
    products: "كتيب تجهيز الحملات",
    services: "الرئيسية",
    works: "الخبرات",
    articles: "المدونة",
    startConsultation: "تواصل معي",
    more: "المزيد",
    menu: "القائمة",
  },
  footer: {
    newsletter: "المدونة",
    bookConsultation: "تواصل معي",
    admin: "لوحة التحكم",
  },
  hero: {
    cards: [
      { title: "تواصل معي", subtitle: "احجز استشارة", href: "resources#contact", badge: "online" },
      { title: "المدونة", subtitle: "مقالات في التسويق والتجارة الإلكترونية", href: "blog" },
      { title: "كتيب الحملات", subtitle: "تجهيز حملاتك التسويقية", href: "resources" },
    ],
  },
  works: {
    title: "الخبرات واللقاءات",
    items: [
      {
        title: "وكالة رادار",
        tag: "تسويق ونمو",
        label: "المدير التنفيذي",
        sub: "2022 — الآن",
        gradient: "from-[#3a3a3a] to-[#0a0a0a]",
      },
      {
        title: "لقاء تلفزيوني",
        tag: "صباح السعودية",
        label: "القناة الأولى",
        sub: "لقاءات تلفزيونية",
        gradient: "from-[#2a2a2a] to-[#0a0a0a]",
      },
    ],
  },
  stats: {
    paragraph1:
      "ما كنت أبحث عن \"طريقة أبيع أكثر\"، كنت أبحث عن وش اللي يخلي المشاريع تنجح فعلاً. ومن هنا بدأت رحلتي في التجارة الإلكترونية والتسويق الرقمي. خلال السنوات، اشتغلت مع عشرات العلامات التجارية في السعودية والخليج، وشفت عن قرب وش يفرق بين إعلان يصرف... وإستراتيجية تبني نمو حقيقي.",
    paragraph2:
      "أسست رادار لتكون شريك نمو، مو مجرد وكالة. نقيس كل شيء، نحلل الأرقام، ونحوّل البيانات إلى قرارات تخلي النتائج تتكلم. هدفي اليوم: أساعدك تشوف الصورة كاملة، وتبني منظومة نمو ترفع أداءك وتضاعف مبيعاتك.",
    clients: ["Lafemzin", "منشآت", "زد", "ماي الورد", "مركز دلني", "سلة"],
  },
  products: {
    title: "الموارد والخدمات",
    items: [
      { title: "كتيب تجهيز الحملات", price: "مجاني" },
      { title: "ملف الأعمال", price: "PDF" },
      { title: "استشارة", price: "احجز" },
    ],
  },
  articles: {
    title: "آخر المقالات",
    categories: [
      "التجارة الإلكترونية",
      "التسويق الرقمي",
      "التسعير والمبيعات",
      "سلوك المستهلك",
      "النمو",
      "ريادة الأعمال",
    ],
  },
  servicesCta: {
    title: "نبيل الجابري — خبير في التسويق والتجارة الإلكترونية",
    description:
      "يشارك رواد الأعمال حول النمو الرقمي، وبناء العلامات التجارية، ومستقبل الأعمال عبر الإنترنت.",
    packages: "ملف الأعمال لنبيل",
    contact: "احجز استشارة",
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
    messagePlaceholder: "كيف يمكنني مساعدتك؟",
  },
  blog: {
    title: "من السوق لك",
    description:
      "مقالات وتحليلات متعمقة في مجالات التسويق والتجارة الإلكترونية والابتكار الرقمي لصناعة أفكار تقود النمو.",
    badgeLabel: "المدونة",
    badgeYear: "2025",
    loadMore: "تحميل المزيد",
    backHome: "الرئيسية",
    backToBlog: "العودة للمدونة",
    read: "اقرأ",
    minRead: "دقائق",
    byAuthor: "بقلم",
    notFound: "المقال غير موجود",
  },
  resources: {
    title: "كتيب تجهيز الحملات",
    description:
      "راجع 9 عناصر أساسية قبل إطلاق حملتك التسويقية—دليل مجاني من نبيل الجابري.",
    badgeYear: "2025",
    badgeLabel: "كتيب تجهيز الحملات",
    heroTitle: "هل حملتك فعلاً جاهزة؟",
    heroSubtitle: "راجع هالـ 9 عناصر قبل لا تبدأ وتصرف ريال واحد",
    getFileCta: "أحصل على الملف",
    previewTopics: [
      {
        title: "موقع البطيء يحرق الميزانية بدون ما تدري",
        excerpt:
          "موقع يأخذ 7 ثوانٍ على الجوال يعني ميزانية ضائعة. بعد التحسين لأقل من 3 ثوانٍ ارتفع التحويل 60%. قيس صفحتك عبر pagespeed.web.dev",
      },
      {
        title: "الناس تكره المفاجآت... خصوصاً إذا كانت سلبية",
        excerpt:
          "إعلان يعد بخصم 30% والعميل لا يجده فور الدخول؟ يشعر بالخداع ويغادر. الوضوح قبل النقر يوفر الميزانية ويرفع الثقة.",
      },
      {
        title: "جاهزة فعلاً؟",
        excerpt: "قائمة تحقق عملية قبل الإطلاق—لتتأكد أن كل عنصر جاهز قبل أول ريال إعلان.",
      },
    ],
    highlights: [
      "زوايا جديدة للتفكير في التسويق والمبيعات",
      "أمثلة واقعية من السوق المحلي والخليجي",
      "تبسيط المفاهيم اللي الكل يعقدها",
    ],
    formHeading: "هل حملتك فعلاً جاهزة؟",
    firstNamePlaceholder: "اسمك الأول",
    emailPlaceholder: "الإيميل",
    downloadCta: "حمل الدليل",
    formSuccess: "تم الإرسال—تحقق من بريدك للحصول على الدليل.",
    formError: "حدث خطأ. حاول مرة أخرى.",
    firstNameRequired: "الاسم مطلوب",
    emailInvalid: "بريد إلكتروني صحيح",
  },
  lang: {
    switchTo: "English",
    ar: "العربية",
    en: "English",
  },
  admin: {
    title: "لوحة التحكم",
    loginTitle: "لوحة التحكم",
    loginDesc: "سجّل الدخول بحساب Strapi",
    email: "البريد",
    password: "كلمة المرور",
    login: "دخول",
    loggingIn: "جاري الدخول...",
    invalidLogin: "بيانات الدخول غير صحيحة",
    strapiLink: "أو استخدم",
    strapiAdmin: "لوحة Strapi",
    logout: "تسجيل الخروج",
    posts: "المقالات",
    subscribers: "المشتركون",
    newPost: "مقال جديد",
    editPost: "تعديل مقال",
    save: "حفظ",
    titleLabel: "العنوان",
    slugLabel: "الرابط (slug)",
    excerptLabel: "ملخص",
    contentLabel: "المحتوى",
    category: "التصنيف",
    date: "التاريخ",
    actions: "إجراءات",
    loading: "جاري التحميل...",
    noSubscribers: "لا يوجد مشتركون بعد.",
    strapiNote: "إدارة الوسائط والمحتوى المتقدم من Strapi",
    emailCol: "البريد",
    nameCol: "الاسم",
    sourceCol: "المصدر",
    subscribedCol: "تاريخ الاشتراك",
    validationTitle: "العنوان مطلوب",
    validationContent: "المحتوى مطلوب",
    deleteConfirm: "حذف هذا المقال؟",
    deleteFailed: "تعذّر الحذف. تأكد من تشغيل Strapi والصلاحيات.",
    blogPostsStat: "المقالات",
    newsletterStat: "المشتركون",
    strapiBackend: "خادم Strapi",
    strapiConnected: "متصل — المقالات متزامنة مع الموقع",
    strapiOffline: "Strapi غير متصل. شغّل الخادم من مجلد backend ثم أعد تحميل الصفحة.",
    strapiOfflineShort: "غير متصل",
    syncFromSite: "مزامنة المقالات من الموقع",
    syncing: "جاري المزامنة...",
    syncFailed: "فشلت المزامنة. تأكد من تشغيل Strapi وصلاحيات الحساب.",
    localOnly: "محلي فقط",
    inStrapi: "في Strapi",
    statusCol: "الحالة",
    localOnlyHint: "{count} مقال/مقالات على الموقع غير موجودة في Strapi بعد.",
    readTimeLabel: "وقت القراءة (دقائق)",
    publishToStrapi: "نشر إلى Strapi",
    publishToStrapiHint: "سيُنشأ مقال جديد في Strapi بنفس المحتوى.",
    loginUserHint:
      "استخدم مستخدم Strapi من نوع Authenticated (وليس حساب لوحة Strapi الرئيسية). أنشئه من: Users & Permissions → Users.",
    loginWrongUser: "بيانات الدخول غير صحيحة. تأكد أن الدور Authenticated ومفعّل Confirmed.",
    loginUnreachable:
      "تعذّر الاتصال بـ Strapi. انتظر دقيقة إذا كان الخادم على Render (وضع مجاني) ثم أعد المحاولة.",
    loginMisconfigured:
      "الموقع لا يتصل بـ Strapi على Render. أضف NEXT_PUBLIC_STRAPI_URL في GitHub → Settings → Secrets ثم أعد نشر الموقع.",
  },
};

const en: Dictionary = {
  site: {
    name: "Nabeel",
    fullName: "Turning ideas into digital success stories",
    tagline: "We help you achieve your vision in marketing and e-commerce",
    location: "Nabil Al-Jabri — Marketing & e-commerce specialist",
    metaTitle: "Marketing & E-commerce Expert",
  },
  nav: {
    products: "Campaign guide",
    services: "Home",
    works: "Experience",
    articles: "Blog",
    startConsultation: "Contact me",
    more: "More",
    menu: "Menu",
  },
  footer: {
    newsletter: "Blog",
    bookConsultation: "Contact me",
    admin: "Dashboard",
  },
  hero: {
    cards: [
      { title: "Contact me", subtitle: "Book a consultation", href: "resources#contact", badge: "online" },
      { title: "Blog", subtitle: "Marketing & e-commerce articles", href: "blog" },
      { title: "Campaign guide", subtitle: "Prepare your marketing campaigns", href: "resources" },
    ],
  },
  works: {
    title: "Experience & media",
    items: [
      {
        title: "Radar Agency",
        tag: "Marketing & growth",
        label: "CEO",
        sub: "2022 — Present",
        gradient: "from-[#3a3a3a] to-[#0a0a0a]",
      },
      {
        title: "TV appearance",
        tag: "Sabah Al-Saudia",
        label: "Channel One",
        sub: "Television interviews",
        gradient: "from-[#2a2a2a] to-[#0a0a0a]",
      },
    ],
  },
  stats: {
    paragraph1:
      "I wasn't looking for a way to \"sell more\"—I was looking for what actually makes projects succeed. That's how my journey in e-commerce and digital marketing began. Over the years I've worked with dozens of brands across Saudi Arabia and the Gulf.",
    paragraph2:
      "I founded Radar to be a growth partner, not just an agency. We measure everything, analyze the numbers, and turn data into decisions. My goal today: help you see the full picture and build a growth system that multiplies sales.",
    clients: ["Lafemzin", "Monsha'at", "Zid", "Mai Al Ward", "Dulani", "Salla"],
  },
  products: {
    title: "Resources & services",
    items: [
      { title: "Campaign preparation guide", price: "Free" },
      { title: "Portfolio", price: "PDF" },
      { title: "Consultation", price: "Book" },
    ],
  },
  articles: {
    title: "Latest articles",
    categories: [
      "E-commerce",
      "Digital marketing",
      "Pricing & sales",
      "Consumer behavior",
      "Growth",
      "Entrepreneurship",
    ],
  },
  servicesCta: {
    title: "Nabil Al-Jabri — Marketing & e-commerce expert",
    description:
      "Sharing insights on digital growth, brand building, and the future of online business.",
    packages: "Nabil's portfolio",
    contact: "Book a consultation",
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
    messagePlaceholder: "How can I help?",
  },
  blog: {
    title: "From the market to you",
    description:
      "In-depth articles and analysis on marketing, e-commerce, and digital innovation—ideas that drive growth.",
    badgeLabel: "Blog",
    badgeYear: "2025",
    loadMore: "Load more",
    backHome: "Home",
    backToBlog: "Back to blog",
    read: "Read",
    minRead: "min read",
    byAuthor: "By",
    notFound: "Article not found",
  },
  resources: {
    title: "Campaign preparation guide",
    description:
      "Review 9 essentials before launching your campaign—a free guide by Nabil Al-Jabri.",
    badgeYear: "2025",
    badgeLabel: "Campaign preparation guide",
    heroTitle: "Is your campaign really ready?",
    heroSubtitle: "Review these 9 checkpoints before you spend a single riyal",
    getFileCta: "Get the guide",
    previewTopics: [
      {
        title: "A slow site burns budget without you noticing",
        excerpt:
          "A 7-second mobile load means wasted ad spend. After optimizing to under 3 seconds, conversion rose 60%. Test at pagespeed.web.dev",
      },
      {
        title: "People hate surprises—especially negative ones",
        excerpt:
          "Promising 30% off in the ad but hiding it on the landing page feels like deception. Clarity before the click saves budget and trust.",
      },
      {
        title: "Really ready?",
        excerpt: "A practical pre-launch checklist before your first ad riyal.",
      },
    ],
    highlights: [
      "Fresh angles on marketing and sales thinking",
      "Real examples from local and GCC markets",
      "Simplifying concepts everyone overcomplicates",
    ],
    formHeading: "Is your campaign really ready?",
    firstNamePlaceholder: "First name",
    emailPlaceholder: "Email",
    downloadCta: "Download the guide",
    formSuccess: "Done—check your email for the guide.",
    formError: "Something went wrong. Try again.",
    firstNameRequired: "Name is required",
    emailInvalid: "Valid email required",
  },
  lang: {
    switchTo: "العربية",
    ar: "العربية",
    en: "English",
  },
  admin: {
    title: "Dashboard",
    loginTitle: "Dashboard",
    loginDesc: "Sign in with your Strapi account",
    email: "Email",
    password: "Password",
    login: "Sign in",
    loggingIn: "Signing in...",
    invalidLogin: "Invalid credentials",
    strapiLink: "Or use",
    strapiAdmin: "Strapi admin",
    logout: "Log out",
    posts: "Posts",
    subscribers: "Subscribers",
    newPost: "New post",
    editPost: "Edit post",
    save: "Save",
    titleLabel: "Title",
    slugLabel: "Slug",
    excerptLabel: "Excerpt",
    contentLabel: "Content",
    category: "Category",
    date: "Date",
    actions: "Actions",
    loading: "Loading...",
    noSubscribers: "No subscribers yet.",
    strapiNote: "Manage media and advanced content in Strapi",
    emailCol: "Email",
    nameCol: "Name",
    sourceCol: "Source",
    subscribedCol: "Subscribed",
    validationTitle: "Title is required",
    validationContent: "Content is required",
    deleteConfirm: "Delete this post?",
    deleteFailed: "Delete failed. Ensure Strapi is running and you have permissions.",
    blogPostsStat: "Blog posts",
    newsletterStat: "Newsletter signups",
    strapiBackend: "Strapi backend",
    strapiConnected: "Connected — posts synced with the site",
    strapiOffline: "Strapi is offline. Run the backend server, then reload this page.",
    strapiOfflineShort: "Offline",
    syncFromSite: "Sync posts from site",
    syncing: "Syncing...",
    syncFailed: "Sync failed. Ensure Strapi is running and your account has permissions.",
    localOnly: "Local only",
    inStrapi: "In Strapi",
    statusCol: "Status",
    localOnlyHint: "{count} post(s) on the site are not in Strapi yet.",
    readTimeLabel: "Read time (min)",
    publishToStrapi: "Publish to Strapi",
    publishToStrapiHint: "This will create a new post in Strapi with the same content.",
    loginUserHint:
      "Use a Strapi user with the Authenticated role (not your main Strapi admin login). Create one under Users & Permissions → Users.",
    loginWrongUser: "Invalid login. Use an Authenticated user with Confirmed enabled.",
    loginUnreachable:
      "Cannot reach Strapi. On Render free tier, wait ~1 minute for the server to wake up, then try again.",
    loginMisconfigured:
      "This site is not linked to Render Strapi. Add NEXT_PUBLIC_STRAPI_URL in GitHub → Settings → Secrets, then redeploy.",
  },
};

const dictionaries: Record<Locale, Dictionary> = { ar, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.ar;
}
