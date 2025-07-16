export function jobCard(job, company, options = {}) {
  return `
    <div class="card mb-4">
      <header class="card-header">
        <p class="card-header-title">
          ${job.title}
        </p>
        ${company && company.logo ? `<figure class="image is-48x48 ml-2"><img src="${company.logo}" alt="Logo"></figure>` : ''}
      </header>
      <div class="card-content">
        <div class="content">
          <strong>Empresa:</strong> ${company ? company.name : 'N/A'}<br>
          <strong>Modalidad:</strong> ${job.modality}<br>
          ${job.salary ? `<strong>Salario:</strong> $${job.salary}<br>` : ''}
          <strong>Descripción:</strong> ${job.description}
        </div>
      </div>
      <footer class="card-footer">
        ${options.showApply ? `<a href="#" class="card-footer-item" data-jobid="${job.id}" id="btnApply${job.id}">Postularme</a>` : ''}
        ${options.showEdit ? `<a href="#" class="card-footer-item" data-jobid="${job.id}" id="btnEdit${job.id}">Editar</a>` : ''}
        ${options.showDelete ? `<a href="#" class="card-footer-item has-text-danger" data-jobid="${job.id}" id="btnDelete${job.id}">Eliminar</a>` : ''}
        ${options.showClose ? `<a href="#" class="card-footer-item has-text-warning" data-jobid="${job.id}" id="btnClose${job.id}">Cerrar</a>` : ''}
        ${options.showApplicants ? `<a href="#" class="card-footer-item" data-jobid="${job.id}" id="btnApplicants${job.id}">Ver candidatos</a>` : ''}
      </footer>
    </div>
  `;
}
