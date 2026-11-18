import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (reduced) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    setEnabled(true);
    document.documentElement.classList.add('has-cursor');

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x;
    let ringY = y;
    let frame = 0;

    const moveDot = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const loop = () => {
      ringX += (x - ringX) * 0.16;
      ringY += (y - ringY) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      frame = window.requestAnimationFrame(loop);
    };

    const onMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      moveDot();
      if (ringRef.current) ringRef.current.classList.remove('cursor-hidden');
      if (dotRef.current) dotRef.current.classList.remove('cursor-hidden');
    };

    const onOver = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const interactive = target.closest('a, button, [role="button"], [data-cursor], summary');
      ringRef.current?.classList.toggle('cursor-is-hover', Boolean(interactive));
      const isText = target.closest('input, textarea, select');
      ringRef.current?.classList.toggle('cursor-hidden', Boolean(isText));
      dotRef.current?.classList.toggle('cursor-hidden', Boolean(isText));
    };

    const onDown = () => ringRef.current?.classList.add('cursor-is-down');
    const onUp = () => ringRef.current?.classList.remove('cursor-is-down');
    const onLeave = () => {
      ringRef.current?.classList.add('cursor-hidden');
      dotRef.current?.classList.add('cursor-hidden');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    frame = window.requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      window.cancelAnimationFrame(frame);
    };
  }, [reduced]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true">
      <div className="cursor-ring" ref={ringRef} />
      <div className="cursor-dot" ref={dotRef} />
    </div>
  );
}
