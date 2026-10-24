async function request(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers }
  });
  const result = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) throw new Error(result?.message || `La API respondió ${response.status}.`);
  return result;
}

export const userApi = {
  health: () => request('/api/health'),
  list: (profileKey) => request(`/api/usuarios?profileKey=${encodeURIComponent(profileKey)}`),
  get: (id) => request(`/api/usuarios/${encodeURIComponent(id)}`),
  create: (user) => request('/api/usuarios', { method: 'POST', body: JSON.stringify(user) }),
  update: (id, user) => request(`/api/usuarios/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(user) }),
  delete: (id) => request(`/api/usuarios/${encodeURIComponent(id)}`, { method: 'DELETE' })
};