import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MenuPreview() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/menus/")  // adapte l'URL selon ta config backend
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la récupération des menus");
        return res.json();
      })
      .then((data) => {
        setMenus(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-16">Chargement des menus...</p>;
  if (error) return <p className="text-center py-16 text-red-600">Erreur : {error}</p>;

  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center">Nos Menus du jour</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {menus.map(({ id, title, description, image, price }) => (
          <Link
            key={id}
            to={`/menu/${id}`} // navigation vers la page détail menu (à créer)
            className="group relative block overflow-hidden rounded-lg shadow hover:shadow-lg transition"
          >
            {/* Bouton cœur supprimé */}

            <img
              src={image}
              alt={title}
              className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="relative border border-gray-100 bg-white p-6">
              <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
              <p className="mt-1.5 text-sm text-gray-700">{description}</p>
              <p className="mt-1.5 font-semibold text-center text-green-600">{price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} DT</p>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  // rediriger vers page de commande en ajoutant l'id du menu
                  window.location.href = `/order/${id}`;
                }}
                className="mt-4 block w-full rounded bg-green-600 p-3 text-sm font-medium text-white transition hover:scale-105"
              >
                Commander
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
