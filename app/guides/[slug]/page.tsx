import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FirmLogo from '../../components/FirmLogo';
import {
  formatUsd,
  payoutRiskClass,
  reviewReliabilityClass,
  scoreClass,
  type Product,
  type PropFirm,
} from '../../lib/propFirms';
import { SITE_NAME, SITE_URL } from '../../lib/site';
import {
  getGuideLastModified,
  getRelatedGuides,
  getSeoGuideBySlug,
  seoGuides,
  selectGuideFirms,
} from '../../lib/seoGuides';

export const revalidate = 86400;

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return seoGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getSeoGuideBySlug(slug);

  if (!guide) {
    return { title: 'Guide introuvable - PropRadar' };
  }

  return {
    title: guide.title,
    description: guide.metaDescription,
    keywords: [...guide.primaryKeywords, ...guide.secondaryKeywords],
    alternates: {
      canonical: `/guides/${guide.slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      url: `${SITE_URL}/guides/${guide.slug}`,
      type: 'article',
      siteName: SITE_NAME,
    },
  };
}

function jsonLd(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  };
}

function featuredProduct(firm: PropFirm): Product | undefined {
  return firm.products.find((product) => product.isPopular) ?? firm.products[0];
}

function formatAccountRange(product?: Product) {
  if (!product) return 'A verifier';
  if (product.accountSizeMin === product.accountSizeMax) return formatUsd(product.accountSizeMax);
  return `${formatUsd(product.accountSizeMin)} - ${formatUsd(product.accountSizeMax)}`;
}

function formatEntryFee(product?: Product) {
  if (!product?.entryFeeMin) return 'A verifier';
  if (product.entryFeeMax && product.entryFeeMax !== product.entryFeeMin) {
    return `${formatUsd(product.entryFeeMin)} - ${formatUsd(product.entryFeeMax)}`;
  }

  return `${formatUsd(product.entryFeeMin)}+`;
}

function polishGuideText(text: string) {
  return text
    .replace(/\bn est\b/g, "n'est")
    .replace(/\bd achat\b/g, "d'achat")
    .replace(/\bd entree\b/g, "d'entree")
    .replace(/\bd abord\b/g, "d'abord")
    .replace(/\bd autres\b/g, "d'autres")
    .replace(/\bl autorisation\b/g, "l'autorisation")
    .replace(/\bl offre\b/g, "l'offre")
    .replace(/\bl objectif\b/g, "l'objectif")
    .replace(/\bl historique\b/g, "l'historique")
    .replace(/\bl application\b/g, "l'application");
}

function guideAnswerParagraphs(guide: NonNullable<ReturnType<typeof getSeoGuideBySlug>>, firms: PropFirm[]) {
  const first = firms[0];
  const second = firms[1];
  const firmNames = firms.slice(0, 3).map((firm) => firm.name).join(', ');

  if (guide.intent === 'comparer' && first && second) {
    return [
      `La vraie question n'est pas seulement "${first.name} ou ${second.name} ?". Le lecteur veut savoir ce qu'il achete vraiment : une regle de drawdown, un calendrier de payout, une tolerance au style de trading et un niveau de risque operationnel.`,
      `${first.name} ressort mieux si ton critere principal est la stabilite percue et la lisibilite du cadre. ${second.name} peut devenir plus interessant si son programme correspond mieux a ton budget, ton style ou tes contraintes de trading. Le nom de marque ne suffit donc pas : il faut comparer l'offre phare, le cout total et les restrictions.`,
      'Avant de payer, lis la ligne "payout", les conditions de retrait, la regle de perte maximale, la gestion des news et les limites de plateforme. Ce sont ces details qui transforment une bonne promo en bon choix, ou en piege couteux.',
    ];
  }

  if (guide.intent === 'style') {
    return [
      `Le lecteur cherche une prop firm compatible avec une maniere de trader, pas seulement une note globale. Le bon choix depend du maintien overnight, des news, des EAs, du drawdown et de la maniere dont la firm traite les payouts.`,
      firmNames
        ? `Dans cette recherche, PropRadar compare notamment ${firmNames}. L'objectif est de voir quelle firm colle au style vise sans cacher les restrictions importantes.`
        : 'PropRadar compare les firms qui peuvent correspondre au style vise, puis retire les options trop fragiles ou trop peu documentees.',
      "Le meilleur reflexe est de choisir la regle que tu peux respecter tous les jours, pas la firm qui promet le plus gros capital sur la page marketing.",
    ];
  }

  if (guide.intent === 'risque') {
    return [
      "Le lecteur veut surtout eviter de gagner un challenge puis de se bloquer au moment du retrait. Le payout doit donc etre analyse avant le prix, avant le split et avant la taille de compte.",
      'PropRadar regarde les incidents, la clarte des regles, les signaux communautaires et la preuve disponible. Une firm peut avoir une grosse note publique et rester risquee si les conditions de retrait sont floues.',
      'La bonne decision consiste a choisir une firm avec un risque payout lisible, une source officielle claire et des conditions que tu peux verifier avant achat.',
    ];
  }

  return [
    "Le lecteur veut une reponse exploitable : quelle option regarder en premier, pourquoi elle ressort, et quel detail peut faire changer la decision.",
    guide.answer,
    "La selection ci-dessous n'est pas un classement publicitaire. Elle croise score PropRadar, risque payout, niveau de preuve, prix minimum, signaux Trustpilot/Reddit et coherence avec la recherche.",
  ];
}

function guideDecisionCards(guide: NonNullable<ReturnType<typeof getSeoGuideBySlug>>, firms: PropFirm[]) {
  const first = firms[0];
  const second = firms[1];

  if (guide.intent === 'comparer' && first && second) {
    return [
      {
        label: `Choisir ${first.name}`,
        text: `${first.name} est a regarder en priorite si tu veux le meilleur compromis score/risque dans cette comparaison.`,
      },
      {
        label: `Choisir ${second.name}`,
        text: `${second.name} devient pertinent si son offre phare colle mieux a ton budget, ton marche ou ton style de trading.`,
      },
      {
        label: 'Ne pas choisir trop vite',
        text: "Si la difference se joue sur une promo, relis d'abord payout, drawdown, news, consistency et frais funded.",
      },
    ];
  }

  return [
    {
      label: 'Meilleur premier filtre',
      text: 'Commence par eliminer les firms avec risque payout eleve, regles floues ou sources insuffisantes.',
    },
    {
      label: 'Meilleur critere pratique',
      text: 'Compare le programme que tu vas vraiment acheter : prix, objectif, drawdown, daily loss, split et plateformes.',
    },
    {
      label: 'Erreur classique',
      text: 'Ne choisis pas uniquement sur le capital affiche ou la reduction. Une mauvaise regle coute plus cher qu une promo economise.',
    },
  ];
}

function expandedFaqAnswer(answer: string, guide: NonNullable<ReturnType<typeof getSeoGuideBySlug>>) {
  const suffix =
    guide.intent === 'comparer'
      ? " Pour trancher proprement, compare toujours l'offre phare, le risque payout, les restrictions et le cout total avant de regarder la popularite."
      : " Le point important est de verifier la fiche, les sources officielles et les conditions du programme precis avant de payer.";

  return `${answer}${suffix}`;
}

export default async function SeoGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getSeoGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const firms = selectGuideFirms(guide, 10);
  const relatedGuides = getRelatedGuides(guide.slug, 3);
  const modifiedDate = getGuideLastModified(guide);
  const modifiedDateLabel = modifiedDate.toISOString().slice(0, 10);
  const pageUrl = `${SITE_URL}/guides/${guide.slug}`;
  const answerParagraphs = guideAnswerParagraphs(guide, firms);
  const decisionCards = guideDecisionCards(guide, firms);
  const productRows = firms
    .slice(0, guide.intent === 'comparer' ? 4 : 6)
    .map((firm) => ({ firm, product: featuredProduct(firm) }));
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.h1,
    description: guide.metaDescription,
    dateModified: modifiedDate.toISOString(),
    datePublished: modifiedDate.toISOString(),
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: pageUrl,
    keywords: [...guide.primaryKeywords, ...guide.secondaryKeywords].join(', '),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides',
        item: `${SITE_URL}/guides`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.title,
        item: pageUrl,
      },
    ],
  };
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: guide.title,
    itemListElement: firms.map((firm, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/firm/${firm.slug}`,
      name: firm.name,
      description: firm.verdict,
    })),
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: expandedFaqAnswer(item.answer, guide),
      },
    })),
  };

  return (
    <main className="container guide-page seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(articleSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemListSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />

      <section className="guide-hero">
        <div>
          <Link href="/guides" className="btn" style={{ marginBottom: 18 }}>Tous les guides</Link>
          <div className="eyebrow">{guide.eyebrow}</div>
          <h1>{guide.h1}</h1>
          <p className="lead">{polishGuideText(guide.answer)}</p>
          <div className="actions">
            <Link href="/comparateur" className="btn btn-primary">Comparer les firms</Link>
            <Link href="/outils" className="btn">Choisir par style</Link>
          </div>
        </div>
        <div className="guide-proof-panel">
          <div><strong>{firms.length}</strong><span>firms reliées</span></div>
          <div><strong>{guide.primaryKeywords.length}</strong><span>mots-clés principaux</span></div>
          <div><strong>{modifiedDateLabel}</strong><span>mise à jour data</span></div>
        </div>
      </section>

      <section className="section guide-card-grid">
        <article className="panel seo-answer-panel">
          <div className="eyebrow">Réponse utile</div>
          <h2>Ce que le trader veut vraiment savoir.</h2>
          <div className="guide-deep-answer">
            {answerParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="keyword-chip-grid">
            {[...guide.primaryKeywords, ...guide.secondaryKeywords].map((keyword) => <span key={keyword}>{keyword}</span>)}
          </div>
        </article>
        <article className="panel">
          <div className="eyebrow">Checklist avant achat</div>
          <h2>Les points à vérifier.</h2>
          <ul className="risk-list">
              {guide.checks.map((check) => <li key={check}>{polishGuideText(check)}</li>)}
          </ul>
        </article>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Offres phares</div>
            <h2>Tableau comparatif des programmes à regarder en premier.</h2>
          </div>
          <p className="section-note">
            Ce tableau part des produits mis en avant dans les fiches PropRadar. Les montants et règles doivent toujours être revérifiés sur la page officielle avant achat.
          </p>
        </div>
        <div className="guide-product-table">
          <div className="guide-product-row guide-product-head">
            <span>Firm</span>
            <span>Offre phare</span>
            <span>Ticket</span>
            <span>Compte</span>
            <span>Objectif</span>
            <span>Drawdown</span>
            <span>Split / payout</span>
            <span>Plateformes</span>
          </div>
          {productRows.map(({ firm, product }) => (
            <Link href={`/firm/${firm.slug}`} className="guide-product-row" key={`${firm.slug}-${product?.id ?? 'program'}`}>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{firm.bestFor}</span>
                </div>
              </div>
              <div>
                <strong>{product?.name ?? 'Programme à vérifier'}</strong>
                  <small>{polishGuideText(product?.description ?? firm.verdict)}</small>
              </div>
              <div><span>Ticket</span><strong>{formatEntryFee(product)}</strong></div>
              <div><span>Compte</span><strong>{formatAccountRange(product)}</strong></div>
              <div><span>Objectif</span><strong>{product?.profitTarget ?? 'À vérifier'}</strong></div>
              <div><span>Drawdown</span><strong>{product?.maxDrawdown ?? firm.drawdownType}</strong></div>
              <div>
                <span>Split / payout</span>
                <strong>{product?.profitSplit ?? `${firm.profitSplit}%`}</strong>
                <small className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{firm.reviewSignals.payoutRisk}</small>
              </div>
              <div><span>Plateformes</span><strong>{product?.platforms.slice(0, 3).join(' / ') ?? 'À vérifier'}</strong></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="guide-profile-grid">
          {decisionCards.map((card) => (
            <article className="panel guide-profile-card" key={card.label}>
              <span>{card.label}</span>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Sélection PropRadar</div>
            <h2>Firms à comparer pour cette recherche.</h2>
          </div>
          <p className="section-note">Sélection calculée automatiquement depuis les fiches PropRadar.</p>
        </div>
        <div className="guide-ranking-list">
          {firms.map((firm, index) => (
            <Link href={`/firm/${firm.slug}`} className="guide-ranking-row seo-firm-row" key={firm.slug}>
              <span className="guide-rank">{index + 1}</span>
              <div className="firm-result-main">
                <FirmLogo name={firm.name} logoDomain={firm.logoDomain} />
                <div>
                  <strong>{firm.name}</strong>
                  <span>{firm.bestFor}</span>
                </div>
              </div>
              <div><span>Score</span><strong>{firm.score}/100</strong></div>
              <div><span>Prix min.</span><strong>{formatUsd(firm.priceFrom)}</strong></div>
              <div><span>Payout</span><strong className={`badge ${payoutRiskClass(firm.reviewSignals.payoutRisk)}`}>{firm.reviewSignals.payoutRisk}</strong></div>
              <div><span>Trustpilot</span><strong className={`badge ${reviewReliabilityClass(firm.reviewSignals.trustpilotReliability)}`}>{firm.reviewSignals.trustpilotReliability}</strong></div>
              <span className={`badge ${scoreClass(firm.score)}`}>{firm.score}/100</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section guide-card-grid">
        <article className="panel">
          <div className="eyebrow">FAQ</div>
          <h2>Questions fréquentes.</h2>
          <div className="seo-faq-stack">
            {guide.faq.map((item) => (
              <div key={item.question}>
                <strong>{item.question}</strong>
                <p>{polishGuideText(expandedFaqAnswer(item.answer, guide))}</p>
              </div>
            ))}
          </div>
        </article>
        <article className="panel">
          <div className="eyebrow">Continuer</div>
          <h2>Pages utiles liées.</h2>
          <div className="guide-signal-stack">
            {guide.internalLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                <span>{link.label}</span>
                <strong>Ouvrir</strong>
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Guides proches</div>
            <h2>Autres recherches utiles.</h2>
          </div>
        </div>
        <div className="guide-entry-grid">
          {relatedGuides.map((related) => (
            <Link href={`/guides/${related.slug}`} className="guide-entry-card" key={related.slug}>
              <span>{related.eyebrow}</span>
              <strong>{related.title}</strong>
              <small>{polishGuideText(related.answer)}</small>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
