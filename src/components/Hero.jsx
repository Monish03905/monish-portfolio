import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Download, Mail, RotateCw } from 'lucide-react';
import NeuralCanvas from './NeuralCanvas';
import PortraitCard from './PortraitCard';
import { GithubIcon, LinkedinIcon, LeetcodeIcon, CodechefIcon } from './BrandIcons';
import { profile, stats } from '../data/content';

const ease = [0.22, 1, 0.36, 1];

function rise(delay) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  };
}

function StatValue({ value, suffix }) {
  const reduced = useReducedMotion();
  const numeric = /^[\d.,]+$/.test(value);
  const target = numeric ? Number(value.replace(/,/g, '')) : 0;
  const decimals = value.includes('.') ? value.split('.')[1].length : 0;
  const [display, setDisplay] = useState(numeric && !reduced ? 0 : target);

  useEffect(() => {
    if (!numeric) return undefined;
    if (reduced) {
      setDisplay(target);
      return undefined;
    }
    let frame = 0;
    const start = performance.now();
    const duration = 1500;
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, numeric, reduced]);

  if (!numeric) return <>{value}</>;

  return (
    <>
      {display.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix ? <small>{suffix}</small> : null}
    </>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top" aria-label="Introduction">
      <div className="hero-grid" aria-hidden="true" />
      <NeuralCanvas />

      <div className="shell">
        <div className="hero-inner">
          <div className="hero-copy">
            <motion.div className="hero-eyebrow" {...rise(0.05)}>
              <span className="hero-avail">
                <span className="dot" />
                Open to AI/ML internships
              </span>
              <span className="mono">KL University · B.Tech AI &amp; DS</span>
            </motion.div>

            <motion.h1 className="hero-name" {...rise(0.14)}>
              <span>Monish</span>
              <span>Ratan</span>
              <em>Seelam</em>
            </motion.h1>

            <motion.p className="hero-tagline" {...rise(0.24)}>
              I build AI systems that <em>see</em>, <em>retrieve</em>, and <em>verify</em>.
            </motion.p>

            <motion.p className="hero-summary" {...rise(0.32)}>
              {profile.intro} Currently finishing my B.Tech in Artificial Intelligence &amp; Data
              Science with an 8.34 CGPA.
            </motion.p>

            <motion.div className="hero-actions" {...rise(0.4)}>
              <a className="btn btn--solid" href="#work">
                Explore the work
                <ArrowUpRight size={15} />
              </a>
              <a className="btn" href={profile.resume} target="_blank" rel="noopener noreferrer">
                <Download size={15} />
                Résumé
              </a>
              <div className="hero-socials">
                <a
                  className="hero-social"
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  title="GitHub"
                >
                  <GithubIcon size={17} />
                </a>
                <a
                  className="hero-social"
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  title="LinkedIn"
                >
                  <LinkedinIcon size={17} />
                </a>
                <a
                  className="hero-social"
                  href={profile.links.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode profile"
                  title="LeetCode"
                >
                  <LeetcodeIcon size={17} />
                </a>
                <a
                  className="hero-social"
                  href={profile.links.codechef}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="CodeChef profile"
                  title="CodeChef"
                >
                  <CodechefIcon size={17} />
                </a>
                <a className="hero-social" href={`mailto:${profile.email}`} aria-label="Email Monish" title="Email">
                  <Mail size={17} />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.25, ease }}
          >
            <div className="portrait-top">
              <div className="portrait-label top">
                <span className="k">Subject 001</span>
                <span className="v">AI &amp; DS · Vijayawada, IN</span>
              </div>
              <span className="portrait-chip portrait-chip--tl">
                <span className="dot" />
                CGPA 8.34 / 10
              </span>
            </div>

            <PortraitCard />

            <span className="portrait-chip portrait-chip--bl">
              <span className="dot" />
              Building AURA · RAG pipeline
            </span>
            <span className="portrait-hint">
              <RotateCw size={11} />
              drag or tap to flip
            </span>
          </motion.div>
        </div>

        <div className="hero-stats">
          {stats.map((stat, index) => (
            <motion.div
              className="stat"
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 + index * 0.07, ease }}
            >
              <div className="stat-value">
                <StatValue value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
