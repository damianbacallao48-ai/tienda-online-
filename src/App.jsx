import React, { useState } from 'react'

export default function App() {
  const [categoria, setCategoria] = useState('todos')
  const [busqueda, setBusqueda] = useState('')
  const [modalAbierto, setModalAbierto] = useState(false)

  // TU NÚMERO DE WHATSAPP CONFIGURADO
  const MI_WHATSAPP = "5358960660"

  // Formulario de Afiliación
  const [form, setForm] = useState({
    nombreResponsable: '',
    carnet: '',
    nombreNegocio: '',
    categoriaNegocio: 'Alimentos y Bebidas',
    ubicacion: '',
    telefonoNegocio: ''
  })

  const enviarSolicitud = (e) => {
    e.preventDefault()

    if (!form.nombreResponsable || !form.carnet || !form.nombreNegocio || !form.ubicacion || !form.telefonoNegocio) {
      alert("Por favor completa todos los campos del formulario.")
      return
    }

    const mensaje = `📋 *SOLICITUD DE AFILIACIÓN - TO' RICO MARKET*\n\n` +
      `👤 *Responsable:* ${form.nombreResponsable}\n` +
      `🆔 *Carnet de Identidad:* ${form.carnet}\n` +
      `🏪 *Nombre del Negocio:* ${form.nombreNegocio}\n` +
      `📦 *Categoría:* ${form.categoriaNegocio}\n` +
      `📍 *Ubicación:* ${form.ubicacion}\n` +
      `📱 *WhatsApp del Negocio:* ${form.telefonoNegocio}\n\n` +
      `_Deseo afiliar mi negocio al catálogo y activar mi período de 30 días._`

    const url = `https://wa.me/${MI_WHATSAPP}?text=${encodeURIComponent(mensaje)}`
    window.open(url, '_blank')
    setModalAbierto(false)
  }

  const categorias = [
    { id: 'todos', label: '🔥 Todos' },
    { id: 'alimentos', label: '🛒 Alimentos' },
    { id: 'bebidas', label: '🥤 Bebidas' },
    { id: 'aseo', label: '🧼 Aseo Personal' },
    { id: 'hogar', label: '⚡ Electrodomésticos' },
  ]

  return (
    <div className="min-h-screen pb-24 bg-[#0f1117] text-slate-100 flex justify-center">
      <div className="w-full max-w-md bg-[#0f1117] flex flex-col min-h-screen border-x border-slate-800/40 relative">

        {/* TOP BAR / HEADER */}
        <header className="sticky top-0 z-30 bg-[#12151e]/95 backdrop-blur-md px-4 py-3 border-b border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <div>
              <h1 className="text-base font-bold tracking-tight text-white leading-none">
                To' Rico Market
              </h1>
              <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Ciego de Ávila
              </span>
            </div>
          </div>

          <button 
            onClick={() => setModalAbierto(true)}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 active:scale-95 transition-all"
          >
            + Afiliar Negocio
          </button>
        </header>

        {/* BUSCADOR */}
        <div className="px-4 pt-3 pb-2">
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-slate-400 text-sm">🔍</span>
            <input 
              type="text"
              placeholder="Buscar tiendas, productos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-[#181b24] text-sm text-slate-200 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* BANNER PROMOCIONAL / BOTÓN DIRECTO */}
        <div className="px-4 py-2">
          <div 
            onClick={() => setModalAbierto(true)}
            className="cursor-pointer rounded-2xl p-4 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 relative overflow-hidden active:scale-[0.99] transition-transform"
          >
            <div className="absolute right-2 -bottom-2 text-6xl opacity-15 select-none pointer-events-none">
              🛍️
            </div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              Inscripciones Abiertas
            </span>
            <h2 className="text-sm font-bold text-white mt-1.5">
              ¿Quieres vender aquí con tu propio menú?
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Recibe pedidos directos a tu WhatsApp con carrito automático. Toca aquí para afiliarte.
            </p>
          </div>
        </div>

        {/* CATEGORÍAS */}
        <div className="flex gap-2 px-4 py-2 overflow-x-auto hide-scrollbar">
          {categorias.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoria(cat.id)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                categoria === cat.id
                  ? 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-[#181b24] text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* LISTADO DE CATÁLOGOS */}
        <div className="px-4 py-3 flex-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Catálogos Destacados
            </h3>
            <span className="text-[11px] text-slate-500">1 disponible</span>
          </div>

          {/* TARJETA TO' RICO */}
          <div className="card-store rounded-2xl overflow-hidden mb-4">
            <div className="h-28 bg-gradient-to-tr from-slate-900 via-slate-800 to-emerald-950 p-4 flex flex-col justify-between relative border-b border-slate-800">
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-black shadow-sm">
                  ✓ Verificado
                </span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                  ● Domicilio disponible
                </span>
              </div>
              <div className="z-10">
                <span className="text-[11px] text-slate-400">Ciego de Ávila</span>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-1.5">
                    To' Rico <span className="text-xl">😉</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    Alimentos, bebidas frías, combos, artículos de aseo personal y electrodomésticos.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3">
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                  🛵 Envíos rápidos
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                  💳 Transfermóvil
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                  💵 Efectivo
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">/torico</span>
                <a
                  href="/torico"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-black text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all"
                >
                  Ver Menú / Catálogo
                  <span className="text-sm">➔</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL DE AFILIACIÓN (FORMULARIO FORMAL) */}
        {modalAbierto && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="bg-[#141722] border border-slate-800 w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white">Solicitud de Afiliación</h3>
                  <p className="text-xs text-slate-400">Completa tus datos para crear tu catálogo</p>
                </div>
                <button 
                  onClick={() => setModalAbierto(false)}
                  className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-sm"
                >
                  ✕
                </button>
              </div>

              {/* FORMULARIO */}
              <form onSubmit={enviarSolicitud} className="space-y-3 mt-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Nombre y Apellidos:</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Tu nombre completo"
                    value={form.nombreResponsable}
                    onChange={(e) => setForm({...form, nombreResponsable: e.target.value})}
                    className="w-full bg-[#1b1f2d] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Carnet de Identidad:</label>
                  <input 
                    type="text" 
                    required
                    maxLength={11}
                    placeholder="11 dígitos de tu carnet"
                    value={form.carnet}
                    onChange={(e) => setForm({...form, carnet: e.target.value})}
                    className="w-full bg-[#1b1f2d] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Nombre del Negocio:</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ej: Cafetería El Rincón"
                    value={form.nombreNegocio}
                    onChange={(e) => setForm({...form, nombreNegocio: e.target.value})}
                    className="w-full bg-[#1b1f2d] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium
