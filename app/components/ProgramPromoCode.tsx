'use client';
import { useState } from 'react';

/** Copy a published coupon without claiming success when the clipboard is blocked. */
export default function ProgramPromoCode({code,label,copied}: {code:string;label:string;copied:string}) {
  const [done,setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setDone(true); }
    catch { setDone(false); }
  };
  return <div className="pr-program-promo-ticket"><code dir="ltr">{code}</code><button type="button" onClick={copy}>{done ? copied : label}</button></div>;
}
