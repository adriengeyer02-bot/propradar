import type { NextConfig } from 'next';

// English URLs since 2026-10-29. Old French paths answer with a permanent
// redirect so links and Google rankings carry over.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Duplicate firm profiles merged on 2026-10-30 (approved by the site owner): old slug -> kept profile.
      { source: '/firm/wall-street-funded/:path*', destination: '/firm/wsfunded/:path*', permanent: true },
      { source: '/firm/wall-street-funded', destination: '/firm/wsfunded', permanent: true },
      { source: '/firm/ascendx-capital/:path*', destination: '/firm/quant-tekel/:path*', permanent: true },
      { source: '/firm/ascendx-capital', destination: '/firm/quant-tekel', permanent: true },
      { source: '/firm/toptier-trader/:path*', destination: '/firm/tx3-funding/:path*', permanent: true },
      { source: '/firm/toptier-trader', destination: '/firm/tx3-funding', permanent: true },
      { source: '/comparateur', destination: '/prop-firm-comparison', permanent: true },
      { source: '/comparateur/:path*', destination: '/prop-firm-comparison/:path*', permanent: true },
      { source: '/meilleures-prop-firms', destination: '/best-prop-firms', permanent: true },
      { source: '/meilleures-prop-firms/:path*', destination: '/best-prop-firms/:path*', permanent: true },
      { source: '/risques-payout', destination: '/prop-firm-payout-risk', permanent: true },
      { source: '/risques-payout/:path*', destination: '/prop-firm-payout-risk/:path*', permanent: true },
      { source: '/regles', destination: '/prop-firm-rules', permanent: true },
      { source: '/regles/:path*', destination: '/prop-firm-rules/:path*', permanent: true },
      { source: '/outils', destination: '/tools', permanent: true },
      { source: '/outils/:path*', destination: '/tools/:path*', permanent: true },
      { source: '/guides/meilleure-prop-firm-futures', destination: '/guides/best-futures-prop-firms', permanent: true },
      { source: '/guides/meilleure-prop-firm-futures/:path*', destination: '/guides/best-futures-prop-firms/:path*', permanent: true },
      { source: '/guides/prop-firm-sans-consistency-rule', destination: '/guides/prop-firm-no-consistency-rule', permanent: true },
      { source: '/guides/prop-firm-sans-consistency-rule/:path*', destination: '/guides/prop-firm-no-consistency-rule/:path*', permanent: true },
      { source: '/guides/prop-firm-payout-rapide', destination: '/guides/fast-payout-prop-firms', permanent: true },
      { source: '/guides/prop-firm-payout-rapide/:path*', destination: '/guides/fast-payout-prop-firms/:path*', permanent: true },
      { source: '/guides/prop-firm-pas-cher', destination: '/guides/cheapest-prop-firms', permanent: true },
      { source: '/guides/prop-firm-pas-cher/:path*', destination: '/guides/cheapest-prop-firms/:path*', permanent: true },
      { source: '/guides/prop-firm-fiable-trustpilot', destination: '/guides/prop-firm-trustpilot-ratings', permanent: true },
      { source: '/guides/prop-firm-fiable-trustpilot/:path*', destination: '/guides/prop-firm-trustpilot-ratings/:path*', permanent: true },
      { source: '/guides/leveraged-prop-firm-avis', destination: '/guides/get-leveraged-review', permanent: true },
      { source: '/guides/leveraged-prop-firm-avis/:path*', destination: '/guides/get-leveraged-review/:path*', permanent: true },
      { source: '/guides/goat-funded-trader-avis', destination: '/guides/goat-funded-trader-review', permanent: true },
      { source: '/guides/goat-funded-trader-avis/:path*', destination: '/guides/goat-funded-trader-review/:path*', permanent: true },
      { source: '/guides/prop-firm-sans-challenge', destination: '/guides/prop-firm-no-challenge', permanent: true },
      { source: '/guides/prop-firm-sans-challenge/:path*', destination: '/guides/prop-firm-no-challenge/:path*', permanent: true },
      { source: '/guides/prop-firm-pour-debutant', destination: '/guides/prop-firm-for-beginners', permanent: true },
      { source: '/guides/prop-firm-pour-debutant/:path*', destination: '/guides/prop-firm-for-beginners/:path*', permanent: true },
      { source: '/guides/meilleure-prop-firm-forex', destination: '/guides/best-forex-prop-firms', permanent: true },
      { source: '/guides/meilleure-prop-firm-forex/:path*', destination: '/guides/best-forex-prop-firms/:path*', permanent: true },
      { source: '/guides/alternatives-ftmo', destination: '/guides/ftmo-alternatives', permanent: true },
      { source: '/guides/alternatives-ftmo/:path*', destination: '/guides/ftmo-alternatives/:path*', permanent: true },
      { source: '/guides/prop-firm-avis-reddit-trustpilot', destination: '/guides/prop-firm-reviews-reddit-trustpilot', permanent: true },
      { source: '/guides/prop-firm-avis-reddit-trustpilot/:path*', destination: '/guides/prop-firm-reviews-reddit-trustpilot/:path*', permanent: true },
      { source: '/guides/meilleure-prop-firm-2026', destination: '/best-prop-firms', permanent: true },
    ];
  },
};

export default nextConfig;
