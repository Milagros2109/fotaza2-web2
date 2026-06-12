#  Fotaza 2

Proyecto integrador desarrollado para la materia Programación Web II.

## Descripción

Fotaza es una aplicación web inspirada en una red social de fotografías donde los usuarios pueden:

* Registrarse e iniciar sesión.
* Crear publicaciones.
* Subir imágenes.
* Comentar publicaciones.
* Buscar publicaciones.
* Seguir usuarios.
* Ver publicaciones de usuarios seguidos.
* Valorar imágenes.

## Tecnologías utilizadas

* Node.js
* Express
* Pug
* PostgreSQL
* Sequelize
* Express Session
* Bcrypt
* Multer
* Zod

## Instalación

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear archivo `.env`

Tomar como referencia el archivo `.env.example`.

### 4. Ejecutar la aplicación

#### Modo desarrollo

```bash
npm run dev
```

#### Modo producción

```bash
npm start
```

## Variables de entorno

Ejemplo de configuración:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fotaza2
DB_USER=postgres
DB_PASSWORD=tu_password

SESSION_SECRET=mi_clave_secreta
```

## Datos de prueba

Para cargar datos iniciales ejecutar:

```bash
npm run seed
```

## Usuarios de prueba

| Usuario | Email                                         | Contraseña |
| ------- | --------------------------------------------- | ---------- |
| aldair  | [prueba1@gmail.com](mailto:prueba1@gmail.com) | 12345      |
| prueba2 | [prueba2@gmail.com](mailto:prueba2@gmail.com) | 12345      |


El proyecto incluye usuarios precargados mediante el archivo seed para facilitar las pruebas.

### Usuario 1

* Nombre: Jeremy Prueba
* Email: [jeremy@test.com](mailto:jeremy@test.com)
* Contraseña: 123456

### Usuario 2

* Nombre: Aldair Prueba
* Email: [aldair@test.com](mailto:aldair@test.com)
* Contraseña: 123456

Estos usuarios permiten probar:

* Inicio de sesión.
* Creación de publicaciones.
* Comentarios.
* Seguimiento de usuarios.
* Valoración de imágenes.
* Publicaciones de usuarios seguidos.

## Scripts disponibles

### Iniciar aplicación

```bash
npm start
```

### Iniciar en modo desarrollo

```bash
npm run dev
```

### Cargar datos de prueba

```bash
npm run seed
```

## Estructura del proyecto

```txt
controller/
middleware/
models/
routes/
views/
public/
seeders/
```

## Funcionalidades implementadas

* Autenticación de usuarios.
* Manejo de sesiones.
* Publicaciones con imágenes.
* Comentarios.
* Búsqueda de publicaciones.
* Seguimiento de usuarios.
* Feed de publicaciones seguidas.
* Valoración de imágenes.
* Datos de prueba mediante seed.

## Limitaciones conocidas

* No se implementó edición de publicaciones.
* No se implementó recuperación de contraseña.
* No se implementó sistema de notificaciones.

## Autor

Alfaro Milagros Gilda
