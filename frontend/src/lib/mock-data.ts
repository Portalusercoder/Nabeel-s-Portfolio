import type { BlogPost, Resource } from "./strapi";
import type { Locale } from "./i18n/types";
import { publicAsset } from "./assets";

export const BLOG_CARD_TONES = [
  "from-[#3a3a3a] to-[#0a0a0a]",
  "from-[#2e2e2e] to-[#111111]",
  "from-[#454545] to-[#1a1a1a]",
  "from-[#333333] to-[#0d0d0d]",
  "from-[#404040] to-[#141414]",
  "from-[#383838] to-[#101010]",
] as const;

const MOCK_BLOG_COVERS = [
  "/images/blog/cover-1.png",
  "/images/blog/cover-2.png",
  "/images/blog/cover-3.png",
  "/images/blog/cover-4.png",
  "/images/blog/cover-5.png",
] as const;

function mockBlogCover(index: number): BlogPost["coverImage"] {
  const url = MOCK_BLOG_COVERS[index];
  return url ? { url: publicAsset(url) } : null;
}

const MOCK_BLOG_POSTS_AR: BlogPost[] = [
  {
    id: 1,
    title: "استراتيجيات التسعير والبيع للتجارة الالكترونية / upsell cross sel",
    slug: "ecommerce-pricing-upsell",
    excerpt: "إطار عملي لتسعير المنتجات وزيادة قيمة السلة.",
    content: `<p>تطبيق upsell وcross-sell بذكاء يضاعف إيرادات متجرك الإلكتروني.</p>`,
    author: "نبيل الجابري",
    category: "التجارة الإلكترونية",
    readTime: 7,
    publishedAt: "2025-02-17T10:00:00.000Z",
    coverImage: mockBlogCover(0),
  },
  {
    id: 2,
    title: "ما وراء قرارات الشراء: هل نحن حقاً نختار أم يتم التلاعب بنا؟",
    slug: "beyond-purchase-decisions",
    excerpt: "استكشاف علم النفس وراء قرارات الشراء في التسويق الرقمي.",
    content: `<p>فهم سلوك المستهلك يساعدك على بناء حملات أكثر تأثيراً وأخلاقية.</p>`,
    author: "نبيل الجابري",
    category: "التسويق",
    readTime: 6,
    publishedAt: "2025-02-14T10:00:00.000Z",
    coverImage: mockBlogCover(1),
  },
  {
    id: 3,
    title:
      "استراتيجيات التسعير والبيع للتجارة لتعزيز المبيعات خلال يوم التأسيس 2025 | استراتيجيات تسويق فعالة upsell/ cross sel",
    slug: "foundation-day-pricing-2025",
    excerpt: "كيف تعزز المناسبات الوطنية مثل يوم التأسيس المبيعات التجارية؟",
    content: `<p>استراتيجيات عملية لرفع المبيعات خلال المناسبات الوطنية عبر upsell وcross-sell.</p>`,
    author: "نبيل الجابري",
    category: "التجارة الإلكترونية",
    readTime: 8,
    publishedAt: "2025-02-13T10:00:00.000Z",
    coverImage: mockBlogCover(2),
  },
  {
    id: 4,
    title: "أفضل استراتيجيات التسويق بالمحتوى لجذب العملاء إلى متجرك في سلة",
    slug: "salla-content-marketing",
    excerpt: "كيف يجذبك المحتوى المفيد عملاء متجرك على منصة سلة.",
    content: `<p>استراتيجيات التسويق بالمحتوى لبناء علاقة قبل البيع في متجرك.</p>`,
    author: "نبيل الجابري",
    category: "التسويق بالمحتوى",
    readTime: 6,
    publishedAt: "2024-11-13T10:00:00.000Z",
    coverImage: mockBlogCover(3),
  },
  {
    id: 5,
    title: "أهم الأمور التي يجب مراعاتها عند تصميم متجر على منصة سلة",
    slug: "salla-store-design",
    excerpt: "قائمة عملية قبل إطلاق متجرك على سلة.",
    content: `<p>من تجربة المستخدم إلى الهوية البصرية—ما يجب تجهيزه قبل الإطلاق.</p>`,
    author: "نبيل الجابري",
    category: "التجارة الإلكترونية",
    readTime: 5,
    publishedAt: "2024-09-13T10:00:00.000Z",
    coverImage: mockBlogCover(4),
  },
  {
    id: 6,
    title: "الأسئلة الشائعة في منصة سلة: مجموعة من الأسئلة والأمور التي تخص المنصة",
    slug: "salla-faq",
    excerpt: "إجابات على أكثر الأسئلة شيوعاً حول منصة سلة.",
    content: `<p>دليل مرجعي سريع لأصحاب المتاجر على سلة.</p>`,
    author: "نبيل الجابري",
    category: "منصة سلة",
    readTime: 4,
    publishedAt: "2024-08-29T10:00:00.000Z",
    coverImage: null,
  },
  {
    id: 7,
    title: "12 فكرة لتحويل الزوار إلى عملاء أوفياء",
    slug: "visitors-to-customers",
    excerpt: "أفكار عملية لرفع التحويل وبناء ولاء العملاء.",
    content: `<p>من أول زيارة إلى علاقة طويلة—خطوات قابلة للتطبيق.</p>`,
    author: "نبيل الجابري",
    category: "النمو",
    readTime: 7,
    publishedAt: "2024-07-22T10:00:00.000Z",
    coverImage: null,
  },
  {
    id: 8,
    title: "كيف أتعامل مع مشكلة السلات المتروكة؟",
    slug: "abandoned-carts",
    excerpt: "حلول عملية لاستعادة السلات المتروكة وزيادة المبيعات.",
    content: `<p>استراتيجيات تذكير وعروض لإغلاق عملية الشراء.</p>`,
    author: "نبيل الجابري",
    category: "التجارة الإلكترونية",
    readTime: 5,
    publishedAt: "2024-06-24T10:00:00.000Z",
    coverImage: null,
  },
  {
    id: 9,
    title: "الأساسيات التي يجب أن تتوفر قبل أن تطلق حملتك الإعلانية",
    slug: "campaign-basics",
    excerpt: "ما تحتاج تجهيزه قبل صرف ميزانية الإعلانات.",
    content: `<p>قائمة تحقق قبل إطلاق حملتك الإعلانية الأولى.</p>`,
    author: "نبيل الجابري",
    category: "التسويق",
    readTime: 6,
    publishedAt: "2024-06-12T10:00:00.000Z",
    coverImage: null,
  },
  {
    id: 10,
    title: "تسعة أسباب لفشل المتاجر الإلكترونية مع سبب عاشر يغفل عنه الكثيرون",
    slug: "ecommerce-failure-reasons",
    excerpt: "لماذا تفشل المتاجر الإلكترونية وكيف تتجنب السبب العاشر.",
    content: `<p>دروس من السوق لبناء متجر يصمد وينمو.</p>`,
    author: "نبيل الجابري",
    category: "ريادة الأعمال",
    readTime: 8,
    publishedAt: "2024-06-01T10:00:00.000Z",
    coverImage: null,
  },
];

const MOCK_BLOG_POSTS_EN: BlogPost[] = [
  {
    id: 1,
    title: "E-commerce pricing & sales strategies / upsell cross-sell",
    slug: "ecommerce-pricing-upsell",
    excerpt: "A practical framework for product pricing and increasing cart value.",
    content: `<p>Smart upsell and cross-sell tactics can multiply your store revenue.</p>`,
    author: "Nabil Al-Jabri",
    category: "E-commerce",
    readTime: 7,
    publishedAt: "2025-02-17T10:00:00.000Z",
    coverImage: mockBlogCover(0),
  },
  {
    id: 2,
    title: "Beyond purchase decisions: do we really choose—or are we manipulated?",
    slug: "beyond-purchase-decisions",
    excerpt: "Exploring the psychology behind purchase decisions in digital marketing.",
    content: `<p>Understanding consumer behavior helps you build more effective, ethical campaigns.</p>`,
    author: "Nabil Al-Jabri",
    category: "Marketing",
    readTime: 6,
    publishedAt: "2025-02-14T10:00:00.000Z",
    coverImage: mockBlogCover(1),
  },
  {
    id: 3,
    title:
      "Pricing & sales strategies to boost commerce sales during Foundation Day 2025 | Effective upsell/cross-sell",
    slug: "foundation-day-pricing-2025",
    excerpt: "How national occasions like Foundation Day can boost commercial sales.",
    content: `<p>Practical strategies to lift sales during national events through upsell and cross-sell.</p>`,
    author: "Nabil Al-Jabri",
    category: "E-commerce",
    readTime: 8,
    publishedAt: "2025-02-13T10:00:00.000Z",
    coverImage: mockBlogCover(2),
  },
  {
    id: 4,
    title: "Best content marketing strategies to attract customers to your Salla store",
    slug: "salla-content-marketing",
    excerpt: "How useful content attracts customers to your Salla store.",
    content: `<p>Content marketing strategies that build relationships before the sale.</p>`,
    author: "Nabil Al-Jabri",
    category: "Content marketing",
    readTime: 6,
    publishedAt: "2024-11-13T10:00:00.000Z",
    coverImage: mockBlogCover(3),
  },
  {
    id: 5,
    title: "Key things to consider when designing a store on Salla",
    slug: "salla-store-design",
    excerpt: "A practical checklist before launching your Salla store.",
    content: `<p>From UX to visual identity—what to prepare before launch.</p>`,
    author: "Nabil Al-Jabri",
    category: "E-commerce",
    readTime: 5,
    publishedAt: "2024-09-13T10:00:00.000Z",
    coverImage: mockBlogCover(4),
  },
  {
    id: 6,
    title: "Salla platform FAQ: common questions and platform essentials",
    slug: "salla-faq",
    excerpt: "Answers to the most common questions about the Salla platform.",
    content: `<p>A quick reference guide for Salla store owners.</p>`,
    author: "Nabil Al-Jabri",
    category: "Salla",
    readTime: 4,
    publishedAt: "2024-08-29T10:00:00.000Z",
    coverImage: null,
  },
  {
    id: 7,
    title: "12 ideas to turn visitors into loyal customers",
    slug: "visitors-to-customers",
    excerpt: "Practical ideas to improve conversion and build loyalty.",
    content: `<p>From first visit to long-term relationship—actionable steps.</p>`,
    author: "Nabil Al-Jabri",
    category: "Growth",
    readTime: 7,
    publishedAt: "2024-07-22T10:00:00.000Z",
    coverImage: null,
  },
  {
    id: 8,
    title: "How do I handle abandoned cart problems?",
    slug: "abandoned-carts",
    excerpt: "Practical solutions to recover abandoned carts and increase sales.",
    content: `<p>Reminder strategies and offers to complete the purchase.</p>`,
    author: "Nabil Al-Jabri",
    category: "E-commerce",
    readTime: 5,
    publishedAt: "2024-06-24T10:00:00.000Z",
    coverImage: null,
  },
  {
    id: 9,
    title: "Essentials you need before launching your ad campaign",
    slug: "campaign-basics",
    excerpt: "What to prepare before spending your ad budget.",
    content: `<p>A checklist before launching your first ad campaign.</p>`,
    author: "Nabil Al-Jabri",
    category: "Marketing",
    readTime: 6,
    publishedAt: "2024-06-12T10:00:00.000Z",
    coverImage: null,
  },
  {
    id: 10,
    title: "Nine reasons e-commerce stores fail—and a tenth reason many overlook",
    slug: "ecommerce-failure-reasons",
    excerpt: "Why online stores fail and how to avoid the overlooked tenth reason.",
    content: `<p>Market lessons for building a store that lasts and grows.</p>`,
    author: "Nabil Al-Jabri",
    category: "Entrepreneurship",
    readTime: 8,
    publishedAt: "2024-06-01T10:00:00.000Z",
    coverImage: null,
  },
];

const MOCK_RESOURCES_AR: Resource[] = [
  {
    id: 1,
    title: "كتيب تجهيز الحملات التسويقية",
    description: "دليل شامل لتجهيز حملاتك من الفكرة إلى التنفيذ والقياس.",
    category: "أدلة",
    file: null,
  },
];

const MOCK_RESOURCES_EN: Resource[] = [
  {
    id: 1,
    title: "Campaign preparation guide",
    description: "A complete guide from campaign idea to execution and measurement.",
    category: "Guides",
    file: null,
  },
];

export function getMockBlogPosts(locale: Locale): BlogPost[] {
  return locale === "en" ? MOCK_BLOG_POSTS_EN : MOCK_BLOG_POSTS_AR;
}

export function getMockResources(locale: Locale): Resource[] {
  return locale === "en" ? MOCK_RESOURCES_EN : MOCK_RESOURCES_AR;
}

/** @deprecated use getMockBlogPosts(locale) */
export const MOCK_BLOG_POSTS = MOCK_BLOG_POSTS_AR;
