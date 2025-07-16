export function navbar(user) {
  return `
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <img src="./assets/logo.png" width="112" height="28" alt="Logo WorkCRUD">
        </a>
        <span class="navbar-item has-text-weight-bold">WorkCRUD</span>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          ${user ? `
            <span class="navbar-item">${user.email}</span>
            <a class="navbar-item" href="#${user.role === 'company' ? 'company' : 'postulant'}">Panel</a>
            <a class="navbar-item" id="logoutBtn" href="#">Cerrar sesión</a>
          ` : `
            <a class="navbar-item" href="#login">Iniciar sesión</a>
            <a class="navbar-item" href="#register">Registrarse</a>
          `}
        </div>
      </div>
    </nav>
  `;
}
