function JourneyPanel({ profile, onOpenUsers }) {
  return <section className="view-content" aria-labelledby="journey-title">
    <div className="section-heading"><div><span className="step-label">BLOQUE 5 · EL VIAJE DE UN PEDIDO</span><h2 id="journey-title">Cuatro piezas, un mismo dato</h2><p>Así se conectan los conceptos de clase para {profile.name}.</p></div></div>
    <div className="journey-grid" aria-label="Flujo de React a MongoDB">
      <article className="journey-step"><span className="number">01 · PANTALLA</span><h3>React</h3><p>El cliente ve la carta, completa sus datos y pulsa un botón.</p></article>
      <article className="journey-step"><span className="number">02 · PEDIDO</span><h3>Express</h3><p>Una ruta recibe la solicitud y la dirige al control de calidad.</p></article>
      <article className="journey-step"><span className="number">03 · REGLAS</span><h3>Mongoose</h3><p>El esquema revisa tipos, campos obligatorios y valores permitidos.</p></article>
      <article className="journey-step"><span className="number">04 · DESPENSA</span><h3>MongoDB</h3><p>Guarda los documentos aceptados dentro de una colección.</p></article>
    </div>
    <div className="code-note">El CRUD de usuarios sí recorre el sistema real: React envía solicitudes a Express, Mongoose valida el esquema y MongoDB persiste los documentos.</div>
    <div className="journey-cases">
      <div className="journey-case"><strong>POST válido</strong><span>El esquema acepta el documento; Express responde 201.</span></div>
      <div className="journey-case"><strong>Campo requerido o regla incumplida</strong><span>Mongoose rechaza el documento; Express responde 400.</span></div>
      <div className="journey-case"><strong>GET de un id inexistente</strong><span>MongoDB no encuentra el usuario; Express responde 404.</span></div>
    </div>
    <button className="button" type="button" onClick={onOpenUsers}>Abrir usuarios y enviar datos reales</button>
  </section>;
}

export default JourneyPanel;