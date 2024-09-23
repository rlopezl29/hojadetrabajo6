// users.js
let usuarios = [];

const agregarUsuario = (usuario) => {
  usuarios.push(usuario);
};

const obtenerUsuarios = () => {
  return usuarios;
};

const buscarUsuarioPorDPI = (DPI) => {
  return usuarios.find(usuario => usuario.DPI === DPI);
};

const eliminarUsuario = (DPI) => {
  usuarios = usuarios.filter(usuario => usuario.DPI !== DPI);
};

const actualizarUsuario = (DPI, datosActualizados) => {
    const index = usuarios.findIndex(usuario => usuario.DPI === DPI);
    if (index === -1) {
      throw new Error('Usuario no encontrado'); // O maneja de otra forma
    }
    usuarios[index] = { ...usuarios[index], ...datosActualizados };
  };
  
module.exports = {
  agregarUsuario,
  obtenerUsuarios,
  buscarUsuarioPorDPI,
  eliminarUsuario,
  actualizarUsuario
};
