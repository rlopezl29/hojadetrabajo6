"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const usuarios_1 = require("./usuarios");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
const generarToken = (usuario) => {
    return jsonwebtoken_1.default.sign({ DPI: usuario.DPI, nombre: usuario.nombre }, process.env.CLAVE, { expiresIn: process.env.TIEMPO });
};
const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(403).json({ error: 'Token requerido' });
        return;
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(403).json({ error: 'Token no proporcionado' });
        return;
    }
    jsonwebtoken_1.default.verify(token, process.env.CLAVE, (err, decoded) => {
        if (err) {
            res.status(401).json({ error: 'Token inválido o expirado' });
            return;
        }
        req.usuario = decoded;
        next();
    });
};
app.post('/login', (req, res) => {
    const { DPI, contraseña } = req.body;
    const usuario = (0, usuarios_1.buscarUsuarioPorDPI)(DPI);
    if (!usuario || usuario.contraseña !== contraseña) {
        res.status(401).json({ error: 'Credenciales inválidas' });
        return;
    }
    const token = generarToken(usuario);
    res.json({ token });
});
app.get('/usuarios', verificarToken, (req, res) => {
    const usuarios = (0, usuarios_1.obtenerUsuarios)();
    res.json(usuarios);
});
app.post('/usuarios', (req, res) => {
    const { DPI, nombre, correo, contraseña } = req.body;
    if ((0, usuarios_1.buscarUsuarioPorDPI)(DPI)) {
        res.status(400).json({ error: 'El usuario con este DPI ya existe' });
        return;
    }
    const nuevoUsuario = { DPI, nombre, correo, contraseña };
    (0, usuarios_1.agregarUsuario)(nuevoUsuario);
    res.status(201).json({ message: 'Usuario creado con éxito', usuario: nuevoUsuario });
});
app.put('/usuarios/:DPI', verificarToken, (req, res) => {
    const { DPI } = req.params;
    const { nombre, correo, contraseña } = req.body;
    const usuario = (0, usuarios_1.buscarUsuarioPorDPI)(DPI);
    if (!usuario) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
    }
    (0, usuarios_1.actualizarUsuario)(DPI, { nombre, correo, contraseña });
    res.json({ message: 'Usuario actualizado con éxito' });
});
app.delete('/usuarios/:DPI', verificarToken, (req, res) => {
    const { DPI } = req.params;
    const usuario = (0, usuarios_1.buscarUsuarioPorDPI)(DPI);
    if (!usuario) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
    }
    (0, usuarios_1.eliminarUsuario)(DPI);
    res.json({ message: 'Usuario eliminado con éxito' });
});
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
