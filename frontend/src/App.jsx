import React, {useEffect, useState} from 'react'
import { API_BASE } from './config'
import Machines from './components/Machines'
import WhatsAppButton from './components/WhatsAppButton'

export default function App(){
  const [machines, setMachines] = useState([])
  useEffect(()=>{
    fetch(API_BASE + '/api/machines').then(r=>r.json()).then(setMachines).catch(()=>{
      // fallback to local data
      import('./data/machines.json').then(m=>setMachines(m.default || m))
    })
  },[])

  return (
    <div>
      <header>
        <img src="/assets/logo.jpg" className="logo-img" alt="MSW logo" />
        <h1>MSW Locação de Máquinas e Equipamentos</h1>
        <div className="cart">Orçamento: <strong>0</strong></div>
      </header>

      <main className="container">
        <section>
          <h2>Bem-vindo à MSW</h2>
          <p>A empresa que constrói com você — soluções em locação de máquinas e equipamentos para sua obra.</p>
        </section>

        <section style={{marginTop:20}}>
          <h3>Nossos equipamentos</h3>
          <Machines items={machines} />
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
