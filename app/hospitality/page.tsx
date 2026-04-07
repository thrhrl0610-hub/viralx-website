'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function HospitalityPage() {
  const router = useRouter()
  const [brands, setBrands] = useState<any[]>([])

  useEffect(() => {
    supabase.from('hospitality_brands').select('*').order('sort_order').then(({ data }) => {
      if (data) setBrands(data)
    })
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        :root{--black:#0a0a0a;--white:#f5f5f3;--mid:#888}
        body{background:var(--white);font-family:'DM Sans',sans-serif}
        .brand-item{display:flex;justify-content:space-between;align-items:center;padding:1.5rem 2.5rem;border-top:1px solid rgba(0,0,0,0.07);cursor:pointer;text-decoration:none;color:inherit;transition:background 0.18s}
        .brand-item:hover{background:rgba(0,0,0,0.025)}
        .brand-name{font-size:21px;font-weight:500;letter-spacing:-0.01em}
        .brand-arrow{display:flex;align-items:center;justify-content:flex-end}
        @media(max-width:768px){
          .brand-item{padding:1.2rem 1.5rem}
          .brand-name{font-size:18px}
          .brand-arrow{display:none}
        }
      `}</style>

      <div style={{background:'#0a0a0a',padding:'1.2rem 2.5rem',display:'flex',alignItems:'center',gap:'1.5rem'}}>
        <button onClick={() => router.back()} style={{background:'transparent',border:'none',color:'#fff',fontSize:'20px',cursor:'pointer'}}>←</button>
        <span style={{color:'#fff',fontWeight:500,fontSize:'16px',fontFamily:'sans-serif'}}>ViralX</span>
      </div>

      <div style={{padding:'3rem 2.5rem 1.5rem'}}>
        <p style={{fontSize:'11px',letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--mid)',marginBottom:'0.8rem'}}>Hospitality · 2025</p>
        <h1 style={{fontFamily:'Anton',fontSize:'clamp(36px,8vw,96px)',textTransform:'uppercase',lineHeight:0.93,marginBottom:'1rem'}}>Hospitality</h1>
        <p style={{fontSize:'14px',color:'var(--mid)',marginBottom:'3rem'}}>F&B brands we&apos;ve worked with</p>
      </div>

      <div>
        {brands.length === 0 ? (
          <p style={{color:'var(--mid)',fontSize:'14px',padding:'0 2.5rem'}}>No brands yet.</p>
        ) : brands.map(b => (
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
    </>
  )
}