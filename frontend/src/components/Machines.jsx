import React from 'react'
import MachineCard from './MachineCard'

export default function Machines({items, onAdd, previewOnly}){
  if(!items || items.length===0) return <p>Catálogo vazio.</p>
  return <div className="grid">{items.map(it=> <MachineCard key={it.id} item={it} onAdd={onAdd} previewOnly={previewOnly} />)}</div>
}

