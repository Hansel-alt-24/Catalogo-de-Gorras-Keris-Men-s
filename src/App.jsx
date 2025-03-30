import React, { useState } from 'react';
import './App.css';

const gorrasIniciales = [
  {
    id: 1,
    nombre: "Gorra Negra Clásica",
    descripcion: "Gorra de algodón, ajustable, color negro.",
    precio: "$15",
    estado: "Disponible",
    imagen: "https://via.placeholder.com/200x150?text=Gorra+Negra"
  },
  {
    id: 2,
    nombre: "Gorra Azul Marino",
    descripcion: "Estilo deportivo, tela respirable.",
    precio: "$18",
    estado: "Agotado",
    imagen: "https://via.placeholder.com/200x150?text=Gorra+Azul"
  }
];

function App() {
  const [gorras, setGorras] = useState(gorrasIniciales);
  const [nueva, setNueva] = useState({
    nombre: '', descripcion: '', precio: '', estado: 'Disponible', imagen: ''
  });

  const agregarGorra = () => {
    const nuevaGorra = { ...nueva, id: Date.now() };
    setGorras([...gorras, nuevaGorra]);
    setNueva({ nombre: '', descripcion: '', precio: '', estado: 'Disponible', imagen: '' });
  };

  const marcarAgotado = (id) => {
    setGorras(gorras.map(g => g.id === id ? { ...g, estado: 'Agotado' } : g));
  };

  const eliminarGorra = (id) => {
    setGorras(gorras.filter(g => g.id !== id));
  };

  return (
    <div className="container">
      <h1>Catálogo de Gorras</h1>
      <div className="catalogo">
        {gorras.map(g => (
          <div key={g.id} className="producto">
            <img src={g.imagen} alt={g.nombre} />
            <h2>{g.nombre}</h2>
            <p>{g.descripcion}</p>
            <p className="precio">{g.precio}</p>
            <p className={g.estado === 'Agotado' ? 'agotado' : 'disponible'}>{g.estado}</p>
            {g.estado !== 'Agotado' && (
              <button onClick={() => marcarAgotado(g.id)}>Marcar como Agotado</button>
            )}
            <button onClick={() => eliminarGorra(g.id)} className="eliminar">Eliminar</button>
          </div>
        ))}
      </div>

      <h2>Agregar Nueva Gorra</h2>
      <div className="formulario">
        <input type="text" placeholder="Nombre" value={nueva.nombre} onChange={e => setNueva({ ...nueva, nombre: e.target.value })} />
        <input type="text" placeholder="Descripción" value={nueva.descripcion} onChange={e => setNueva({ ...nueva, descripcion: e.target.value })} />
        <input type="text" placeholder="Precio" value={nueva.precio} onChange={e => setNueva({ ...nueva, precio: e.target.value })} />
        <input type="text" placeholder="URL de Imagen" value={nueva.imagen} onChange={e => setNueva({ ...nueva, imagen: e.target.value })} />
        <select value={nueva.estado} onChange={e => setNueva({ ...nueva, estado: e.target.value })}>
          <option>Disponible</option>
          <option>Agotado</option>
        </select>
        <button onClick={agregarGorra}>Agregar Gorra</button>
      </div>
    </div>
  );
}

export default App;
