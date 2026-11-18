import Reveal from './Reveal';

export default function SectionHead({ index, kicker, title, sub, aside }) {
  return (
    <header className="sec-head">
      <Reveal className="sec-head-top" y={16}>
        <span className="sec-index">{index}</span>
        <span className="sec-kicker">{kicker}</span>
      </Reveal>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 28, flexWrap: 'wrap' }}>
        <Reveal delay={0.06}>
          <h2 className="sec-title">{title}</h2>
        </Reveal>
        {aside ? <Reveal delay={0.12}>{aside}</Reveal> : null}
      </div>
      {sub ? (
        <Reveal delay={0.1}>
          <p className="sec-sub">{sub}</p>
        </Reveal>
      ) : null}
    </header>
  );
}
