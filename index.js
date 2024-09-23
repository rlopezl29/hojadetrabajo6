const express = require('express');
const { agregarUsuario, obtenerUsuarios, buscarUsuarioPorDPI, eliminarUsuario, actualizarUsuario } = require('./usuarios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// POST /usuarios: Crear un nuevo usuario
app.post('/usuarios', (req, res) => {
  const { DPI, nombre, correo, contraseña } = req.body; // Cambiamos las variables a español

  if (buscarUsuarioPorDPI(DPI)) {
    return res.status(400).json({ error: 'El usuario con este DPI ya existe' });
  }

  const nuevoUsuario = { DPI, nombre, correo, contraseña }; // Cambiamos las variables a español
  agregarUsuario(nuevoUsuario);
  res.status(201).json({ message: 'Usuario creado con éxito', usuario: nuevoUsuario });
});

// GET /usuarios: Listar todos los usuarios registrados
app.get('/usuarios', (req, res) => {
  const usuarios = obtenerUsuarios();
  res.json(usuarios);
});

// PUT /usuarios/:DPI: Actualizar un usuario existente
app.put('/usuarios/:DPI', (req, res) => {
  const { DPI } = req.params;
  const { nombre, correo, contraseña } = req.body; // Cambiamos las variables a español

  const usuario = buscarUsuarioPorDPI(DPI);
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  // Validar si se intenta cambiar el DPI a uno ya existente
  if (req.body.DPI && req.body.DPI !== DPI && buscarUsuarioPorDPI(req.body.DPI)) {
    return res.status(400).json({ error: 'El nuevo DPI ya está registrado' });
  }

  actualizarUsuario(DPI, { nombre, correo, contraseña }); // Cambiamos las variables a español
  res.json({ message: 'Usuario actualizado con éxito' });
});

// DELETE /usuarios/:DPI: Eliminar un usuario
app.delete('/usuarios/:DPI', (req, res) => {
  const { DPI } = req.params;

  const usuario = buscarUsuarioPorDPI(DPI);
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  eliminarUsuario(DPI);
  res.json({ message: 'Usuario eliminado con éxito' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
