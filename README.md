# WorkCRUD - Plataforma de Empleos

Plataforma web inspirada en Computrabajo, LinkedIn Jobs y Elempleo, donde postulantes y empresas pueden interactuar para gestionar ofertas laborales y postulaciones.

## Características principales

- **Registro e inicio de sesión** para postulantes y empresas.
- **Perfiles editables** para ambos roles.
- **Empresas** pueden publicar, editar, cerrar y eliminar ofertas de empleo, y ver candidatos postulados.
- **Postulantes** pueden explorar ofertas, postularse y ver su historial de postulaciones.
- **SPA** (Single Page Application) en JavaScript Vanilla, estilos con Bulma.
- **Base de datos simulada** con `json-server`.

---

## Estructura del proyecto

```
WorkCRUD/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── api/
│   ├── auth/
│   ├── users/
│   ├── companies/
│   ├── components/
│   └── utils/
├── db.json
├── package.json
├── .gitignore
└── README.md
```

---

## Requisitos previos
- [Node.js y npm](https://nodejs.org/)

---

## Instalación y ejecución local

1. **Clona el repositorio:**
   ```bash
   git clone <URL_DEL_REPO>
   cd WorkCRUD
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Instala json-server (si no lo tienes):**
   ```bash
   npm install json-server --save-dev
   ```
   O globalmente:
   ```bash
   npm install -g json-server
   ```

4. **Inicia el servidor de la base de datos:**
   ```bash
   npm run start:server
   ```
   Esto levantará `json-server` en [http://localhost:3000](http://localhost:3000) usando el archivo `db.json`.

5. **Sirve los archivos estáticos del frontend:**
   Puedes usar [Live Server](https://www.npmjs.com/package/live-server) o la extensión de VSCode:
   ```bash
   npx live-server public
   ```
   O instala globalmente:
   ```bash
   npm install -g live-server
   live-server public
   ```
   Esto abrirá la app en tu navegador (usualmente en [http://127.0.0.1:8080](http://127.0.0.1:8080)).

---

## Scripts disponibles

- `npm run start:server` — Inicia json-server en el puerto 3000.

---

## Notas importantes
- json-server y live-server deben estar corriendo al mismo tiempo.
- El frontend hace peticiones a `http://localhost:3000`.
- Si usas WSL, asegúrate de que ambos servidores sean accesibles desde tu navegador.
- Puedes modificar la estructura de `db.json` para agregar datos de prueba.

---

## Personalización
- Cambia el logo en `public/assets/logo.png`.
- Personaliza estilos en `public/assets/styles.css`.

---

## Licencia
MIT
