import React from 'react'

export default function WhatsAppButton({number, label}){
  const href = `https://wa.me/${number.replace(/\D/g,'')}`
  return (
    <a className="whatsapp" href={href} target="_blank" rel="noreferrer">{label || 'WhatsApp'}</a>
  )
}
