import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FolderPlus, PackagePlus, Trash2, ArrowLeft, Lock, Unlock } from 'lucide-react';

export default function AdminNegocio({ db, actualizarNegocio }) {
  const { slug } = useParams();
  const negocio = db[slug];

  const [pinIngresado, setPinIngresado] = useState('');
  const [autenticado, setAutenticado] = useState(false);

  const [nuevaCat, setNuevaCat] = useState('');
  const [nuevoProd, setNuevoProd] = useState({
    nombre: '',
    categoria: negocio?.categorias[0] || '',
    precio: '',
    descripcion: '',
    imagen: ''
  });

  if (!negocio) return <div className="p-6 text-white text-center">Negocio no encontrado</div>;

  const validarPin = (e) => {
    e.preventDefault();
    if (pinIngresado === (negocio.adminPin || '1234')) {
      setAutenticado(true);
    } else {
      alert("PIN incorrecto");
    }
  };

  if (!autenticado) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-4">
        <div className="bg-[#141418] border border-gray-800 p-6 rounded-2xl w-full max-w-sm text-center">
          <div className="w-12 h-12 bg-yellow-500/10 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3">
            <Lock size={24} />
          </div>
          <h2 className="font-black text-lg">Panel de Administración</h2>
          <p className="text-xs text-gray-400 mb-4">{negocio.nombre}</p>

          <form onSubmit={validarPin} className="flex flex-col gap-3">
            <input
              type="password"
              placeholder="Introduce tu PIN (defecto: 1234)"
              value={pinIngresado}
              onChange={e => setPinIngresado(e.target.value)}
              className="p-3 bg-[#0d0d10] border border-gray-700 rounded-xl text-center text-sm outline-none focus:border-yellow-500 text-white"
            />
            <button type="submit" className="bg-yellow-500 text-black font-extrabold py-3 rounded-xl text-xs uppercase">
              Entrar al Panel
            </button>
            <Link to={`/${slug}`} className="text-xs text-gray-500 mt-2 hover:underline">
              Volver al catálogo
            </Link>
          </form>
        </div>
      </div>
    );
  }

  const agregarCategoria = (e) => {
    e.preventDefault();
    if (!nuevaCat.trim() || negocio.categorias.includes(nuevaCat.trim())) return;
    const actualizadas = [...negocio.categorias, nuevaCat.trim()];
    actualizarNegocio(slug, { ...negocio, categorias: actualizadas });
    setNuevaCat('');
  };

  const agregarProducto = (e) => {
    e.preventDefault();
    if (!nuevoProd.nombre || !nuevoProd.precio) return;
    const p = {
      id: Date.now(),
      nombre: nuevoProd.nombre,
      categoria: nuevoProd.categoria || negocio.categorias[0],
      precio: parseFloat(nuevoProd.precio),
      descripcion: nuevoProd.descripcion,
      disponible: true,
      imagen: nuevoProd.imagen || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80"
    };
    actualizarNegocio(slug, { ...negocio, productos: [p, ...negocio.productos] });
    setNuevoProd({ nombre: '', categoria: negocio.categorias[0] || '', precio: '', descripcion: '', imagen: '' });
  };

  const toggleDisponible = (id) => {
    const prods = negocio.productos.map(p => p.id === id ? { ...p, disponible: !p.disponible } : p);
    actualizarNegocio(slug, { ...negocio, productos: prods });
  };

  const eliminarProducto = (id) => {
    if (confirm("¿Deseas eliminar este producto?")) {
      const prods = negocio.productos.filter(p => p.id !== id);
      actualizarNegocio(slug, { ...negocio, productos: prods });
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-4 max-w-xl mx-auto pb-20">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
        <Link to={`/${slug}`} className="flex items-center gap-1 text-xs text-yellow-400 font-bold">
          <ArrowLeft size={16} /> Ver Catálogo
        </Link>
        <span className="text-xs bg-[#141418] border border-gray-800 px-3 py-1 rounded-full text-gray-300 font-mono">
          {negocio.nombre}
        </span>
      </div>

      <div className="flex flex-col gap-5">
        {/* Añadir Categoría */}
        <div className="bg-[#141418] p-4 rounded-xl border border-gray-800">
          <h2 className="text-yellow-400 font-bold text-sm mb-3 flex items-center gap-2">
            <FolderPlus size={18} /> Añadir Categoría
          </h2>
          <form onSubmit={agregarCategoria} className="flex gap-2">
            <input
              type="text"
              placeholder="Nueva categoría..."
              value={nuevaCat}
              onChange={e => setNuevaCat(e.target.value)}
              className="flex-1 bg-[#0d0d10] border border-gray-700 text-sm rounded-lg px-3 py-2 outline-none focus:border-yellow-500 text-white"
            />
            <button type="submit" className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-lg text-xs uppercase">
              Añadir
            </button>
          </form>
        </div>

        {/* Publicar Producto */}
        <div className="bg-[#141418] p-4 rounded-xl border border-gray-800">
          <h2 className="text-yellow-400 font-bold text-sm mb-3 flex items-center gap-2">
            <PackagePlus size={18} /> Publicar Nuevo Producto
          </h2>
          <form onSubmit={agregarProducto} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Nombre del producto"
              required
              value={nuevoProd.nombre}
              onChange={e => setNuevoProd({...nuevoProd, nombre: e.target.value})}
              className="bg-[#0d0d10] border border-gray-700 text-sm rounded-lg p-2.5 outline-none focus:border-yellow-500 text-white"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Precio CUP"
                required
                value={nuevoProd.precio}
                onChange={e => setNuevoProd({...nuevoProd, precio: e.target.value})}
                className="bg-[#0d0d10] border border-gray-700 text-sm rounded-lg p-2.5 outline-none focus:border-yellow-500 text-white"
              />
              <select
                value={nuevoProd.categoria}
                onChange={e => setNuevoProd({...nuevoProd, categoria: e.target.value})}
                className="bg-[#0d0d10] border border-gray-700 text-sm rounded-lg p-2.5 outline-none focus:border-yellow-500 text-white"
              >
                {negocio.categorias.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <input
              type="text"
              placeholder="Descripción corta"
              value={nuevoProd.descripcion}
              onChange={e => setNuevoProd({...nuevoProd, descripcion: e.target.value})}
              className="bg-[#0d0d10] border border-gray-700 text-sm rounded-lg p-2.5 outline-none focus:border-yellow-500 text-white"
            />
            <input
              type="url"
              placeholder="Enlace de la imagen (URL de internet)"
              value={nuevoProd.imagen}
              onChange={e => setNuevoProd({...nuevoProd, imagen: e.target.value})}
              className="bg-[#0d0d10] border border-gray-700 text-sm rounded-lg p-2.5 outline-none focus:border-yellow-500 text-white"
            />
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg text-sm uppercase">
              Guardar en Catálogo
            </button>
          </form>
        </div>

        {/* Lista de Productos */}
        <div>
          <h3 className="font-bold text-sm text-gray-400 mb-2">Inventario ({negocio.productos.length})</h3>
          <div className="flex flex-col gap-2">
            {negocio.productos.map(p => (
              <div key={p.id} className="bg-[#141418] p-3 rounded-lg flex items-center justify-between border border-gray-800">
                <div>
                  <h4 className="font-semibold text-sm">{p.nombre}</h4>
                  <p className="text-xs text-yellow-400">${p.precio} CUP • {p.categoria}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleDisponible(p.id)}
                    className={`text-xs px-2.5 py-1 rounded font-bold ${
                      p.disponible ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-gray-800 text-gray-400'
                    }`}
                  >
                    {p.disponible ? 'Activo' : 'Agotado'}
                  </button>
                  <button onClick={() => eliminarProducto(p.id)} className="p-1 text-red-500 hover:text-red-400">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
