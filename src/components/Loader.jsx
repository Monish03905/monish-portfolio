import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const STEPS = [
  'booting interface',
  'loading 9,754 vectors',
  'mounting case studies',
  'ready',
];

export default function Loader({ onFinish }) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return sessionStorage.getItem('mrs:booted') !== '1';
    } catch {
      return true;
    }
  });
  const [progress, setProgress] = useState(0);
  const finished = useRef(false);

  useEffect(() => {
    if (!visible) return undefined;
    document.body.classList.add('no-scroll');

    const done = () => {
      if (finished.current) return;
      finished.current = true;
      try {
        sessionStorage.setItem('mrs:booted', '1');
      } catch {
        /* ignore */
      }
      setVisible(false);
      onFinish?.();
    };

    if (reduced) {
      setProgress(100);
      const skip = window.setTimeout(done, 120);
      return () => {
        window.clearTimeout(skip);
        document.body.classList.remove('no-scroll');
      };
    }

    let value = 0;
    const tick = window.setInterval(() => {
      value = Math.min(100, value + Math.random() * 11 + 4);
      setProgress(Math.round(value));
      if (value >= 100) {
        window.clearInterval(tick);
        window.setTimeout(done, 420);
      }
    }, 95);

    return () => {
      window.clearInterval(tick);
      document.body.classList.remove('no-scroll');
    };
  }, [visible, reduced, onFinish]);

  useEffect(() => {
    if (!visible) document.body.classList.remove('no-scroll');
  }, [visible]);

  const stepIndex = Math.min(STEPS.length - 1, Math.floor((progress / 100) * STEPS.length));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: reduced ? 0.2 : 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="loader-top">
            <span className="loader-brand">MRS · Portfolio 2026</span>
            <span className="loader-brand">Vijayawada, IN</span>
          </div>

          <div className="loader-main">
            <div className="loader-meta">
              <span>initializing</span>
              <span className="accent">{STEPS[stepIndex]}</span>
            </div>
            <div className="loader-name">
              Monish <span>Ratan</span>
            </div>
            <div className="loader-pct">
              {String(progress).padStart(2, '0')}
              <small>%</small>
            </div>
            <div className="loader-track">
              <i style={{ transform: `scaleX(${progress / 100})` }} />
            </div>
          </div>

          <div className="loader-bottom">
            <div className="loader-status">
              {STEPS.map((step, index) => (
                <span key={step} className={index <= stepIndex ? 'is-active' : ''}>
                  {step}
                </span>
              ))}
            </div>
            <span className="loader-brand">B.Tech AI &amp; DS · KL University</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
