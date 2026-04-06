'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import { supabase, supabaseAdmin } from '@/lib/supabase'

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [portfolios, setPortfolios] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({
    title: '', client: '', category: 'hospitality', type: '', year: '2025'
  })
  const [mediaFiles, setMediaFiles] = useState<{file: File, type: 'video'|'image', thumbnailFile?: File}[]>([])
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [existingMedias, setExistingMedias] = useState<any[]>([])

  const login = () => {
    if (password === 'viralx2024') setIsLoggedIn(true)
    else alert('Wrong password')
  }

  const fetchPortfolios = async () => {
    const { data } = await supabase.from('portfolio').select('*').order('sort_order', { ascending: true })
    if (data) setPortfolios(data)
  }

  useEffect(() => { if (isLoggedIn) fetchPortfolios() }, [isLoggedIn])

  const uploadFile = async (file: File, folder: string) => {
    const ext = file.name.split('.').pop()
    const name = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await supabaseAdmin.storage.from('portfolio-media').upload(name, file)
    if (error) throw error
    const { data } = supabaseAdmin.storage.from('portfolio-media').getPublicUrl(name)
    return data.publicUrl
  }

  const handleSubmit = async () => {
    setUploading(true)
    try {
      let thumbnail_url = editingId ? portfolios.find(p => p.id === editingId)?.thumbnail_url || '' : ''
      if (thumbnailFile) thumbnail_url = await uploadFile(thumbnailFile, 'thumbnails')

      let portfolioId = editingId
      if (editingId) {
        await supabase.from('portfolio').update({ ...form, thumbnail_url }).eq('id', editingId)
      } else {
        const maxOrder = portfolios.length > 0 ? Math.max(...portfolios.map(p => p.sort_order || 0)) + 1 : 0
        const { data } = await supabase.from('portfolio').insert([{ ...form, thumbnail_url, sort_order: maxOrder }]).select()
        portfolioId = data?.[0]?.id
      }

      for (let i = 0; i < mediaFiles.length; i++) {
        const m = mediaFiles[i]
        const url = await uploadFile(m.file, 'media')
        let mediaThumbnail = ''
        if (m.thumbnailFile) mediaThumbnail = await uploadFile(m.thumbnailFile, 'thumbnails')
        await supabase.from('portfolio_media').insert([{
          portfolio_id: portfolioId,
          url,
          type: m.type,
          sort_order: (existingMedias.length + i),
          thumbnail_url: mediaThumbnail
        }])
      }

      alert(editingId ? 'Updated!' : 'Added!')
      setEditingId(null)
      setForm({ title: '', client: '', category: 'hospitality', type: '', year: '2025' })
      setMediaFiles([])
      setThumbnailFile(null)
      setExistingMedias([])
      fetchPortfolios()
    } catch (e) {
      alert('Error: ' + e)
    }
    setUploading(false)
  }

  const movePortfolio = async (index: number, direction: 'up' | 'down') => {
    const newPortfolios = [...portfolios]
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (swapIndex < 0 || swapIndex >= newPortfolios.length) return

    const a = newPortfolios[index]
    const b = newPortfolios[swapIndex]

    await supabase.from('portfolio').update({ sort_order: b.sort_order ?? swapIndex }).eq('id', a.id)
    await supabase.from('portfolio').update({ sort_order: a.sort_order ?? index }).eq('id', b.id)

    fetchPortfolios()
  }

  const startEdit = async (p: any) => {
    setEditingId(p.id)
    setForm({
      title: p.title || '',
      client: p.client || '',
      category: p.category || 'hospitality',
      type: p.type || '',
      year: p.year || '2025',
    })
    const { data } = await supabase.from('portfolio_media').select('*').eq('portfolio_id', p.id).order('sort_order')
    setExistingMedias(data || [])
    setMediaFiles([])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm({ title: '', client: '', category: 'hospitality', type: '', year: '2025' })
    setMediaFiles([])
    setThumbnailFile(null)
    setExistingMedias([])
  }

  const deleteMedia = async (id: number) => {
    await supabase.from('portfolio_media').delete().eq('id', id)
    setExistingMedias(existingMedias.filter(m => m.id !== id))
  }

  const deletePortfolio = async (id: string) => {
    await supabase.from('portfolio_media').delete().eq('portfolio_id', id)
    await supabase.from('portfolio').delete().eq('id', id)
    fetchPortfolios()
  }

  const addMediaFile = (file: File) => {
    const type = file.type.startsWith('video') ? 'video' : 'image'
    setMediaFiles(prev => [...prev, { file, type }])
  }

  const updateMediaThumbnail = (index: number, file: File) => {
    setMediaFiles(prev => prev.map((m, i) => i === index ? { ...m, thumbnailFile: file } : m))
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
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'2rem'}}>
            <h2 style={{fontSize:'18px',fontWeight:500}}>{editingId ? 'Edit Portfolio Item' : 'Add Portfolio Item'}</h2>
            {editingId && (
              <button onClick={cancelEdit} style={{background:'transparent',border:'1px solid rgba(0,0,0,0.15)',padding:'0.4rem 1rem',fontSize:'12px',cursor:'pointer',color:'#888'}}>Cancel</button>
            )}
          </div>

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
              <option value="brandevent">Brand Event</option>
            </select>
          </div>

          <div style={{marginBottom:'1.5rem'}}>
            <label style={{fontSize:'11px',letterSpacing:'0.1em',textTransform:'uppercase',color:'#888',display:'block',marginBottom:'0.4rem'}}>Portfolio Thumbnail</label>
            <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && setThumbnailFile(e.target.files[0])}
              style={{fontSize:'13px',color:'#888'}}/>
          </div>

          {existingMedias.length > 0 && (
            <div style={{marginBottom:'1.5rem'}}>
              <label style={{fontSize:'11px',letterSpacing:'0.1em',textTransform:'uppercase',color:'#888',display:'block',marginBottom:'0.8rem'}}>Current Media</label>
              {existingMedias.map((m, i) => (
                <div key={m.id} style={{padding:'0.8rem 0',borderBottom:'1px solid rgba(0,0,0,0.06)'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <span style={{fontSize:'13px',color:'#555'}}>{m.type} {i+1} — {m.url.split('/').pop()?.slice(0,40)}</span>
                    <button onClick={() => deleteMedia(m.id)} style={{background:'transparent',border:'1px solid rgba(0,0,0,0.15)',padding:'0.3rem 0.8rem',fontSize:'11px',cursor:'pointer',color:'#888'}}>Remove</button>
                  </div>
                  {m.thumbnail_url && <p style={{fontSize:'11px',color:'#aaa',marginTop:'4px'}}>썸네일 설정됨 ✓</p>}
                </div>
              ))}
            </div>
          )}

          <div style={{marginBottom:'2rem'}}>
            <label style={{fontSize:'11px',letterSpacing:'0.1em',textTransform:'uppercase',color:'#888',display:'block',marginBottom:'0.8rem'}}>Add Media Files</label>
            <input type="file" accept="video/*,image/*" multiple onChange={e => {
              if (e.target.files) Array.from(e.target.files).forEach(addMediaFile)
            }} style={{fontSize:'13px',color:'#888',marginBottom:'0.8rem'}}/>
            {mediaFiles.length > 0 && (
              <div style={{marginTop:'0.8rem'}}>
                {mediaFiles.map((m, i) => (
                  <div key={i} style={{padding:'0.8rem',marginBottom:'0.5rem',background:'#f9f9f9',border:'1px solid rgba(0,0,0,0.06)'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.5rem'}}>
                      <span style={{fontSize:'13px',color:'#555'}}>{m.type} — {m.file.name.slice(0,40)}</span>
                      <button onClick={() => setMediaFiles(mediaFiles.filter((_,j) => j !== i))}
                        style={{background:'transparent',border:'none',cursor:'pointer',color:'#888',fontSize:'16px'}}>×</button>
                    </div>
                    {m.type === 'video' && (
                      <div>
                        <label style={{fontSize:'11px',letterSpacing:'0.08em',textTransform:'uppercase',color:'#aaa',display:'block',marginBottom:'0.3rem'}}>Video Thumbnail (선택)</label>
                        <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && updateMediaThumbnail(i, e.target.files[0])}
                          style={{fontSize:'12px',color:'#888'}}/>
                        {m.thumbnailFile && <p style={{fontSize:'11px',color:'#aaa',marginTop:'3px'}}>{m.thumbnailFile.name}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button onClick={handleSubmit} disabled={uploading}
            style={{background:'#0a0a0a',color:'#fff',border:'none',padding:'1rem 2rem',fontSize:'13px',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',cursor:'pointer',opacity:uploading?0.5:1}}>
            {uploading ? 'Uploading...' : editingId ? 'Save Changes' : 'Add to Portfolio'}
          </button>
        </div>

        <div style={{background:'#fff',padding:'2.5rem',border:'1px solid rgba(0,0,0,0.08)'}}>
          <h2 style={{fontSize:'18px',fontWeight:500,marginBottom:'2rem'}}>Portfolio ({portfolios.length})</h2>
          {portfolios.map((p, index) => (
            <div key={p.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'1.2rem 0',borderBottom:'1px solid rgba(0,0,0,0.06)'}}>
              <div>
                <p style={{fontWeight:500,fontSize:'15px'}}>{p.client}</p>
                <p style={{fontSize:'12px',color:'#888',marginTop:'2px'}}>{p.type} · {p.year} · {p.category}</p>
              </div>
              <div style={{display:'flex',gap:'0.5rem',alignItems:'center'}}>
                <div style={{display:'flex',flexDirection:'column',gap:'2px'}}>
                  <button onClick={() => movePortfolio(index, 'up')} disabled={index === 0}
                    style={{background:'transparent',border:'1px solid rgba(0,0,0,0.15)',padding:'0.2rem 0.6rem',fontSize:'11px',cursor:'pointer',color:'#888',opacity:index===0?0.3:1}}>↑</button>
                  <button onClick={() => movePortfolio(index, 'down')} disabled={index === portfolios.length - 1}
                    style={{background:'transparent',border:'1px solid rgba(0,0,0,0.15)',padding:'0.2rem 0.6rem',fontSize:'11px',cursor:'pointer',color:'#888',opacity:index===portfolios.length-1?0.3:1}}>↓</button>
                </div>
                <button onClick={() => startEdit(p)}
                  style={{background:'#0a0a0a',color:'#fff',border:'none',padding:'0.4rem 1rem',fontSize:'12px',cursor:'pointer'}}>
                  Edit
                </button>
                <button onClick={() => deletePortfolio(p.id)}
                  style={{background:'transparent',border:'1px solid rgba(0,0,0,0.15)',padding:'0.4rem 1rem',fontSize:'12px',cursor:'pointer',color:'#888'}}>
                  Delete
                </button>
              </div>
            </div>
          ))}
          {portfolios.length === 0 && <p style={{color:'#888',fontSize:'14px'}}>No portfolio items yet.</p>}
        </div>
      </div>
    </div>
  )
}