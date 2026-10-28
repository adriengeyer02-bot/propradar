import type { ReactElement } from 'react';
import * as Flags from 'country-flag-icons/react/3x2';

type FlagProps = {
  /** ISO 3166-1 alpha-2 code. Unknown or missing codes render a neutral tile. */
  code?: string;
  /** Accessible country name; leave empty when the name is written next to the flag. */
  title?: string;
  size?: 'sm' | 'md' | 'lg';
};

const REGISTRY = Flags as unknown as Record<string, (props: Record<string, unknown>) => ReactElement>;

/** Self-hosted SVG flag (country-flag-icons, MIT). Decorative unless a title is given. */
export default function Flag({ code, title, size = 'md' }: FlagProps) {
  const Svg = code ? REGISTRY[code] : undefined;
  if (!Svg) {
    return (
      <span className={`pr-flag pr-flag-${size} pr-flag-unknown`} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
        ?
      </span>
    );
  }
  return (
    <span className={`pr-flag pr-flag-${size}`} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <Svg aria-hidden="true" focusable="false" />
    </span>
  );
}
