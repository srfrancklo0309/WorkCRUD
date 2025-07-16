const API_URL = 'http://localhost:3000';

export async function registerUser({ email, password, role }) {
  // Validaciones básicas
  if (!email || !password || !role) {
    throw new Error('Todos los campos son obligatorios');
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    throw new Error('Correo electrónico inválido');
  }
  if (password.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres');
  }
  // Verificar si el usuario ya existe
  const res = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}`);
  const users = await res.json();
  if (users.length > 0) {
    throw new Error('El correo ya está registrado');
  }
  // Registrar usuario
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role })
  });
  if (!response.ok) throw new Error('Error al registrar usuario');
  return await response.json();
}

export async function loginUser({ email, password }) {
  if (!email || !password) {
    throw new Error('Todos los campos son obligatorios');
  }
  const res = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
  const users = await res.json();
  if (users.length === 0) {
    throw new Error('Correo o contraseña incorrectos');
  }
  // Simular sesión
  return users[0];
}
