import { router } from './utils/router.js';

// Inicializa el router y renderiza la vista correspondiente
window.addEventListener('DOMContentLoaded', () => {
  router();
});

// Permite navegación SPA con enlaces internos
window.addEventListener('hashchange', () => {
  router();
});
