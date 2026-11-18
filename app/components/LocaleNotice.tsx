'use client';

import { usePathname } from 'next/navigation';
import { LOCALE_COOKIE, isTranslatedPath, splitLocale } from '../lib/locales';

const partialPages = new Set(['/audit', '/promos', '/tools', '/prop-firm-payout-risk', '/radar-brief', '/prop-firm-rules']);
const partialCopy: Record<'sw' | 'ha' | 'am', { title: string; body: string }> = {
  sw: { title: 'Kiolesura kimetafsiriwa; baadhi ya vyanzo vimebaki kwa Kiingereza.', body: 'Madai rasmi ya kampuni, ushahidi na masharti yaliyotolewa na vyanzo yanaweza kuwa katika lugha asilia.' },
  ha: { title: 'An fassara shafin; wasu bayanan tushe suna cikin Ingilishi.', body: 'Bayanan kamfani, hujjoji da sharuddan hukuma na iya kasancewa a harshen asali.' },
  am: { title: 'የገጹ በይነገጽ ተተርጉሟል፤ አንዳንድ ምንጮች በእንግሊዝኛ ናቸው።', body: 'ኦፊሴላዊ የኩባንያ መረጃ፣ ማስረጃ እና ውሎች በዋናው ቋንቋ ሊቀሩ ይችላሉ።' },
};

/** Banner on pages whose content is still English only, outside English. */
export default function LocaleNotice({ title, body, english }: { title: string; body: string; english: string }) {
  const { locale, path } = splitLocale(usePathname() || '/');
  if (locale === 'en' || isTranslatedPath(path, locale)) return null;
  const isPartiallyLocalized = (locale === 'sw' || locale === 'ha' || locale === 'am') && partialPages.has(path);
  const message = isPartiallyLocalized ? partialCopy[locale as keyof typeof partialCopy] : null;
  return (
    <div className="locale-notice" role="note">
      <div className="container">
        <strong>{message?.title ?? title}</strong>
        <span>{message?.body ?? body}</span>
        <a
          href={path}
          hrefLang="en"
          onClick={() => {
            document.cookie = `${LOCALE_COOKIE}=en; path=/; max-age=31536000; samesite=lax`;
          }}
        >
          {english}
        </a>
      </div>
    </div>
  );
}
