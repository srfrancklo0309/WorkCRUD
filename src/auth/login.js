import { loginUser } from './authService.js';

export function loginForm() {
  return `
    <form id="loginForm" class="box">
      <div class="field">
        <label class="label">Correo electrónico</label>
        <div class="control">
          <input class="input" type="email" name="email" placeholder="ejemplo@correo.com" required>
        </div>
      </div>
      <div class="field">
        <label class="label">Contraseña</label>
        <div class="control">
          <input class="input" type="password" name="password" placeholder="********" required>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary is-fullwidth" type="submit">Iniciar sesión</button>
        </div>
      </div>
      <p class="has-text-centered">
        ¿No tienes cuenta? <a href="#register">Regístrate</a>
      </p>
    </form>
  `;
}

export function setupLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const errorMsg = document.getElementById('loginErrorMsg') || document.createElement('p');
    errorMsg.id = 'loginErrorMsg';
    errorMsg.className = 'has-text-danger';
    form.appendChild(errorMsg);
    try {
      const user = await loginUser({ email, password });
      errorMsg.textContent = '';
      // Guardar sesión y redirigir según rol
      localStorage.setItem('user', JSON.stringify(user));
      window.location.hash = user.role === 'company' ? 'company' : 'postulant';
    } catch (err) {
      errorMsg.textContent = err.message;
    }
  });
}
