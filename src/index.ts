import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { agregarUsuario, obtenerUsuarios, buscarUsuarioPorDPI, eliminarUsuario, actualizarUsuario } from './usuarios'

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

const generarToken = (usuario: { DPI: string, nombre: string }): string => {
  return jwt.sign({ DPI: usuario.DPI, nombre: usuario.nombre }, process.env.CLAVE as string, { expiresIn: process.env.TIEMPO });
};

const verificarToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
  
    if (!authHeader) {
      return res.status(403).json({ error: 'Token requerido' });
    }
  
    const token = authHeader.split(' ')[1]; // Asegúrate de separar correctamente el token después de "Bearer"
  
    if (!token) {
      return res.status(403).json({ error: 'Token no proporcionado' });
    }
  
    jwt.verify(token, process.env.CLAVE as string, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
      }
      req.usuario = decoded as { DPI: string, nombre: string };
      next();
    });
  };
  

app.post('/login', (req: Request, res: Response) => {
  const { DPI, contraseña } = req.body;
  const usuario = buscarUsuarioPorDPI(DPI);

  if (!usuario || usuario.contraseña !== contraseña) {
    res.status(401).json({ error: 'Credenciales inválidas' });
    return;
  }

  const token = generarToken(usuario);
  res.json({ token });
});

app.get('/usuarios', verificarToken, (req: Request, res: Response) => {
  const usuarios = obtenerUsuarios();
  res.json(usuarios);
});

app.post('/usuarios', (req: Request, res: Response) => {
  const { DPI, nombre, correo, contraseña } = req.body;

  if (buscarUsuarioPorDPI(DPI)) {
    res.status(400).json({ error: 'El usuario con este DPI ya existe' });
    return;
  }

  const nuevoUsuario = { DPI, nombre, correo, contraseña };
  agregarUsuario(nuevoUsuario);
  res.status(201).json({ message: 'Usuario creado con éxito', usuario: nuevoUsuario });
});

app.put('/usuarios/:DPI', verificarToken, (req: Request, res: Response) => {
  const { DPI } = req.params;
  const { nombre, correo, contraseña } = req.body;

  const usuario = buscarUsuarioPorDPI(DPI);
  if (!usuario) {
    res.status(404).json({ error: 'Usuario no encontrado' });
    return;
  }

  actualizarUsuario(DPI, { nombre, correo, contraseña });
  res.json({ message: 'Usuario actualizado con éxito' });
});

app.delete('/usuarios/:DPI', verificarToken, (req: Request, res: Response) => {
  const { DPI } = req.params;

  const usuario = buscarUsuarioPorDPI(DPI);
  if (!usuario) {
    res.status(404).json({ error: 'Usuario no encontrado' });
    return;
  }

  eliminarUsuario(DPI);
  res.json({ message: 'Usuario eliminado con éxito' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
