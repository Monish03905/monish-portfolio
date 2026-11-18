import { ArrowUpRight, Copy, Download, Mail, Phone, MapPin } from 'lucide-react';
import Reveal from './Reveal';
import { GithubIcon, LinkedinIcon, LeetcodeIcon, CodechefIcon } from './BrandIcons';
import { profile } from '../data/content';
import { useLocalTime } from '../hooks/useUi';

export default function Contact({ onCopyEmail, onOpenPalette }) {
  const time = useLocalTime(profile.timezone);

  const cards = [
    { k: 'Email', v: profile.email, href: `mailto:${profile.email}`, icon: Mail },
    { k: 'Phone', v: profile.phone, href: `tel:${profile.phoneHref}`, icon: Phone },
    { k: 'GitHub', v: 'Monish03905', href: profile.links.github, icon: GithubIcon },
    { k: 'LinkedIn', v: 'monish-ratan', href: profile.links.linkedin, icon: LinkedinIcon },
    { k: 'LeetCode', v: 'KL2400080018', href: profile.links.leetcode, icon: LeetcodeIcon },
    { k: 'CodeChef', v: 'monish_ratan', href: profile.links.codechef, icon: CodechefIcon },
  ];

  return (
    <section className="section contact-section" id="contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="shell">
        <div className="contact-top">
          <Reveal>
            <span className="sec-index" style={{ display: 'inline-flex' }}>
              08 Contact
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <span className="chip chip--accent">
              <span className="dot" />
              {profile.availability}
            </span>
          </Reveal>
        </div>

        <Reveal delay={0.06}>
          <h2 className="contact-title">
            Let&apos;s build something <em>worth shipping.</em>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <a className="contact-mail" href={`mailto:${profile.email}`}>
            {profile.email}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="contact-actions">
            <button type="button" className="btn" onClick={onCopyEmail}>
              <Copy size={14} />
              Copy email
            </button>
            <a
              className="btn btn--solid"
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={14} />
              Download résumé
            </a>
            <a
              className="btn"
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon size={14} />
              Connect on LinkedIn
            </a>
          </div>
        </Reveal>

        <div className="contact-grid">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.k} delay={0.04 * index} y={16}>
                <a
                  className="contact-card"
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <span className="k">
                    {card.k}
                    <Icon size={12} />
                  </span>
                  <span className="v">{card.v}</span>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div
            className="mono"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              flexWrap: 'wrap',
              marginTop: 28,
            }}
          >
            <span className="contact-clock">
              <MapPin size={11} />
              Vijayawada, IN
              <b>{time}</b>
              IST
            </span>
            <span>Remote-friendly · Relocation-ready</span>
          </div>
        </Reveal>

        <footer className="footer">
          <span>© {new Date().getFullYear()} Monish Ratan Seelam</span>
          <div className="footer-right">
            <button type="button" className="mono" onClick={onOpenPalette} style={{ textTransform: 'uppercase' }}>
              ⌘K menu
            </button>
            <span>Designed &amp; built from scratch</span>
            <button
              type="button"
              className="to-top mono"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ textTransform: 'uppercase' }}
            >
              Back to top ↑
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
