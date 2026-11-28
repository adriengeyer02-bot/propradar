import Link from 'next/link';
import { challengeCatalog } from '../../lib/challengeCatalog';
import { challengeExplorerCopy } from '../../lib/challengeExplorerI18n';
import { localePath, type Locale } from '../../lib/locales';
import styles from './ChallengeEntry.module.css';

/** Entry point to the challenge explorer from firm-level pages (comparator, tools). */
export default function ChallengeEntry({ locale }: { locale: Locale }) {
  const x = challengeExplorerCopy(locale);
  const count = challengeCatalog(locale).length;
  const href = localePath(locale, '/prop-firm-challenge');
  return (
    <aside className={`container ${styles.entry}`} aria-label={x.eyebrow}>
      <div>
        <span className={styles.eyebrow}>{x.eyebrow}</span>
        <strong>{x.title.replace('{count}', String(count))}</strong>
      </div>
      <div className={styles.links}>
        <Link href={`${href}#find-my-challenge`} className={styles.primary}>{x.finderCta}</Link>
        <Link href={`${href}#explorer`} className={styles.secondary}>{x.browseCta} →</Link>
      </div>
    </aside>
  );
}
