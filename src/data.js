export const NEGOCIOS_SEMILLA = {
  "torico": {
    slug: "torico",
    nombre: "To' Rico 😉",
    descripcion: "Alimentos, bebidas, aseo personal y electrodomésticos",
    whatsapp: "5358960660",
    adminPin: "1234",
    activo: true,
    tema: {
      fondo: "#0b0b0e",
      card: "#141418",
      primario: "#dc2626",
      acento: "#eab308"
    },
    repartos: [
      { nombre: "Ciego de Ávila (Centro)", costo: 200 },
      { nombre: "Reparto Vista Alegre", costo: 250 },
      { nombre: "Canaleta / Aeropuerto", costo: 300 },
      { nombre: "Ortiz / Ceballos", costo: 450 },
      { nombre: "Morón (Intermunicipal)", costo: 850 },
      { nombre: "Recogida personal", costo: 0 }
    ],
    categorias: ["Alimentos", "Bebidas", "Aseo personal", "Electrodomésticos"],
    productos: [
      {
        id: 1,
        nombre: "Cerveza Cristal Fría",
        categoria: "Bebidas",
        precio: 350,
        disponible: true,
        descripcion: "Lata 355ml fría",
        imagen: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&q=80"
      },
      {
        id: 2,
        nombre: "Arroz Criollo Especial (5 lb)",
        categoria: "Alimentos",
        precio: 1100,
        disponible: true,
        descripcion: "Grano largo seleccionado",
        imagen: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80"
      },
      {
        id: 3,
        nombre: "Desodorante Rexona Clinical",
        categoria: "Aseo personal",
        precio: 950,
        disponible: true,
        descripcion: "Barra protección 48h",
        imagen: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80"
      },
      {
        id: 4,
        nombre: "Olla Arrocera Eléctrica 1.8L",
        categoria: "Electrodomésticos",
        precio: 8500,
        disponible: true,
        descripcion: "Con vaporera y teflón antiadherente",
        imagen: "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=400&q=80"
      }
    ]
  }
};
