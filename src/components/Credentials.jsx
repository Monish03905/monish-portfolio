import { ArrowUpRight, BadgeCheck, FileText } from 'lucide-react';
import SectionHead from './SectionHead';
import Reveal from './Reveal';
import { certifications } from '../data/content';
import { accentVar } from '../lib/accents';

export default function Credentials() {
  return (
    <section className="section" id="credentials">
      <div className="shell">
        <SectionHead
          index="06"
          kicker="Credentials"
          title={
            <>
              Proof, <em>signed off.</em>
            </>
          }
          aside={
            <span className="mono" style={{ maxWidth: 200, lineHeight: 1.7 }}>
              5 cloud &amp; AI certifications
              <br />
              1 verified internship
            </span>
          }
        />

        <div className="cert-grid">
          {certifications.map((cert, index) => {
            const accent = accentVar(cert.accent);
            const inner = (
              <>
                <div className="cert-top">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <span className="cert-verified">
                    <BadgeCheck size={12} />
                    Verified
                  </span>
                </div>
                <h3 className="cert-name">{cert.name}</h3>
                <p className="cert-note">{cert.note}</p>
                <div className="cert-foot">
                  <span>{cert.external ? 'AICTE · EduSkills' : 'Certificate PDF'}</span>
                  <span className="cert-view">
                    {cert.file ? (
                      <>
                        View <ArrowUpRight size={11} />
                      </>
                    ) : (
                      <>
                        <FileText size={11} /> On file
                      </>
                    )}
                  </span>
                </div>
                <span className="cert-stamp" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </>
            );

            return (
              <Reveal key={cert.name} delay={index * 0.04} y={18}>
                {cert.file ? (
                  <a
                    className="cert-card"
                    href={cert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ '--cat': accent }}
                    aria-label={`View ${cert.name} certificate`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="cert-card" style={{ '--cat': accent }}>
                    {inner}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
