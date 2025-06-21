import React, { useEffect, useState } from "react";

export default function ChefOfTheWeek() {
  const [chef, setChef] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/chef-of-the-week/")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement du chef.");
        return res.json();
      })
      .then((data) => {
        setChef(data[0]); // car l'API retourne une liste
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-16">Chargement du chef...</p>;
  if (error) return <p className="text-center py-16 text-red-600">Erreur : {error}</p>;
  if (!chef) return null;

  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center">Chef de la semaine</h2>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-center">
        {/* Bloc profil du chef */}
        <div className="bg-green-50 p-6 rounded shadow text-center">
          <img
            src={chef.image}
            alt={chef.name}
            className="w-32 h-32 mx-auto rounded-full mb-4 object-cover border-4 border-white shadow-md"
          />
          <h3 className="text-xl font-semibold">{chef.name}</h3>
          <p className="mt-2 text-gray-600">{chef.bio}</p>
        </div>

        {/* Bloc spécialités */}
        <div className="bg-white p-6 rounded shadow lg:col-span-2">
          <h4 className="text-lg font-semibold text-green-600 mb-4">Ses spécialités</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {chef.specialties.map((spec, idx) => (
              <li key={idx}>{spec}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-500 italic">{chef.quote}</p>
        </div>
      </div>
    </section>
  );
}
