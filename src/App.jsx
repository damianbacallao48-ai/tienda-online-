import React, { useState } from 'react'

export default function App() {
  const [categoria, setCategoria] = useState('todos')
  const [busqueda, setBusqueda] = useState('')

  const categorias = [
    { id: 'todos', label: '🔥 Todos' },
    { id: 'alimentos', label: '🛒 Alimentos' },
    { id: 'bebidas', label: '🥤 Bebidas' },
    { id: 'aseo', label: '🧼 Aseo Personal' },
    { id: 'hogar', label: '⚡ Electrodomésticos' },
  ]

  return (
    <div className="min-h-screen pb-24 bg-[#0f1117] text-slate-100 flex justify-center">
      <div className="w-full max-w-md bg-[#0f1117] flex flex-col min-h-screen border-x border-slate-800/40">

        {/* TOP BAR / HEADER ESTILO APP */}
        <header className="sticky top-0 z-30 bg-[#12151e]/95 backdrop-blur-md px-4 py-3 border-b border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <div>
              <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5 leading-none">
                To' Rico Market
              </h1>
              <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Ciego de Ávila
              </span>
            </div>
          </div>

          <button 
            onClick={() => alert("Próximamente: Afiliación de nuevos negocios")}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 active:scale-95 transition-all"
          >
            + Afiliar
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

        {/* BANNER PROMOCIONAL / AFILIACIÓN */}
        <div className="px-4 py-2">
          <div className="rounded-2xl p-4 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 relative overflow-hidden">
            <div className="absolute right-2 -bottom-2 text-6xl opacity-15 select-none pointer-events-none">
              🛍️
            </div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              Directo a WhatsApp
            </span>
            <h2 className="text-sm font-bold text-white mt-1.5">
              Tu catálogo online en minutos
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Optimizado para datos móviles. Sin comisiones.
            </p>
          </div>
        </div>

        {/* CATEGORÍAS (SCROLL HORIZONTAL) */}
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

        {/* LISTADO DE CATÁLOGOS / TIENDAS */}
        <div className="px-4 py-3 flex-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Catálogos Destacados
            </h3>
            <span className="text-[11px] text-slate-500">1 disponible</span>
          </div>

          {/* TARJETA TO' RICO */}
          <div className="card-store rounded-2xl overflow-hidden mb-4">
            {/* Cabecera / Portada */}
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

            {/* Contenido de la tienda */}
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

              {/* Tags de servicios */}
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

              {/* Botón de Entrada al Catálogo */}
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

        {/* BOTTOM NAVIGATION FIJA (ESTILO APP MÓVIL) */}
        <nav className="fixed bottom-0 max-w-md w-full bg-[#12151e]/95 backdrop-blur-lg border-t border-slate-800/80 px-6 py-2.5 flex items-center justify-around z-30">
          <button className="flex flex-col items-center text-emerald-400 gap-0.5">
            <span className="text-lg">🏪</span>
            <span className="text-[10px] font-bold">Catálogos</span>
          </button>
          <a href="/torico" className="flex flex-col items-center text-slate-400 hover:text-white gap-0.5">
            <span className="text-lg">🛍️</span>
            <span className="text-[10px] font-medium">To' Rico</span>
          </a>
          <button 
            onClick={() => alert("Contáctanos por WhatsApp")}
            className="flex flex-col items-center text-slate-400 hover:text-white gap-0.5"
          >
            <span className="text-lg">💬</span>
            <span className="text-[10px] font-medium">Soporte</span>
          </button>
        </nav>

      </div>
    </div>
  )
}
