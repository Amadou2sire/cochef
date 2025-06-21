import React from "react";

export default function ChefOfTheWeek() {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center">Chef de la semaine</h2>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-center">
        {/* Bloc profil du chef */}
        <div className="bg-green-50 p-6 rounded shadow text-center">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Chef de la semaine"
            className="w-32 h-32 mx-auto rounded-full mb-4 object-cover border-4 border-white shadow-md"
          />
          <h3 className="text-xl font-semibold">Sophie Dupont</h3>
          <p className="mt-2 text-gray-600">
            Passionnée par la cuisine locale, Sophie vous prépare chaque semaine des plats
            inspirés des traditions et des produits de saison. Sa passion ? Transformer le
            simple en sublime.
          </p>
        </div>

        {/* Bloc spécialités du chef */}
        <div className="bg-white p-6 rounded shadow lg:col-span-2">
          <h4 className="text-lg font-semibold text-green-600 mb-4">Ses spécialités</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Ragoût de légumes bio au tamarin</li>
            <li>Yassa revisité au poulet fermier</li>
            <li>Tartare de mangue et menthe fraîche</li>
            <li>Gâteau de mil au caramel de bissap</li>
          </ul>
          <p className="mt-4 text-sm text-gray-500 italic">
            "Chaque plat est une invitation au voyage, un hommage aux racines et à la créativité."
          </p>
        </div>
      </div>
    </section>
  );
}
