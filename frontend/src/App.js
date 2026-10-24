import './App.css';
import { useEffect, useState } from 'react';
import { profiles } from './profiles';
import Storefront from './Storefront';
import UserWorkspace from './UserWorkspace';
import JourneyPanel from './JourneyPanel';
import { userApi } from './api';

function App() {
  const [profileKey, setProfileKey] = useState('dulce');
  const [activeView, setActiveView] = useState('store');
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [apiError, setApiError] = useState('');
  const [databaseStatus, setDatabaseStatus] = useState('checking');
  const profile = profiles[profileKey];

  useEffect(() => {
    let active = true;
    setIsLoadingUsers(true);
    setApiError('');
    userApi.list(profileKey)
      .then((records) => { if (active) setUsers(records); })
      .catch((error) => { if (active) { setUsers([]); setApiError(error.message); } })
      .finally(() => { if (active) setIsLoadingUsers(false); });
    return () => { active = false; };
  }, [profileKey]);

  useEffect(() => {
    userApi.health()
      .then((status) => setDatabaseStatus(status.database === 'connected' ? 'connected' : 'disconnected'))
      .catch(() => setDatabaseStatus('offline'));
  }, []);

  async function createUser(user) {
    const created = await userApi.create({ ...user, profileKey });
    setUsers((current) => [created, ...current]);
    return created;
  }

  async function getUser(id) {
    return userApi.get(id);
  }

  async function updateUser(id, changes) {
    const updated = await userApi.update(id, changes);
    setUsers((current) => current.map((user) => user.id === id ? updated : user));
    return updated;
  }

  async function deleteUser(id) {
    await userApi.delete(id);
    setUsers((current) => current.filter((user) => user.id !== id));
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" onClick={() => setActiveView('store')}>
          <span className="brand-mark" aria-hidden="true">D</span>
          <span className="brand-copy"><strong>{profile.name}</strong><small>{profile.subtitle}</small></span>
        </a>
        <label className="case-picker"><span>Caso de práctica</span>
          <select value={profileKey} onChange={(event) => setProfileKey(event.target.value)}>
            {Object.entries(profiles).map(([key, item]) => <option key={key} value={key}>{item.name}</option>)}
          </select>
        </label>
      </header>
      <main className="page-shell" id="inicio">
        <section className="page-intro">
          <div><p className="eyebrow">Jóvenes creaTIvos 2026 · Sesión S21</p><h1>El viaje completo de un dato</h1><p className="intro-copy">La vitrina React de {profile.name}, sus usuarios y el recorrido que sigue un pedido.</p></div>
          <span className={`storage-note ${databaseStatus !== 'connected' ? 'storage-note-offline' : ''}`}>
            <span className="live-dot" />
            {databaseStatus === 'connected' ? 'MongoDB conectada' : databaseStatus === 'checking' ? 'Conectando con MongoDB...' : 'MongoDB no disponible'}
          </span>
        </section>
        <nav className="view-tabs" aria-label="Secciones de la aplicación">
          <button className={activeView === 'store' ? 'view-tab active' : 'view-tab'} onClick={() => setActiveView('store')}>1. El comedor</button>
          <button className={activeView === 'users' ? 'view-tab active' : 'view-tab'} onClick={() => setActiveView('users')}>2. Usuarios y reglas</button>
          <button className={activeView === 'journey' ? 'view-tab active' : 'view-tab'} onClick={() => setActiveView('journey')}>3. Viaje del dato</button>
        </nav>
        {activeView === 'store' && <Storefront profile={profile} profileKey={profileKey} />}
        {activeView === 'users' && <UserWorkspace profile={profile} users={users} isLoading={isLoadingUsers} apiError={apiError} onGet={getUser} onCreate={createUser} onUpdate={updateUser} onDelete={deleteUser} />}
        {activeView === 'journey' && <JourneyPanel profile={profile} onOpenUsers={() => setActiveView('users')} />}
        <footer className="app-footer"><span>React → Express → Mongoose → MongoDB</span><span>Los registros se guardan en la base de datos configurada para el backend.</span></footer>
      </main>
    </div>
  );
}

export default App;
