const express = require('express');
const jwt = require('jsonwebtoken'); 
const { agregarUsuario, obtenerUsuarios, buscarUsuarioPorDPI, eliminarUsuario, actualizarUsuario } = require('./usuarios');
const app = express();
require('dotenv').config(); 

const port = process.env.PORT;
app.use(express.json());

const generarToken = (usuario) => {
  return jwt.sign({ DPI: usuario.DPI, nombre: usuario.nombre }, process.env.CLAVE, { expiresIn: process.env.TIEMPO });
};


const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; 
  
  if (!authHeader) {
    return res.status(403).json({ error: 'Token requerido' });
  }

  const token = authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.CLAVE, (err, decoded) => { 
    if (err) {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }
    req.usuario = decoded; 
    next();
  });
};


app.post('/login', (req, res) => {
  const { DPI, contraseña } = req.body;
  const usuario = buscarUsuarioPorDPI(DPI);

  if (!usuario || usuario.contraseña !== contraseña) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = generarToken(usuario);
  res.json({ token });
});

app.get('/usuarios', verificarToken, (req, res) => {
  const usuarios = obtenerUsuarios();
  res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
  const { DPI, nombre, correo, contraseña } = req.body; 

  if (buscarUsuarioPorDPI(DPI)) {
    return res.status(400).json({ error: 'El usuario con este DPI ya existe' });
  }

  const nuevoUsuario = { DPI, nombre, correo, contraseña }; 
  agregarUsuario(nuevoUsuario);
  res.status(201).json({ message: 'Usuario creado con éxito', usuario: nuevoUsuario });
});


app.put('/usuarios/:DPI', verificarToken, (req, res) => {
  const { DPI } = req.params;
  const { nombre, correo, contraseña } = req.body;

  const usuario = buscarUsuarioPorDPI(DPI);
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  actualizarUsuario(DPI, { nombre, correo, contraseña });
  res.json({ message: 'Usuario actualizado con éxito' });
});

app.delete('/usuarios/:DPI', verificarToken, (req, res) => {
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
