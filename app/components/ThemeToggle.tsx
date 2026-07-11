'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function getCurrentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(getCurrentTheme());
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    try {
      localStorage.setItem('propradar-theme', nextTheme);
    } catch {
      // The visual toggle still works when browser storage is unavailable.
    }
    setTheme(nextTheme);
  }

  const nextThemeLabel = theme === 'dark' ? 'Use light mode' : 'Use dark mode';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={nextThemeLabel}
      title={nextThemeLabel}
      aria-pressed={theme === 'dark'}
    >
      <span aria-hidden="true">{theme === 'dark' ? '\u2600' : '\u263E'}</span>
    </button>
  );
}
