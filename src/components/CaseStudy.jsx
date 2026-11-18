import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ExternalLink, X } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { projects } from '../data/content';
import { categoryAccent } from '../lib/accents';
import { useLockBody } from '../hooks/useUi';

export default function CaseStudy({ project, onClose, onNavigate }) {
  const reduced = useReducedMotion();
  const closeRef = useRef(null);
  useLockBody(Boolean(project));

  useEffect(() => {
    if (!project) return undefined;
    const timer = window.setTimeout(() => closeRef.current?.focus(), 40);
    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
      if (event.key === 'ArrowRight') onNavigate?.(1);
      if (event.key === 'ArrowLeft') onNavigate?.(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose, onNavigate]);

  const index = project ? projects.findIndex((item) => item.id === project.id) : -1;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onMouseDown={onClose}
        >
          <motion.article
            className="case-modal"
            style={{ '--cat': categoryAccent(project.category) }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-title"
            initial={{ opacity: 0, y: reduced ? 0 : 24, scale: reduced ? 1 : 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduced ? 0 : 16, scale: reduced ? 1 : 0.99 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="case-head">
              <button
                type="button"
                className="case-close"
                onClick={onClose}
                aria-label="Close case study"
                ref={closeRef}
              >
                <X size={17} />
              </button>

              <div className="case-eyebrow">
                <span className="pc-cat" style={{ '--cat': categoryAccent(project.category) }}>
                  {project.category}
                </span>
                <span className="mono">{project.year}</span>
                <span className="pc-state is-live">
                  <i />
                  {project.state}
                </span>
              </div>

              <h2 className="case-title" id="case-title">
                {project.title}
              </h2>
              <p className="case-sub">{project.subtitle}</p>
              <p className="case-summary">{project.summary}</p>
            </div>

            <div className="case-body">
              <div>
                <div className="case-block">
                  <div className="case-label">The problem</div>
                  <p className="case-problem">{project.problem}</p>
                </div>

                <div className="case-block">
                  <div className="case-label">How I built it</div>
                  <div className="case-steps">
                    {project.approach.map((step, i) => (
                      <div className="case-step" key={step}>
                        <span className="case-step-num">{String(i + 1).padStart(2, '0')}</span>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <aside>
                <div className="case-block">
                  <div className="case-label">What it proves</div>
                  <div className="case-highlights">
                    {project.highlights.map((item) => (
                      <div className="case-highlight" key={item}>
                        <Check size={13} strokeWidth={2.4} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="case-block">
                  <div className="case-label">Stack</div>
                  <div className="case-stack">
                    {project.stack.map((tech) => (
                      <span className="chip" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="case-block">
                  <div className="case-label">Links</div>
                  <div className="case-links">
                    {project.links.demo && (
                      <a
                        className="case-link"
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View live demo
                        <ExternalLink size={14} />
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        className="case-link"
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Source on GitHub
                        <GithubIcon size={14} />
                      </a>
                    )}
                    {project.links.article && (
                      <a
                        className="case-link"
                        href={project.links.article}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read the write-up
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </aside>
            </div>

            <footer className="case-foot">
              <span>
                Case study {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="button" className="btn btn--sm" onClick={() => onNavigate(-1)}>
                  <ArrowLeft size={13} /> Prev
                </button>
                <button
                  type="button"
                  className="btn btn--sm btn--solid"
                  onClick={() => onNavigate(1)}
                >
                  Next <ArrowRight size={13} />
                </button>
              </div>
            </footer>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
