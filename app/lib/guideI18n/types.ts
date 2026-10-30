/** A guide in another language. Firm data (tables, scores) is rendered live; only the editorial text is here. */
export type GuideTranslation = {
  title: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  answer: string;
  checks: string[];
  faq: { question: string; answer: string }[];
  /** Long-form sections, translated from guideArticles when the guide has one. */
  article?: {
    intro?: string;
    sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  };
};

export type GuideTranslations = Record<string, GuideTranslation>;
