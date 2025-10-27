import React, {useEffect, useState} from 'react'
import { API_BASE } from './config'
import Machines from './components/Machines'
import WhatsAppButton from './components/WhatsAppButton'

export default function App(){
  const [machines, setMachines] = useState([])
  useEffect(()=>{
    fetch(API_BASE + '/api/machines').then(r=>r.json()).then(setMachines).catch(()=>{
      import('./data/machines.json').then(m=>setMachines(m.default || m))
    })
  },[])

  return (
    <div>
      <header>
        <img src="/assets/logo.jpg" className="logo-img" alt="MSW logo" />
        <h1>MSW Locação de Máquinas e Equipamentos</h1>
        <div style={{marginLeft:'auto', color:'#fff'}}>Orçamento: <strong>0</strong></div>
      </header>

      <main className="container">
        <section style={{display:'grid', gridTemplateColumns:'1fr 360px', gap:24, alignItems:'center'}}>
          <div>
            <h2>Locação de caminhões Munck e equipamentos para obras</h2>
            <p>Na MSW oferecemos soluções completas em locação de máquinas para construção civil e infraestrutura. Frota moderna, operadores especializados e atendimento rápido.</p>
            <div style={{marginTop:12}}>
              <button className="btn" onClick={()=> window.scrollTo({top:400, behavior:'smooth'})}>Ver equipamentos</button>
              <a href="mailto:contato@mswlocacoes.com.br" style={{marginLeft:12}}>contato@mswlocacoes.com.br</a>
            </div>
          </div>
          <div style={{background:'#fff', padding:16, borderRadius:8}}>
            <h4>Faça um orçamento</h4>
            <p>Selecione os equipamentos e envie as suas informações. Nós retornamos em até 24h.</p>
            <button className="btn">Iniciar orçamento</button>
          </div>
        </section>

        <section style={{marginTop:28}}>
          <h3>Nossa frota</h3>
          <Machines items={machines} />
        </section>

        <section style={{marginTop:28}}>
          <h3>Sobre a MSW</h3>
          <p>A MSW Locação de Máquinas e Equipamentos nasceu para oferecer serviços de qualidade para obras de todos os tamanhos. Com foco em segurança, manutenção preventiva e atendimento próximo ao cliente, somos parceiros de projetos de construção, montagem e transporte de cargas.</p>
        </section>
      </main>

      <WhatsAppButton number="+5511983969849" label="Fale com um consultor" />

      <footer>
        <div>MSW Locação de Máquinas e Equipamentos — A empresa que constrói com você.</div>
        <div>Contato: contato@mswlocacoes.com.br | (11) 98396-9849</div>
      </footer>
    </div>
  )
}
