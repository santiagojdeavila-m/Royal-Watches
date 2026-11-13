import { useState } from "react";
import ComponentePorRol from "./ComponentePorRol.jsx";
const API_URL = "http://localhost:4000/api";
export default function App() {
  const [correo, setCorreo] = useState("ana@prueba.com");
  const [password, setPassword] = useState("clave12345");
  const [sesion, setSesion] = useState(null);
  const [resultado, setResultado] = useState("");
  async function iniciarSesion(e) {
    e.preventDefault();
    const res = await fetch(`${API_URL}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ correo, password }) });
    const datos = await res.json();
    if (!res.ok) { setResultado(`Login: ${res.status} - ${datos.mensaje}`); return; }
    const resYo = await fetch(`${API_URL}/auth/yo`, { headers: { Authorization: `Bearer ${datos.token}` } });
    const datosYo = await resYo.json();
    setSesion({ token: datos.token, usuario: datos.usuario, permisos: datosYo.permisos || [] });
    setResultado(`Login OK: ${res.status} - rol ${datos.usuario.rol}`);
  }
  async function intentar(accion) {
    let url = `${API_URL}/productos`;
    let opciones = { headers: {} };
    if (sesion?.token) { opciones.headers.Authorization = `Bearer ${sesion.token}`; }
    if (accion === "crear") { opciones.method = "POST"; opciones.headers["Content-Type"] = "application/json"; opciones.body = JSON.stringify({ nombre: "Prueba React", marca: "Test", precio: 100, imagen: "img/img-catalogo/Rolex_Submariner.png" }); }
    if (accion === "ver-usuarios") { url = `${API_URL}/usuarios`; }
    if (accion === "yo") { url = `${API_URL}/auth/yo`; }
    const res = await fetch(url, opciones);
    const texto = await res.text();
    setResultado(`${accion}: ${res.status} - ${texto.slice(0, 400)}`);
  }
  return (
    <main style={{ fontFamily: "sans-serif", padding: "24px", maxWidth: "700px" }}>
      <h1>Prueba de permisos - Royal Watches</h1>
      <form onSubmit={iniciarSesion}>
        <input value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
        <button type="submit">Iniciar sesión</button>
      </form>
      {sesion && <ComponentePorRol rol={sesion.usuario.rol} permisos={sesion.permisos} />}
      {sesion && (
        <section>
          <p>Hola, {sesion.usuario.nombre} - Rol: {sesion.usuario.rol}</p>
          <p>Permisos: {sesion.permisos.join(", ")}</p>
          {sesion.permisos.includes("productos:crear") && <button onClick={() => intentar("crear")}>Crear producto (solo si tienes permiso)</button>}
          <button onClick={() => intentar("ver-usuarios")}>Intentar ver usuarios</button>
          <button onClick={() => intentar("yo")}>Ver mi perfil y permisos</button>
          <button onClick={() => { setSesion(null); setResultado("Sesión cerrada"); }}>Cerrar sesión</button>
        </section>
      )}
      {!sesion && <button onClick={() => intentar("crear")}>Intentar crear sin sesión (debe dar 401)</button>}
      <pre style={{ background: "#111", color: "#0f0", padding: "12px", whiteSpace: "pre-wrap" }}>{resultado}</pre>
    </main>
  );
}