import { ArrowUpRight, FileText } from 'lucide-react';
import SectionHead from './SectionHead';
import Reveal from './Reveal';
import { profile, pillars, facts, currently } from '../data/content';
import { accentVar } from '../lib/accents';

export default function Profile() {
  return (
    <section className="section" id="profile">
      <div className="shell">
        <SectionHead
          index="01"
          kicker="Profile"
          title={
            <>
              My degree is AI &amp; Data Science. <em>My habit is shipping.</em>
            </>
          }
          aside={
            <span className="mono" style={{ maxWidth: 190, lineHeight: 1.7 }}>
              B.Tech · 2024—2028
              <br />
              KL University
            </span>
          }
        />

        <div className="profile-grid">
          <div>
            <Reveal>
              <p className="profile-statement">
                I&apos;m an <em>AI &amp; Data Science</em> undergraduate who would rather ship a
                working system than describe one.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="profile-body">
                <p>
                  At KL University I study machine learning, data structures, and database systems —
                  then take that straight into production-shaped projects: a multilingual RAG
                  pipeline with <strong>9,754 indexed chunks</strong>, an agentic code-repair loop that
                  verifies its own fixes, and a drone flown with hand gestures at 30+ FPS.
                </p>
                <p>
                  My work sits where <strong>perception</strong>, <strong>retrieval</strong>, and{' '}
                  <strong>verification</strong> meet: models that see the world, search what they
                  know, and prove what they produced. That&apos;s the thread running through every
                  project below.
                </p>
                <p>
                  Off the terminal I led the VEDA Student Body as President, ran technical events
                  across departments, and earned the Dean&apos;s Recognition for it.
                </p>
              </div>
            </Reveal>

            <div className="pillars">
              {pillars.map((pillar, index) => (
                <Reveal key={pillar.key} delay={0.06 * index}>
                  <article className="pillar" style={{ '--cat': accentVar(pillar.accent) }}>
                    <span className="pillar-kicker">{pillar.kicker}</span>
                    <h3 className="pillar-title">{pillar.title}</h3>
                    <p className="pillar-body">{pillar.body}</p>
                    <span className="pillar-proof">{pillar.proof}</span>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="profile-side" delay={0.12}>
            <div className="facts-card">
              <div className="facts-head">
                <span>Quick facts</span>
                <span className="dot" />
              </div>
              {facts.map((fact) => (
                <div className="fact-row" key={fact.k}>
                  <span className="k">{fact.k}</span>
                  <span className={`v${fact.k === 'CGPA' ? ' is-accent' : ''}`}>{fact.v}</span>
                </div>
              ))}
              <div className="fact-row">
                <span className="k">Résumé</span>
                <a
                  className="v link"
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <FileText size={13} /> Open PDF
                </a>
              </div>
            </div>

            <div className="now-card">
              <div className="now-title">
                <span className="dot" />
                Currently
              </div>
              <ul className="now-list">
                {currently.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <a className="btn btn--sm" href="#lab" style={{ alignSelf: 'flex-start' }}>
              Try the retrieval lab
              <ArrowUpRight size={14} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
