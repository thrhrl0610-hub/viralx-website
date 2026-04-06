'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function WorkDetail() {
  const { id } = useParams()
  const router = useRouter()
  const [portfolio, setPortfolio] = useState<any>(null)
  const [medias, setMedias] = useState<any[]>([])
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  useEffect(() => {
    supabase.from('portfolio').select('*').eq('id', id).single().then(({ data }) => {
      if (data) setPortfolio(data)
    })
    supabase.from('portfolio_media').select('*').eq('portfolio_id', id).order('sort_order').then(({ data }) => {
      if (data) setMedias(data)
    })
  }, [id])

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

  if (!portfolio) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0a0a0a'}}>
      <p style={{color:'#fff',fontFamily:'sans-serif'}}>Loading...</p>
    </div>
  )

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        :root{--black:#0a0a0a;--white:#f5f5f3;--mid:#888}
        body{background:var(--white);font-family:'DM Sans',sans-serif}
        .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.95);z-index:1000;display:flex;align-items:center;justify-content:center}
        .modal-close{position:absolute;top:1.5rem;right:2rem;font-size:28px;cursor:pointer;background:none;border:none;color:#fff;z-index:1001}
        .modal-iframe{width:90vw;height:50.625vw;max-height:85vh;max-width:calc(85vh * 16/9);border:none}
        .modal-video{width:90vw;max-height:85vh;max-width:calc(85vh * 16/9)}
        .media-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px}
        .media-card{cursor:pointer;background:#0a0a0a;aspect-ratio:4/3;position:relative;overflow:hidden}
        .media-card img{width:100%;height:100%;object-fit:cover;display:block}
        .media-card:hover .play-overlay{opacity:1}
        .play-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.35);opacity:0;transition:opacity 0.2s}
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

      <div style={{padding:'2rem 2.5rem',maxWidth:'1100px',margin:'0 auto'}}>
        <p style={{fontSize:'11px',letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--mid)',marginBottom:'0.8rem'}}>{portfolio.category} · {portfolio.year}</p>
        <h1 style={{fontFamily:'Anton',fontSize:'clamp(48px,8vw,96px)',textTransform:'uppercase',lineHeight:0.93,marginBottom:'1rem'}}>{portfolio.client}</h1>
        {portfolio.type && <p style={{fontSize:'14px',color:'var(--mid)',marginBottom:'2rem'}}>{portfolio.type}</p>}
      </div>

      {medias.length === 0 ? (
        <p style={{color:'var(--mid)',fontSize:'14px',padding:'0 2.5rem'}}>No media uploaded yet.</p>
      ) : (
        <div className="media-grid">
          {medias.map((m, i) => (
            <div key={m.id} className="media-card" onClick={() => setActiveVideo(m.url)}>
              {m.type === 'image' ? (
                <img src={m.url} alt=""/>
              ) : m.thumbnail_url ? (
                <>
                  <img src={m.thumbnail_url} alt=""/>
                  <div className="play-overlay">
                    <span style={{fontSize:'40px',color:'#fff'}}>▶</span>
                  </div>
                </>
              ) : (
                <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'0.8rem'}}>
                  <span style={{fontSize:'32px',color:'#fff'}}>▶</span>
                  <span style={{fontSize:'11px',letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(255,255,255,0.4)'}}>Play video {i+1}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}