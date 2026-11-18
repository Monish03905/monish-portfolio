import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Search, Sparkles, Terminal, Zap } from 'lucide-react';
import SectionHead from './SectionHead';
import Reveal from './Reveal';
import { buildIndex, search, corpus } from '../lib/retrieval';

const STAGES = [
  { name: 'Chunk', sub: `${corpus.length} documents` },
  { name: 'Embed', sub: 'TF-IDF vectors' },
  { name: 'Retrieve', sub: 'cosine · top 3' },
  { name: 'Ground', sub: 'answer + sources' },
];

const SAMPLES = [
  'What has he built with computer vision?',
  'Show me retrieval and vector search work',
  'Which projects are deployed live?',
  'What is his CGPA and degree?',
  'Leadership and awards',
  'What cloud tooling does he know?',
];

function Highlight({ text, terms }) {
  if (!terms.length) return text;
  return text.split(/(\s+)/).map((part, index) => {
    const clean = part.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!clean) return part;
    const hit = terms.some((term) => {
      if (term.length < 3) return clean === term;
      return clean.startsWith(term) || term.startsWith(clean);
    });
    return hit ? <mark key={index}>{part}</mark> : part;
  });
}

export default function Lab() {
  const index = useMemo(() => buildIndex(), []);
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('idle');
  const [stage, setStage] = useState(-1);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  const run = (text) => {
    const value = (text ?? query).trim();
    if (!value) return;

    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];

    setSubmitted(value);
    setStatus('running');
    setStage(0);
    setResult(null);

    const outcome = search(value, index, 3);

    timers.current.push(window.setTimeout(() => setStage(1), 170));
    timers.current.push(window.setTimeout(() => setStage(2), 360));
    timers.current.push(window.setTimeout(() => setStage(3), 560));
    timers.current.push(
      window.setTimeout(() => {
        setResult(outcome);
        setStatus('done');
      }, 780),
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    run();
  };

  return (
    <section className="section" id="lab">
      <div className="shell">
        <SectionHead
          index="03"
          kicker="Interactive / Live demo"
          title={
            <>
              Ask my portfolio <em>a question.</em>
            </>
          }
          aside={
            <span className="mono" style={{ maxWidth: 210, lineHeight: 1.7 }}>
              No API keys. No server.
              <br />
              Real retrieval, in your browser.
            </span>
          }
        />

        <div className="lab-intro">
          <Reveal>
            <p className="lab-note">
              This is the core loop of <strong>AURA</strong> — ingest, embed, retrieve, ground —
              running live in this page. Ask something you&apos;d actually want to know about me and
              watch the ranked passages come back with scores.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="lab-note">
              In production AURA uses <strong>FAISS + MiniLM-L12-v2</strong> over{' '}
              <strong>9,754 chunks</strong>. Here the corpus is a handful of documents and a
              lightweight TF-IDF vectorizer written for this demo — the mechanics are the same.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="lab-panel">
            <div className="lab-bar">
              <div className="lab-bar-left">
                <span className="lab-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                aura / retrieval-sandbox
              </div>
              <span className="lab-live">
                <span className="dot" />
                {status === 'running' ? 'querying' : 'ready'}
              </span>
            </div>

            <div className="lab-body">
              <aside className="lab-side">
                <div className="lab-side-title">Pipeline</div>
                {STAGES.map((item, i) => (
                  <div
                    key={item.name}
                    className={`stage${stage === i ? ' is-active' : ''}${stage > i || status === 'done' ? ' is-done' : ''}`}
                  >
                    <span className="stage-mark">{i + 1}</span>
                    <div>
                      <div className="stage-name">{item.name}</div>
                      <div className="stage-sub">{item.sub}</div>
                    </div>
                  </div>
                ))}

                <div className="lab-stats">
                  <div className="lab-stat">
                    <span>Documents</span>
                    <b>{corpus.length}</b>
                  </div>
                  <div className="lab-stat">
                    <span>Vocabulary</span>
                    <b>{index.vocabulary}</b>
                  </div>
                  <div className="lab-stat">
                    <span>Similarity</span>
                    <b>cosine</b>
                  </div>
                </div>
              </aside>

              <div className="lab-main">
                <form className="lab-prompt" onSubmit={onSubmit}>
                  <Search size={16} />
                  <label className="sr-only" htmlFor="lab-query">
                    Ask a question about Monish
                  </label>
                  <input
                    id="lab-query"
                    className="lab-input"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Ask anything about my work, stack, or background…"
                    autoComplete="off"
                  />
                  <button type="submit" className="lab-submit" disabled={!query.trim()}>
                    <span>Retrieve</span>
                    <ArrowRight size={14} />
                  </button>
                </form>

                <div className="lab-samples">
                  {SAMPLES.map((sample) => (
                    <button
                      key={sample}
                      type="button"
                      className="sample"
                      onClick={() => {
                        setQuery(sample);
                        run(sample);
                      }}
                    >
                      {sample}
                    </button>
                  ))}
                </div>

                <div className="lab-results" aria-live="polite" aria-busy={status === 'running'}>
                  {status === 'idle' && (
                    <div className="lab-placeholder">
                      <Sparkles size={20} />
                      <span>
                        Try a question above, or pick one of the samples.
                        <br />
                        Results are ranked passages — not generated text — so you can check them.
                      </span>
                    </div>
                  )}

                  {status === 'running' && (
                    <div className="lab-empty">
                      <Terminal size={15} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                      Retrieving top matches for “{submitted}”…
                    </div>
                  )}

                  {status === 'done' && result && result.results.length === 0 && (
                    <div className="lab-empty">
                      No strong matches for “{submitted}” — try rephrasing with a technology or
                      project name.
                    </div>
                  )}

                  {status === 'done' &&
                    result &&
                    result.results.map((item, i) => (
                      <div
                        className="result lab-result-enter"
                        key={item.id}
                        style={{ animationDelay: `${i * 70}ms` }}
                      >
                        <div className="result-head">
                          <span className="result-title">{item.title}</span>
                          <span className="result-score">
                            <span className="score-track">
                              <i style={{ '--s': item.score / 100 }} />
                            </span>
                            <span className="score-val">{item.score}%</span>
                          </span>
                        </div>
                        <p className="result-excerpt">
                          <Highlight text={item.excerpt} terms={item.matched} />
                        </p>
                        <div className="result-meta">
                          <span>
                            <i />
                            {item.source}
                          </span>
                          <span>cosine {item.rawScore.toFixed(3)}</span>
                          <span>rank {i + 1}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="lab-foot">
              <span>
                <Zap size={11} />
                Runs entirely on your device
              </span>
              <span>TF-IDF · cosine similarity · {corpus.length} docs</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
