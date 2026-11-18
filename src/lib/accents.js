const MAP = {
  vision: 'var(--vision)',
  retrieval: 'var(--accent)',
  verify: 'var(--verify)',
  cloud: 'var(--cloud)',
  accent: 'var(--accent)',
};

export function accentVar(key) {
  return MAP[key] || MAP.accent;
}

export function categoryAccent(category) {
  switch (category) {
    case 'Vision':
      return MAP.vision;
    case 'AI & Retrieval':
      return MAP.retrieval;
    case 'Cloud':
      return MAP.cloud;
    case 'Full-stack':
      return MAP.verify;
    default:
      return MAP.accent;
  }
}
