import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function OrderForm() {
  const { id } = useParams(); // id du menu à commander
  const navigate = useNavigate();

  const [menu, setMenu] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupération du menu à commander
  useEffect(() => {
    fetch(`http://localhost:8000/api/menus/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Menu non trouvé");
        return res.json();
      })
      .then((data) => {
        setMenu(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Vous devez être connecté pour passer une commande.");
      navigate("/login");
      return;
    }

    fetch("http://localhost:8000/api/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ajout du token pour l'authentification
      },
      body: JSON.stringify({
        menu_id: id,
        quantity,
        notes,
      }),
    })
      .then((res) => {
        if (res.status === 401) {
          alert("Votre session a expiré, veuillez vous reconnecter.");
          navigate("/login");
          throw new Error("Non autorisé");
        }
        if (!res.ok) throw new Error("Erreur lors de la création de la commande");
        return res.json();
      })
      .then(() => {
        alert("Commande créée avec succès !");
        navigate("/dashboard"); // redirige vers dashboard ou page de confirmation
      })
      .catch((err) => {
        if (err.message !== "Non autorisé") {
          alert(err.message);
        }
      });
  };

  if (loading) return <p>Chargement du menu...</p>;
  if (error) return <p className="text-red-600">Erreur : {error}</p>;
  if (!menu) return null;

  return (
    <section className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Commander : {menu.title}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Quantité</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Notes (optionnel)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows="4"
            placeholder="Allergies, préférences, etc."
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          Passer la commande
        </button>
      </form>
    </section>
  );
}
