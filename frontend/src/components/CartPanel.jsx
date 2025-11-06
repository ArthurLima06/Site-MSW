import React, {useEffect, useState} from 'react'

export default function CartPanel({open, onClose, onNavigate}){
  const [cart, setCart] = useState([])

  useEffect(()=>{
    const c = JSON.parse(localStorage.getItem('msw_cart') || '[]')
    setCart(c)
  },[open])

  const remove = (id)=>{
    const c = JSON.parse(localStorage.getItem('msw_cart') || '[]').filter(i=>i.id!==id)
    localStorage.setItem('msw_cart', JSON.stringify(c))
    setCart(c)
    window.dispatchEvent(new Event('storage'))
  }

  const clearAll = ()=>{
    localStorage.removeItem('msw_cart')
    setCart([])
    window.dispatchEvent(new Event('storage'))
  }

  const sendQuote = ()=>{
    if(onNavigate) onNavigate()
  }

  return (
    <div className={open ? 'cart-panel open' : 'cart-panel'}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <strong>Seu orçamento</strong>
        <div><button onClick={onClose} className="btn" style={{background:'#888'}}>Fechar</button></div>
      </div>
      <div style={{marginTop:8}}>
        {cart.length===0 && <div>Seu carrinho está vazio. <br/><button className="btn" onClick={sendQuote}>Começar orçamento</button></div>}
        {cart.map(it=> (
          <div key={it.id} className="cart-item">
            <img src={it.image} alt={it.model} style={{width:64, height:48, objectFit:'cover', borderRadius:6}} />
            <div style={{flex:1}}>
              <div style={{fontWeight:700}}>{it.model}</div>
              <div style={{fontSize:12, color:'#666'}}>Qtd: {it.qty}</div>
            </div>
            <div>
              <button className="btn" onClick={()=> remove(it.id)}>Remover</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:12, display:'flex', gap:8}}>
        <button className="btn" onClick={sendQuote}>Ir para orçamento</button>
        <button className="btn" style={{background:'#999'}} onClick={clearAll}>Limpar</button>
      </div>
    </div>
  )
}
