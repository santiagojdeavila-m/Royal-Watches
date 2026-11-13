export default function ComponentePorRol({ rol, permisos }) {
  if (rol === "admin") { return <section><h2>Panel Admin</h2><p>Puedes crear, editar, eliminar productos y ver usuarios.</p><p>Permisos: {permisos.join(", ")}</p></section>; }
  if (rol === "editor") { return <section><h2>Panel Editor</h2><p>Puedes crear y editar productos, pero no eliminar ni ver usuarios.</p></section>; }
  return <section><h2>Catálogo</h2><p>Solo puedes ver productos.</p></section>;
}