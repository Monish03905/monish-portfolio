import { useMemo, useState } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import SectionHead from './SectionHead';
import Reveal from './Reveal';
import ProjectGlyph from './ProjectGlyph';
import CaseStudy from './CaseStudy';
import { GithubIcon } from './BrandIcons';
import { projects, experiments, profile } from '../data/content';
import { categoryAccent } from '../lib/accents';

const CATEGORIES = ['All', 'AI & Retrieval', 'Vision', 'Full-stack', 'Cloud'];

const GLYPHS = {
  'AI & Retrieval': 'retrieval',
  Vision: 'vision',
  'Full-stack': 'fullstack',
  Cloud: 'cloud',
};

function ProjectCard({ project, wide, index, onOpen }) {
  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <article
      className={`project-card${wide ? ' project-card--wide' : ''}`}
      style={{ '--cat': categoryAccent(project.category), animationDelay: `${index * 55}ms` }}
      onMouseMove={handleMove}
    >
      {wide ? (
        <div className="pc-plate" aria-hidden="true">
          <ProjectGlyph variant={GLYPHS[project.category]} className="pc-glyph-lg" />
          <div className="pc-plate-meta">
            <span className="pc-plate-index">{project.index}</span>
            <span className="pc-plate-line" />
            <span>{project.category}</span>
          </div>
        </div>
      ) : (
        <>
          <ProjectGlyph variant={GLYPHS[project.category]} />
          <span className="pc-big-index" aria-hidden="true">
            {project.index}
          </span>
        </>
      )}

      <div className="pc-inner">
        <div className="pc-top">
          <span className="pc-index">{project.index}</span>
          <span className={`pc-state${project.state.includes('Live') ? ' is-live' : ''}`}>
            <i />
            {project.state}
          </span>
        </div>

        <div>
          <span className="pc-cat">{project.category}</span>
          <h3 className="pc-title" style={{ marginTop: 10 }}>
            {project.title}
          </h3>
          <p className="pc-sub">{project.subtitle}</p>
          <p className="pc-summary" style={{ marginTop: 14 }}>
            {project.summary}
          </p>
        </div>

        <div className="pc-side" style={{ marginTop: 'auto' }}>
          <div className="pc-stack">
            {project.stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>

          <div className="pc-actions">
            <button type="button" className="pc-open" onClick={() => onOpen(project.id)}>
              Read case study
              <ArrowUpRight size={14} />
            </button>
            {project.links.demo && (
              <a
                className="pc-ext"
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live demo of ${project.title}`}
                title="Live demo"
              >
                <ExternalLink size={15} />
              </a>
            )}
            {project.links.github && (
              <a
                className="pc-ext"
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} on GitHub`}
                title="GitHub"
              >
                <GithubIcon size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const [filter, setFilter] = useState('All');
  const [activeId, setActiveId] = useState(null);

  const counts = useMemo(() => {
    const map = { All: projects.length };
    projects.forEach((project) => {
      map[project.category] = (map[project.category] || 0) + 1;
    });
    return map;
  }, []);

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);
  const active = projects.find((project) => project.id === activeId) || null;

  const navigate = (direction) => {
    const index = projects.findIndex((project) => project.id === activeId);
    if (index === -1) return;
    const next = (index + direction + projects.length) % projects.length;
    setActiveId(projects[next].id);
  };

  return (
    <section className="section" id="work">
      <div className="shell">
        <SectionHead
          index="02"
          kicker="Selected work"
          title={
            <>
              Eight systems. <em>Shipped, not sketched.</em>
            </>
          }
          aside={
            <span className="mono" style={{ maxWidth: 200, lineHeight: 1.7 }}>
              Every project links to
              <br />
              code or a live demo.
            </span>
          }
        />

        <Reveal>
          <div className="work-toolbar">
            <div className="filters" role="tablist" aria-label="Filter projects">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={filter === category}
                  className={`filter${filter === category ? ' is-active' : ''}`}
                  onClick={() => setFilter(category)}
                >
                  {category}
                  <small>{counts[category]}</small>
                </button>
              ))}
            </div>
            <span className="work-count">
              Showing {String(filtered.length).padStart(2, '0')} of {projects.length}
            </span>
          </div>
        </Reveal>

        <div className="work-grid" key={filter}>
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              wide={filter === 'All' && index < 2}
              onOpen={setActiveId}
            />
          ))}
        </div>

        <div className="exp-shelf">
          <Reveal>
            <div className="exp-head">
              <h3>More experiments</h3>
              <a
                className="mono link"
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                Browse all repositories
                <ArrowUpRight size={12} />
              </a>
            </div>
          </Reveal>

          <div className="exp-grid">
            {experiments.map((experiment, index) => (
              <Reveal key={experiment.name} delay={index * 0.03} y={14}>
                <a
                  className="exp-item"
                  href={experiment.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="exp-name">{experiment.name}</span>
                  <span className="exp-note">{experiment.note}</span>
                  <ArrowUpRight size={14} className="exp-arrow" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <CaseStudy project={active} onClose={() => setActiveId(null)} onNavigate={navigate} />
    </section>
  );
}
