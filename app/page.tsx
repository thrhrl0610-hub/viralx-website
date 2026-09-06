'use client'
import { useEffect, useState } from 'react'
import { work, clients, feed } from '@/content/work'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [intro, setIntro] = useState(true)
  const [introFade, setIntroFade] = useState(false)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', service: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    const t1 = setTimeout(() => setIntroFade(true), 2200)
    const t2 = setTimeout(() => setIntro(false), 2900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  async function handleSubmit() {
    if (!formData.firstName || !formData.email || !formData.service) return
    setSending(true)
    setFormError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        setSent(true)
      } else {
        const body = await res.json().catch(() => ({}))
        setFormError(body.error || "That didn't send. Try again, or email connect@viralx.co.nz.")
      }
    } catch {
      setFormError("That didn't send. Check your connection, or email connect@viralx.co.nz.")
    }
    setSending(false)
  }

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
        #clients{background:var(--white);border-bottom:1px solid rgba(0,0,0,0.08);padding:2.2rem 0;overflow:hidden}
        .cl-ticker-wrap{display:flex;align-items:center}
        .cl-ticker{display:inline-flex;align-items:center;animation:cltick 28s linear infinite;white-space:nowrap}
        .cl-item{font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:rgba(0,0,0,0.2);padding:0 2.5rem;white-space:nowrap;transition:color 0.2s}
        .cl-item:hover{color:rgba(0,0,0,0.5)}
        .cl-sep{width:4px;height:4px;border-radius:50%;background:rgba(0,0,0,0.12);flex-shrink:0}
        @keyframes cltick{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        /* WORK */
        .work-hd{display:flex;justify-content:space-between;align-items:baseline;padding:2.8rem 2.5rem 2rem;border-bottom:1px solid rgba(0,0,0,0.08)}
        .sec-label{font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:var(--mid)}
        .w-item{display:grid;grid-template-columns:3fr 1.2fr 1fr 60px;align-items:center;padding:1.5rem 2.5rem;border-top:1px solid rgba(0,0,0,0.07);cursor:pointer;text-decoration:none;color:inherit;transition:background 0.18s}
        .w-item:hover{background:rgba(0,0,0,0.025)}
        .w-client{font-size:21px;font-weight:500;letter-spacing:-0.01em}
        .w-type{font-size:13px;color:var(--mid)}
        .w-yr{font-size:13px;color:var(--mid)}
        .wa{display:flex;align-items:center;justify-content:flex-end;transition:transform 0.2s}
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
        .svc-item:nth-child(3n){border-right:none}
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
        .sub-btn:disabled{opacity:0.4;cursor:not-allowed}

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
          #hero{padding:3rem 1.5rem 2.5rem;min-height:60vh}
          .hero-foot{flex-direction:column;gap:1.2rem;align-items:flex-start}
          .hero-loc{display:none}
          #clients{padding:1.5rem 0}
          .work-hd{padding:2rem 1.5rem 1.5rem}
          .w-item{grid-template-columns:1fr;padding:1.2rem 1.5rem}
          .w-type,.w-yr,.wa{display:none}
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
          .ct-l h2{font-size:36px;margin-bottom:2rem}
          .ct-r{padding:3rem 1.5rem}
          .f-row{grid-template-columns:1fr}
          footer{flex-direction:column;gap:1.2rem;text-align:center;padding:2rem 1.5rem}
          .ft-links{flex-wrap:wrap;justify-content:center;gap:1.2rem}
        }

        /* ---- Trusted by ---- */
        .cl-head{display:flex;align-items:baseline;justify-content:space-between;gap:1.5rem;padding:0 2.5rem 1.1rem}
        .cl-claim{font-size:15px;font-weight:500;letter-spacing:-0.005em;color:var(--black)}
        .cl-claim b{font-weight:700}

        /* ---- Selected work: 9:16, the format the work is shot in ---- */
        .wall{display:grid;grid-template-columns:repeat(6,1fr);gap:0.7rem;padding:0 2.5rem 1.4rem}
        .wcard{position:relative;aspect-ratio:9/16;overflow:hidden;background:#141414;display:block;transition:transform 0.5s cubic-bezier(0.16,1,0.3,1),filter 0.5s ease}
        .wall:hover .wcard{filter:brightness(0.62)}
        .wall .wcard:hover{transform:translateY(-10px);filter:brightness(1)}
        .wcard-ph{position:absolute;inset:0;z-index:0}
        .ph-0{background:radial-gradient(115% 85% at 20% 12%,#6e6e6e 0%,#2a2a2a 42%,#0a0a0a 100%)}
        .ph-1{background:radial-gradient(70% 68% at 52% 44%,#9a9a9a 0%,#303030 46%,#0a0a0a 100%)}
        .ph-2{background:linear-gradient(178deg,#8b8b8b 0%,#313131 38%,#0d0d0d 100%)}
        .ph-3{background:radial-gradient(90% 78% at 80% 20%,#7c7c7c 0%,#232323 48%,#0a0a0a 100%)}
        .ph-4{background:linear-gradient(200deg,#c6c6c6 0%,#6a6a6a 26%,#1b1b1b 72%,#0a0a0a 100%)}
        .ph-5{background:radial-gradient(128% 108% at 50% 128%,#5d5d5d 0%,#1a1a1a 45%,#080808 100%)}
        .wcard-veil{position:absolute;inset:0;z-index:2;background:linear-gradient(to top,rgba(10,10,10,0.86) 0%,rgba(10,10,10,0.1) 48%,rgba(10,10,10,0.35) 100%)}
        .wcard-top{position:absolute;top:0.8rem;left:0.85rem;right:0.85rem;z-index:3;display:flex;justify-content:space-between;font-size:9.5px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(245,245,243,0.55)}
        .wcard-foot{position:absolute;left:0.85rem;right:0.85rem;bottom:0.85rem;z-index:3;color:var(--white)}
        .wcard-name{font-size:16px;font-weight:500;letter-spacing:-0.015em;line-height:1.2;display:block}
        .wcard-hook{display:block;font-size:11.5px;line-height:1.35;color:rgba(245,245,243,0.66);margin-top:0.3rem}
        .wcard-read{display:block;max-height:0;opacity:0;overflow:hidden;font-size:9.5px;letter-spacing:0.12em;text-transform:uppercase;color:var(--white);transition:max-height 0.35s cubic-bezier(0.16,1,0.3,1),opacity 0.3s ease,margin-top 0.35s ease}
        .wcard:hover .wcard-hook{color:rgba(245,245,243,0.85)}
        .wcard:hover .wcard-read{max-height:2.5em;opacity:1;margin-top:0.55rem}
        .wall-hint{display:flex;justify-content:space-between;padding:0.4rem 2.5rem 2.4rem}

        /* ---- Feed: leaves the site, so it may move; the wall may not ---- */
        #feed{background:var(--white);border-top:1px solid rgba(0,0,0,0.08);padding-bottom:0.6rem}
        .feed-link{color:var(--mid);transition:color 0.25s ease}
        .feed-link:hover{color:var(--black)}
        .feed-strip{display:flex;overflow:hidden;padding:0 0 1.4rem;-webkit-mask-image:linear-gradient(to right,transparent 0,#000 4%,#000 96%,transparent 100%);mask-image:linear-gradient(to right,transparent 0,#000 4%,#000 96%,transparent 100%)}
        .feed-track{display:flex;gap:0.7rem;padding-right:0.7rem;flex-shrink:0;animation:cltick 72s linear infinite reverse}
        .feed-strip:hover .feed-track{animation-play-state:paused}
        @media(hover:none){
          .feed-strip{overflow-x:auto;scroll-snap-type:x proximity;scrollbar-width:none;padding-left:1.5rem}
          .feed-strip::-webkit-scrollbar{display:none}
          .feed-track{animation:none}
        }
        .fcard{position:relative;flex:0 0 auto;display:block;scroll-snap-align:start;width:clamp(122px,11.5vw,170px);aspect-ratio:9/16;overflow:hidden;background:#141414;transition:transform 0.5s cubic-bezier(0.16,1,0.3,1),filter 0.5s ease;filter:brightness(0.82)}
        .feed-strip:hover .fcard{filter:brightness(0.5)}
        .feed-strip .fcard:hover{transform:translateY(-8px);filter:brightness(1)}
        .fcard-veil{position:absolute;inset:0;z-index:2;background:linear-gradient(to top,rgba(10,10,10,0.88) 0%,rgba(10,10,10,0.06) 52%,rgba(10,10,10,0.3) 100%)}
        .fcard-ext{position:absolute;top:0.55rem;right:0.6rem;z-index:3;font-size:11px;color:rgba(245,245,243,0.6)}
        .fcard-play{position:absolute;top:44%;left:50%;transform:translate(-50%,-50%);z-index:3;width:30px;height:30px;border-radius:50%;border:1px solid rgba(245,245,243,0.7);display:grid;place-items:center;background:rgba(10,10,10,0.22);transition:transform 0.3s cubic-bezier(0.16,1,0.3,1)}
        .fcard:hover .fcard-play{transform:translate(-50%,-50%) scale(1.14)}
        .fcard-foot{position:absolute;left:0.65rem;right:0.65rem;bottom:0.7rem;z-index:3}
        .fcard-h{display:block;font-size:8.5px;letter-spacing:0.11em;text-transform:uppercase;color:rgba(245,245,243,0.5)}
        .fcard-l{display:block;font-size:11.5px;font-weight:500;color:var(--white);line-height:1.28;margin-top:0.15rem}

        .form-err{font-size:13px;line-height:1.6;color:#8a1f1f}

        @media(max-width:1180px){ .wall{grid-template-columns:repeat(3,1fr)} }
        @media(max-width:768px){
          .cl-head{padding:0 1.5rem 0.8rem;flex-direction:column;align-items:flex-start;gap:0.35rem}
          .wall{display:flex;gap:0.6rem;overflow-x:auto;scroll-snap-type:x mandatory;scroll-padding-left:1.5rem;scrollbar-width:none;padding:0 1.5rem 1rem}
          .wall::-webkit-scrollbar{display:none}
          .wcard{flex:0 0 auto;width:min(48vw,208px);scroll-snap-align:start}
          .wcard-foot{left:0.7rem;right:0.7rem;bottom:0.7rem}
          .wcard-top{top:0.65rem;left:0.7rem;right:0.7rem;font-size:8.5px}
          .wcard-name{font-size:13.5px}
          .wcard-hook{font-size:10px;margin-top:0.25rem}
          .wcard-read{max-height:2.5em;opacity:1;margin-top:0.4rem;font-size:8.5px}
          .wall-hint{padding:0.4rem 1.5rem 2rem}
          .wall-count{display:none}
        }
        @media(prefers-reduced-motion:reduce){
          .feed-track,.cl-ticker,.ticker-track{animation:none!important;transform:none!important}
          .feed-strip,#clients .cl-ticker-wrap{overflow-x:auto}
          .wcard-read{max-height:2.5em;opacity:1;margin-top:0.55rem}
        }
      `}</style>

      {/* INTRO */}
      {intro && (
        <div className={`intro${introFade ? ' fade' : ''}`}>
          <div className="intro-glow"/>
          <span className="intro-word">ViralX</span>
        </div>
      )}

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
        <div className="cl-head">
          <span className="cl-claim">Trusted by <b>30+</b> brands across Auckland</span>
          <span className="sec-label">Selected clients</span>
        </div>
        <div className="cl-ticker-wrap">
          <div className="cl-ticker">
            {[...clients, ...clients].map((c,i) => (
              <span key={i} className="cl-item">{c}</span>
            ))}
          </div>
        </div>
      </div>

      <section id="work">
        <div className="work-hd">
          <span className="sec-label">Selected work</span>
          <span className="sec-label">({String(work.length).padStart(2,'0')})</span>
        </div>
        <div className="wall">
          {work.map((w, i) => {
            const inner = (
              <>
                <span className={`wcard-ph ph-${i % 6}`}/>
                <span className="wcard-veil"/>
                <span className="wcard-top"><span>{String(i+1).padStart(2,'0')}</span><span>{w.sector}</span></span>
                <span className="wcard-foot">
                  <span className="wcard-name">{w.client}</span>
                  <span className="wcard-hook">{w.hook}</span>
                  <span className="wcard-read">{w.external ? 'See it on Instagram \u2197' : 'Read the case \u2192'}</span>
                </span>
              </>
            )
            return w.external
              ? <a key={w.client} className="wcard" href={w.href} target="_blank" rel="noopener noreferrer">{inner}</a>
              : <a key={w.client} className="wcard" href={w.href}>{inner}</a>
          })}
        </div>
        <div className="wall-hint">
          <span className="sec-label">Click any project for the full case study</span>
          <span className="sec-label wall-count">9:16 · AS SHOT</span>
        </div>
      </section>

      <section id="feed">
        <div className="work-hd">
          <span className="sec-label">Latest from the feed</span>
          <a className="sec-label feed-link" href="https://instagram.com/viralx_nz" target="_blank" rel="noopener noreferrer">@VIRALX_NZ \u2197</a>
        </div>
        <div className="feed-strip">
          {[0,1].map(track => (
            <div className="feed-track" key={track} aria-hidden={track === 1}>
              {[...feed, ...feed].map((f, i) => (
                <a key={`${track}-${i}`} className="fcard" href={f.url} target="_blank" rel="noopener noreferrer"
                   tabIndex={track === 1 ? -1 : undefined} aria-label={`Watch on Instagram: ${f.label}`}>
                  <span className={`wcard-ph ph-${(i+3) % 6}`}/>
                  <span className="fcard-veil"/>
                  <span className="fcard-ext" aria-hidden="true">\u2197</span>
                  <span className="fcard-play" aria-hidden="true">
                    <svg width="8" height="10" viewBox="0 0 8 10" fill="none"><path d="M8 5L0 9.33V0.67L8 5Z" fill="#f5f5f3"/></svg>
                  </span>
                  <span className="fcard-foot">
                    <span className="fcard-h">{f.handle}</span>
                    <span className="fcard-l">{f.label}</span>
                  </span>
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="wall-hint">
          <span className="sec-label">Opens on Instagram</span>
          <span className="sec-label">Updated weekly</span>
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
            <h2>Nine<br/>services.</h2>
          </div>
          <div className="svc-intro"><p>We don&apos;t follow trends. We&apos;re already living them. Content built for the scroll, the share, the save.</p></div>
        </div>
        <div className="svc-grid">
          {[
            {n:'01',name:'Video Production',desc:'Commercial reels, property showcases, restaurant content.'},
            {n:'02',name:'Social Media',desc:'Strategy, content calendars, full channel management.'},
            {n:'03',name:'Paid Advertising',desc:'Meta and Google Ads built on creative that converts.'},
            {n:'04',name:'Photography',desc:'Food, property, and lifestyle photography that sells.'},
            {n:'05',name:'Creative Direction',desc:'Visual identity, content strategy, brand storytelling.'},
            {n:'06',name:'Influencer & Talent',desc:'Curated creator partnerships. Authentic reach, real results.'},
            {n:'07',name:'Web Design',desc:'Clean, modern websites built to convert visitors into clients.'},
            {n:'08',name:'Graphic Design',desc:'Posters, menus, signage and campaign artwork. Print-ready, and matched to how you look on screen.'},
            {n:'09',name:'Event Production',desc:'Launches, openings and brand activations, run end to end and filmed while they happen.'}
          ].map(s => (
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
            <h2>Start a project.</h2>
          </div>
          <div className="ct-details">
            <div className="ct-row"><span className="ct-key">Location</span><span className="ct-val">155 The Strand, Parnell, Auckland</span></div>
            <div className="ct-row"><span className="ct-key">Instagram</span><span className="ct-val">@viralx_nz</span></div>
          </div>
        </div>
        <div className="ct-r">
          {sent ? (
            <div style={{textAlign:'center',padding:'2rem 0'}}>
              <p style={{fontSize:'13px',letterSpacing:'0.08em',textTransform:'uppercase'}}>Enquiry sent ✓</p>
              <p style={{fontSize:'13px',color:'var(--mid)',marginTop:'0.5rem'}}>We&apos;ll be in touch soon.</p>
            </div>
          ) : (
            <>
              <div className="f-row">
                <div><label className="fl">First name</label><input type="text" placeholder="Alex" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})}/></div>
                <div><label className="fl">Last name</label><input type="text" placeholder="Smith" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})}/></div>
              </div>
              <div><label className="fl">Email</label><input type="email" placeholder="alex@yourbrand.co.nz" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}/></div>
              <div><label className="fl">Service</label>
                <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}>
                  <option value="">Select a service</option>
                  <option>Video Production</option>
                  <option>Social Media Management</option>
                  <option>Paid Advertising</option>
                  <option>Photography</option>
                  <option>Creative Direction</option>
                  <option>Influencer & Talent</option>
                  <option>Web Design</option>
                  <option>Graphic Design</option>
                  <option>Event Production</option>
                </select>
              </div>
              <div><label className="fl">About your project</label><textarea placeholder="What are you working on?" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea></div>
              {formError && <p className="form-err" role="alert">{formError}</p>}
              <button className="sub-btn" onClick={handleSubmit} disabled={sending}>
                {sending ? 'Sending...' : 'Send enquiry'}
              </button>
            </>
          )}
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