# API de Gestión de Usuarios con Autenticación JWT

Esta API permite gestionar usuarios utilizando autenticación JWT. Los usuarios pueden autenticarse para obtener un token y acceder a las rutas protegidas. Las funciones principales incluyen la creación, lectura, actualización y eliminación (CRUD) de usuarios.

## Instrucciones para ejecutar la API localmente

Sigue estos pasos para ejecutar la API en tu máquina local:

1. **Clonar el repositorio:**

git clone https://github.com/rlopezl29/hojadetrabajo6.git

2. **Cambiar a la rama `jwt`:**

Asegúrate de estar trabajando en la rama `jwt`, que es donde se encuentra la implementación de JWT.

git checkout jwt

3. **Instalar dependencias:**

Navega a la carpeta del proyecto y ejecuta el siguiente comando para instalar todas las dependencias necesarias:

npm install

4. **Configurar variables de entorno:**

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

CLAVE=hojadetrabajo7  
TIEMPO=30s  
PORT=3030

Puedes ajustar el valor de `TIEMPO` y el `PORT` según lo necesites.

5. **Ejecutar la API localmente:**

npm start

La API estará corriendo en `http://localhost:3030`.

## URL de la API desplegada en Render

https://hojadetrabajo7.onrender.com

## Descripción de los Endpoints

### 1. POST /login

Este endpoint autentica a un usuario registrado y devuelve un token JWT para las siguientes solicitudes.

**URL:** `/login`  
**Método:** POST  
**Descripción:** Autentica un usuario y devuelve un token JWT.

**Request body (JSON):**

{
  "DPI": "123456789",
  "contraseña": "12345"
}

**Response body (JSON):**

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

---

### 2. GET /usuarios

Este endpoint devuelve la lista de usuarios registrados. Requiere autenticación con un token JWT.

**URL:** `/usuarios`  
**Método:** GET  
**Descripción:** Lista todos los usuarios registrados. Requiere token JWT.

**Headers:** 

Authorization: Bearer <token>

**Response body (JSON):**

[
  {
    "DPI": "123456789",
    "nombre": "ejemplo",
    "correo": "ejemplo@ejemplo.com"
  }
]

---

### 3. POST /usuarios

Este endpoint permite registrar un nuevo usuario.

**URL:** `/usuarios`  
**Método:** POST  
**Descripción:** Crea un nuevo usuario.

**Request body (JSON):**

{
  "DPI": "987654321",
  "nombre": "ejemplo",
  "correo": "ejemplo@ejemplo.com",
  "contraseña": "ejemplo123"
}

**Response body (JSON):**

{
  "message": "Usuario creado con éxito",
  "usuario": {
  "DPI": "987654321",
  "nombre": "ejemplo",
  "correo": "ejemplo@ejemplo.com"
  }
}

---

### 4. PUT /usuarios/:DPI

Este endpoint permite actualizar un usuario por su DPI. Requiere autenticación con JWT.

**URL:** `/usuarios/:DPI`  
**Método:** PUT  
**Descripción:** Actualiza los datos de un usuario por su DPI. Requiere token JWT.

**Headers:**

Authorization: Bearer <token>

**Request body (JSON):**

{
  "DPI": "987654321",
  "nombre": "ejemplo",
  "correo": "ejemplo@ejemplo.com",
  "contraseña": "ejemplo123"
}

**Response body (JSON):**

{
  "message": "Usuario actualizado con éxito"
}

---

### 5. DELETE /usuarios/:DPI

Este endpoint permite eliminar un usuario por su DPI. Requiere autenticación con JWT.

**URL:** `/usuarios/:DPI`  
**Método:** DELETE  
**Descripción:** Elimina un usuario por su DPI. Requiere token JWT.

**Headers:**

Authorization: Bearer <token>

**Response body (JSON):**

{
  "message": "Usuario eliminado con éxito"
}

---
## AUTOR
Rudy Orlando López López
9490-21-5628
