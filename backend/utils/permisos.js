const PERMISOS_POR_ROL = {
  cliente: ["productos:ver", "yo:ver"],
  editor: ["productos:ver", "productos:crear", "productos:editar", "yo:ver"],
  admin: ["productos:ver", "productos:crear", "productos:editar", "productos:eliminar", "usuarios:ver", "usuarios:cambiar-rol", "yo:ver"]
};
function obtenerPermisos(rol){ return PERMISOS_POR_ROL[rol] || []; }
function tienePermiso(rol, permiso){ return obtenerPermisos(rol).includes(permiso); }
module.exports = { PERMISOS_POR_ROL, obtenerPermisos, tienePermiso };