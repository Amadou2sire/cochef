import React from "react";

export default function AboutSection() {
  return (
    <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2">
      {/* Texte côté gauche */}
      <div className="p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-xl text-center sm:text-left">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Cochef, une passion pour la cuisine à partager
          </h2>

          <p className="text-gray-600 md:mt-4 leading-relaxed">
            Cochef est une startup culinaire qui réinvente la livraison de repas.
            Chaque semaine, nos chefs conçoivent des menus savoureux, équilibrés et originaux
            à base d’ingrédients frais et locaux. Que vous soyez pressé ou curieux, laissez-vous
            guider par la créativité de nos cuisiniers pour transformer vos repas en expérience.
          </p>

          <div className="mt-6 md:mt-8">
            <a
              href="/menu"
              className="inline-block rounded bg-emerald-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Découvrir nos menus
            </a>
          </div>
        </div>
      </div>

      {/* Image côté droit */}
      <img
        alt="Cuisine Cochef"
        src="https://images.unsplash.com/photo-1464582883107-8adf2dca8a9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
        className="h-56 w-full object-cover sm:h-full"
      />
    </section>
  );
}
