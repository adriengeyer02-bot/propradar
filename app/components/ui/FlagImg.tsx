type FlagImgProps = {
  code: string;
  name: string;
  size?: 'sm' | 'md';
};

/**
 * Static flag file (public/flags, copied from country-flag-icons, MIT).
 * Used in client components so the full flag set never enters the JS bundle.
 */
export default function FlagImg({ code, name, size = 'sm' }: FlagImgProps) {
  const width = size === 'sm' ? 18 : 27;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={`pr-flag pr-flag-img pr-flag-${size}`} src={`/flags/${code}.svg`} width={width} height={Math.round((width * 2) / 3)} alt={name} title={name} loading="lazy" decoding="async" />
  );
}
