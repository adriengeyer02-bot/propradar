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

/** Long article body of a guide, same section order as the English article. */
export type GuideArticleTranslation = NonNullable<GuideTranslation['article']>;
export type GuideArticleTranslations = Record<string, GuideArticleTranslation>;
