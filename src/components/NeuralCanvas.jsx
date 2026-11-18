import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

function readAccent() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  const hex = raw.replace('#', '');
  if (hex.length === 6) {
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }
  return { r: 201, g: 247, b: 90 };
}

export default function NeuralCanvas() {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let width = 0;
    let height = 0;
    let nodes = [];
    let frame = 0;
    let running = true;
    let accent = readAccent();
    const mouse = { x: -9999, y: -9999 };
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(26, Math.min(74, Math.floor((width * height) / 20000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.4 + 0.6,
      }));
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      const { r, g, b } = accent;
      const linkDist = Math.min(150, width * 0.16);

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.55)`;
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j += 1) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.16 * (1 - dist / linkDist)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        const mdx = node.x - mouse.x;
        const mdy = node.y - mouse.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < 190) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.34 * (1 - mdist / 190)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      frame = window.requestAnimationFrame(draw);
    };

    const onMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running) {
        frame = window.requestAnimationFrame(draw);
      } else {
        window.cancelAnimationFrame(frame);
      }
    };

    const themeObserver = new MutationObserver(() => {
      accent = readAccent();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    resize();
    frame = window.requestAnimationFrame(draw);
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      ro.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}
