'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const HOSPITALITY_ID = '1f0ff87c-4fd3-4e8f-964d-247f6253cb19'

export default function HospitalityPage() {
  const router = useRouter()
  const [brands, setBrands] = useState<any[]>([])
  const [medias, setMedias] = useState<any[]>([])
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  useEffect(() => {
    supabase.from('hospitality_brands').select('*').order('sort_order').then(({ data }) => {
      if (data) setBrands(data)
    })
    supabase.from('portfolio_media').select('*').eq('portfolio_id', HOSPITALITY_ID).order('sort_order').then(({ data }) => {
      if (data) setMedias(data)
    })
  }, [])

  function getEmbedUrl(url: string) {
    if (!url) return ''
    if (url.includes('youtube.com/watch')) {
      const vid = new URL(url).searchParams.get('v')
      return `https://www.youtube.com/embed/${vid}?autoplay=1`
    }
    if (url.includes('youtu.be/')) {
      const vid = url.split('youtu.be/')[1].split('?')[0]
      return `https://www.youtube.com/embed/${vid}?autoplay=1`
    }
    if (url.includes('vimeo.com/')) {
      const vid = url.split('vimeo.com/')[1].split('?')[0]
      return `https://player.vimeo.com/video/${vid}?autoplay=1`
    }
    return url
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        :root{--black:#0a0a0a;--white:#f5f5f3;--mid:#888}
        html,body{background:var(--white);font-family:'DM Sans',sans-serif}
        .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.95);z-index:1000;display:flex;align-items:center;justify-content:center}
        .modal-close{position:absolute;top:1.5rem;right:2rem;font-size:28px;cursor:pointer;background:none;border:none;color:#fff;z-index:1001}
        .modal-iframe{width:90vw;height:50.625vw;max-height:85vh;max-width:calc(85vh * 16/9);border:none}
        .modal-video{width:90vw;max-height:85vh;max-width:calc(85vh * 16/9)}
        .brand-item{display:flex;justify-content:space-between;align-items:center;padding:1.5rem 2.5rem;border-top:1px solid rgba(0,0,0,0.07);cursor:pointer;text-decoration:none;color:inherit;transition:background 0.18s}
        .brand-item:hover{background:rgba(0,0,0,0.025)}
        .brand-name{font-size:21px;font-weight:500;letter-spacing:-0.01em}
        .brand-arrow{display:flex;align-items:center;justify-content:flex-end}
        .media-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0.8rem;padding:0 2.5rem 3rem}
        .media-card{cursor:pointer;background:#0a0a0a;aspect-ratio:4/3;position:relative;overflow:hidden;border-radius:2px}
        .media-card img{width:100%;height:100%;object-fit:cover;display:block}
        .play-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.25);opacity:1}
        .sec-divider{padding:2rem 2.5rem 1rem;border-top:1px solid rgba(0,0,0,0.08);margin-top:1rem}
        @media(max-width:768px){
          .brand-item{padding:1.2rem 1.5rem}
          .brand-name{font-size:18px}
          .brand-arrow{display:none}
          .media-grid{grid-template-columns:1fr;padding:0 1rem 1.5rem;gap:0.8rem}
          .sec-divider{padding:1.5rem 1rem 0.8rem}
        }
      `}</style>

      {activeVideo && (
        <div className="modal-overlay" onClick={() => setActiveVideo(null)}>
          <button className="modal-close" onClick={() => setActiveVideo(null)}>✕</button>
          {activeVideo.includes('supabase') || activeVideo.endsWith('.mp4') || activeVideo.endsWith('.mov') ? (
            <video className="modal-video" src={activeVideo} autoPlay controls onClick={e => e.stopPropagation()}/>
          ) : (
            <iframe className="modal-iframe" src={getEmbedUrl(activeVideo)} allow="autoplay; fullscreen" allowFullScreen/>
          )}
        </div>
      )}

      <div style={{background:'#0a0a0a',padding:'1.2rem 2.5rem',display:'flex',alignItems:'center',gap:'1.5rem'}}>
        <button onClick={() => router.back()} style={{background:'transparent',border:'none',color:'#fff',fontSize:'20px',cursor:'pointer'}}>←</button>
        <span style={{color:'#fff',fontWeight:500,fontSize:'16px',fontFamily:'sans-serif'}}>ViralX</span>
      </div>

      <div style={{padding:'3rem 2.5rem 1.5rem',maxWidth:'1100px',margin:'0 auto'}}>
        <p style={{fontSize:'11px',letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--mid)',marginBottom:'0.8rem'}}>Hospitality · 2025</p>
        <h1 style={{fontFamily:'Anton',fontSize:'clamp(36px,8vw,96px)',textTransform:'uppercase',lineHeight:0.93,marginBottom:'1rem'}}>Hospitality</h1>
        <p style={{fontSize:'14px',color:'var(--mid)',marginBottom:'3rem'}}>F&B brands we&apos;ve worked with</p>
      </div>

      {brands.length > 0 && (
        <div style={{marginBottom:'2rem'}}>
          {brands.map(b => (
            <a key={b.id} className="brand-item" href={`/hospitality/${b.id}`}>
              <span className="brand-name">{b.name}</span>
              <span className="brand-arrow">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 13L13 1M13 1H4M13 1V10" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          ))}
        </div>
      )}

      {medias.length > 0 && (
        <>
          <div className="sec-divider">
            <span style={{fontSize:'11px',letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--mid)'}}>All Content</span>
          </div>
          <div className="media-grid">
            {medias.map((m) => (
              <div key={m.id} className="media-card" onClick={() => setActiveVideo(m.url)}>
                {m.type === 'image' ? (
                  <img src={m.url} alt=""/>
                ) : m.thumbnail_url ? (
                  <>
                    <img src={m.thumbnail_url} alt=""/>
                    <div className="play-overlay">
                      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="1.5" opacity="0.9"/>
                        <path d="M20 16L34 24L20 32V16Z" fill="white" opacity="0.95"/>
                      </svg>
                    </div>
                  </>
                ) : (
                  <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="1.5" opacity="0.9"/>
                      <path d="M20 16L34 24L20 32V16Z" fill="white" opacity="0.95"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {brands.length === 0 && medias.length === 0 && (
        <p style={{color:'var(--mid)',fontSize:'14px',padding:'0 2.5rem'}}>No content yet.</p>
      )}
    </>
  )
}