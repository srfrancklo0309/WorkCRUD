import { companyProfile } from './companyProfile.js';
import { jobOfferForm, companyJobList } from './jobOffers.js';
import { jobCard } from '../components/jobCard.js';

export function companyDashboard(user) {
  return `
    <div class="box">
      <h2 class="title is-4">Panel de Empresa</h2>
      <p><strong>Correo:</strong> ${user.email}</p>
      <div class="buttons mt-4">
        <button class="button is-link" id="btnPerfilEmpresa">Perfil empresa</button>
        <button class="button is-primary" id="btnPublicar">Publicar oferta</button>
        <button class="button is-info" id="btnMisOfertas">Mis ofertas</button>
      </div>
      <div id="companyProfileContainer"></div>
      <div id="jobOfferFormContainer"></div>
      <div id="companyJobListContainer"></div>
      <div id="editJobFormContainer"></div>
      <div id="applicantsListContainer"></div>
    </div>
  `;
}

export function setupCompanyDashboard(user) {
  const btnPerfil = document.getElementById('btnPerfilEmpresa');
  const btnPublicar = document.getElementById('btnPublicar');
  const btnMisOfertas = document.getElementById('btnMisOfertas');

  if (btnPerfil) {
    btnPerfil.addEventListener('click', () => {
      const container = document.getElementById('companyProfileContainer');
      container.innerHTML = companyProfile(user);
      setupCompanyProfileForm(user);
      clearCompanyPanels(['jobOfferFormContainer', 'companyJobListContainer', 'editJobFormContainer', 'applicantsListContainer']);
    });
  }

  if (btnPublicar) {
    btnPublicar.addEventListener('click', () => {
      clearCompanyPanels(['companyProfileContainer', 'companyJobListContainer', 'editJobFormContainer', 'applicantsListContainer']);
      document.getElementById('jobOfferFormContainer').innerHTML = jobOfferForm();
      setupJobOfferForm(user);
    });
  }

  if (btnMisOfertas) {
    btnMisOfertas.addEventListener('click', async () => {
      clearCompanyPanels(['companyProfileContainer', 'jobOfferFormContainer', 'editJobFormContainer', 'applicantsListContainer']);
      await renderCompanyJobList(user);
    });
  }
}

function clearCompanyPanels(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = '';
  });
}

function setupCompanyProfileForm(user) {
  const form = document.getElementById('companyProfileForm');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const sector = form.sector.value.trim();
    const description = form.description.value.trim();
    const logo = form.logo.value.trim();
    const updatedCompany = { ...user, name, sector, description, logo };
    try {
      const res = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCompany)
      });
      if (!res.ok) throw new Error('Error al guardar cambios');
      const saved = await res.json();
      localStorage.setItem('user', JSON.stringify(saved));
      alert('Perfil actualizado correctamente');
    } catch (err) {
      alert(err.message);
    }
  });
}

function setupJobOfferForm(user) {
  const form = document.getElementById('jobOfferForm');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const requirements = form.requirements.value.trim();
    const salary = form.salary.value ? Number(form.salary.value) : undefined;
    const modality = form.modality.value;
    if (!title || !description || !modality) {
      alert('Completa todos los campos obligatorios');
      return;
    }
    const job = {
      title,
      description,
      requirements,
      salary,
      modality,
      companyId: user.id,
      status: 'abierta',
      createdAt: new Date().toISOString()
    };
    try {
      const res = await fetch('http://localhost:3000/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job)
      });
      if (!res.ok) throw new Error('Error al publicar la oferta');
      alert('Oferta publicada correctamente');
      form.reset();
    } catch (err) {
      alert(err.message);
    }
  });
}

async function renderCompanyJobList(user) {
  const container = document.getElementById('companyJobListContainer');
  try {
    const res = await fetch(`http://localhost:3000/jobs?companyId=${user.id}`);
    const jobs = await res.json();
    container.innerHTML = companyJobList(jobs, user, { showEdit: true, showDelete: true, showClose: true, showApplicants: true });
    jobs.forEach(job => {
      // Editar
      const btnEdit = document.getElementById(`btnEdit${job.id}`);
      if (btnEdit) {
        btnEdit.addEventListener('click', () => renderEditJobForm(job, user));
      }
      // Eliminar
      const btnDelete = document.getElementById(`btnDelete${job.id}`);
      if (btnDelete) {
        btnDelete.addEventListener('click', async () => {
          if (confirm('¿Seguro que deseas eliminar esta oferta?')) {
            await deleteJob(job.id);
            await renderCompanyJobList(user);
          }
        });
      }
      // Cerrar
      const btnClose = document.getElementById(`btnClose${job.id}`);
      if (btnClose) {
        btnClose.addEventListener('click', async () => {
          if (confirm('¿Cerrar esta oferta?')) {
            await closeJob(job.id);
            await renderCompanyJobList(user);
          }
        });
      }
      // Ver candidatos
      const btnApplicants = document.getElementById(`btnApplicants${job.id}`);
      if (btnApplicants) {
        btnApplicants.addEventListener('click', async () => {
          await renderApplicantsList(job);
        });
      }
    });
  } catch (err) {
    container.innerHTML = '<p>Error al cargar las ofertas.</p>';
  }
}

function renderEditJobForm(job, user) {
  clearCompanyPanels(['editJobFormContainer', 'applicantsListContainer']);
  const container = document.getElementById('editJobFormContainer');
  container.innerHTML = `
    <form id="editJobForm" class="box mb-5">
      <h3 class="title is-5">Editar oferta</h3>
      <div class="field">
        <label class="label">Título de la vacante</label>
        <div class="control">
          <input class="input" type="text" name="title" value="${job.title}" required>
        </div>
      </div>
      <div class="field">
        <label class="label">Descripción</label>
        <div class="control">
          <textarea class="textarea" name="description" required>${job.description}</textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Requisitos</label>
        <div class="control">
          <input class="input" type="text" name="requirements" value="${job.requirements || ''}">
        </div>
      </div>
      <div class="field">
        <label class="label">Salario (opcional)</label>
        <div class="control">
          <input class="input" type="number" name="salary" min="0" value="${job.salary || ''}">
        </div>
      </div>
      <div class="field">
        <label class="label">Modalidad</label>
        <div class="control">
          <div class="select is-fullwidth">
            <select name="modality" required>
              <option value="">Selecciona una opción</option>
              <option value="Presencial" ${job.modality === 'Presencial' ? 'selected' : ''}>Presencial</option>
              <option value="Híbrido" ${job.modality === 'Híbrido' ? 'selected' : ''}>Híbrido</option>
              <option value="Remoto" ${job.modality === 'Remoto' ? 'selected' : ''}>Remoto</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field mt-4">
        <div class="control">
          <button class="button is-success" type="submit">Guardar cambios</button>
        </div>
      </div>
    </form>
  `;
  setupEditJobForm(job, user);
}

function setupEditJobForm(job, user) {
  const form = document.getElementById('editJobForm');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const requirements = form.requirements.value.trim();
    const salary = form.salary.value ? Number(form.salary.value) : undefined;
    const modality = form.modality.value;
    if (!title || !description || !modality) {
      alert('Completa todos los campos obligatorios');
      return;
    }
    const updatedJob = {
      ...job,
      title,
      description,
      requirements,
      salary,
      modality
    };
    try {
      const res = await fetch(`http://localhost:3000/jobs/${job.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedJob)
      });
      if (!res.ok) throw new Error('Error al guardar cambios');
      alert('Oferta actualizada');
      clearCompanyPanels(['editJobFormContainer']);
      await renderCompanyJobList(user);
    } catch (err) {
      alert(err.message);
    }
  });
}

async function deleteJob(jobId) {
  await fetch(`http://localhost:3000/jobs/${jobId}`, { method: 'DELETE' });
}

async function closeJob(jobId) {
  await fetch(`http://localhost:3000/jobs/${jobId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'cerrada' })
  });
}

async function renderApplicantsList(job) {
  clearCompanyPanels(['editJobFormContainer', 'applicantsListContainer']);
  const container = document.getElementById('applicantsListContainer');
  try {
    const res = await fetch(`http://localhost:3000/applications?jobId=${job.id}`);
    const applications = await res.json();
    if (!applications.length) {
      container.innerHTML = '<p>No hay candidatos para esta oferta.</p>';
      return;
    }
    // Obtener datos de los usuarios postulados
    const userIds = applications.map(a => `id=${a.userId}`).join('&');
    const postulantesRes = await fetch(`http://localhost:3000/users?${userIds}`);
    const postulantes = await postulantesRes.json();
    container.innerHTML = `
      <h3 class="title is-5">Candidatos postulados</h3>
      <ul>
        ${postulantes.map(p => `<li><strong>${p.name || p.email}</strong> (${p.email})</li>`).join('')}
      </ul>
    `;
  } catch (err) {
    container.innerHTML = '<p>Error al cargar los candidatos.</p>';
  }
}
