export function companyProfile(company) {
  return `
    <div class="box">
      <h2 class="title is-4">Perfil de la Empresa</h2>
      <form id="companyProfileForm">
        <div class="field">
          <label class="label">Nombre de la empresa</label>
          <div class="control">
            <input class="input" type="text" name="name" value="${company.name || ''}" required>
          </div>
        </div>
        <div class="field">
          <label class="label">Correo electrónico</label>
          <div class="control">
            <input class="input" type="email" name="email" value="${company.email}" disabled>
          </div>
        </div>
        <div class="field">
          <label class="label">Sector o industria</label>
          <div class="control">
            <input class="input" type="text" name="sector" value="${company.sector || ''}" placeholder="Ej: Tecnología, Salud, Educación">
          </div>
        </div>
        <div class="field">
          <label class="label">Descripción</label>
          <div class="control">
            <textarea class="textarea" name="description" placeholder="Describe tu empresa">${company.description || ''}</textarea>
          </div>
        </div>
        <div class="field">
          <label class="label">Logo (URL imagen)</label>
          <div class="control">
            <input class="input" type="url" name="logo" value="${company.logo || ''}" placeholder="https://...">
          </div>
        </div>
        <div class="field mt-4">
          <div class="control">
            <button class="button is-success" type="submit">Guardar cambios</button>
          </div>
        </div>
      </form>
    </div>
  `;
}
