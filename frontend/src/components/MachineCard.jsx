import React from 'react'

export default function MachineCard({item}){
  return (
    <div className="card">
      <img src={item.image || '/assets/logo.jpg'} alt={item.model} style={{width:'100%', height:160, objectFit:'cover'}} />
      <h4>{item.model}</h4>
      <p><strong>Categoria:</strong> {item.category}</p>
      <p>{item.description}</p>
      <button onClick={()=> alert('Adicionado ao orçamento (placeholder)')}>Adicionar ao orçamento</button>
    </div>
  )
}
