import React from "react";

export default function PrivacyPage() {
  return (
    <section className="py-16 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Politique de confidentialité
      </h1>

      <div className="space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base">
        <p>
          Chez <strong>Cochef</strong>, nous attachons une grande importance à
          la protection de vos données personnelles. Cette politique explique
          quelles informations nous collectons, comment nous les utilisons et
          comment vous pouvez exercer vos droits.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">1. Données collectées</h2>
        <ul className="list-disc list-inside ml-4">
          <li>Nom, adresse e-mail et informations de contact</li>
          <li>Historique de commande et préférences alimentaires</li>
          <li>Données de navigation (cookies, pages visitées...)</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900">2. Utilisation des données</h2>
        <p>Vos données nous permettent de :</p>
        <ul className="list-disc list-inside ml-4">
          <li>Traiter vos commandes et vous livrer rapidement</li>
          <li>Personnaliser votre expérience culinaire</li>
          <li>Améliorer notre plateforme et nos services</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900">3. Cookies</h2>
        <p>
          Nous utilisons des cookies pour suivre l’activité sur notre site et
          améliorer nos services. Vous pouvez accepter ou refuser ces cookies
          via la bannière de consentement.
        </p>

        <h2 className="text-xl font-semibold text-gray-900">4. Vos droits</h2>
        <p>
          Vous pouvez accéder à vos données, les corriger ou les supprimer à
          tout moment. Pour toute demande, contactez-nous à{" "}
          <a
            href="mailto:contact@cochef.tn"
            className="text-green-600 underline"
          >
            contact@cochef.tn
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold text-gray-900">5. Modifications</h2>
        <p>
          Cette politique peut être modifiée à tout moment. Nous vous informerons
          de tout changement important.
        </p>

        <p className="text-sm text-gray-500 mt-6">Dernière mise à jour : 21 juin 2025</p>
      </div>
    </section>
  );
}
