import React, { useEffect, useState } from "react";

export default function AboutSection() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/about-section/")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement de la section à propos");
        return res.json();
      })
      .then((data) => {
        setAbout(data[0]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-16">Chargement...</p>;
  if (error) return <p className="text-center py-16 text-red-600">Erreur : {error}</p>;
  if (!about) return null;

  return (
    <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:gap-8">
      {/* Texte côté gauche */}
      <div className="p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-xl text-center sm:text-left">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">{about.title}</h2>

          <p className="text-gray-600 md:mt-4 leading-relaxed">{about.description}</p>

          <div className="mt-6 md:mt-8">
            <a
              href={about.button_url}
              className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              {about.button_label}
            </a>
          </div>
        </div>
      </div>

      {/* Image côté droit avec padding et bord arrondi */}
      <div className="p-4 md:p-8 lg:p-12">
        <img
          alt={about.image_alt || "Image à propos"}
          src={about.image}
          className="w-full h-auto object-cover rounded-xl"
        />
      </div>
    </section>
  );
}
