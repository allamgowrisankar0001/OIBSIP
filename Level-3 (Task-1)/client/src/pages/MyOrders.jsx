import React, { useEffect, useState } from 'react';
import './Order.css';

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const user = localStorage.getItem('user');
            if (!user) {
                setOrders([]);
                setLoading(false);
                return;
            }
            const parsed = JSON.parse(user);
            const userId = parsed.id || parsed._id;
            const res = await fetch(`http://localhost:5000/api/orders?userId=${userId}`);
            const data = await res.json();
            if (res.ok) {
                setOrders(data.orders || []);
            } else {
                console.warn('Failed fetching orders', data.message);
            }
        } catch (err) {
            console.error('Fetch orders error', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();

        const handler = () => fetchOrders();
        window.addEventListener('orderCreated', handler);
        window.addEventListener('userLogin', handler);
        window.addEventListener('userLogout', handler);
        return () => {
            window.removeEventListener('orderCreated', handler);
            window.removeEventListener('userLogin', handler);
            window.removeEventListener('userLogout', handler);
        };
    }, []);

    if (loading) return <div style={{ padding: 24 }}>Loading orders...</div>;

    return (
        <div className="order-page">
            <div className="order-card">
                <h2>My Orders</h2>
                {orders.length === 0 ? (
                    <p>No orders yet. Place one from the Order Now page.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {orders.map((o) => (
                            <div key={o._id} style={{ padding: 12, borderRadius: 8, background: '#fafafa', border: '1px solid #f0f0f0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <div><strong>Base:</strong> {o.base}</div>
                                        <div><strong>Sauce:</strong> {o.sauce}</div>
                                        <div><strong>Cheese:</strong> {o.cheese}</div>
                                        <div><strong>Veggies:</strong> {o.veggies && o.veggies.length ? o.veggies.join(', ') : 'None'}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div><strong>${Number(o.total).toFixed(2)}</strong></div>
                                        <div style={{ fontSize: 12, color: '#666' }}>{new Date(o.createdAt).toLocaleString()}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
