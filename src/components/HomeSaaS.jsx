import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Store, PlusCircle, ArrowUpRight, Shield, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HomeSaaS({ db, registrarNegocio }) {
  const [modalRegistro, setModalRegistro] = useState(false);
  const [nuevo, setNuevo] = useState({
    nombre: '',
    slug: '',
    whatsapp: '',
    descripcion: '',
    adminPin: '1234'
  });

  const crearNegocio = (e) => {
    e.preventDefault();
    if (!nuevo.nombre || !nuevo.slug || !nuevo.whatsapp) return;
    const cleanSlug = nuevo.slug.toLowerCase().trim().replace(/[^a-z0-9]/g, '-');
    if (db[cleanSlug]) {
      alert("Ese enlace corto ya existe. Elige otro.");
      return;
    }

    registrarNegocio(cleanSlug, {
      slug: cleanSlug,
      nombre: nuevo.nombre,
      descripcion: nuevo.descripcion || "Catálogo digital",
      whatsapp: nuevo.whatsapp,
      adminPin: nuevo.adminPin || "1234",
      activo: true, // Cambia a false si prefieres activarlos solo tras pago
      tema: {
        fondo: "#0b0b0e",
        card: "#141418",
        primario: "#dc2626",
        acento: "#eab308"
      },
      repartos: [{ nombre: "Ciego de Ávila (Centro)", costo: 200 }],
      categorias: ["General"],
      productos: []
    });

    setModalRegistro(false);
    setNuevo({ nombre: '', slug: '', whatsapp: '', descripcion: '', adminPin: '1234' });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-gray-100 flex flex-col items-center px-4 py-8">
      <header className="w-full max-w-lg text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold tracking-wide mb-3">
          <Sparkles size={14} /> Red Comercial de Ciego de Ávila
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
          Menús Digitales con <br />
          <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
            Pedidos por WhatsApp
          </span>
        </h1>

        <p className="mt-3 text-sm text-gray-400 max-w-md leading-relaxed">
          Tu propio enlace web con carrito optimizado para datos móviles. Sin intermediarios, directo al WhatsApp de tu negocio.
        </p>

        <button
          onClick={() => setModalRegistro(true)}
          className="mt-6 w-full max-w-xs bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black py-3.5 px-6 rounded-2xl shadow-xl shadow-red-950/60 flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition active:scale-95"
        >
          <PlusCircle size={18} /> Afiliar Nuevo Negocio
        </button>
      </header>

      {/* Directorio de Negocios */}
      <section className="w-full max-w-lg mt-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">Negocios Activos</h2>
          <span className="text-xs bg-[#1a1a20] border border-gray-800 text-yellow-400 font-mono px-2.5 py-0.5 rounded-full">
            {Object.keys(db).length} tiendas
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {Object.values(db).map(negocio => (
            <div
              key={negocio.slug}
              className="bg-[#131317] border border-gray-800 hover:border-gray-700 p-4 rounded-2xl flex items-center justify-between transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/5 border border-yellow-500/20 flex items-center justify-center text-yellow-400 shrink-0">
                  <Store size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">{negocio.nombre}</h3>
                  <p className="text-xs text-gray-400 line-clamp-1">{negocio.descripcion}</p>
                  <span className="text-[11px] font-mono text-gray-500">/{negocio.slug}</span>
                </div>
              </div>

              <Link
                to={`/${negocio.slug}`}
                className="shrink-0 ml-2 bg-white/5 hover:bg-yellow-500 hover:text-black border border-white/10 text-gray-300 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 transition"
              >
                <span>Ver Tienda</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Registro */}
      {modalRegistro && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#141418] border border-gray-800 rounded-t-3xl sm:rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-black text-white">Crear Catálogo de Negocio</h2>
            <p className="text-xs text-gray-400 mt-1 mb-4">Configura los datos base de tu comercio.</p>

            <form onSubmit={crearNegocio} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-bold text-gray-300">Nombre del negocio *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Cafetería El Rápido"
                  value={nuevo.nombre}
                  onChange={e => setNuevo({...nuevo, nombre: e.target.value})}
                  className="w-full mt-1 p-3 bg-[#0d0d10] border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300">Enlace web corto (slug) *</label>
                <div className="flex items-center mt-1 bg-[#0d0d10] border border-gray-700 rounded-xl px-3 focus-within:border-yellow-500">
                  <span className="text-xs text-gray-500 font-mono">sitio.com/</span>
                  <input
                    type="text"
                    required
                    placeholder="el-rapido"
                    value={nuevo.slug}
                    onChange={e => setNuevo({...nuevo, slug: e.target.value})}
                    className="w-full p-3 bg-transparent text-sm text-white placeholder-gray-500 outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300">Número de WhatsApp (con código 53) *</label>
                <input
                  type="tel"
                  required
                  placeholder="5358XXXXXX"
                  value={nuevo.whatsapp}
                  onChange={e => setNuevo({...nuevo, whatsapp: e.target.value})}
                  className="w-full mt-1 p-3 bg-[#0d0d10] border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300">PIN de Administrador (para gestionar productos) *</label>
                <input
                  type="password"
                  required
                  placeholder="Ej: 1234"
                  value={nuevo.adminPin}
                  onChange={e => setNuevo({...nuevo, adminPin: e.target.value})}
                  className="w-full mt-1 p-3 bg-[#0d0d10] border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300">Descripción breve</label>
                <input
                  type="text"
                  placeholder="Ej: Dulces finos, refrescos y pizzas"
                  value={nuevo.descripcion}
                  onChange={e => setNuevo({...nuevo, descripcion: e.target.value})}
                  className="w-full mt-1 p-3 bg-[#0d0d10] border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:border-yellow-500"
                />
              </div>

              <div className="flex gap-2.5 mt-3">
                <button
                  type="button"
                  onClick={() => setModalRegistro(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-3 rounded-xl text-xs uppercase"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-black py-3 rounded-xl text-xs uppercase shadow-md transition"
                >
                  Crear Catálogo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
