export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.propradar.tech';

export const SITE_NAME = 'PropRadar';

export const SITE_DESCRIPTION =
  'Independent prop firm reviews and comparison: challenge rules, prices, payout evidence, Trustpilot status and the legal entity behind each firm, every fact sourced and dated.';

/**
 * Public identity of the founder (a pseudonym, never the legal name).
 * Shown on /about, in guide bylines and in the Organization schema.
 */
export const FOUNDER = {
  handle: 'ADG',
  bio: 'An independent trader in forex, commodities and crypto, who has bought and traded challenges at many prop firms.',
  /** Public profiles of the founder (e.g. the PropRadar X account). */
  sameAs: [] as string[],
};
