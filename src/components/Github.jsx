import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import SectionHead from './SectionHead';
import Reveal from './Reveal';
import { GithubIcon } from './BrandIcons';
import { profile } from '../data/content';

const LANG_COLORS = {
  Python: 'var(--accent)',
  TypeScript: 'var(--verify)',
  JavaScript: 'var(--vision)',
  Java: 'var(--cloud)',
  HTML: 'var(--ink-3)',
  CSS: 'var(--ink-3)',
};

const CURATED_DESCRIPTIONS = {
  'switchyard-llm-gateway':
    'LLM gateway with a three-tier cost router, HMAC-signed receipts and a six-page ops cockpit.',
  ghostlight_studio:
    'Autonomous faceless film studio — writes, narrates, scores, renders and gates its own shorts.',
  'jarvis-voice-assistant':
    'Voice-first OS assistant with a local LLM brain and OS skills. Work in progress.',
  'aure-rag': 'Offline-first multilingual RAG — 9,754 chunks indexed in FAISS, answers grounded in your own docs.',
  'aura-rag': 'Offline-first multilingual RAG — 9,754 chunks indexed in FAISS, answers grounded in your own docs.',
  'devision-a.i.-software-': 'Autonomous repair loop — see, understand, fix, test, verify, with auditable diffs and build metrics.',
  devision: 'Autonomous repair loop — see, understand, fix, test, verify, with auditable diffs and build metrics.',
  opsguard: 'Real-time SLA monitoring and playbook-driven incident response, built on Supabase.',
  '3d-drone-simulator': '6-DOF drone flown with hand gestures — MediaPipe tracking over a real-time OpenGL scene.',
  's3-batch-project': 'Manifest-driven S3 batch retagging with IAM roles, completion reports, and lifecycle rules.',
  resq: 'Computer-vision first-responder tool that reads scene context and body pose from video.',
  'task-wispr-flow': 'Voice-first task flow — speak a request and get structured issues out of it.',
  'hand-tracking-ar-ui': 'AR HUD with radial gauges and pinch controls rendered on your hand in real time.',
  'portfolio-monish-main': 'This portfolio — React, Vite, and a retrieval lab that runs entirely in the browser.',
  'monish-portfolio': 'This portfolio — React, Vite, and a retrieval lab that runs entirely in the browser.',
  portfolio: 'This portfolio — React, Vite, and a retrieval lab that runs entirely in the browser.',
};

const describe = (repo) =>
  repo.description ||
  CURATED_DESCRIPTIONS[repo.name.toLowerCase()] ||
  'Open-source experiment — open the repo for the full story.';

const FALLBACK_REPOS = [
  {
    name: 'Aure-RAG',
    description: 'Offline-first multilingual RAG over your own documents',
    language: 'Python',
    html_url: 'https://github.com/Monish03905/Aure-RAG',
  },
  {
    name: 'DEVISION-A.I.-SOFTWARE-',
    description: 'Autonomous code repair and verification loop',
    language: 'TypeScript',
    html_url: 'https://github.com/Monish03905/DEVISION-A.I.-SOFTWARE-',
  },
  {
    name: 'OpsGuard',
    description: 'Real-time incident response and SLA control',
    language: 'TypeScript',
    html_url: 'https://github.com/Monish03905/OpsGuard',
  },
  {
    name: '3D-Drone-Simulator',
    description: '6-DOF drone flown with hand gestures',
    language: 'Python',
    html_url: 'https://github.com/Monish03905/3D-Drone-Simulator',
  },
  {
    name: 'S3-Batch-Project',
    description: 'Manifest-driven S3 batch retagging automation',
    language: 'Python',
    html_url: 'https://github.com/Monish03905/S3-Batch-Project',
  },
];

const FALLBACK_LANGS = [
  { name: 'Python', pct: 40 },
  { name: 'TypeScript', pct: 27 },
  { name: 'JavaScript', pct: 13 },
  { name: 'Java', pct: 12 },
  { name: 'HTML', pct: 8 },
];

export default function Github() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState(null);
  const [state, setState] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/Monish03905', { signal: controller.signal }),
          fetch('https://api.github.com/users/Monish03905/repos?per_page=100&sort=pushed', {
            signal: controller.signal,
          }),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error('github api');
        const userData = await userRes.json();
        const repoData = await reposRes.json();
        if (cancelled) return;
        setUser(userData);
        setRepos(repoData.filter((repo) => !repo.fork && repo.name !== 'Monish03905'));
        setState('ok');
      } catch {
        if (!cancelled) setState('error');
      }
    }

    load();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  const languages = useMemo(() => {
    if (!repos || repos.length === 0) return FALLBACK_LANGS;
    const counts = new Map();
    repos.forEach((repo) => {
      if (!repo.language) return;
      counts.set(repo.language, (counts.get(repo.language) || 0) + 1);
    });
    const total = [...counts.values()].reduce((sum, value) => sum + value, 0) || 1;
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, pct: Math.round((count / total) * 100) }));
  }, [repos]);

  const latest = useMemo(() => {
    if (!repos || repos.length === 0) return FALLBACK_REPOS;
    return repos.slice(0, 5);
  }, [repos]);

  const repoCount = user?.public_repos ?? 22;
  const langCount = languages.length;

  return (
    <section className="section" id="github">
      <div className="shell">
        <SectionHead
          index="07"
          kicker="Open source"
          title={
            <>
              Built in public, <em>mostly at night.</em>
            </>
          }
          aside={
            <span className="mono" style={{ maxWidth: 210, lineHeight: 1.7 }}>
              {state === 'ok' ? 'Live from the GitHub API' : 'Curated from public repos'}
            </span>
          }
        />

        <div className="gh-grid">
          <Reveal>
            <div className="gh-summary">
              <div className="gh-nums">
                <div className="gh-num">
                  <b>{repoCount}</b>
                  <span>Public repositories</span>
                </div>
                <div className="gh-num">
                  <b>{langCount}</b>
                  <span>Languages shipped</span>
                </div>
                <div className="gh-num">
                  <b>3</b>
                  <span>Live deployed apps</span>
                </div>
              </div>

              <div className="gh-langs">
                {languages.map((lang) => (
                  <div className="gh-lang" key={lang.name}>
                    <span>{lang.name}</span>
                    <span className="gh-lang-track">
                      <i style={{ width: `${lang.pct}%` }} />
                    </span>
                    <b>{lang.pct}%</b>
                  </div>
                ))}
              </div>

              <a
                className="btn"
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ alignSelf: 'flex-start' }}
              >
                <GithubIcon size={15} />
                github.com/Monish03905
                <ArrowUpRight size={13} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="gh-repos">
              <div className="gh-repos-head">
                <span>Recently pushed</span>
                <span className="gh-sync">
                  <i />
                  {state === 'loading' ? 'syncing…' : state === 'ok' ? 'live' : 'cached'}
                </span>
              </div>

              {state === 'loading' ? (
                <div className="gh-loading">
                  {[0, 1, 2, 3].map((item) => (
                    <div
                      className="gh-skel"
                      key={item}
                      style={{ width: `${90 - item * 12}%`, animationDelay: `${item * 0.1}s` }}
                    />
                  ))}
                </div>
              ) : (
                latest.map((repo) => (
                  <a
                    className="gh-repo"
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="gh-repo-main">
                      <span className="gh-repo-name">
                        <GithubIcon size={13} />
                        {repo.name}
                      </span>
                      <div className="gh-repo-desc">{describe(repo)}</div>
                    </div>
                    {repo.language ? (
                      <span className="gh-lang-dot">
                        <i
                          style={{
                            background: LANG_COLORS[repo.language] || 'var(--ink-3)',
                          }}
                        />
                        {repo.language}
                      </span>
                    ) : null}
                    <ArrowUpRight size={14} className="gh-repo-arrow" />
                  </a>
                ))
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
