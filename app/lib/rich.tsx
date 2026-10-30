import type { ReactNode } from 'react';

/** Fill a translated template whose {placeholders} are React nodes (links, bold text) or plain values. */
export function rich(template: string, values: Record<string, ReactNode>): ReactNode[] {
  return template.split(/(\{\w+\})/g).map((part, index) => {
    const key = part.match(/^\{(\w+)\}$/)?.[1];
    return key && key in values ? <span key={index}>{values[key]}</span> : part;
  });
}
