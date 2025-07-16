import { registerUser } from './authService.js';

export function registerForm() {
  return `
    <form id="registerForm" class="box">
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
        <label class="label">Tipo de usuario</label>
        <div class="control">
          <div class="select is-fullwidth">
            <select name="role" required>
              <option value="">Selecciona un rol</option>
              <option value="postulant">Busco empleo</option>
              <option value="company">Empresa</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-link is-fullwidth" type="submit">Registrarse</button>
        </div>
      </div>
      <p class="has-text-centered">
        ¿Ya tienes cuenta? <a href="#login">Inicia sesión</a>
      </p>
    </form>
  `;
}

export function setupRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const role = form.role.value;
    const errorMsg = document.getElementById('registerErrorMsg') || document.createElement('p');
    errorMsg.id = 'registerErrorMsg';
    errorMsg.className = 'has-text-danger';
    form.appendChild(errorMsg);
    try {
      const user = await registerUser({ email, password, role });
      errorMsg.textContent = '';
      // Guardar sesión y redirigir según rol
      localStorage.setItem('user', JSON.stringify(user));
      window.location.hash = user.role === 'company' ? 'company' : 'postulant';
    } catch (err) {
      errorMsg.textContent = err.message;
    }
  });
}
