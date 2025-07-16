import { jobCard } from '../components/jobCard.js';

export function jobList(jobs, companies) {
  if (!jobs.length) return '<p>No hay ofertas disponibles en este momento.</p>';
  return jobs.map(job => {
    const company = companies.find(c => c.id === job.companyId);
    return jobCard(job, company, { showApply: true });
  }).join('');
} 