import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NEGOCIOS_SEMILLA } from './data';
import HomeSaaS from './components/HomeSaaS';
import TiendaView from './components/TiendaView';
import AdminNegocio from './components/AdminNegocio';

export default function App() {
  const [db, setDb] = useState(() => {
    const local = localStorage.getItem('saas_cuba_negocios');
    return local ? JSON.parse(local) : NEGOCIOS_SEMILLA;
  });

  useEffect(() => {
    localStorage.setItem('saas_cuba_negocios', JSON.stringify(db));
  }, [db]);

  const registrarNegocio = (slug, datos) => {
    setDb(prev => ({ ...prev, [slug]: datos }));
  };

  const actualizarNegocio = (slug, datosActualizados) => {
    setDb(prev => ({ ...prev, [slug]: datosActualizados }));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeSaaS db={db} registrarNegocio={registrarNegocio} />} />
        <Route path="/:slug" element={<TiendaView db={db} />} />
        <Route path="/admin/:slug" element={<AdminNegocio db={db} actualizarNegocio={actualizarNegocio} />} />
      </Routes>
    </BrowserRouter>
  );
}
