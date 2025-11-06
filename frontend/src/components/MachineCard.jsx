import React, {useState} from 'react'

export default function MachineCard({item, onAdd, previewOnly}){
  const [showGraph, setShowGraph] = useState(false)
  return (
    <div className="card">
      <img src={item.image} alt={item.model} />
      <div className="model">{item.model}</div>
      <div className="category">{item.category} • Capacidade: {item.capacity}</div>
      <p>{item.description}</p>
      <div style={{display:'flex', gap:8, marginTop:8}}>
        <button className="btn" onClick={()=> onAdd && onAdd(item)}>Adicionar ao orçamento</button>
        <button className="btn" style={{background:'#555'}} onClick={()=> setShowGraph(s=>!s)}>{showGraph ? 'Fechar gráfico' : 'Ver gráfico técnico'}</button>
      </div>
      {showGraph && item.graph && (
        <div className="tech-graph">
          <img src={item.graph} alt={'Gráfico ' + item.model} style={{width:'100%'}} />
        </div>
      )}
    </div>
  )
}
