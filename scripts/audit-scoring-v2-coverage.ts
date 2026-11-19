import { writeFileSync } from 'node:fs';
import { propFirms } from '../app/lib/propFirms';
import { getFirmUpdate } from '../app/lib/firmUpdates';

/**
 * Data-quality census only. Source labels and counts identify audit work to do;
 * they are NOT substitutes for reading the actual current official documents.
 */

const profiles = propFirms.map((firm) => {
  const update = getFirmUpdate(firm.slug);
  const sources = [...firm.sources, ...firm.regulatoryAudit.sources, ...(update?.addSources ?? [])];
  const sourceFor = (regex: RegExp) => sources.some(({ label, url }) => regex.test(label + ' ' + url) && /^https:\/\//.test(url));
  const rules = Boolean(update?.restrictiveRules?.some((rule) => /^https:\/\//.test(rule.source))) ||
    sourceFor(/terms|rules|conditions|faq|help|knowledge.center|trading.policy|trading-rules/i);
  const payoutTerms = sourceFor(/payout|withdraw|reward|distribution|payment.policy|profit.split/i) ||
    Boolean(update?.changelog?.some((change) => /payout|withdraw|reward/i.test(change.summary) && /^https:\/\//.test(change.source)));
  const legal = Boolean(firm.regulatoryAudit.entities.length) &&
    sourceFor(/registry|companies.house|legal|terms|entity|about|registration|company/i);
  const reviews = Boolean(firm.reviewSignals.trustpilotSourceUrl) || sourceFor(/trustpilot|review/i);
  const independentPayout = (firm.payoutProofs ?? []).some((proof) => !proof.firmReported && proof.kind !== 'official');
  const sourceCoverage = [rules, payoutTerms, legal, reviews].filter(Boolean).length;
  const confidenceCandidate = sourceCoverage < 4 ? 'C' : independentPayout ? 'A' : 'B';
  return {
    name: firm.name,
    slug: firm.slug,
    status: firm.status,
    currentScore: firm.score,
    rules,
    payoutTerms,
    legal,
    reviews,
    independentPayout,
    sourceCoverage,
    confidenceCandidate,
    auditStatus: firm.auditStatus,
    payoutRisk: firm.reviewSignals.payoutRisk,
    rulesPenalty: firm.rulesPenalty?.penalty ?? 0,
    lastReviewed: firm.lastReviewed,
  };
});

const active = profiles.filter((firm) => firm.status !== 'Fermée');
const count = (items: typeof profiles, test: (value: (typeof profiles)[number]) => boolean) => items.filter(test).length;
const ranked = [...profiles].sort((a, b) =>
  a.status === 'Fermée' && b.status !== 'Fermée' ? 1 :
  b.status === 'Fermée' && a.status !== 'Fermée' ? -1 :
  b.currentScore - a.currentScore || a.slug.localeCompare(b.slug));
const yesNo = (v: boolean) => v ? '✓' : '—';

const report = [
  '# PropRadar — couverture des preuves avant recalibrage sur 100',
  '',
  'Généré depuis les champs du dépôt le 19 novembre 2026 ; **ce document ne publie aucune nouvelle note**.',
  'Le barème 35 paiements / 30 règles / 15 juridique / 10 intégrité / 10 offre a été validé.',
  'Les « ✓ » détectent une source possible, **pas** un contrôle de son contenu, de sa date ou de son exactitude.',
  '',
  `- **${profiles.length}** sociétés référencées, **${active.length}** non fermées, **${profiles.length - active.length}** fermées/archivées.`,
  `- **${count(active, (f) => f.sourceCoverage === 4)}** firmes actives ont des sources potentielles dans les quatre catégories minimales.`,
  `- **${count(active, (f) => f.independentPayout)}** disposent dans le fichier d'au moins une preuve de payout enregistrée comme indépendante.`,
  `- **${count(active, (f) => f.payoutRisk === 'Non évalué')}** ont actuellement « paiement non évalué » : **ne pas inventer de fiabilité**.`,
  `- **${count(active, (f) => f.auditStatus === 'Vérifié multi-source')}** portent le badge d'audit « vérifié multi-source » (à relire, ce label n'est pas une garantie).`,
  '',
  '## Méthode de recalibrage',
  '',
  '1. Pour chaque société et **chaque programme** : lire les conditions officielles actuelles (délais de retrait, plafonds, invalidations, frais, source).',
  '2. Recouper l’identité juridique, les preuves de paiement et les éventuels litiges indépendants. Une plainte personnelle n’établit pas un refus injustifié.',
  '3. Affecter chaque fait à **un seul** des axes de risque. La pénalité Trustpilot est **−6 une seule fois** si le signal reste actuel.',
  '4. Attribuer séparément les 10 points d’offre selon prix publics (4), flexibilité (3), plateformes/marchés (3). Ne jamais utiliser la rémunération d’affiliation.',
  '5. Calculer les 5 sous-notes, joindre les liens, attribuer la confiance A/B/C, puis demander validation des écarts sensibles avant publication.',
  '6. Sans les quatre pièces minimales, classer **dossier incomplet/provisoire**, pas « 0/100 » ni « parfait faute de plainte ».',
  '',
  '## Inventaire de couverture pour toutes les firmes',
  '',
  '| Firme | Ancienne note | Règles | Payout terms | Entité | Avis | Payout indépendant | Confiance indicative | Statut |',
  '|---|---:|:---:|:---:|:---:|:---:|:---:|:---:|---|',
  ...ranked.map((f) => `| ${f.name.replace(/\|/g, '\\|')} (\`${f.slug}\`) | ${f.currentScore} | ${yesNo(f.rules)} | ${yesNo(f.payoutTerms)} | ${yesNo(f.legal)} | ${yesNo(f.reviews)} | ${yesNo(f.independentPayout)} | ${f.confidenceCandidate} | ${f.status} |`),
  '',
  '## Limites importantes',
  '',
  '- Les URL de preuve de payout étiquetées `press` peuvent reprendre une déclaration de la firme : elles doivent être vérifiées avant de compter comme indépendantes.',
  '- Un avis Trustpilot masqué ne prouve pas que la société a acheté des avis ; ne pas le déduire deux fois.',
  '- La fermeture est un statut et une exclusion des classements actifs, pas une récompense positive ou une accusation.',
  '- Les anciennes notes ne sont présentes qu’à titre de comparaison ; **ne pas les recopier dans les nouveaux axes**.',
  '- Les branches ouvertes #147, #148, #150 et #152 contiennent des audits en cours : préserver leurs données et sources.',
  '',
].join('\n');

const output = process.argv[2];
if (output) writeFileSync(output, report, 'utf8');
else process.stdout.write(report);
