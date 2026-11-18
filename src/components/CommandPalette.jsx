import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  BadgeCheck,
  Cpu,
  FileText,
  FlaskConical,
  Layers,
  Mail,
  Milestone,
  Moon,
  Search,
  Sun,
  User,
  Copy,
} from 'lucide-react';
import { profile } from '../data/content';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { useLockBody } from '../hooks/useUi';

export default function CommandPalette({ open, onClose, theme, onToggleTheme, onCopyEmail }) {
  const reduced = useReducedMotion();
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  useLockBody(open);

  const items = useMemo(() => {
    const scrollTo = (id) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    };

    return [
      { group: 'Navigate', label: 'Profile', hint: 'About', icon: User, run: () => scrollTo('profile') },
      { group: 'Navigate', label: 'Featured work', hint: 'Projects', icon: Layers, run: () => scrollTo('work') },
      { group: 'Navigate', label: 'Retrieval lab', hint: 'Live demo', icon: FlaskConical, run: () => scrollTo('lab') },
      { group: 'Navigate', label: 'Stack & skills', hint: 'Capabilities', icon: Cpu, run: () => scrollTo('stack') },
      { group: 'Navigate', label: 'Journey', hint: 'Timeline', icon: Milestone, run: () => scrollTo('journey') },
      { group: 'Navigate', label: 'Credentials', hint: 'Certifications', icon: BadgeCheck, run: () => scrollTo('credentials') },
      { group: 'Navigate', label: 'GitHub activity', hint: 'Open source', icon: GithubIcon, run: () => scrollTo('github') },
      { group: 'Navigate', label: 'Contact', hint: 'Hire me', icon: Mail, run: () => scrollTo('contact') },

      {
        group: 'Actions',
        label: 'Download résumé',
        hint: 'PDF',
        icon: FileText,
        run: () => window.open(profile.resume, '_blank', 'noopener,noreferrer'),
      },
      { group: 'Actions', label: 'Copy email address', hint: 'Clipboard', icon: Copy, run: onCopyEmail },
      {
        group: 'Actions',
        label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`,
        hint: 'Appearance',
        icon: theme === 'dark' ? Sun : Moon,
        run: onToggleTheme,
      },

      { group: 'Elsewhere', label: 'GitHub — Monish03905', hint: 'Code', icon: GithubIcon, run: () => window.open(profile.links.github, '_blank', 'noopener,noreferrer') },
      { group: 'Elsewhere', label: 'LinkedIn', hint: 'Network', icon: LinkedinIcon, run: () => window.open(profile.links.linkedin, '_blank', 'noopener,noreferrer') },
      { group: 'Elsewhere', label: 'LeetCode', hint: 'Practice', icon: ArrowUpRight, run: () => window.open(profile.links.leetcode, '_blank', 'noopener,noreferrer') },
      { group: 'Elsewhere', label: 'CodeChef', hint: 'Contests', icon: ArrowUpRight, run: () => window.open(profile.links.codechef, '_blank', 'noopener,noreferrer') },
    ];
  }, [theme, onToggleTheme, onCopyEmail, reduced]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.hint.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q),
    );
  }, [items, query]);

  useEffect(() => {
    if (!open) return undefined;
    setQuery('');
    setActive(0);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    const item = list?.querySelector('.palette-item.is-active');
    if (!list || !item) return;
    const top = item.offsetTop;
    const bottom = top + item.offsetHeight;
    if (top - 8 < list.scrollTop) list.scrollTop = Math.max(0, top - 8);
    else if (bottom + 8 > list.scrollTop + list.clientHeight) {
      list.scrollTop = bottom - list.clientHeight + 8;
    }
  }, [active, open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const execute = (item) => {
    if (!item) return;
    onClose();
    item.run();
  };

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive((index) => (filtered.length ? (index + 1) % filtered.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((index) => (filtered.length ? (index - 1 + filtered.length) % filtered.length : 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      execute(filtered[active]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="palette-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={onClose}
        >
          <motion.div
            className="palette"
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, y: reduced ? 0 : -14, scale: reduced ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduced ? 0 : -10, scale: reduced ? 1 : 0.99 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="palette-input-row">
              <Search size={17} />
              <input
                ref={inputRef}
                className="palette-input"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Jump to a section, open a link, or run an action…"
                aria-label="Search commands"
                autoComplete="off"
                spellCheck="false"
              />
              <span className="palette-esc">ESC</span>
            </div>

            <div className="palette-list" role="listbox" aria-label="Commands" ref={listRef}>
              {filtered.length === 0 && (
                <div className="palette-empty">No commands match “{query}”.</div>
              )}
              {filtered.map((item, index) => {
                const Icon = item.icon;
                const showGroup = index === 0 || filtered[index - 1].group !== item.group;
                return (
                  <div key={`${item.group}-${item.label}`}>
                    {showGroup && <div className="palette-group">{item.group}</div>}
                    <button
                      type="button"
                      role="option"
                      aria-selected={index === active}
                      className={`palette-item${index === active ? ' is-active' : ''}`}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => execute(item)}
                    >
                      <Icon size={15} />
                      <span className="palette-item-label">{item.label}</span>
                      <span className="palette-item-hint">{item.hint}</span>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="palette-foot">
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> to navigate
              </span>
              <span>
                <kbd>↵</kbd> to select
              </span>
              <span>
                <kbd>esc</kbd> to close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
