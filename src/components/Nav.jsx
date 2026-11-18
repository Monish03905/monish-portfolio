import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Command, Menu, Moon, Sun, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon, CodechefIcon } from './BrandIcons';
import { profile } from '../data/content';
import { useLockBody } from '../hooks/useUi';

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'lab', label: 'Lab' },
  { id: 'stack', label: 'Stack' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav({ active, theme, onToggleTheme, onOpenPalette }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useLockBody(menuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const goTop = (event) => {
    event.preventDefault();
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
        <div className="shell nav-inner">
          <a className="brand" href="#top" onClick={goTop} aria-label="Monish Ratan Seelam — back to top">
            <span className="brand-mark">MR</span>
            <span className="brand-text">
              <span className="brand-name">Monish Ratan Seelam</span>
              <span className="brand-role">AI &amp; Data Science</span>
            </span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-link${active === link.id ? ' is-active' : ''}`}
                aria-current={active === link.id ? 'true' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav-right">
            <span className="nav-avail">
              <span className="dot" />
              Open to internships
            </span>
            <button
              type="button"
              className="kbd-btn"
              onClick={onOpenPalette}
              aria-label="Open command menu"
            >
              <Command size={13} />
              <span>Menu</span>
              <kbd>K</kbd>
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              type="button"
              className="icon-btn nav-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="mobile-links" aria-label="Mobile">
              {LINKS.map((link, index) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="mobile-link"
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {link.label}
                  <ArrowUpRight size={18} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                </a>
              ))}
            </nav>

            <div className="mobile-foot">
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GithubIcon size={18} />
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedinIcon size={18} />
              </a>
              <a href={profile.links.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
                <LeetcodeIcon size={18} />
              </a>
              <a href={profile.links.codechef} target="_blank" rel="noopener noreferrer" aria-label="CodeChef">
                <CodechefIcon size={18} />
              </a>
              <a href={`mailto:${profile.email}`} style={{ marginLeft: 'auto' }}>
                {profile.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
