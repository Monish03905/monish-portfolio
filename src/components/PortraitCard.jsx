import { useCallback, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import portrait from '../assets/portrait.jpg';

const METRICS = [
  { value: '8.34', label: 'CGPA / 10' },
  { value: '9,754', label: 'chunks in FAISS' },
  { value: '6-DOF', label: 'gesture flight' },
  { value: '22', label: 'public repos' },
  { value: '3', label: 'live deployed apps' },
  { value: '30+', label: 'FPS CV pipeline' },
];

const METERS = [
  { label: 'Retrieval', level: 4 },
  { label: 'Computer vision', level: 4 },
  { label: 'Languages', level: 4 },
  { label: 'Full-stack', level: 3 },
];

const SIGNALS = [
  { label: 'Retrieval loop', status: 'online' },
  { label: 'Gesture map', status: 'locked' },
  { label: 'CI gates', status: 'green' },
];

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export default function PortraitCard() {
  const reduced = useReducedMotion();
  const [rot, setRot] = useState(0);
  const [animated, setAnimated] = useState(true);
  const [flipped, setFlipped] = useState(false);
  const [dragging, setDragging] = useState(false);
  const drag = useRef(null);

  const settle = useCallback((to) => {
    setAnimated(true);
    setRot(to);
    setFlipped(Math.round(to / 180) % 2 !== 0);
  }, []);

  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, rot, moved: false };
    setAnimated(false);
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 8) drag.current.moved = true;
    setRot(clamp(drag.current.rot + dx * 0.55, -180, 180));
  };

  const endDrag = () => {
    if (!drag.current) return;
    const { moved } = drag.current;
    drag.current = null;
    setDragging(false);
    if (!moved) {
      settle(flipped ? 0 : 180);
      return;
    }
    settle(Math.round(rot / 180) * 180);
  };

  const onKeyDown = (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    settle(flipped ? 0 : 180);
  };

  return (
    <div className="portrait-3d">
      <button
        type="button"
        className={`portrait-flip${dragging ? ' is-dragging' : ''}`}
        style={{
          transform: `rotateY(${rot}deg)`,
          transition: !animated || reduced ? 'none' : undefined,
        }}
        aria-pressed={flipped}
        aria-label="Profile card. Activate to flip between the portrait and the AI dossier."
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
      >
        <span className="portrait-face portrait-face--front" aria-hidden={flipped}>
          <span className="portrait-frame">
            <img
              src={portrait}
              alt="Monish Ratan Seelam at his desk, in a blazer and glasses"
              width="1088"
              height="1445"
              fetchPriority="high"
              draggable="false"
            />
            <span className="portrait-scan" aria-hidden="true" />
            <span className="portrait-corner tl" aria-hidden="true" />
            <span className="portrait-corner tr" aria-hidden="true" />
            <span className="portrait-corner bl" aria-hidden="true" />
            <span className="portrait-corner br" aria-hidden="true" />
            <span className="portrait-label bottom">
              <span className="portrait-name">
                Monish Ratan
                <small>B.Tech AI &amp; DS · KL University</small>
              </span>
              <span className="mono portrait-coords">16.50°N 80.64°E</span>
            </span>
          </span>
        </span>

        <span className="portrait-face portrait-face--back" aria-hidden={!flipped}>
          <span className="portrait-frame portrait-frame--back">
            <span className="portrait-scan" aria-hidden="true" />
            <span className="portrait-corner tl" aria-hidden="true" />
            <span className="portrait-corner tr" aria-hidden="true" />
            <span className="portrait-corner bl" aria-hidden="true" />
            <span className="portrait-corner br" aria-hidden="true" />

            <span className="dos">
              <span className="dos-head">
                <span className="k">AI dossier · Subject 001</span>
                <span className="dos-verified">
                  <ShieldCheck size={11} />
                  Verified
                </span>
              </span>

              <span className="dos-name">
                Monish Ratan Seelam
                <small>AI &amp; Data Science Engineer</small>
              </span>

              <span className="dos-metrics">
                {METRICS.map((m) => (
                  <span className="dos-metric" key={m.label}>
                    <b>{m.value}</b>
                    <span>{m.label}</span>
                  </span>
                ))}
              </span>

              <span className="dos-meters">
                {METERS.map((m) => (
                  <span className="dos-meter" key={m.label}>
                    <span>{m.label}</span>
                    <i style={{ '--w': `${(m.level / 4) * 100}%` }} />
                  </span>
                ))}
              </span>

              <span className="dos-focus">
                <span className="k">Focus</span>
                <p>RAG pipelines · computer vision · incident operations</p>
              </span>

              <span className="dos-log">
                {SIGNALS.map((s) => (
                  <span className="dos-log-line" key={s.label}>
                    <span>{s.label}</span>
                    <i aria-hidden="true" />
                    <b>{s.status}</b>
                  </span>
                ))}
              </span>

              <span className="dos-foot">
                <span>
                  <span className="dot" />
                  offline-first
                </span>
                <span className="mono">16.50°N 80.64°E</span>
              </span>
            </span>
          </span>
        </span>
      </button>
    </div>
  );
}
