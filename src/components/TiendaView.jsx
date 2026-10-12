import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, X, Send, Store, Lock } from 'lucide-react';

export default function TiendaView({ db }) {
  const { slug } = useParams();
  const negocio = db[slug];

  if (!negocio) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#09090b] text-white">
        <h1 className="text-xl font-bold text-red-500 mb-2">Catálogo no disponible</h1>
        <p className="text-gray-400 text-xs mb-6">El enlace no corresponde a ningún negocio activo en la plataforma.</p>
        <Link to="/" className="bg-[#141418] border border-gray-700 px-4 py-2 rounded-xl text-xs font-bold text-gray-200">Volver al Inicio</Link>
      </div>
    );
  }

  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [carrito, setCarrito] = useState({});
  const [modalAbierto, setModalAbierto] = useState(false);
  const [cliente, setCliente] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    repartoIndex: 0,
    metodoPago: 'Efectivo contra entrega',
    notas: ''
  });

  const agregarAlCarrito = (id) => {
    setCarrito(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const quitarDelCarrito = (id) => {
    setCarrito(prev => {
      const nuevo = { ...prev };
      if (nuevo[id] > 1) nuevo[id] -= 1;
      else delete nuevo[id];
      return nuevo;
    });
  };

  const totalUnidades = Object.values(carrito).reduce((acc, q) => acc + q, 0);
  const subtotal = Object.entries(carrito).reduce((acc, [id, qty]) => {
    const prod = negocio.productos.find(p => p.id === parseInt(id));
    return acc + (prod ? prod.precio * qty : 0);
  }, 0);

  const costoEnvio = negocio.repartos[cliente.repartoIndex]?.costo || 0;
  const totalFinal = subtotal + costoEnvio;

  const enviarWhatsApp = (e) => {
    e.preventDefault();
    if (!cliente.nombre || !cliente.direccion || !cliente.telefono) {
      alert("Por favor completa los datos requeridos.");
      return;
    }
    let lista = "";
    Object.entries(carrito).forEach(([id, qty]) => {
      const p = negocio.productos.find(x => x.id === parseInt(id));
      if (p) lista += `• ${qty}x ${p.nombre} - $${p.precio * qty} CUP\n`;
    });
    const zona = negocio.repartos[cliente.repartoIndex]?.nombre || "Entrega";
    const msg = 
`🛒 *NUEVO PEDIDO: ${negocio.nombre}*
----------------------------------------
👤 *Cliente:* ${cliente.nombre}
📞 *Teléfono:* ${cliente.telefono}
📍 *Dirección:* ${cliente.direccion} (${zona})
${cliente.notas ? `📝 *Nota:* ${cliente.notas}\n` : ""}
💳 *Pago:* ${cliente.metodoPago}
----------------------------------------
📦 *PRODUCTOS:*
${lista}
💰 *Subtotal:* $${subtotal} CUP
🛵 *Envío:* $${costoEnvio} CUP
💵 *TOTAL A PAGAR:* $${totalFinal} CUP
----------------------------------------
_Generado desde la plataforma web_`;

    window.open(`https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const productosFiltrados = categoriaActiva === 'Todos'
    ? negocio.productos
    : negocio.productos.filter(p => p.categoria === categoriaActiva);

  return (
    <div className="min-h-screen text-gray-100 pb-28" style={{ backgroundColor: negocio.tema?.fondo || '#0b0b0e' }}>
      {/* Header */}
      <header className="sticky top-0 z-30 px-4 py-3 shadow-md flex items-center justify-between border-b border-white/10" style={{ backgroundColor: negocio.tema?.card || '#141418' }}>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg font-bold" style={{ backgroundColor: negocio.tema?.primario || '#dc2626', color: '#fff' }}>
            <Store size={20} />
          </div>
          <div>
            <h1 className="font-black text-lg leading-tight text-white">{negocio.nombre}</h1>
            <p className="text-xs font-semibold" style={{ color: negocio.tema?.acento || '#eab308' }}>{negocio.descripcion}</p>
          </div>
        </div>
        <Link to={`/admin/${negocio.slug}`} className="text-xs font-bold text-gray-400 hover:text-white px-2.5 py-1.5 bg-white/5 rounded-lg border border-white/10 flex items-center gap-1">
          <Lock size={12} /> Admin
        </Link>
      </header>

      {/* Categorías */}
      <nav className="sticky top-[57px] z-20 px-3 py-2.5 flex gap-2 overflow-x-auto no-scrollbar border-b border-white/5" style={{ backgroundColor: negocio.tema?.card || '#141418' }}>
        {['Todos', ...negocio.categorias].map(cat => (
          <button
            key={cat}
            onClick={() => setCategoriaActiva(cat)}
            className="px-4 py-1.5 rounded-full text-xs font-bold uppercase transition"
            style={{
              backgroundColor: categoriaActiva === cat ? (negocio.tema?.primario || '#dc2626') : 'rgba(255,255,255,0.06)',
              color: '#ffffff'
            }}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Grid Productos */}
      <main className="p-4 grid grid-cols-2 gap-3 max-w-2xl mx-auto">
        {productosFiltrados.map(prod => {
          const qty = carrito[prod.id] || 0;
          return (
            <div key={prod.id} className="rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between shadow-lg" style={{ backgroundColor: negocio.tema?.card || '#141418' }}>
              <div className="relative">
                <img src={prod.imagen} alt={prod.nombre} className="h-32 w-full object-cover" />
                {!prod.disponible && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center font-bold text-xs uppercase text-red-400">
                    Agotado
                  </div>
                )}
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-sm line-clamp-1">{prod.nombre}</h3>
                  <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{prod.descripcion}</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-black text-sm" style={{ color: negocio.tema?.acento || '#eab308' }}>
                    ${prod.precio} <span className="text-[10px] text-gray-400">CUP</span>
                  </span>
                  {prod.disponible && (
                    qty === 0 ? (
                      <button
                        onClick={() => agregarAlCarrito(prod.id)}
                        className="p-1.5 text-white rounded-lg active:scale-95"
                        style={{ backgroundColor: negocio.tema?.primario || '#dc2626' }}
                      >
                        <Plus size={16} />
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 bg-black/40 p-0.5 rounded-lg border border-white/10">
                        <button onClick={() => quitarDelCarrito(prod.id)} className="p-1 rounded text-gray-300">
                          <Minus size={13} />
                        </button>
                        <span className="text-xs font-bold px-1">{qty}</span>
                        <button
                          onClick={() => agregarAlCarrito(prod.id)}
                          className="p-1 rounded text-white"
                          style={{ backgroundColor: negocio.tema?.primario || '#dc2626' }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </main>

      {/* Botón Flotante Carrito */}
      {totalUnidades > 0 && (
        <div className="fixed bottom-4 left-0 right-0 px-4 z-40 max-w-md mx-auto">
          <button
            onClick={() => setModalAbierto(true)}
            className="w-full text-white p-3.5 rounded-2xl font-bold shadow-xl flex items-center justify-between active:scale-[0.98] transition"
            style={{ backgroundColor: negocio.tema?.primario || '#dc2626' }}
          >
            <div className="flex items-center gap-2">
              <ShoppingCart size={20} />
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{totalUnidades}</span>
            </div>
            <span className="text-sm font-black">${subtotal} CUP • Pedir por WhatsApp</span>
          </button>
        </div>
      )}

      {/* Modal Checkout */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end flex-col">
          <div className="rounded-t-3xl max-h-[90vh] overflow-y-auto p-5 border-t border-white/10" style={{ backgroundColor: negocio.tema?.card || '#141418' }}>
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h2 className="font-bold text-base text-white">Datos de Entrega</h2>
              <button onClick={() => setModalAbierto(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={enviarWhatsApp} className="flex flex-col gap-3 mt-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Nombre y Apellidos *</label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre completo"
                  value={cliente.nombre}
                  onChange={e => setCliente({...cliente, nombre: e.target.value})}
                  className="w-full mt-1 p-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Teléfono de contacto *</label>
                <input
                  type="tel"
                  required
                  placeholder="53XXXXXX"
                  value={cliente.telefono}
                  onChange={e => setCliente({...cliente, telefono: e.target.value})}
                  className="w-full mt-1 p-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Dirección exacta *</label>
                <input
                  type="text"
                  required
                  placeholder="Calle, Entrecalle y Número"
                  value={cliente.direccion}
                  onChange={e => setCliente({...cliente, direccion: e.target.value})}
                  className="w-full mt-1 p-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase">Zona / Reparto</label>
                <select
                  value={cliente.repartoIndex}
                  onChange={e => setCliente({...cliente, repartoIndex: parseInt(e.target.value)})}
                  className="w-full mt-1 p-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white outline-none"
                >
                  {negocio.repartos.map((r, i) => (
                    <option key={i} value={i} className="bg-gray-900">{r.nombre} (+${r.costo} CUP)</option>
                  ))}
                </select>
              </div>

              <div className="bg-black/30 p-3.5 rounded-xl border border-white/10 text-sm mt-1">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal:</span>
                  <span>${subtotal} CUP</span>
                </div>
                <div className="flex justify-between text-gray-400 mt-1">
                  <span>Envío:</span>
                  <span>${costoEnvio} CUP</span>
                </div>
                <div className="flex justify-between font-black text-white border-t border-white/10 pt-2 mt-2 text-base">
                  <span>Total general:</span>
                  <span style={{ color: negocio.tema?.acento || '#eab308' }}>${totalFinal} CUP</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 mt-2 uppercase tracking-wide active:scale-[0.98] transition"
                style={{ backgroundColor: negocio.tema?.primario || '#dc2626' }}
              >
                <Send size={18} />
                <span>Confirmar Pedido por WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
