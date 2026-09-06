import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { caseStudies, caseStudyBySlug } from '@/content/cases'

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const c = caseStudyBySlug(slug)
  if (!c) return {}
  return {
    title: `${c.client} — ${c.sector} | ViralX`,
    description: c.headline,
    openGraph: { title: `${c.client} · ViralX`, description: c.headline, type: 'article' },
  }
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = caseStudyBySlug(slug)
  if (!c) notFound()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        :root{--black:#0a0a0a;--white:#f5f5f3;--mid:#888}
        html,body{background:var(--white);color:var(--black);font-family:'DM Sans',sans-serif}
        a{color:inherit;text-decoration:none}
        .cs-bar{position:sticky;top:0;z-index:80;background:var(--white);border-bottom:1px solid rgba(0,0,0,0.08);display:flex;align-items:center;justify-content:space-between;padding:1.15rem 2.5rem}
        .cs-back{font-size:12px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;display:inline-flex;gap:0.6rem;transition:gap 0.25s ease}
        .cs-back:hover{gap:1rem}
        .cs-logo{font-weight:500;font-size:17px;letter-spacing:0.02em}
        .cs-hero{position:relative;min-height:60vh;display:flex;align-items:flex-end;color:var(--white);background:#0a0a0a;overflow:hidden}
        .cs-hero-ph{position:absolute;inset:0;background:radial-gradient(70% 68% at 52% 44%,#9a9a9a 0%,#303030 46%,#0a0a0a 100%)}
        .cs-hero-ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
        .cs-hero-veil{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,10,10,0.88) 0%,rgba(10,10,10,0.2) 58%,rgba(10,10,10,0.4) 100%)}
        .cs-hero-in{position:relative;z-index:2;padding:2.5rem;width:100%;display:flex;justify-content:space-between;align-items:flex-end;gap:2rem;flex-wrap:wrap}
        .cs-eyebrow{font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(245,245,243,0.6);margin-bottom:0.8rem}
        .cs-hero h1{font-family:'Anton',sans-serif;text-transform:uppercase;font-size:clamp(46px,9.5vw,132px);line-height:0.93;letter-spacing:-0.01em}
        .cs-headline{font-size:15px;color:rgba(245,245,243,0.78);max-width:30ch;line-height:1.62;padding-bottom:0.6rem}
        .cs-meta{display:grid;grid-template-columns:repeat(5,auto);gap:2.5rem;padding:1.6rem 2.5rem;border-bottom:1px solid rgba(0,0,0,0.08);justify-content:start}
        .cs-cell{display:flex;flex-direction:column;gap:0.3rem}
        .cs-key{font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:var(--mid)}
        .cs-val{font-size:14px;line-height:1.5}
        .cs-blocks{display:flex;flex-direction:column;gap:clamp(3rem,6.5vw,6rem);padding:clamp(3rem,6vw,5rem) 0}
        .cs-split{display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,5vw,4.5rem);align-items:center;padding:0 2.5rem}
        .cs-split.flip .cs-media{order:-1}
        .cs-split h2{font-family:'Anton',sans-serif;font-size:clamp(26px,3.4vw,44px);text-transform:uppercase;line-height:0.94;margin-bottom:1.1rem}
        .cs-split p{font-size:15px;line-height:1.72;color:#3a3a3a;max-width:52ch}
        .cs-split p + p{margin-top:1rem}
        .cs-media{aspect-ratio:4/5;background:radial-gradient(90% 78% at 80% 20%,#7c7c7c 0%,#232323 48%,#0a0a0a 100%)}
        .cs-full{aspect-ratio:16/9;background:linear-gradient(178deg,#8b8b8b 0%,#313131 38%,#0d0d0d 100%);display:flex;align-items:center;justify-content:center}
        .cs-play{width:74px;height:74px;border-radius:50%;border:1.4px solid rgba(245,245,243,0.85);display:grid;place-items:center;background:rgba(10,10,10,0.25)}
        .cs-cap{padding:0.85rem 2.5rem 0;font-size:13px;color:var(--mid);max-width:52ch}
        .cs-duo{display:grid;grid-template-columns:1fr 1fr;gap:0.9rem;padding:0 2.5rem}
        .cs-duo figure{margin:0;display:flex;flex-direction:column;gap:0.7rem}
        .cs-shot{aspect-ratio:4/5;background:linear-gradient(200deg,#c6c6c6 0%,#6a6a6a 26%,#1b1b1b 72%,#0a0a0a 100%)}
        .cs-duo figcaption{font-size:12.5px;color:var(--mid)}
        .cs-media,.cs-full,.cs-shot{overflow:hidden;position:relative}
        .cs-media img,.cs-full img,.cs-shot img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
        .cs-video{padding:0 2.5rem}
        .cs-video video{width:100%;display:block;background:#0a0a0a;aspect-ratio:16/9;object-fit:contain}
        .cs-video.portrait video{aspect-ratio:9/16;max-width:min(420px,74vw);margin:0 auto}
        .cs-video figcaption{padding-top:0.85rem;font-size:13px;color:var(--mid);max-width:52ch}
        .cs-slot{aspect-ratio:16/9;border:1px dashed rgba(0,0,0,0.28);background:rgba(0,0,0,0.03);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.6rem;color:var(--mid)}
        .cs-video.portrait .cs-slot{aspect-ratio:9/16;max-width:min(420px,74vw);margin:0 auto}
        .cs-slot-n{font-size:10px;letter-spacing:0.16em;text-transform:uppercase}
        .cs-slot-t{font-size:14px;color:#3a3a3a;max-width:38ch;text-align:center;padding:0 1rem}
        .cs-vpair{display:grid;grid-template-columns:1fr 1fr;gap:1.4rem;padding:0 2.5rem;align-items:start}
        .cs-vpair figure{margin:0}
        .cs-vpair video{width:100%;display:block;background:#0a0a0a}
        .cs-vpair figcaption{padding-top:0.8rem;font-size:12.5px;color:var(--mid)}
        .cs-pull{padding:0 2.5rem}
        .cs-note{padding:0 2.5rem;max-width:60ch;margin:0 auto}
        .cs-note h2{font-family:'Anton',sans-serif;font-size:clamp(24px,3vw,38px);text-transform:uppercase;line-height:0.96;margin-bottom:1rem}
        .cs-note p{font-size:15px;line-height:1.72;color:#3a3a3a}
        .cs-note p + p{margin-top:1rem}
        .cs-pull p{font-family:'Anton',sans-serif;text-transform:uppercase;font-size:clamp(24px,3.6vw,52px);line-height:1.02;letter-spacing:-0.01em;max-width:19ch}
        .cs-phases{border-top:1px solid rgba(0,0,0,0.08);border-bottom:1px solid rgba(0,0,0,0.08);display:grid;grid-template-columns:repeat(4,1fr)}
        .cs-phase{padding:2rem 1.8rem;border-right:1px solid rgba(0,0,0,0.08)}
        .cs-phase:last-child{border-right:none}
        .cs-phase-n{font-size:11px;letter-spacing:0.1em;color:rgba(0,0,0,0.22)}
        .cs-phase h3{font-size:16px;font-weight:500;margin:0.7rem 0 0.4rem}
        .cs-phase p{font-size:13px;color:var(--mid);line-height:1.68}
        .cs-results{background:#0a0a0a;color:var(--white);padding:clamp(3rem,6vw,5.5rem) 2.5rem}
        .cs-res-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2.4rem;margin-top:2.4rem}
        .cs-num{font-size:clamp(38px,5.6vw,74px);line-height:1;letter-spacing:-0.03em;font-family:'Anton',sans-serif}
        .cs-num-cap{font-size:13px;color:rgba(245,245,243,0.5);margin-top:0.6rem;line-height:1.55}
        .cs-foot{padding:1.8rem 2.5rem;border-top:1px solid rgba(0,0,0,0.08);display:flex;justify-content:space-between;align-items:center;gap:1.4rem;flex-wrap:wrap}
        .cs-foot span{font-size:12px;color:rgba(0,0,0,0.22)}
        @media(max-width:768px){
          .cs-bar{padding:1rem 1.5rem}
          .cs-hero-in{padding:1.5rem}
          .cs-meta{grid-template-columns:repeat(2,auto);gap:1.2rem 2rem;padding:1.4rem 1.5rem}
          .cs-split{grid-template-columns:1fr;gap:1.5rem;padding:0 1.5rem}
          .cs-media,.cs-split.flip .cs-media{order:-1;aspect-ratio:4/3}
          .cs-duo{grid-template-columns:1fr;padding:0 1.5rem}
          .cs-vpair{grid-template-columns:1fr;padding:0 1.5rem;gap:2rem}
          .cs-pull,.cs-cap,.cs-note{padding-left:1.5rem;padding-right:1.5rem}
          .cs-full{aspect-ratio:4/3}
          .cs-video{padding:0 1.5rem}
          .cs-video figcaption{padding-left:0;padding-right:0}
          .cs-phases{grid-template-columns:1fr}
          .cs-phase{border-right:none;border-bottom:1px solid rgba(0,0,0,0.08)}
          .cs-phase:last-child{border-bottom:none}
          .cs-results{padding:3rem 1.5rem}
          .cs-res-grid{grid-template-columns:1fr;gap:1.7rem}
          .cs-foot{padding:2rem 1.5rem;flex-direction:column;align-items:flex-start}
        }
      `}</style>

      <div className="cs-bar">
        <a href="/#work" className="cs-back"><span aria-hidden="true">←</span> All work</a>
        <a href="/" className="cs-logo">ViralX</a>
      </div>

      <header className="cs-hero">
        <div className="cs-hero-ph">
          {c.hero ? <img src={c.hero} alt="" /> : null}
        </div>
        <div className="cs-hero-veil" />
        <div className="cs-hero-in">
          <div>
            <p className="cs-eyebrow">{c.sector} · {c.year}</p>
            <h1>{c.client}</h1>
          </div>
          <p className="cs-headline">{c.headline}</p>
        </div>
      </header>

      <div className="cs-meta">
        <div className="cs-cell"><span className="cs-key">Client</span><span className="cs-val">{c.client}</span></div>
        <div className="cs-cell"><span className="cs-key">Sector</span><span className="cs-val">{c.sector}</span></div>
        <div className="cs-cell"><span className="cs-key">Year</span><span className="cs-val">{c.year}</span></div>
        <div className="cs-cell"><span className="cs-key">Services</span><span className="cs-val">{c.services.join(', ')}</span></div>
        <div className="cs-cell"><span className="cs-key">Delivered</span><span className="cs-val">{c.delivered}</span></div>
      </div>

      <div className="cs-blocks">
        {c.blocks.map((b, i) => {
          if (b.type === 'split') {
            return (
              <section className={`cs-split${b.side === 'left' ? ' flip' : ''}`} key={i}>
                <div>
                  <h2>{b.title}</h2>
                  {b.body.map((t, n) => <p key={n}>{t}</p>)}
                </div>
                <div className="cs-media">
                  {b.src ? <img src={b.src} alt={b.alt ?? ''} loading="lazy" /> : null}
                </div>
              </section>
            )
          }
          if (b.type === 'full') {
            return (
              <figure key={i}>
                <div className="cs-full">
                  {b.src ? <img src={b.src} alt={b.alt ?? ''} loading="lazy" /> : null}
                  {b.play !== false ? (
                    <span className="cs-play" aria-hidden="true">
                      <svg width="18" height="20" viewBox="0 0 18 20" fill="none"><path d="M17 10L0.5 19.5V0.5L17 10Z" fill="#f5f5f3" /></svg>
                    </span>
                  ) : null}
                </div>
                {b.caption ? <figcaption className="cs-cap">{b.caption}</figcaption> : null}
              </figure>
            )
          }
          if (b.type === 'duo') {
            return (
              <div className="cs-duo" key={i}>
                {b.captions.map((cap, n) => (
                  <figure key={n}>
                    <div className="cs-shot">
                      {b.srcs?.[n] ? <img src={b.srcs[n]} alt={cap} loading="lazy" /> : null}
                    </div>
                    {cap ? <figcaption>{cap}</figcaption> : null}
                  </figure>
                ))}
              </div>
            )
          }
          if (b.type === 'note') {
            return (
              <section className="cs-note" key={i}>
                {b.title ? <h2>{b.title}</h2> : null}
                {b.body.map((x, n) => <p key={n}>{x}</p>)}
              </section>
            )
          }
          if (b.type === 'videos') {
            return (
              <div className="cs-vpair" key={i}>
                {b.items.map((v, n) => (
                  <figure key={n}>
                    <video
                      src={v.src}
                      poster={v.poster}
                      controls
                      preload="metadata"
                      playsInline
                      style={{ aspectRatio: v.ratio ?? '9 / 16' }}
                    />
                    {v.caption ? <figcaption>{v.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
            )
          }
          if (b.type === 'video') {
            return (
              <figure className={`cs-video${b.portrait ? ' portrait' : ''}`} key={i}>
                {b.src ? (
                  <video
                    src={b.src}
                    poster={b.poster}
                    controls
                    preload="metadata"
                    playsInline
                    style={b.ratio ? { aspectRatio: b.ratio } : undefined}
                  />
                ) : (
                  <div className="cs-slot">
                    <span className="cs-slot-n">{b.slot ?? 'Film'}</span>
                    <span className="cs-slot-t">{b.caption ?? 'Video slot'}</span>
                  </div>
                )}
                {b.src && b.caption ? <figcaption>{b.caption}</figcaption> : null}
              </figure>
            )
          }
          return <div className="cs-pull" key={i}><p>{b.text}</p></div>
        })}
      </div>

      <div className="cs-phases">
        {c.phases.map(([name, detail], i) => (
          <div className="cs-phase" key={name}>
            <p className="cs-phase-n">{String(i + 1).padStart(2, '0')}</p>
            <h3>{name}</h3>
            <p>{detail}</p>
          </div>
        ))}
      </div>

      <section className="cs-results">
        <p className="cs-eyebrow">The result</p>
        <div className="cs-res-grid">
          {c.stats.map(([num, cap]) => (
            <div key={cap}>
              <div className="cs-num">{num}</div>
              <div className="cs-num-cap">{cap}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="cs-foot">
        <a href="/" className="cs-logo">ViralX</a>
        <span>© {new Date().getFullYear()} ViralX Agency · Auckland, NZ</span>
      </footer>
    </>
  )
}
