import { permanentRedirect } from 'next/navigation';

/**
 * The Reddit/X register was removed on 2026-10-27: PropRadar no longer shows
 * Reddit or X scores (they were editorial estimates derived from the PropRadar
 * score, not counted mentions). Firm pages now link to live Reddit and X
 * searches instead. Old links land on the source audit.
 */
export default function CommunityAuditPage() {
  permanentRedirect('/audit');
}
