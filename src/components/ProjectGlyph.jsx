export default function ProjectGlyph({ variant = 'retrieval', className = 'pc-glyph' }) {
  const common = {
    className,
    viewBox: '0 0 120 120',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1,
    'aria-hidden': 'true',
  };

  if (variant === 'vision') {
    return (
      <svg {...common}>
        <path d="M10 34V16h18M110 34V16H92M10 86v18h18M110 86v18H92" strokeWidth="1.4" />
        <circle cx="60" cy="58" r="17" strokeDasharray="3 3" />
        <circle cx="60" cy="58" r="3" fill="currentColor" stroke="none" />
        <path d="M60 26v12M60 78v12M28 58h12M80 58h12" />
        <path d="M38 74l8-8 9 6 6-9 7 7 6-5 8 7" strokeWidth="1.2" />
        <g fill="currentColor" stroke="none">
          <circle cx="38" cy="74" r="2" />
          <circle cx="46" cy="66" r="2" />
          <circle cx="55" cy="72" r="2" />
          <circle cx="61" cy="63" r="2" />
          <circle cx="68" cy="70" r="2" />
          <circle cx="74" cy="65" r="2" />
          <circle cx="82" cy="72" r="2" />
        </g>
      </svg>
    );
  }

  if (variant === 'verify') {
    return (
      <svg {...common}>
        <path d="M60 12a48 48 0 1 1-33.9 14" strokeDasharray="4 5" />
        <path d="M26 26l4-14 14 4" />
        <circle cx="60" cy="34" r="8" />
        <circle cx="88" cy="62" r="8" />
        <circle cx="60" cy="90" r="8" />
        <circle cx="32" cy="62" r="8" />
        <path d="M67 39l14 15M83 69l-15 14M53 87L38 70M39 55l13-14" />
        <path d="M56 34l3 3 6-6M84 62l3 3 6-6M56 90l3 3 6-6" strokeWidth="1.4" />
      </svg>
    );
  }

  if (variant === 'cloud') {
    return (
      <svg {...common}>
        <path d="M60 18l34 19v38L60 94 26 75V37z" />
        <path d="M26 37l34 19 34-19M60 56v38" strokeDasharray="3 3" />
        <path d="M43 46.5v19L60 75l17-9.5v-19" opacity="0.55" />
        <g fill="currentColor" stroke="none">
          <circle cx="60" cy="18" r="2.2" />
          <circle cx="94" cy="37" r="2.2" />
          <circle cx="94" cy="75" r="2.2" />
          <circle cx="60" cy="94" r="2.2" />
          <circle cx="26" cy="75" r="2.2" />
          <circle cx="26" cy="37" r="2.2" />
        </g>
      </svg>
    );
  }

  if (variant === 'fullstack') {
    return (
      <svg {...common}>
        <rect x="22" y="18" width="76" height="20" rx="4" />
        <rect x="22" y="46" width="76" height="20" rx="4" />
        <rect x="22" y="74" width="76" height="20" rx="4" />
        <path d="M32 28h26M32 56h40M32 84h18" opacity="0.7" />
        <g fill="currentColor" stroke="none">
          <circle cx="86" cy="28" r="2.2" />
          <circle cx="86" cy="56" r="2.2" />
          <circle cx="86" cy="84" r="2.2" />
        </g>
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="60" cy="60" r="46" strokeDasharray="2 5" opacity="0.6" />
      <circle cx="60" cy="60" r="30" opacity="0.7" />
      <path d="M60 14v18M60 88v18M14 60h18M88 60h18" opacity="0.6" />
      <path d="M60 60L31 44M60 60l29-16M60 60l0 31M60 60l-29 16M60 60l29 16" strokeDasharray="2 3" />
      <g fill="currentColor" stroke="none">
        <circle cx="60" cy="60" r="3.4" />
        <circle cx="31" cy="44" r="2.6" />
        <circle cx="89" cy="44" r="2.6" />
        <circle cx="60" cy="91" r="2.6" />
        <circle cx="31" cy="76" r="2.6" />
        <circle cx="89" cy="76" r="2.6" />
      </g>
      <rect x="76" y="30" width="24" height="10" rx="5" opacity="0.5" />
    </svg>
  );
}
