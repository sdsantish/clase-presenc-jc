import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

function Storefront({ profile, profileKey }) {
  const [quantities, setQuantities] = useState({});
  const total = Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0);
  const lines = profile.products.map((product, index) => ({ product, quantity: quantities[index] || 0 })).filter((line) => line.quantity);
  useEffect(() => setQuantities({}), [profileKey]);

  return <section className="view-content" aria-labelledby="store-title">
    <div className="section-heading"><div><span className="step-label">ESTACIÓN 3 · REACT</span><h2 id="store-title">La vitrina del emprendimiento</h2><p>Componentes reciben nombre, descripción y precio por props. El pedido cambia con state.</p></div><span className="status-pill">{profile.products.length} productos</span></div>
    <div className="menu-layout"><div className="product-grid">
      {profile.products.map((product, index) => <ProductCard key={product.name} product={product} quantity={quantities[index] || 0} onAdd={() => setQuantities((current) => ({ ...current, [index]: (current[index] || 0) + 1 }))} />)}
    </div><aside className="order-panel" aria-label="Resumen del pedido"><h3>Tu pedido</h3><p className="order-total">{total} {total === 1 ? 'unidad' : 'unidades'}</p>
      <div className="order-list" aria-live="polite">{lines.length ? lines.map(({ product, quantity }) => <div className="order-line" key={product.name}><span>{product.name}</span><strong>× {quantity}</strong></div>) : <p className="order-empty">Elige un producto para comenzar.</p>}</div>
      <button className="button secondary" type="button" onClick={() => setQuantities({})}>Vaciar pedido</button>
    </aside></div>
    <div className="concept-strip"><div className="concept"><strong>Componente</strong><span>Storefront y ProductCard separan la página en piezas reutilizables.</span></div><div className="concept"><strong>Props</strong><span>El componente padre entrega datos diferentes a cada tarjeta.</span></div><div className="concept"><strong>State</strong><span>La cantidad cambia al agregar y se reinicia al vaciar.</span></div></div>
  </section>;
}

export default Storefront;