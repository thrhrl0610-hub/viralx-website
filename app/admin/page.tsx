export const dynamic = 'force-dynamic'

'use client'
import { useState, useEffect } from 'react'
import { supabase, supabaseAdmin } from '@/lib/supabase'

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [portfolios, setPortfolios] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '', client: '', category: 'hospitality', type: '', year: '2025'
  })
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)

  const login = () => {
    if (password === 'viralx2024') setIsLoggedIn(true)
    else alert('Wrong password')
  }

  const fetchPortfolios = async () => {
    const { data } = await supabase.from('portfolio').select('*').order('created_at', { ascending: false })
    if (data) setPortfolios(data)
  }

  useEffect(() => { if (isLoggedIn) fetchPortfolios() }, [isLoggedIn])

  const uploadFile = async (file: File, folder: string) => {
    const ext = file.name.split('.').pop()
    const name = `${folder}/${Date.now()}.${ext}`
    const { error } = await supabaseAdmin.storage.from('portfolio-media').upload(name, file)
    if (error) throw error
    const { data } = supabaseAdmin.storage.from('portfolio-media').getPublicUrl(name)
    return data.publicUrl
  }

  const handleSubmit = async () => {
    setUploading(true)
    try {
      let media_url = ''
      let thumbnail_url = ''
      if (mediaFile) media_url = await uploadFile(mediaFile, 'media')
      if (thumbnailFile) thumbnail_url = await uploadFile(thumbnailFile, 'thumbnails')
      await supabase.from('portfolio').insert([{ ...form, media_url, thumbnail_url }])
      alert('Added!')
      setForm({ title: '', client: '', category: 'hospitality', type: '', year: '2025' })
      setMediaFile(null)
      setThumbnailFile(null)
      fetchPortfolios()
    } catch (e) {
      alert('Error: ' + e)
    }
    setUploading(false)
  }

  const deletePortfolio = async (id: string) => {
    await supabase.from('portfolio').delete().eq('id', id)
    fetchPortfolios()
  }

  if (!isLoggedIn) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0a0a0a'}}>
      <div style={{background:'#141414',padding:'3rem',width:'360px'}}>
        <h1 style={{fontFamily:'sans-serif',color:'#fff',fontSize:'20px',marginBottom:'2rem',fontWeight:500}}>ViralX Admin</h1>
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={{width:'100%',background:'transparent',border:'none',borderBottom:'1px solid rgba(255,255,255,0.2)',color:'#fff',padding:'0.7rem 0',fontSize:'15px',outline:'none',marginBottom:'1.5rem'}}/>
        <button onClick={login} style={{width:'100%',background:'#fff',color:'#000',border:'none',padding:'1rem',fontSize:'13px',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',cursor:'pointer'}}>
          Enter
        </button>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#f5f5f3',fontFamily:'sans-serif'}}>
      <div style={{background:'#0a0a0a',padding:'1.2rem 2.5rem',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{color:'#fff',fontWeight:500,fontSize:'16px'}}>ViralX Admin</span>
        <button onClick={() => setIsLoggedIn(false)} style={{background:'transparent',border:'1px solid rgba(255,255,255,0.2)',color:'#fff',padding:'0.4rem 1rem',fontSize:'12px',cursor:'pointer'}}>Logout</button>
      </div>

      <div style={{maxWidth:'900px',margin:'3rem auto',padding:'0 2rem'}}>
        <div style={{background:'#fff',padding:'2.5rem',marginBottom:'2rem',border:'1px solid rgba(0,0,0,0.08)'}}>
          <h2 style={{fontSize:'18px',fontWeight:500,marginBottom:'2rem'}}>Add Portfolio Item</h2>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem',marginBottom:'1.5rem'}}>
            {[['Title','title'],['Client','client'],['Type (e.g. Video · Social)','type'],['Year','year']].map(([label, key]) => (
              <div key={key}>
                <label style={{fontSize:'11px',letterSpacing:'0.1em',textTransform:'uppercase',color:'#888',display:'block',marginBottom:'0.4rem'}}>{label}</label>
                <input type="text" value={form[key as keyof typeof form]} onChange={e => setForm({...form, [key]: e.target.value})}
                  style={{width:'100%',background:'transparent',border:'none',borderBottom:'1px solid rgba(0,0,0,0.15)',padding:'0.6rem 0',fontSize:'15px',outline:'none'}}/>
              </div>
            ))}
          </div>
          <div style={{marginBottom:'1.5rem'}}>
            <label style={{fontSize:'11px',letterSpacing:'0.1em',textTransform:'uppercase',color:'#888',display:'block',marginBottom:'0.4rem'}}>Category</label>
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
              style={{width:'100%',background:'transparent',border:'none',borderBottom:'1px solid rgba(0,0,0,0.15)',padding:'0.6rem 0',fontSize:'15px',outline:'none'}}>
              <option value="hospitality">Hospitality</option>
              <option value="realestate">Real Estate</option>
              <option value="production">Production</option>
            </select>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem',marginBottom:'2rem'}}>
            <div>
              <label style={{fontSize:'11px',letterSpacing:'0.1em',textTransform:'uppercase',color:'#888',display:'block',marginBottom:'0.4rem'}}>Media File (video/image)</label>
              <input type="file" accept="video/*,image/*" onChange={e => setMediaFile(e.target.files?.[0] || null)}
                style={{fontSize:'13px',color:'#888'}}/>
            </div>
            <div>
              <label style={{fontSize:'11px',letterSpacing:'0.1em',textTransform:'uppercase',color:'#888',display:'block',marginBottom:'0.4rem'}}>Thumbnail Image</label>
              <input type="file" accept="image/*" onChange={e => setThumbnailFile(e.target.files?.[0] || null)}
                style={{fontSize:'13px',color:'#888'}}/>
            </div>
          </div>
          <button onClick={handleSubmit} disabled={uploading}
            style={{background:'#0a0a0a',color:'#fff',border:'none',padding:'1rem 2rem',fontSize:'13px',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',cursor:'pointer',opacity:uploading?0.5:1}}>
            {uploading ? 'Uploading...' : 'Add to Portfolio'}
          </button>
        </div>

        <div style={{background:'#fff',padding:'2.5rem',border:'1px solid rgba(0,0,0,0.08)'}}>
          <h2 style={{fontSize:'18px',fontWeight:500,marginBottom:'2rem'}}>Portfolio ({portfolios.length})</h2>
          {portfolios.map(p => (
            <div key={p.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1.2rem 0',borderBottom:'1px solid rgba(0,0,0,0.06)'}}>
              <div>
                <p style={{fontWeight:500,fontSize:'15px'}}>{p.client}</p>
                <p style={{fontSize:'12px',color:'#888',marginTop:'2px'}}>{p.type} · {p.year} · {p.category}</p>
              </div>
              <button onClick={() => deletePortfolio(p.id)}
                style={{background:'transparent',border:'1px solid rgba(0,0,0,0.15)',padding:'0.4rem 1rem',fontSize:'12px',cursor:'pointer',color:'#888'}}>
                Delete
              </button>
            </div>
          ))}
          {portfolios.length === 0 && <p style={{color:'#888',fontSize:'14px'}}>No portfolio items yet.</p>}
        </div>
      </div>
    </div>
  )
}