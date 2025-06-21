import React from "react";
import { Link } from "react-router-dom";

const sampleMenus = [
  {
    id: 1,
    name: "Menu Découverte",
    description: "Une sélection de nos meilleures recettes.",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Menu Végétarien",
    description: "Délicieux plats sans viande, frais et savoureux.",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Menu Enfant",
    description: "Repas ludiques et équilibrés pour les plus jeunes.",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Menu Gourmand",
    description: "Pour les amateurs de cuisine généreuse.",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
  }, 
];

export default function MenuPreview() {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center">Nos Menus du jour</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {sampleMenus.map(({ id, name, description, image }) => (
          <Link
            key={id}
            to="/menu"
            className="group relative block overflow-hidden rounded-lg shadow hover:shadow-lg transition"
          >
            <button
              className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
            >
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>

            <img
              src={image}
              alt={name}
              className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="relative border border-gray-100 bg-white p-6">
              
              <h3 className="mt-4 text-lg font-medium text-gray-900">{name}</h3>

              <p className="mt-1.5 text-sm text-gray-700">{description}</p>

              <button className="mt-4 block w-full rounded bg-green-600 p-3 text-sm font-medium text-white transition hover:scale-105">
                Commander
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
