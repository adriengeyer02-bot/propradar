import type { ReactNode } from 'react';
import type { GuideArticle, GuideArticleSection } from '../lib/guideArticles';
import GuideSectionDiagram, { type DiagramLabels } from './guide-visuals/GuideSectionDiagram';

type Props = {
  article: GuideArticle;
  label: string;
  updatedLabel?: string;
  sourcesLabel?: string;
  langSwitch?: { href: string; hrefLang: string; label: string };
  /** English text -> translation, for diagrams and block labels. */
  diagramLabels?: DiagramLabels;
};

/** `**bold**` -> <strong>. Nothing else is parsed. */
export function Bold({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return <>{parts.map((part, index) => (index % 2 ? <strong key={index}>{part}</strong> : part))}</>;
}

const key = (text: string) => text.slice(0, 48);

function Icon({ name }: { name: 'check' | 'cross' | 'flag' | 'tip' | 'warning' | 'example' | 'key' }) {
  const paths: Record<typeof name, ReactNode> = {
    check: <path d="M5 12.5l4.2 4.2L19 7" />,
    cross: <path d="M7 7l10 10M17 7L7 17" />,
    flag: <path d="M6 21V4m0 0h10l-2 4 2 4H6" />,
    tip: <path d="M9 18h6m-5 3h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" />,
    warning: <path d="M12 4l9 16H3L12 4zm0 6v4m0 3v.01" />,
    example: <path d="M4 19V5m0 14h16M8 15l3-4 3 2 5-6" />,
    key: <path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6-4.5-4.2 6.1-.7z" />,
  };
  return (
    <svg className="ga-icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

function SectionBlocks({ section, t }: { section: GuideArticleSection; t: (text: string) => string }) {
  return (
    <>
      {section.stats?.length ? (
        <ul className="ga-stats">
          {section.stats.map((stat) => (
            <li key={stat.label}>
              <strong>{stat.value}</strong>
              <span><Bold text={stat.label} /></span>
            </li>
          ))}
        </ul>
      ) : null}

      {section.steps?.length ? (
        <ol className="ga-steps">
          {section.steps.map((step, index) => (
            <li key={step.title}>
              <span className="ga-step-num" aria-hidden="true">{index + 1}</span>
              <div>
                <strong className="ga-step-title">{step.title}</strong>
                <p><Bold text={step.text} /></p>
              </div>
            </li>
          ))}
        </ol>
      ) : null}

      {section.compare ? (
        <figure className="ga-compare">
          <table>
            <thead>
              <tr>
                <th scope="col"><span className="sr-only">{section.heading}</span></th>
                {section.compare.columns.map((column) => <th key={column} scope="col">{column}</th>)}
              </tr>
            </thead>
            <tbody>
              {section.compare.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {row.values.map((value, index) => <td key={index} className={value.length <= 14 ? 'is-short' : undefined}><Bold text={value} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
          {section.compare.note ? <figcaption>{section.compare.note}</figcaption> : null}
        </figure>
      ) : null}

      {section.bullets?.length ? (
        <ul className={section.bulletStyle ? `ga-list ga-list-${section.bulletStyle}` : undefined}>
          {section.bullets.map((bullet) => (
            <li key={key(bullet)}>
              {section.bulletStyle ? <Icon name={section.bulletStyle} /> : null}
              <span><Bold text={bullet} /></span>
            </li>
          ))}
        </ul>
      ) : null}

      {section.fit ? (
        <div className="ga-duo">
          <div className="ga-duo-col is-good">
            <span className="ga-duo-title"><Icon name="check" />{t('Good fit')}</span>
            <ul>{section.fit.yes.map((item) => <li key={key(item)}><Bold text={item} /></li>)}</ul>
          </div>
          <div className="ga-duo-col is-bad">
            <span className="ga-duo-title"><Icon name="cross" />{t('Poor fit')}</span>
            <ul>{section.fit.no.map((item) => <li key={key(item)}><Bold text={item} /></li>)}</ul>
          </div>
        </div>
      ) : null}

      {section.prosCons ? (
        <div className="ga-duo">
          <div className="ga-duo-col is-good">
            <span className="ga-duo-title"><Icon name="check" />{t('Strengths')}</span>
            <ul>{section.prosCons.pros.map((item) => <li key={key(item)}><Bold text={item} /></li>)}</ul>
          </div>
          <div className="ga-duo-col is-bad">
            <span className="ga-duo-title"><Icon name="cross" />{t('Weaknesses')}</span>
            <ul>{section.prosCons.cons.map((item) => <li key={key(item)}><Bold text={item} /></li>)}</ul>
          </div>
        </div>
      ) : null}

      {section.callout ? (
        <aside className={`ga-callout ga-callout-${section.callout.kind}`}>
          <Icon name={section.callout.kind} />
          <div>
            <span className="ga-callout-label">{t(section.callout.kind === 'tip' ? 'Tip' : section.callout.kind === 'warning' ? 'Watch out' : 'Example')}</span>
            <p><Bold text={section.callout.text} /></p>
          </div>
        </aside>
      ) : null}
    </>
  );
}

export default function GuideArticleBody({ article, label, updatedLabel = 'Updated', sourcesLabel = 'Sources', langSwitch, diagramLabels }: Props) {
  const t = (text: string) => diagramLabels?.[text] ?? text;
  return (
    <article className="guide-article" id="guide-article" aria-label={label}>
      {langSwitch ? (
        <a className="guide-lang-switch" href={langSwitch.href} hrefLang={langSwitch.hrefLang}>{langSwitch.label}</a>
      ) : null}
      {article.intro ? <p className="guide-article-intro"><Bold text={article.intro} /></p> : null}
      {article.keyPoints?.length ? (
        <aside className="ga-keypoints" aria-label={t('Key points')}>
          <span className="ga-keypoints-title"><Icon name="key" />{t('Key points')}</span>
          <ul>
            {article.keyPoints.map((point) => (
              <li key={key(point)}><Icon name="check" /><span><Bold text={point} /></span></li>
            ))}
          </ul>
        </aside>
      ) : null}
      {article.sections.map((section, index) => (
        <section key={section.heading}>
          <h2><span className="ga-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => <p key={key(paragraph)}><Bold text={paragraph} /></p>)}
          {section.visual ? <GuideSectionDiagram visual={section.visual} labels={diagramLabels} /> : null}
          <SectionBlocks section={section} t={t} />
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
