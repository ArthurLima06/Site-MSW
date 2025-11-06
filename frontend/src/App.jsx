import React, {useEffect, useState} from 'react'
import { API_BASE } from './config'
import Machines from './components/Machines'
import WhatsAppButton from './components/WhatsAppButton'
import CartPanel from './components/CartPanel'

export default function App(){
  const [machines, setMachines] = useState([])
  const [section, setSection] = useState('home') // 'home' or 'quote'
  const [cartCount, setCartCount] = useState(0)
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(()=>{
    fetch(API_BASE + '/api/machines').then(r=>r.json()).then(setMachines).catch(()=>{
      import('./data/machines.json').then(m=>setMachines(m.default || m))
    })
    // init cart count from localStorage
    const cart = JSON.parse(localStorage.getItem('msw_cart') || '[]')
    setCartCount(cart.reduce((s,i)=>s+i.qty,0))

    // storage event listener (keeps count in sync)
    const onStorage = ()=> {
      const c = JSON.parse(localStorage.getItem('msw_cart') || '[]')
      setCartCount(c.reduce((s,i)=>s+i.qty,0))
    }
    window.addEventListener('storage', onStorage)
    return ()=> window.removeEventListener('storage', onStorage)
  },[])

  const updateCartCount = ()=> {
    const cart = JSON.parse(localStorage.getItem('msw_cart') || '[]')
    setCartCount(cart.reduce((s,i)=>s+i.qty,0))
  }

  const handleAdd = (item)=>{
    const cart = JSON.parse(localStorage.getItem('msw_cart') || '[]')
    const idx = cart.findIndex(c=>c.id===item.id)
    if(idx>=0) cart[idx].qty += 1
    else cart.push({...item, qty:1})
    localStorage.setItem('msw_cart', JSON.stringify(cart))
    updateCartCount()
    setCartOpen(true)
    // trigger storage event so other listeners update
    window.dispatchEvent(new Event('storage'))
  }

  return (
    <div>
      <header>
        <img src="/assets/logo.jpg" className="logo-img" alt="MSW logo" />
        <nav>
          <a href="#" onClick={(e)=>{e.preventDefault(); setSection('home')}}>Home</a>
          <a href="#" onClick={(e)=>{e.preventDefault(); setSection('quote')}} style={{marginLeft:12}}>Orçamento</a>
        </nav>
        <div className="cart-btn" style={{marginLeft:'auto'}} onClick={()=>{ setCartOpen(s=>!s) }}>
          Orçamento: <strong>{cartCount}</strong>
        </div>
      </header>

      <CartPanel open={cartOpen} onClose={()=>setCartOpen(false)} onNavigate={()=>{ setSection('quote'); setCartOpen(false)}} />

      {section==='home' && (
        <div>
          <section className="hero">
            <div className="inner container">
              <div style={{flex:1}}>
                <h1>MSW — Soluções em locação de caminhões Munck</h1>
                <p>Desde 2018 em São Paulo, atendemos com rapidez e confiança, oferecendo soluções sustentáveis para obras e indústria.</p>
                <a className="btn start-cta" href="#" onClick={(e)=>{ e.preventDefault(); setSection('quote'); window.scrollTo({top:0, behavior:'smooth'})}}>Começar orçamento</a>
              </div>
              <div style={{width:420}} className="section-values">
                <h3>Nossos valores</h3>
                <ul>
                  <li>Atendimento rápido e confiável</li>
                  <li>Segurança e manutenção preventiva</li>
                  <li>Soluções sustentáveis</li>
                </ul>
                <p style={{marginTop:8}}>Atuamos em São Paulo oferecendo caminhões Munck para içamento e transporte de cargas.</p>
              </div>
            </div>
          </section>

          <main className="container" style={{marginTop:24}}>
            <section>
              <h2>Quem somos</h2>
              <p>A MSW nasceu em 2018 em São Paulo com o objetivo de atender obras e empresas que precisam de soluções rápidas e confiáveis em movimentação de cargas. Nossa equipe é formada por profissionais experientes e focados em segurança.</p>
            </section>

            <section style={{marginTop:24}}>
              <h3>Nossa frota</h3>
              <Machines items={machines} onAdd={handleAdd} previewOnly={true} />
            </section>
          </main>
        </div>
      )}

      {section==='quote' && (
        <main className="container" style={{marginTop:24}}>
          <h2>Faça seu orçamento</h2>
          <p>Selecione os equipamentos que deseja e envie as suas informações. Enviaremos o orçamento por e-mail.</p>
          <Machines items={machines} onAdd={handleAdd} previewOnly={false} />
        </main>
      )}

      <WhatsAppButton number="+5511983969849" label="Fale com um consultor" />

      <footer>
        <div>MSW Locação de Máquinas e Equipamentos — A empresa que constrói com você.</div>
        <div>Contato: contato@mswlocacoes.com.br | (11) 98396-9849</div>
      </footer>
    </div>
  )
}
