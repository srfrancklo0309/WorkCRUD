import { jobCard } from '../components/jobCard.js';

export function jobOfferForm() {
  return `
    <form id="jobOfferForm" class="box mb-5">
      <h3 class="title is-5">Publicar nueva oferta</h3>
      <div class="field">
        <label class="label">Título de la vacante</label>
        <div class="control">
          <input class="input" type="text" name="title" required>
        </div>
      </div>
      <div class="field">
        <label class="label">Descripción</label>
        <div class="control">
          <textarea class="textarea" name="description" required></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Requisitos</label>
        <div class="control">
          <input class="input" type="text" name="requirements" placeholder="Ej: 2 años de experiencia, React, Inglés">
        </div>
      </div>
      <div class="field">
        <label class="label">Salario (opcional)</label>
        <div class="control">
          <input class="input" type="number" name="salary" min="0">
        </div>
      </div>
      <div class="field">
        <label class="label">Modalidad</label>
        <div class="control">
          <div class="select is-fullwidth">
            <select name="modality" required>
              <option value="">Selecciona una opción</option>
              <option value="Presencial">Presencial</option>
              <option value="Híbrido">Híbrido</option>
              <option value="Remoto">Remoto</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field mt-4">
        <div class="control">
          <button class="button is-success" type="submit">Publicar oferta</button>
        </div>
      </div>
    </form>
  `;
}

export function companyJobList(jobs, company, options = {}) {
  if (!jobs.length) return '<p>No tienes ofertas publicadas.</p>';
  return jobs.map(job => jobCard(job, company, options)).join('');
}
