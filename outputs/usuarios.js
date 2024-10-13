"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarUsuario = exports.eliminarUsuario = exports.buscarUsuarioPorDPI = exports.obtenerUsuarios = exports.agregarUsuario = void 0;
let usuarios = [];
const agregarUsuario = (usuario) => {
    usuarios.push(usuario);
};
exports.agregarUsuario = agregarUsuario;
const obtenerUsuarios = () => {
    return usuarios;
};
exports.obtenerUsuarios = obtenerUsuarios;
const buscarUsuarioPorDPI = (DPI) => {
    return usuarios.find(usuario => usuario.DPI === DPI);
};
exports.buscarUsuarioPorDPI = buscarUsuarioPorDPI;
const eliminarUsuario = (DPI) => {
    usuarios = usuarios.filter(usuario => usuario.DPI !== DPI);
};
exports.eliminarUsuario = eliminarUsuario;
const actualizarUsuario = (DPI, datosActualizados) => {
    const index = usuarios.findIndex(usuario => usuario.DPI === DPI);
    if (index === -1) {
        throw new Error('Usuario no encontrado');
    }
    usuarios[index] = Object.assign(Object.assign({}, usuarios[index]), datosActualizados);
};
exports.actualizarUsuario = actualizarUsuario;
