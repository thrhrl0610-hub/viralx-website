'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [portfolios, setPortfolios] = useState<any[]>([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [intro, setIntro] = useState(true)
  const [introFade, setIntroFade] = useState(false)

  useEffect(() => {
    supabase.from('portfolio').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setPortfolios(data)
    })
    const t1 = setTimeout(() => setIntroFade(true), 2200)
    const t2 = setTimeout(() => setIntro(false), 2900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        :root{--black:#0a0a0a;--white:#f5f5f3;--gray:#f0efed;--mid:#888}
        html{scroll-behavior:smooth}
        body{background:var(--white);color:var(--black);font-family:'DM Sans',sans-serif;overflow-x:hidden}

        /* INTRO */
        .intro{position:fixed;inset:0;background:#0a0a0a;z-index:999;display:flex;align-items:center;justify-content:center;transition:opacity 0.7s ease;pointer-events:all}
        .intro.fade{opacity:0;pointer-events:none}
        .intro-glow{position:absolute;width:600px;height:400px;background:radial-gradient(ellipse, rgba(255,255,255,0.1) 0%, transparent 70%);pointer-events:none}
        .intro-word{font-family:'DM Sans',sans-serif;font-size:20px;font-weight:500;letter-spacing:0.04em;color:#f5f5f3;position:relative;animation:intro-in 0.5s ease 0.4s both}
        @keyframes intro-in{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}

        /* NAV */
        nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:1.15rem 2.5rem;background:var(--white);border-bottom:1px solid rgba(0,0,0,0.08)}
        .nav-logo{font-weight:500;font-size:17px;letter-spacing:0.02em;color:var(--black);text-decoration:none}
        .nav-links{position:absolute;left:50%;transform:translateX(-50%);display:flex;gap:2.8rem;list-style:none}
        .nav-links a{font-size:14px;color:var(--black);text-decoration:none;transition:opacity 0.2s}
        .nav-links a:hover{opacity:0.4}
        .nav-cta{font-size:14px;color:var(--black);text-decoration:none}
        .hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:4px}
        .hamburger span{display:block;width:22px;height:1.5px;background:var(--black)}
        .mobile-menu{display:none;position:fixed;inset:0;background:var(--white);z-index:99;flex-direction:column;align-items:center;justify-content:center;gap:2.5rem}
        .mobile-menu.open{display:flex}
        .mobile-menu a{font-family:'Anton',sans-serif;font-size:48px;text-transform:uppercase;color:var(--black);text-decoration:none;letter-spacing:-0.01em}
        .mobile-menu-close{position:absolute;top:1.5rem;right:2rem;font-size:28px;cursor:pointer;background:none;border:none;color:var(--black)}

        /* HERO */
        #hero{margin-top:56px;background:var(--black);padding:5vw 2.5rem 3.5rem;min-height:87vh;display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden}
        .h-line{overflow:hidden}
        .h-text{font-family:'Anton',sans-serif;font-size:clamp(56px,13vw,196px);line-height:0.92;color:var(--white);text-transform:uppercase;letter-spacing:-0.01em;display:block;opacity:0;transform:translateY(55px);animation:su 0.85s cubic-bezier(0.16,1,0.3,1) forwards}
        .h-text.stroke{color:transparent;-webkit-text-stroke:1px rgba(255,255,255,0.35)}
        .h-text.l1{animation-delay:0.08s}.h-text.l2{animation-delay:0.2s}.h-text.l3{animation-delay:0.32s}
        @keyframes su{to{opacity:1;transform:translateY(0)}}
        .hero-foot{display:flex;justify-content:space-between;align-items:flex-end;margin-top:3.5rem;padding-top:2rem;border-top:1px solid rgba(255,255,255,0.1);opacity:0;animation:fi 0.6s ease 0.65s forwards}
        @keyframes fi{to{opacity:1}}
        .hero-desc{font-size:14px;color:rgba(255,255,255,0.4);max-width:340px;line-height:1.75}
        .hero-loc{font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.22)}
        .hero-link{font-size:13px;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;color:var(--white);text-decoration:none;border-bottom:1px solid rgba(255,255,255,0.28);padding-bottom:2px}

        /* TICKER */
        .ticker{background:var(--black);border-top:1px solid rgba(255,255,255,0.08);padding:0.9rem 0;overflow:hidden;white-space:nowrap}
        .ticker-track{display:inline-flex;animation:tick 24s linear infinite}
        .ti{font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.28);padding:0 2.5rem}
        @keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        /* CLIENTS TICKER */
        #clients{background:var(--white);border-bottom:1px solid rgba(0,0,0,0.08);padding:2rem 0;overflow:hidden}
        .cl-ticker-wrap{display:flex;align-items:center;gap:0}
        .cl-ticker{display:inline-flex;animation:cltick 20s linear infinite;white-space:nowrap}
        .cl-item{font-size:13px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:rgba(0,0,0,0.22);padding:0 3rem;white-space:nowrap}
        @keyframes cltick{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        /* WORK */
        .work-hd{display:flex;justify-content:space-between;align-items:baseline;padding:2.8rem 2.5rem 2rem;border-bottom:1px solid rgba(0,0,0,0.08)}
        .sec-label{font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:var(--mid)}
        .w-item{display:grid;grid-template-columns:3fr 1.2fr 1fr 60px;align-items:center;padding:1.5rem 2.5rem;border-top:1px solid rgba(0,0,0,0.07);cursor:pointer;text-decoration:none;color:inherit;transition:background 0.18s}
        .w-item:hover{background:rgba(0,0,0,0.025)}
        .w-client{font-size:21px;font-weight:500;letter-spacing:-0.01em}
        .w-type{font-size:13px;color:var(--mid)}
        .w-yr{font-size:13px;color:var(--mid)}
        .wa{font-size:16px;color:var(--mid);text-align:right;transition:transform 0.2s}
        .w-item:hover .wa{transform:translateX(3px)}

        /* STATEMENT */
        #statement{background:var(--black);padding:9rem 2.5rem;text-align:center}
        .st-text{font-family:'Anton',sans-serif;font-size:clamp(44px,7.5vw,116px);text-transform:uppercase;line-height:0.93;letter-spacing:-0.01em;color:var(--white);max-width:1100px;margin:0 auto}
        .st-text .out{color:transparent;-webkit-text-stroke:1px rgba(255,255,255,0.28)}
        .st-sub{margin-top:2.8rem;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.25)}

        /* VERTICALS */
        #verticals{padding:6rem 2.5rem;background:var(--gray)}
        .v-label{font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:var(--mid);margin-bottom:3.5rem;display:block}
        .v-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(0,0,0,0.1);border:1px solid rgba(0,0,0,0.1)}
        .v-card{background:var(--gray);padding:3rem 2.4rem;transition:background 0.28s;text-decoration:none;color:inherit;display:block}
        .v-card:hover{background:var(--white)}
        .v-handle{font-size:11px;letter-spacing:0.11em;color:var(--mid);margin-bottom:1.6rem;display:block}
        .v-name{font-family:'Anton',sans-serif;font-size:36px;text-transform:uppercase;line-height:1;margin-bottom:1rem}
        .v-desc{font-size:13px;color:var(--mid);line-height:1.72;max-width:270px}
        .v-link{display:inline-block;margin-top:1.2rem;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:var(--black);border-bottom:1px solid rgba(0,0,0,0.2);padding-bottom:2px}

        /* SERVICES */
        .svc-top{display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid rgba(0,0,0,0.08)}
        .svc-hd{padding:5rem 2.5rem;border-right:1px solid rgba(0,0,0,0.08)}
        .svc-hd h2{font-family:'Anton',sans-serif;font-size:clamp(40px,5.5vw,76px);text-transform:uppercase;line-height:0.93;letter-spacing:-0.01em;margin-top:2rem}
        .svc-intro{padding:5rem 2.5rem;display:flex;align-items:flex-end}
        .svc-intro p{font-size:15px;color:var(--mid);line-height:1.8;max-width:400px}
        .svc-grid{display:grid;grid-template-columns:repeat(3,1fr);border-bottom:1px solid rgba(0,0,0,0.08)}
        .svc-item{padding:2.5rem 2.4rem;border-right:1px solid rgba(0,0,0,0.08);border-top:1px solid rgba(0,0,0,0.08);transition:background 0.18s}
        .svc-item:last-child{border-right:none}
        .svc-item:nth-child(-n+3){border-top:none}
        .svc-item:hover{background:rgba(0,0,0,0.02)}
        .svc-n{font-size:11px;letter-spacing:0.1em;color:rgba(0,0,0,0.18);margin-bottom:1.8rem}
        .svc-name{font-size:17px;font-weight:500;letter-spacing:-0.01em;margin-bottom:0.6rem}
        .svc-desc{font-size:13px;color:var(--mid);line-height:1.72}

        /* CONTACT */
        #contact{display:grid;grid-template-columns:1fr 1fr;min-height:75vh}
        .ct-l{padding:6rem 2.5rem;border-right:1px solid rgba(0,0,0,0.08);display:flex;flex-direction:column;justify-content:space-between}
        .ct-l h2{font-family:'Anton',sans-serif;font-size:clamp(48px,6vw,90px);text-transform:uppercase;line-height:0.93;letter-spacing:-0.01em;margin-top:2rem}
        .ct-details{display:flex;flex-direction:column;gap:1.3rem}
        .ct-row{display:flex;gap:2rem}
        .ct-key{font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:var(--mid);min-width:80px;padding-top:1px}
        .ct-val{font-size:14px;color:var(--black)}
        .ct-r{padding:6rem 2.5rem;display:flex;flex-direction:column;gap:1.1rem;justify-content:center}
        .fl{font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:var(--mid);display:block;margin-bottom:0.35rem}
        input,select,textarea{width:100%;background:transparent;border:none;border-bottom:1px solid rgba(0,0,0,0.14);color:var(--black);font-family:'DM Sans',sans-serif;font-size:15px;padding:0.65rem 0;outline:none;transition:border-color 0.22s;appearance:none}
        input:focus,select:focus,textarea:focus{border-bottom-color:var(--black)}
        textarea{resize:none;height:78px}
        .f-row{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
        .sub-btn{margin-top:0.8rem;background:var(--black);color:var(--white);border:none;padding:1rem 2rem;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;width:100%;transition:opacity 0.22s}
        .sub-btn:hover{opacity:0.72}

        /* FOOTER */
        footer{padding:1.8rem 2.5rem;border-top:1px solid rgba(0,0,0,0.08);display:flex;justify-content:space-between;align-items:center}
        .ft-logo{font-size:14px;font-weight:500}
        .ft-links{display:flex;gap:2rem;list-style:none}
        .ft-links a{font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:var(--mid);text-decoration:none;transition:color 0.2s}
        .ft-links a:hover{color:var(--black)}
        .ft-copy{font-size:12px;color:rgba(0,0,0,0.22)}

        /* MOBILE */
        @media(max-width:768px){
          nav{padding:1rem 1.5rem}
          .nav-links{display:none}
          .nav-cta{display:none}
          .hamburger{display:flex}
          #hero{padding:3rem 1.5rem 2.5rem;min-height:85vh}
          .hero-foot{flex-direction:column;gap:1.2rem;align-items:flex-start}
          .hero-loc{display:none}
          #clients{padding:1.5rem 0}
          .work-hd{padding:2rem 1.5rem 1.5rem}
          .w-item{grid-template-columns:1fr 40px;padding:1.2rem 1.5rem}
          .w-type,.w-yr{display:none}
          .w-client{font-size:18px}
          #statement{padding:5rem 1.5rem}
          #verticals{padding:4rem 1.5rem}
          .v-grid{grid-template-columns:1fr}
          .svc-top{grid-template-columns:1fr}
          .svc-hd{border-right:none;border-bottom:1px solid rgba(0,0,0,0.08);padding:3rem 1.5rem}
          .svc-intro{padding:2rem 1.5rem}
          .svc-grid{grid-template-columns:1fr}
          .svc-item{border-right:none}
          .svc-item:nth-child(-n+3){border-top:1px solid rgba(0,0,0,0.08)}
          .svc-item:first-child{border-top:none}
          .svc-item{padding:2rem 1.5rem}
          #contact{grid-template-columns:1fr}
          .ct-l{border-right:none;border-bottom:1px solid rgba(0,0,0,0.08);padding:3rem 1.5rem}
          .ct-r{padding:3rem 1.5rem}
          .f-row{grid-template-columns:1fr}
          footer{flex-direction:column;gap:1.2rem;text-align:center;padding:2rem 1.5rem}
          .ft-links{flex-wrap:wrap;justify-content:center;gap:1.2rem}
        }
      `}</style>

      {/* INTRO */}
      {intro && (
        <div className={`intro${introFade ? ' fade' : ''}`}>
          <div className="intro-glow"/>
          <span className="intro-word">ViralX</span>
        </div>
      )}

      {/* 모바일 메뉴 */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <button className="mobile-menu-close" onClick={() => setMenuOpen(false)}>✕</button>
        <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
        <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="#verticals" onClick={() => setMenuOpen(false)}>Studio</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
      </div>

      <nav>
        <a href="#" className="nav-logo">ViralX</a>
        <ul className="nav-links">
          <li><a href="#work">Work</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#verticals">Studio</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className="nav-cta">Get in touch</a>
        <button className="hamburger" onClick={() => setMenuOpen(true)}>
          <span/><span/><span/>
        </button>
      </nav>

      <section id="hero">
        <div className="h-line"><span className="h-text l1">We Make</span></div>
        <div className="h-line"><span className="h-text stroke l2">What Goes</span></div>
        <div className="h-line"><span className="h-text l3">Viral.</span></div>
        <div className="hero-foot">
          <p className="hero-desc">Under-25 creatives. Hospitality, real estate, and everything in between. Based in Parnell, Auckland.</p>
          <span className="hero-loc">Auckland · NZ</span>
          <a href="#work" className="hero-link">View work →</a>
        </div>
      </section>

      <div className="ticker">
        <div className="ticker-track">
          {['Video Production','Social Media','Paid Ads','Photography','Creative Direction','Hospitality','Real Estate','Influencer','Video Production','Social Media','Paid Ads','Photography','Creative Direction','Hospitality','Real Estate','Influencer'].map((t,i) => (
            <span key={i} className="ti">{t} <b>/</b></span>
          ))}
        </div>
      </div>

      <div id="clients">
        <div className="cl-ticker-wrap">
          <div className="cl-ticker">
            {['BCG Group','·','Harcourts','·','Ray White','·','Allgot','·','Victoria Sushi','·','BCG Group','·','Harcourts','·','Ray White','·','Allgot','·','Victoria Sushi','·'].map((c,i) => (
              <span key={i} className="cl-item">{c}</span>
            ))}
          </div>
        </div>
      </div>

      <section id="work">
        <div className="work-hd">
          <span className="sec-label">Selected work</span>
          <span className="sec-label">({portfolios.length.toString().padStart(2,'0')})</span>
        </div>
        <div>
          {portfolios.length > 0 ? portfolios.map(p => (
            <a key={p.id} className="w-item" href="#">
              <span className="w-client">{p.client}</span>
              <span className="w-type">{p.type}</span>
              <span className="w-yr">{p.year}</span>
              <span className="wa">↗</span>
            </a>
          )) : (
            ['BCG Group','Harcourts','Victoria Sushi','Allgot','Ray White','F&B Campaign'].map((c,i) => (
              <a key={i} className="w-item" href="#">
                <span className="w-client">{c}</span>
                <span className="w-type">Video Production</span>
                <span className="w-yr">2025</span>
                <span className="wa">↗</span>
              </a>
            ))
          )}
        </div>
      </section>

      <section id="statement">
        <p className="st-text">Content that <span className="out">moves</span><br/>people.</p>
        <p className="st-sub">Parnell, Auckland — Est. 2024</p>
      </section>

      <section id="verticals">
        <span className="v-label">Our studio</span>
        <div className="v-grid">
          {[
            {handle:'@viralx_nz',name:'Agency',desc:'Strategy, creative direction, and full-service marketing.',url:'https://instagram.com/viralx_nz'},
            {handle:'@viralx_productions',name:'Productions',desc:'Commercial video for real estate and business.',url:'https://instagram.com/viralx_productions'},
            {handle:'@viralx_hospitality',name:'Hospitality',desc:'F&B content agency turning everyday restaurants into viral hits.',url:'https://instagram.com/viralx_hospitality'}
          ].map(v => (
            <a key={v.name} className="v-card" href={v.url} target="_blank" rel="noopener noreferrer">
              <span className="v-handle">{v.handle}</span>
              <h3 className="v-name">{v.name}</h3>
              <p className="v-desc">{v.desc}</p>
              <span className="v-link">Instagram →</span>
            </a>
          ))}
        </div>
      </section>

      <section id="services">
        <div className="svc-top">
          <div className="svc-hd">
            <span className="sec-label">What we do</span>
            <h2>Six<br/>services.</h2>
          </div>
          <div className="svc-intro"><p>We don&apos;t follow trends — we&apos;re already living them. Content built for the scroll, the share, the save.</p></div>
        </div>
        <div className="svc-grid">
          {[{n:'01',name:'Video Production',desc:'Commercial reels, property showcases, restaurant content.'},{n:'02',name:'Social Media',desc:'Strategy, content calendars, full channel management.'},{n:'03',name:'Paid Advertising',desc:'Meta and Google Ads built on creative that converts.'},{n:'04',name:'Photography',desc:'Food, property, and lifestyle photography that sells.'},{n:'05',name:'Creative Direction',desc:'Visual identity, content strategy, brand storytelling.'},{n:'06',name:'Influencer & Talent',desc:'Curated creator partnerships. Authentic reach, real results.'}].map(s => (
            <div key={s.n} className="svc-item">
              <p className="svc-n">{s.n}</p>
              <p className="svc-name">{s.name}</p>
              <p className="svc-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact">
        <div className="ct-l">
          <div>
            <span className="sec-label">Get in touch</span>
            <h2>Start a<br/>project.</h2>
          </div>
          <div className="ct-details">
            <div className="ct-row"><span className="ct-key">Location</span><span className="ct-val">155 The Strand, Parnell, Auckland</span></div>
            <div className="ct-row"><span className="ct-key">Instagram</span><span className="ct-val">@viralx_nz</span></div>
          </div>
        </div>
        <div className="ct-r">
          <div className="f-row">
            <div><label className="fl">First name</label><input type="text" placeholder="Alex"/></div>
            <div><label className="fl">Last name</label><input type="text" placeholder="Smith"/></div>
          </div>
          <div><label className="fl">Email</label><input type="email" placeholder="alex@yourbrand.co.nz"/></div>
          <div><label className="fl">Service</label>
            <select>
              <option value="">Select a service</option>
              <option>Video Production</option>
              <option>Social Media Management</option>
              <option>Paid Advertising</option>
              <option>Photography</option>
              <option>Creative Direction</option>
            </select>
          </div>
          <div><label className="fl">About your project</label><textarea placeholder="What are you working on?"></textarea></div>
          <button className="sub-btn">Send enquiry</button>
        </div>
      </section>

      <footer>
        <div className="ft-logo">ViralX</div>
        <ul className="ft-links">
          <li><a href="#work">Work</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#verticals">Studio</a></li>
          <li><a href="https://instagram.com/viralx_nz" target="_blank">Instagram</a></li>
        </ul>
        <p className="ft-copy">© 2025 ViralX Agency · Auckland, NZ</p>
      </footer>
    </>
  )
}