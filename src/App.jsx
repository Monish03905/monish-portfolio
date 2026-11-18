import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Profile from './components/Profile';
import Work from './components/Work';
import Lab from './components/Lab';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Credentials from './components/Credentials';
import Github from './components/Github';
import Contact from './components/Contact';
import CommandPalette from './components/CommandPalette';
import { profile } from './data/content';
import { useScrollProgress, useScrollSpy } from './hooks/useUi';

const SECTION_IDS = ['profile', 'work', 'lab', 'stack', 'journey', 'credentials', 'github', 'contact'];

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('mrs-theme') || 'dark';
    } catch {
      return 'dark';
    }
  });
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);
  const progress = useScrollProgress();
  const active = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('mrs-theme', theme);
    } catch {
      /* ignore */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#07090b' : '#f3f0e7');
  }, [theme]);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  const notify = useCallback((message) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(''), 2600);
  }, []);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      notify('Email copied to clipboard');
    } catch {
      notify(`Copy failed — ${profile.email}`);
    }
  }, [notify]);

  useEffect(() => {
    const onKey = (event) => {
      const key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && key === 'k') {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <Loader />
      <Cursor />

      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      <Nav
        active={active}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <main id="main">
        <Hero />
        <Ticker />
        <Profile />
        <Work />
        <Lab />
        <Skills />
        <Journey />
        <Credentials />
        <Github />
        <Contact onCopyEmail={copyEmail} onOpenPalette={() => setPaletteOpen(true)} />
      </main>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        theme={theme}
        onToggleTheme={toggleTheme}
        onCopyEmail={copyEmail}
      />

      <div className={`toast${toast ? ' is-visible' : ''}`} role="status" aria-live="polite">
        {toast ? (
          <>
            <CheckCircle2 size={15} />
            {toast}
          </>
        ) : null}
      </div>
    </>
  );
}
