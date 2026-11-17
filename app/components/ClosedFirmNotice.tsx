'use client';

import { useEffect, useRef } from 'react';
import type { Locale } from '../lib/locales';

type Copy = { eyebrow: string; title: string; body: string; evidence: string; dismiss: string; archive: string };

const translations: Record<Locale, Copy> = {
  en: { eyebrow: 'PropRadar · Safety alert', title: 'Warning: former prop firm', body: 'PropRadar warns you: this firm is listed as closed or no longer operating at its former address. Its name or domain might be reused by someone else. Do not buy a challenge without independently verifying the current operator, its legal details and payment terms.', evidence: 'Review the evidence', dismiss: 'I understand', archive: 'This is a historical score, not a current purchase recommendation.' },
  fr: { eyebrow: 'PropRadar · Alerte de sécurité', title: 'Attention : ancienne prop firm', body: 'PropRadar vous avertit : cette société est répertoriée comme fermée ou inactive à son ancienne adresse. Son nom ou son domaine pourrait être réutilisé par un tiers. N’achetez aucun challenge sans vérifier l’identité de l’exploitant actuel, ses mentions légales et ses conditions de paiement.', evidence: 'Consulter les preuves', dismiss: 'J’ai compris', archive: 'Note historique : elle ne constitue pas une recommandation d’achat actuelle.' },
  de: { eyebrow: 'PropRadar · Sicherheitswarnung', title: 'Achtung: ehemalige Prop-Firma', body: 'PropRadar warnt: Diese Firma ist als geschlossen oder an ihrer früheren Adresse nicht mehr aktiv verzeichnet. Name oder Domain könnten von Dritten wiederverwendet werden. Kaufen Sie keine Challenge, ohne Betreiber, Firmendaten und Zahlungsbedingungen unabhängig zu prüfen.', evidence: 'Quellen prüfen', dismiss: 'Verstanden', archive: 'Historische Bewertung, keine aktuelle Kaufempfehlung.' },
  it: { eyebrow: 'PropRadar · Avviso di sicurezza', title: 'Attenzione: ex prop firm', body: 'PropRadar avverte: questa società risulta chiusa o non più operativa al precedente indirizzo. Il suo nome o dominio potrebbe essere riutilizzato da terzi. Non acquistare challenge senza verificare il gestore attuale, i dati legali e i termini di pagamento.', evidence: 'Verifica le prove', dismiss: 'Ho capito', archive: 'Punteggio storico, non un consiglio di acquisto attuale.' },
  es: { eyebrow: 'PropRadar · Alerta de seguridad', title: 'Atención: antigua prop firm', body: 'PropRadar te advierte: esta empresa figura como cerrada o ya no opera en su antigua dirección. Su nombre o dominio podría ser reutilizado por terceros. No compres ningún challenge sin verificar de forma independiente al operador actual, sus datos legales y sus condiciones de pago.', evidence: 'Consultar las pruebas', dismiss: 'Entendido', archive: 'Puntuación histórica, no una recomendación de compra actual.' },
  pt: { eyebrow: 'PropRadar · Alerta de segurança', title: 'Atenção: antiga prop firm', body: 'A PropRadar alerta: esta empresa consta como encerrada ou já não opera no endereço anterior. O nome ou domínio poderá ser reutilizado por terceiros. Não compre challenges sem verificar o operador atual, os seus dados legais e as condições de pagamento.', evidence: 'Consultar provas', dismiss: 'Entendi', archive: 'Pontuação histórica, não uma recomendação atual de compra.' },
  zh: { eyebrow: 'PropRadar · 安全警示', title: '注意：已停止运营的交易资金公司', body: 'PropRadar 提醒您：该公司已被列为关闭或不再通过原地址运营。其名称或域名可能被第三方重新使用。购买任何挑战账户前，请独立核实当前运营方、法律主体及付款条款。', evidence: '查看依据', dismiss: '我已了解', archive: '此为历史评分，不代表当前购买建议。' },
  ja: { eyebrow: 'PropRadar · 安全に関する警告', title: '注意：過去のプロップファーム', body: 'PropRadarからのお知らせ：この企業は閉鎖済み、または以前の所在地で事業を行っていないと記録されています。名称やドメインが第三者に再利用される可能性があります。購入前に現在の運営会社、法人情報、支払い条件を必ず確認してください。', evidence: '根拠を確認', dismiss: '確認しました', archive: '過去の評価であり、現在の購入推奨ではありません。' },
  hi: { eyebrow: 'PropRadar · सुरक्षा चेतावनी', title: 'सावधान: पूर्व प्रॉप फर्म', body: 'PropRadar चेतावनी देता है: यह फर्म बंद या अपने पुराने पते पर निष्क्रिय दर्ज है। इसका नाम या डोमेन कोई अन्य व्यक्ति इस्तेमाल कर सकता है। किसी भी चैलेंज को खरीदने से पहले वर्तमान संचालक, कानूनी विवरण और भुगतान शर्तों की स्वतंत्र जाँच करें।', evidence: 'प्रमाण देखें', dismiss: 'समझ गया', archive: 'यह ऐतिहासिक स्कोर है, वर्तमान खरीद की सिफारिश नहीं।' },
  tr: { eyebrow: 'PropRadar · Güvenlik uyarısı', title: 'Dikkat: eski prop firması', body: 'PropRadar uyarıyor: Bu firma kapalı olarak listeleniyor veya eski adresinde artık faaliyet göstermiyor. Adı ya da alan adı üçüncü kişilerce yeniden kullanılabilir. Güncel işletmeciyi, yasal bilgileri ve ödeme koşullarını doğrulamadan hesap satın almayın.', evidence: 'Kanıtları incele', dismiss: 'Anladım', archive: 'Tarihsel puan; güncel satın alma tavsiyesi değildir.' },
  ar: { eyebrow: 'PropRadar · تنبيه أمني', title: 'تحذير: شركة تداول سابقة', body: 'تحذّرك PropRadar: هذه الشركة مدرجة كمغلقة أو لم تعد تعمل عبر عنوانها السابق. قد يعيد طرف ثالث استخدام اسمها أو نطاقها. لا تشترِ أي تحدٍّ قبل التحقق بشكل مستقل من هوية المشغّل الحالي وبياناته القانونية وشروط الدفع.', evidence: 'عرض الأدلة', dismiss: 'فهمت', archive: 'هذا تقييم تاريخي وليس توصية شراء حالية.' },
  ko: { eyebrow: 'PropRadar · 안전 경고', title: '주의: 운영이 중단된 프롭펌', body: 'PropRadar 안내: 이 회사는 폐업했거나 기존 주소에서 더 이상 운영하지 않는 것으로 표시되어 있습니다. 제3자가 회사명이나 도메인을 다시 사용할 수 있습니다. 챌린지를 구매하기 전에 현재 운영 주체, 법인 정보 및 결제 조건을 독립적으로 확인하세요.', evidence: '근거 확인', dismiss: '확인했습니다', archive: '과거 평가 점수이며 현재 구매를 권장하는 것은 아닙니다.' },
};

export function ClosedFirmArchiveLabel({ locale }: { locale: Locale }) {
  return <p className="pr-closed-alert-score-note">{translations[locale].archive}</p>;
}

export default function ClosedFirmNotice({ slug, name, locale }: { slug: string; name: string; locale: Locale }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const cacheKey = `propradar:closed-notice:v1:${slug}`;
  const copy = translations[locale];

  useEffect(() => {
    let dismissed = false;
    try { dismissed = sessionStorage.getItem(cacheKey) === 'dismissed'; } catch { /* Browser storage may be disabled. */ }
    if (!dismissed && dialog.current && !dialog.current.open) dialog.current.showModal();
  }, [cacheKey]);

  const rememberDismissal = () => {
    try { sessionStorage.setItem(cacheKey, 'dismissed'); } catch { /* Browser storage may be disabled. */ }
    if (dialog.current?.open) dialog.current.close();
  };

  return (
    <dialog
      ref={dialog}
      className="pr-closed-alert"
      aria-labelledby={`pr-closed-alert-heading-${slug}`}
      aria-describedby={`pr-closed-alert-body-${slug}`}
      onClose={rememberDismissal}
    >
      <div className="pr-closed-alert-inner" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <span className="pr-closed-alert-icon" aria-hidden="true">!</span>
        <div className="pr-closed-alert-eyebrow">{copy.eyebrow}</div>
        <h2 id={`pr-closed-alert-heading-${slug}`}>{copy.title}</h2>
        <p className="pr-closed-alert-name">{name}</p>
        <p id={`pr-closed-alert-body-${slug}`} className="pr-closed-alert-body">{copy.body}</p>
        <div className="pr-closed-alert-actions">
          <a href="#regulatory" onClick={rememberDismissal} className="pr-closed-alert-evidence">{copy.evidence} ↗</a>
          <button type="button" onClick={rememberDismissal} autoFocus className="pr-closed-alert-dismiss">{copy.dismiss}</button>
        </div>
      </div>
    </dialog>
  );
}
