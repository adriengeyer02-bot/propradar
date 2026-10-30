import type { GuideArticle } from '../lib/guideArticles';
import GuideSectionDiagram, { type DiagramLabels } from './guide-visuals/GuideSectionDiagram';

type Props = {
  article: GuideArticle;
  label: string;
  updatedLabel?: string;
  sourcesLabel?: string;
  langSwitch?: { href: string; hrefLang: string; label: string };
  diagramLabels?: DiagramLabels;
};

export default function GuideArticleBody({ article, label, updatedLabel = 'Updated', sourcesLabel = 'Sources', langSwitch, diagramLabels }: Props) {
  return (
    <article className="guide-article" id="guide-article" aria-label={label}>
      {langSwitch ? (
        <a className="guide-lang-switch" href={langSwitch.href} hrefLang={langSwitch.hrefLang}>{langSwitch.label}</a>
      ) : null}
      {article.intro ? <p className="guide-article-intro">{article.intro}</p> : null}
      {article.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 48)}>{paragraph}</p>)}
          {section.visual ? <GuideSectionDiagram visual={section.visual} labels={diagramLabels} /> : null}
          {section.bullets?.length ? (
            <ul>
              {section.bullets.map((bullet) => <li key={bullet.slice(0, 48)}>{bullet}</li>)}
            </ul>
          ) : null}
        </section>
      ))}
      <footer className="guide-article-footer">
        <span>{updatedLabel} <time dateTime={article.updated}>{article.updated}</time></span>
        {article.sources?.length ? (
          <ul aria-label={sourcesLabel}>
            {article.sources.map((source) => (
              <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a></li>
            ))}
          </ul>
        ) : null}
      </footer>
    </article>
  );
}
