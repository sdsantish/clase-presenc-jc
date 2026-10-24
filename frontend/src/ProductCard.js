function ProductCard({ product, quantity, onAdd }) {
  const price = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(product.price);
  return <article className="product-card">
    <div className="product-art" style={{ '--product-color': product.color }} aria-hidden="true">{product.icon}</div>
    <div className="product-body"><p className="product-kind">{product.kind}</p><h3>{product.name}</h3><p className="product-description">{product.description}</p>
      <div className="product-bottom"><span className="price">{price}</span><button className="button small" type="button" onClick={onAdd}>Agregar{quantity ? ` · ${quantity}` : ''}</button></div>
    </div>
  </article>;
}

export default ProductCard;