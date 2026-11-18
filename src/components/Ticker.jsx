const WORDS = [
  'See',
  'Retrieve',
  'Verify',
  'Computer vision',
  'RAG + FAISS',
  'Full-stack',
  'AWS cloud',
  'Open source',
];

function Star() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M6 0l1.1 4.9L12 6l-4.9 1.1L6 12 4.9 7.1 0 6l4.9-1.1z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Ticker() {
  return (
    <div className="ticker" aria-label="Focus areas">
      <div className="ticker-track">
        {[0, 1].map((group) => (
          <div className="ticker-group" key={group} aria-hidden={group === 1}>
            {WORDS.map((word) => (
              <span className={`ticker-word${word.length < 8 ? ' is-accent' : ''}`} key={word}>
                {word}
                <Star />
              </span>
            ))}
          </div>
        ))}
      </div>
      <span className="sr-only">
        Focus areas: computer vision, retrieval augmented generation, verification, full-stack
        engineering, cloud, and open source.
      </span>
    </div>
  );
}
