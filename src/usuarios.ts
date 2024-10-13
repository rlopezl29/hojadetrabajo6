interface Usuario {
    DPI: string;
    nombre: string;
    correo: string;
    contraseña: string;
  }
  
  let usuarios: Usuario[] = [];
  
  export const agregarUsuario = (usuario: Usuario): void => {
    usuarios.push(usuario);
  };
  
  export const obtenerUsuarios = (): Usuario[] => {
    return usuarios;
  };
  
  export const buscarUsuarioPorDPI = (DPI: string): Usuario | undefined => {
    return usuarios.find(usuario => usuario.DPI === DPI);
  };
  
  export const eliminarUsuario = (DPI: string): void => {
    usuarios = usuarios.filter(usuario => usuario.DPI !== DPI);
  };
  
  export const actualizarUsuario = (DPI: string, datosActualizados: Partial<Usuario>): void => {
    const index = usuarios.findIndex(usuario => usuario.DPI === DPI);
    if (index === -1) {
      throw new Error('Usuario no encontrado');
    }
    usuarios[index] = { ...usuarios[index], ...datosActualizados };
  };
  