import { motion, useReducedMotion } from 'framer-motion';

export default function Reveal({ children, delay = 0, y = 26, className, style, as = 'div', once = true }) {
  const reduced = useReducedMotion();
  const Comp = motion[as] || motion.div;

  return (
    <Comp
      className={className}
      style={style}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-70px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}
