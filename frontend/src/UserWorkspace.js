import { useEffect, useState } from 'react';
import { sampleDocument } from './profiles';

function emptyForm(profile) {
  const values = {};
  profile.fields.forEach((field) => { values[field.key] = field.type === 'boolean' ? false : ''; });
  values.rol = profile.roleDefault;
  return values;
}

function validate(profile, values) {
  const errors = {};
  profile.fields.forEach((field) => {
    const value = values[field.key];
    if (field.required && (value === '' || value === undefined)) { errors[field.key] = `${field.label} es obligatorio.`; return; }
    if (value === '' || value === undefined) return;
    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors[field.key] = 'Escribe un correo válido.';
    else if (field.type === 'number' && !Number.isFinite(Number(value))) errors[field.key] = 'Escribe un número.';
    else if (field.type === 'number' && field.min !== undefined && Number(value) < field.min) errors[field.key] = `El mínimo permitido es ${field.min}.`;
    else if (field.type === 'number' && field.max !== undefined && Number(value) > field.max) errors[field.key] = `El máximo permitido es ${field.max}.`;
    else if (field.type === 'enum' && !field.options.includes(value)) errors[field.key] = 'Selecciona una opción permitida.';
  });
  if (!profile.roleOptions.includes(values.rol)) errors.rol = 'Selecciona un rol permitido.';
  return errors;
}

function normalize(profile, values) {
  const record = {};
  profile.fields.forEach((field) => {
    const value = values[field.key];
    if (field.type === 'number') record[field.key] = value === '' ? undefined : Number(value);
    else if (field.type === 'list') record[field.key] = value ? value.split(',').map((item) => item.trim()).filter(Boolean) : [];
    else record[field.key] = value;
  });
  record.rol = values.rol;
  return record;
}

function UserWorkspace({ profile, users, isLoading, apiError, onGet, onCreate, onUpdate, onDelete }) {
  const [form, setForm] = useState(() => emptyForm(profile));
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => { setForm(emptyForm(profile)); setEditingId(null); setErrors({}); setMessage(''); setSelectedUser(null); }, [profile]);

  function resetForm() { setForm(emptyForm(profile)); setEditingId(null); setErrors({}); }
  function updateField(key, value) { setForm((current) => ({ ...current, [key]: value })); setErrors((current) => ({ ...current, [key]: '' })); }
  async function submit(event) {
    event.preventDefault();
    const nextErrors = validate(profile, form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { setMessage('Revisa las reglas del esquema. En la API de clase, estos datos responderían 400.'); setIsError(true); return; }
    const record = normalize(profile, form);
    try {
      if (editingId) { await onUpdate(editingId, record); setMessage('Usuario actualizado en MongoDB.'); }
      else { await onCreate(record); setMessage(`Usuario creado en MongoDB. Si no enviaste rol, se aplicó "${profile.roleDefault}".`); }
      setIsError(false); setSelectedUser(null); resetForm();
    } catch (error) {
      setMessage(error.message);
      setIsError(true);
    }
  }
  function edit(user) {
    const values = emptyForm(profile);
    profile.fields.forEach((field) => { const value = user[field.key]; values[field.key] = field.type === 'list' && Array.isArray(value) ? value.join(', ') : (value ?? values[field.key]); });
    values.rol = user.rol || profile.roleDefault;
    setForm(values); setEditingId(user.id); setErrors({}); setMessage('Las reglas se vuelven a validar al guardar.'); setIsError(false);
  }
  async function viewUser(user) {
    try {
      setSelectedUser(await onGet(user.id));
      setMessage('GET /api/usuarios/:id respondió desde MongoDB.');
      setIsError(false);
    } catch (error) {
      setMessage(error.message);
      setIsError(true);
    }
  }
  function remove(user) {
    onDelete(user.id)
      .then(() => {
        if (editingId === user.id) resetForm();
        if (selectedUser?.id === user.id) setSelectedUser(null);
        setMessage(`${user.nombre} se eliminó de MongoDB.`); setIsError(false);
      })
      .catch((error) => { setMessage(error.message); setIsError(true); });
  }
  const sample = sampleDocument(profile);

  return <section className="view-content" aria-labelledby="users-title">
    <div className="section-heading"><div><span className="step-label">ESTACIONES 1 Y 2 · MONGODB + MONGOOSE + EXPRESS</span><h2 id="users-title">Usuarios y control de calidad</h2><p>El formulario envía los datos a Express; Mongoose valida y MongoDB los persiste.</p></div><span className="status-pill">{users.length} {users.length === 1 ? 'usuario' : 'usuarios'}</span></div>
    <div className="workspace-grid">
      <div className="stack">
        <section className="surface"><div className="surface-head"><div><h3>Documento de ejemplo</h3><p>Texto, número, booleano, lista y rol.</p></div></div><div className="surface-content"><pre className="code-block"><code>{JSON.stringify(sample, null, 2)}</code></pre><p className="code-caption">MongoDB agruparía documentos en una colección como <code>usuarios</code>.</p></div></section>
        <section className="surface"><div className="surface-head"><div><h3>Las cinco rutas de Express</h3><p>Rutas implementadas por el backend de esta aplicación.</p></div></div><div className="surface-content"><div className="crud-list">
          <div className="crud-row"><code>GET</code><span>/api/usuarios · listar todos</span></div><div className="crud-row"><code>GET</code><span>/api/usuarios/:id · buscar uno</span></div><div className="crud-row"><code>POST</code><span>/api/usuarios · crear</span></div><div className="crud-row"><code>PUT</code><span>/api/usuarios/:id · actualizar con validadores</span></div><div className="crud-row"><code>DELETE</code><span>/api/usuarios/:id · borrar</span></div>
        </div><p className="code-caption">MongoDB: <code>insertOne</code>, <code>find</code>, <code>updateOne</code> y <code>deleteOne</code>.</p></div></section>
      </div>
      <div className="stack">
        <section className="surface"><div className="surface-head"><div><h3>{editingId ? 'Editar usuario' : 'Registrar usuario'}</h3><p>Los campos y límites cambian según el caso.</p></div></div><div className="surface-content">
          <form onSubmit={submit} noValidate><div className="form-grid">
            {profile.fields.map((field) => <div className={`field ${field.type === 'list' ? 'full' : ''}`} key={field.key}>
              <label htmlFor={`field-${field.key}`}>{field.label}{field.required ? ' *' : ''}</label>
              {field.type === 'boolean' ? <label className="check-field" htmlFor={`field-${field.key}`}><input id={`field-${field.key}`} type="checkbox" checked={Boolean(form[field.key])} onChange={(event) => updateField(field.key, event.target.checked)} />{form[field.key] ? 'Sí' : 'No'}</label>
                : field.type === 'enum' ? <select id={`field-${field.key}`} value={form[field.key]} onChange={(event) => updateField(field.key, event.target.value)}><option value="">Selecciona...</option>{field.options.map((option) => <option key={option} value={option}>{option}</option>)}</select>
                  : <input id={`field-${field.key}`} type={field.type === 'list' ? 'text' : field.type} min={field.min} max={field.max} value={form[field.key]} placeholder={field.type === 'list' ? 'Ej. tortas, galletas' : ''} onChange={(event) => updateField(field.key, event.target.value)} />}
              {errors[field.key] && <p className="field-error">{errors[field.key]}</p>}
            </div>)}
            <div className="field"><label htmlFor="field-rol">Rol · default: {profile.roleDefault}</label><select id="field-rol" value={form.rol} onChange={(event) => updateField('rol', event.target.value)}>{profile.roleOptions.map((role) => <option key={role} value={role}>{role}</option>)}</select></div>
          </div><div className="form-actions"><button className="button" type="submit">{editingId ? 'Guardar cambios' : 'Crear usuario'}</button>{editingId && <button className="button secondary" type="button" onClick={resetForm}>Cancelar</button>}</div></form>
          {(message || apiError) && <div className={`notice ${isError || apiError ? 'error' : ''}`} role="status">{message || apiError}</div>}
        </div></section>
        <section className="surface"><div className="surface-head"><div><h3>Colección usuarios</h3><p>CRUD local: consultar, crear, actualizar y borrar.</p></div><span className="status-pill">localStorage</span></div><div className="surface-content">
          {isLoading ? <div className="empty-state">Cargando usuarios...</div> : !users.length ? <div className="empty-state">{apiError ? 'No se pudo consultar la API. Revisa que el backend y MongoDB estén iniciados.' : `Todavía no hay registros para ${profile.name}.`}</div> : <div className="records">{users.map((user) => <article className="record" key={user.id}>
            <div className="record-info"><strong>{user.nombre} · {user.rol}</strong><span>{user.email}{user.edad ? ` · ${user.edad} años` : ''}</span></div>
            <div className="record-actions"><button className="button secondary small" type="button" onClick={() => viewUser(user)}>GET</button><button className="button secondary small" type="button" onClick={() => edit(user)}>Editar</button><button className="button danger small" type="button" onClick={() => remove(user)}>Borrar</button></div>
          </article>)}</div>}
          {selectedUser && <div className="selected-record"><div className="selected-record-head"><strong>GET /api/usuarios/{selectedUser.id}</strong><button type="button" className="text-button" onClick={() => setSelectedUser(null)}>Cerrar</button></div><pre className="code-block"><code>{JSON.stringify(selectedUser, null, 2)}</code></pre></div>}
        </div></section>
        <section className="surface"><div className="surface-head"><div><h3>Reglas del esquema Mongoose</h3><p>Modelo ejecutado en el backend.</p></div></div><div className="surface-content"><pre className="code-block"><code>{`const usuarioSchema = new mongoose.Schema({\n  ${profile.schema.join(',\n  ')}\n});`}</code></pre><p className="code-caption"><code>required</code> obliga a enviar; <code>default</code> completa lo omitido; <code>min</code>/<code>max</code> limitan números y <code>enum</code> limita opciones.</p></div></section>
      </div>
    </div>
  </section>;
}

export default UserWorkspace;