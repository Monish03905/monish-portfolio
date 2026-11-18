import SectionHead from './SectionHead';
import Reveal from './Reveal';
import { skillGroups } from '../data/content';
import { accentVar } from '../lib/accents';

export default function Skills() {
  return (
    <section className="section" id="stack">
      <div className="shell">
        <SectionHead
          index="04"
          kicker="Capability"
          title={
            <>
              The stack behind <em>see · retrieve · verify.</em>
            </>
          }
        />

        <div className="skills-intro">
          <Reveal>
            <p className="sec-sub" style={{ maxWidth: '46ch' }}>
              I pick tools by what the problem needs — a vision pipeline, a retrieval index, a REST
              contract, or a deploy gate. Below is what I reach for without looking it up.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mono" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              Working
              <span className="meter" aria-hidden="true">
                <i className="on" />
                <i />
                <i />
                <i />
              </span>
              <span className="meter" aria-hidden="true">
                <i className="on" />
                <i className="on" />
                <i className="on" />
                <i className="on" />
              </span>
              Deep
            </div>
          </Reveal>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, groupIndex) => (
            <Reveal key={group.title} delay={groupIndex * 0.04}>
              <div className="skill-group" style={{ '--cat': accentVar(group.accent) }}>
                <div className="skill-head">
                  <h3 className="skill-title">{group.title}</h3>
                  <span className="skill-note">{group.note}</span>
                </div>
                <div className="skill-list">
                  {group.items.map((item) => (
                    <div className="skill-row" key={item.name}>
                      <span className="skill-name">{item.name}</span>
                      <span
                        className="meter"
                        role="img"
                        aria-label={`${item.level} of 4`}
                      >
                        {[1, 2, 3, 4].map((level) => (
                          <i key={level} className={level <= item.level ? 'on' : ''} />
                        ))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="skills-foot">
            <span>Also comfortable with</span>
            <span className="chip">Oracle Fusion Apps</span>
            <span className="chip">Maven</span>
            <span className="chip">Tailwind</span>
            <span className="chip">PowerShell</span>
            <span className="chip">Figma</span>
            <span className="chip">Agile / Scrum</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
