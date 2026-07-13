import OutilsClient from './OutilsClient';
import PageStructuredData from '../components/PageStructuredData';
import { createPageMetadata } from '../lib/pageMetadata';

const TOOLS_DESCRIPTION =
  'Compare prop firms side by side and find programs suited to SMC, ICT, swing trading, scalping, news trading, EA or futures strategies.';

export const metadata = createPageMetadata({
  title: 'Prop Firm Comparison Tools and Style Finder',
  description: TOOLS_DESCRIPTION,
  path: '/outils',
  keywords: ['prop firm comparison tool', 'prop firm for SMC', 'prop firm style finder', 'compare prop firms'],
  category: 'Prop firm tools',
});

export default function OutilsPage() {
  return (
    <>
      <PageStructuredData
        type="WebPage"
        name="Prop firm comparison tools"
        description={TOOLS_DESCRIPTION}
        path="/outils"
        breadcrumbLabel="Tools"
        dateModified="2026-07-13"
        items={[
          {
            name: 'Prop Firm Comparator',
            path: '/comparateur',
            description: 'Filter and compare scores, rules, payout risk, legal evidence and community signals.',
          },
          {
            name: 'Prop Firm Research Guides',
            path: '/guides',
            description: 'Find source-backed answers by rule, risk, trading style and firm.',
          },
        ]}
      />
      <OutilsClient />
    </>
  );
}
