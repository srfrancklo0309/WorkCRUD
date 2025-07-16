export function postulantProfile(user) {
  return `
    <div class="box">
      <h2 class="title is-4">Mi Perfil</h2>
      <form id="postulantProfileForm">
        <div class="field">
          <label class="label">Nombre completo</label>
          <div class="control">
            <input class="input" type="text" name="name" value="${user.name || ''}" required>
          </div>
        </div>
        <div class="field">
          <label class="label">Correo electrónico</label>
          <div class="control">
            <input class="input" type="email" name="email" value="${user.email}" disabled>
          </div>
        </div>
        <div class="field">
          <label class="label">Habilidades</label>
          <div class="control">
            <input class="input" type="text" name="skills" value="${user.skills || ''}" placeholder="Ej: JavaScript, CSS, React">
          </div>
        </div>
        <div class="field">
          <label class="label">Experiencia laboral</label>
          <div class="control">
            <textarea class="textarea" name="experience" placeholder="Describe tu experiencia">${user.experience || ''}</textarea>
          </div>
        </div>
        <div class="field">
          <label class="label">CV (URL PDF)</label>
          <div class="control">
            <input class="input" type="url" name="cv" value="${user.cv || ''}" placeholder="https://...">
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
