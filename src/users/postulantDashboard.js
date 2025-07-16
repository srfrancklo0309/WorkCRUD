import { postulantProfile } from './postulantProfile.js';
import { jobList } from './jobList.js';

export function postulantDashboard(user) {
  return `
    <div class="box">
      <h2 class="title is-4">Panel de Postulante</h2>
      <p><strong>Correo:</strong> ${user.email}</p>
      <div class="buttons mt-4">
        <button class="button is-link" id="btnPerfil">Mi perfil</button>
        <button class="button is-primary" id="btnOfertas">Ver ofertas</button>
        <button class="button is-info" id="btnPostulaciones">Mis postulaciones</button>
      </div>
      <div id="postulantProfileContainer"></div>
      <div id="jobListContainer"></div>
      <div id="applicationsHistoryContainer"></div>
    </div>
  `;
}

export function setupPostulantDashboard(user) {
  const btnPerfil = document.getElementById('btnPerfil');
  const btnOfertas = document.getElementById('btnOfertas');
  const btnPostulaciones = document.getElementById('btnPostulaciones');

  if (btnPerfil) {
    btnPerfil.addEventListener('click', () => {
      const container = document.getElementById('postulantProfileContainer');
      container.innerHTML = postulantProfile(user);
      setupPostulantProfileForm(user);
      clearPostulantPanels(['jobListContainer', 'applicationsHistoryContainer']);
    });
  }

  if (btnOfertas) {
    btnOfertas.addEventListener('click', async () => {
      clearPostulantPanels(['postulantProfileContainer', 'applicationsHistoryContainer']);
      await renderJobList(user);
    });
  }

  if (btnPostulaciones) {
    btnPostulaciones.addEventListener('click', async () => {
      clearPostulantPanels(['postulantProfileContainer', 'jobListContainer']);
      await renderApplicationsHistory(user);
    });
  }
}

function clearPostulantPanels(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = '';
  });
}

function setupPostulantProfileForm(user) {
  const form = document.getElementById('postulantProfileForm');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const skills = form.skills.value.trim();
    const experience = form.experience.value.trim();
    const cv = form.cv.value.trim();
    const updatedUser = { ...user, name, skills, experience, cv };
    try {
      const res = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
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

async function renderJobList(user) {
  const container = document.getElementById('jobListContainer');
  try {
    const [jobsRes, companiesRes] = await Promise.all([
      fetch('http://localhost:3000/jobs?status=abierta'),
      fetch('http://localhost:3000/users?role=company')
    ]);
    const jobs = await jobsRes.json();
    const companies = await companiesRes.json();
    container.innerHTML = jobList(jobs, companies);
    jobs.forEach(job => {
      const btn = document.getElementById(`btnApply${job.id}`);
      if (btn) {
        btn.addEventListener('click', async (e) => {
          e.preventDefault();
          await applyToJob(user, job);
        });
      }
    });
  } catch (err) {
    container.innerHTML = '<p>Error al cargar las ofertas.</p>';
  }
}

async function applyToJob(user, job) {
  try {
    // Verificar si ya está postulado
    const res = await fetch(`http://localhost:3000/applications?userId=${user.id}&jobId=${job.id}`);
    const apps = await res.json();
    if (apps.length > 0) {
      alert('Ya te has postulado a esta oferta.');
      return;
    }
    // Crear postulación
    const response = await fetch('http://localhost:3000/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, jobId: job.id, date: new Date().toISOString() })
    });
    if (!response.ok) throw new Error('Error al postularte');
    alert('¡Postulación exitosa!');
  } catch (err) {
    alert(err.message);
  }
}

async function renderApplicationsHistory(user) {
  const container = document.getElementById('applicationsHistoryContainer');
  try {
    // Obtener postulaciones del usuario
    const appsRes = await fetch(`http://localhost:3000/applications?userId=${user.id}`);
    const applications = await appsRes.json();
    if (!applications.length) {
      container.innerHTML = '<p>No has realizado postulaciones aún.</p>';
      return;
    }
    // Obtener las ofertas y empresas relacionadas
    const jobIds = applications.map(a => `id=${a.jobId}`).join('&');
    const jobsRes = await fetch(`http://localhost:3000/jobs?${jobIds}`);
    const jobs = await jobsRes.json();
    const companyIds = jobs.map(j => `id=${j.companyId}`).join('&');
    const companiesRes = await fetch(`http://localhost:3000/users?${companyIds}`);
    const companies = await companiesRes.json();
    // Renderizar historial
    container.innerHTML = `
      <h3 class="title is-5">Historial de postulaciones</h3>
      <ul>
        ${applications.map(app => {
          const job = jobs.find(j => j.id === app.jobId);
          const company = companies.find(c => c.id === (job ? job.companyId : null));
          return `<li>
            <strong>${job ? job.title : 'Oferta eliminada'}</strong> en <em>${company ? company.name : 'Empresa eliminada'}</em>
            <span class="tag ml-2 ${job && job.status === 'cerrada' ? 'is-warning' : 'is-success'}">
              ${job ? (job.status === 'cerrada' ? 'Cerrada' : 'Abierta') : 'N/A'}
            </span>
          </li>`;
        }).join('')}
      </ul>
    `;
  } catch (err) {
    container.innerHTML = '<p>Error al cargar el historial.</p>';
  }
}
