import { loginForm, setupLoginForm } from '../auth/login.js';
import { registerForm, setupRegisterForm } from '../auth/register.js';
import { postulantDashboard, setupPostulantDashboard } from '../users/postulantDashboard.js';
import { companyDashboard, setupCompanyDashboard } from '../companies/companyDashboard.js';
import { navbar } from '../components/navbar.js';
// Vistas simples de ejemplo
const views = {
  home: `<h1 class="title">Bienvenido a WorkCRUD</h1><p>Plataforma de empleos para postulantes y empresas.</p>`,
  login: loginForm(),
  register: registerForm(),
  postulant: `<h2 class="title">Panel de Postulante</h2><p>Bienvenido, postulante.</p>`,
  company: `<h2 class="title">Panel de Empresa</h2><p>Bienvenido, empresa.</p>`
};

export function router() {
  const app = document.getElementById('app');
  const hash = window.location.hash.replace('#', '');
  let view = '';
  const user = JSON.parse(localStorage.getItem('user'));

  // Renderizar navbar dinámico
  document.querySelector('nav.navbar').outerHTML = navbar(user);

  switch (hash) {
    case 'login':
      view = views.login;
      break;
    case 'register':
      view = views.register;
      break;
    case 'postulant':
      if (user && user.role === 'postulant') {
        view = postulantDashboard(user);
      } else {
        window.location.hash = 'login';
        return;
      }
      break;
    case 'company':
      if (user && user.role === 'company') {
        view = companyDashboard(user);
      } else {
        window.location.hash = 'login';
        return;
      }
      break;
    default:
      view = views.home;
  }

  app.innerHTML = view;
  // Inicializar lógica de formularios si corresponde
  if (hash === 'login') setupLoginForm();
  if (hash === 'register') setupRegisterForm();
  if (hash === 'postulant' && user && user.role === 'postulant') setupPostulantDashboard(user);
  if (hash === 'company' && user && user.role === 'company') setupCompanyDashboard(user);

  // Cierre de sesión
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('user');
      window.location.hash = 'login';
    });
  }
}
