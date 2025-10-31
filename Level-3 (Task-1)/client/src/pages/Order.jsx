import React, { useState, useMemo } from 'react';
import './Order.css';

const BASES = [
  { id: 'Thin', label: 'Thin Crust', price: 3.0 },
  { id: 'Classic', label: 'Classic Hand Tossed', price: 2.5 },
  { id: 'Cheese', label: 'Cheese Burst', price: 4.0 },
  { id: 'Wheat', label: 'Whole Wheat', price: 2.0 },
  { id: 'Gluten', label: 'Gluten Free', price: 3.5 },
];

const SAUCES = [
  { id: 'Tomato', label: 'Tomato Basil', price: 0.5 },
  { id: 'Bbq', label: 'Barbecue', price: 0.7 },
  { id: 'Garlic', label: 'Garlic Parmesan', price: 0.8 },
  { id: 'Alfredo', label: 'Alfredo', price: 1.0 },
  { id: 'Pesto', label: 'Pesto', price: 1.2 },
];

const CHEESES = [
  { id: 'Mozz', label: 'Mozzarella', price: 1.5 },
  { id: 'Cheddar', label: 'Cheddar', price: 1.5 },
  { id: 'Parm', label: 'Parmesan', price: 1.8 },
  { id: 'Vegan', label: 'Vegan Cheese', price: 2.0 },
  { id: 'Provolone', label: 'Provolone', price: 1.6 },
];

const VEGGIES = [
  { id: 'Onion', label: 'Onion', price: 0.3 },
  { id: 'Bell', label: 'Bell Pepper', price: 0.4 },
  { id: 'Tom', label: 'Tomato', price: 0.3 },
  { id: 'Olives', label: 'Olives', price: 0.5 },
  { id: 'Mush', label: 'Mushroom', price: 0.6 },
];

export default function OrderPage() {
  const [base, setBase] = useState('Thin');
  const [sauce, setSauce] = useState('Tomato');
  const [cheese, setCheese] = useState('Mozz');
  const [veggies, setVeggies] = useState(['Onion']);
  const [showSummary, setShowSummary] = useState(false);

  const toggleVeg = (id) => {
    setVeggies((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  const total = useMemo(() => {
    let t = 0;
    const b = BASES.find((b) => b.id === base);
    const s = SAUCES.find((s) => s.id === sauce);
    const c = CHEESES.find((c) => c.id === cheese);
    if (b) t += b.price;
    if (s) t += s.price;
    if (c) t += c.price;
    for (const v of veggies) {
      const vg = VEGGIES.find((x) => x.id === v);
      if (vg) t += vg.price;
    }
    return t;
  }, [base, sauce, cheese, veggies]);

  const handlePlaceOrder = () => {
    // Build summary
    const selectedBase = BASES.find((b) => b.id === base)?.label || '';
    const selectedSauce = SAUCES.find((s) => s.id === sauce)?.label || '';
    const selectedCheese = CHEESES.find((c) => c.id === cheese)?.label || '';
    const selectedVeggies = veggies.map((v) => VEGGIES.find((x) => x.id === v)?.label).filter(Boolean);

    const summary = `Your order:\n\nBase: ${selectedBase}\nSauce: ${selectedSauce}\nCheese: ${selectedCheese}\nVeggies: ${selectedVeggies.length ? selectedVeggies.join(', ') : 'None'}\n\nTotal: $${total.toFixed(2)}`;

    // Show animated popup
    setShowSummary(true);

    // Optional: also show native alert as fallback
    // alert(summary);
  };

  const handleReset = () => {
    setBase('thin');
    setSauce('tomato');
    setCheese('mozz');
    setVeggies([]);
    setShowSummary(false);
  };

  return (
    <div className="order-page">
      <div className="order-card">
        <h2>Customize Your Pizza</h2>

        <section className="group">
          <h3>Choose Base</h3>
          <div className="options">
            {BASES.map((b) => (
              <label key={b.id} className="option">
                <input type="radio" name="base" checked={base === b.id} onChange={() => setBase(b.id)} />
                <div className="label-text">{b.label} <span className="price">(${b.price.toFixed(2)})</span></div>
              </label>
            ))}
          </div>
        </section>

        <section className="group">
          <h3>Choose Sauce</h3>
          <div className="options">
            {SAUCES.map((s) => (
              <label key={s.id} className="option">
                <input type="radio" name="sauce" checked={sauce === s.id} onChange={() => setSauce(s.id)} />
                <div className="label-text">{s.label} <span className="price">(${s.price.toFixed(2)})</span></div>
              </label>
            ))}
          </div>
        </section>

        <section className="group">
          <h3>Choose Cheese</h3>
          <div className="options">
            {CHEESES.map((c) => (
              <label key={c.id} className="option">
                <input type="radio" name="cheese" checked={cheese === c.id} onChange={() => setCheese(c.id)} />
                <div className="label-text">{c.label} <span className="price">(${c.price.toFixed(2)})</span></div>
              </label>
            ))}
          </div>
        </section>

        <section className="group">
          <h3>Veggies</h3>
          <div className="options veggies">
            {VEGGIES.map((v) => (
              <label key={v.id} className="option checkbox">
                <input type="checkbox" checked={veggies.includes(v.id)} onChange={() => toggleVeg(v.id)} />
                <div className="label-text">{v.label} <span className="price">(+${v.price.toFixed(2)})</span></div>
              </label>
            ))}
          </div>
        </section>

        <div className="footer">
          <div className="total">Total: <strong>${total.toFixed(2)}</strong></div>
          <div className="buttons">
            <button className="reset" onClick={handleReset}>Reset</button>
            <button className="place" onClick={handlePlaceOrder}>PLACE ORDER</button>
          </div>
        </div>
      </div>

      {showSummary && (
        <div className="summary-backdrop" onClick={() => setShowSummary(false)}>
          <div className="summary-card" onClick={(e) => e.stopPropagation()}>
            <h3>Order Summary</h3>
            <div className="summary-content">
              <p><strong>Base:</strong> {BASES.find((b) => b.id === base)?.label}</p>
              <p><strong>Sauce:</strong> {SAUCES.find((s) => s.id === sauce)?.label}</p>
              <p><strong>Cheese:</strong> {CHEESES.find((c) => c.id === cheese)?.label}</p>
              <p><strong>Veggies:</strong> {veggies.length ? veggies.map((v) => VEGGIES.find((x) => x.id === v)?.label).join(', ') : 'None'}</p>
              <p className="summary-total"><strong>Total:</strong> ${total.toFixed(2)}</p>
            </div>
            <div className="summary-actions">
              <button className="reset" onClick={() => { handleReset(); setShowSummary(false); }}>Reset</button>
                <button className="place" onClick={async () => {
                  // Send order to backend
                  try {
                    const user = localStorage.getItem('user');
                    if (!user) {
                      alert('You must be logged in to place an order');
                      return;
                    }
                    const parsed = JSON.parse(user);
                    const userId = parsed.id || parsed._id;
                    const payload = {
                      userId,
                      base,
                      sauce,
                      cheese,
                      veggies,
                      total: Number(total.toFixed(2)),
                    };

                    const res = await fetch('http://localhost:5000/api/orders', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload),
                    });

                    const data = await res.json();
                    if (!res.ok) {
                      alert(data.message || 'Failed to place order');
                      return;
                    }

                    // Success
                    alert('Order placed! Thank you.');
                    // Optionally close summary and reset
                    setShowSummary(false);
                    handleReset();
                    // Dispatch an event so MyOrders can refresh if open
                    window.dispatchEvent(new CustomEvent('orderCreated', { detail: data.order }));
                  } catch (err) {
                    console.error('Order submit error', err);
                    alert('Something went wrong while placing order');
                  }
                }}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
