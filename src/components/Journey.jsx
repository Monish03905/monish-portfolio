import { ArrowUpRight } from 'lucide-react';
import SectionHead from './SectionHead';
import Reveal from './Reveal';
import { timeline, education } from '../data/content';

export default function Journey() {
  return (
    <section className="section" id="journey">
      <div className="shell">
        <SectionHead
          index="05"
          kicker="Journey"
          title={
            <>
              Learning, leading, <em>shipping.</em>
            </>
          }
          aside={
            <span className="mono" style={{ maxWidth: 200, lineHeight: 1.7 }}>
              Expected graduation
              <br />
              May 2028
            </span>
          }
        />

        <div className="journey-grid">
          <div>
            <Reveal>
              <div className="journey-col-title">Experience &amp; leadership</div>
            </Reveal>

            <div className="tl">
              {timeline.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05} y={18}>
                  <div className={`tl-item${item.accent ? ' is-accent' : ''}`}>
                    <span className="tl-dot" aria-hidden="true" />
                    <div className="tl-top">
                      <span className="tl-period">{item.period}</span>
                      <span className="tl-tag">{item.tag}</span>
                    </div>
                    <h3 className="tl-title">{item.title}</h3>
                    <div className="tl-org">{item.org}</div>
                    <p className="tl-body">{item.body}</p>
                    {item.link ? (
                      <a
                        className="tl-link"
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.tag === 'Internship' ? 'Verify certificate' : 'View on GitHub'}
                        <ArrowUpRight size={11} />
                      </a>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal delay={0.06}>
              <div className="journey-col-title">Education</div>
            </Reveal>

            <div className="edu-list">
              {education.map((item, index) => (
                <Reveal key={item.degree} delay={0.06 + index * 0.05} y={18}>
                  <div className="edu-item">
                    <div className="edu-period">{item.period}</div>
                    <div className="edu-degree">{item.degree}</div>
                    <div className="edu-school">
                      {item.school} · {item.place}
                    </div>
                    <div className="edu-foot">
                      <span>{item.note || 'Completed'}</span>
                      <span className="edu-score">{item.score}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
