import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch('http://localhost:8000/api/orders/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status === 401) {
          navigate("/login");
          throw new Error('Non autorisé, veuillez vous reconnecter');
        }
        if (!res.ok) throw new Error('Erreur lors de la récupération des commandes');
        return res.json();
      })
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <p className="text-center py-16">Chargement des commandes...</p>;
  if (error) return <p className="text-center py-16 text-red-600">Erreur : {error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Liste des commandes</h1>

      {orders.length === 0 ? (
        <p>Aucune commande trouvée.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Numéro</th>
              <th className="border border-gray-300 p-2 text-left">Menu</th>
              <th className="border border-gray-300 p-2 text-left">Quantité</th>
              <th className="border border-gray-300 p-2 text-left">Notes</th> {/* Nouvelle colonne */}
              <th className="border border-gray-300 p-2 text-left">Statut</th>
              <th className="border border-gray-300 p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(({ id, order_number, menu, quantity, notes, status, created_at }) => (
              <tr key={id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{order_number}</td>
                <td className="border border-gray-300 p-2">{menu?.title}</td>
                <td className="border border-gray-300 p-2">{quantity}</td>
                <td className="border border-gray-300 p-2">{notes || "-"}</td> {/* Affiche notes */}
                <td className="border border-gray-300 p-2 capitalize">{status}</td>
                <td className="border border-gray-300 p-2">{new Date(created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
