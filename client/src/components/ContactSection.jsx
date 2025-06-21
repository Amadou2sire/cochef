import React from "react";

export default function ContactSection() {
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center">Contactez-nous</h2>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Formulaire */}
        <form className="max-w-md mx-auto space-y-6">
          <input
            type="text"
            placeholder="Votre nom"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="email"
            placeholder="Votre email"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <textarea
            rows={5}
            placeholder="Votre message"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          {/* Checkbox consentement */}
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              id="consent"
              required
              className="mt-1 border-gray-300 rounded text-green-600 focus:ring-green-500"
            />
            <label htmlFor="consent" className="leading-snug">
              J’accepte que mes données soient utilisées pour me recontacter. En savoir plus dans notre{" "}
              <a href="/privacy" className="text-green-600 underline hover:text-green-700">
                politique de confidentialité
              </a>.
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 rounded hover:bg-green-700 transition"
          >
            Envoyer
          </button>
        </form>

        {/* Carte Google Maps vers Startup Village */}
        <div className="w-full h-[500px] rounded shadow-lg overflow-hidden">
          <iframe
            title="Carte Startup Village"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d798.2184417605258!2d10.183023159777141!3d36.845499154429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd354e90709f37%3A0xf9353bb6963cdbd2!2sStartup%20Village!5e0!3m2!1sfr!2stn!4v1669106848519!5m2!1sfr!2stn"
            width="100%"
            height="100%"
            style={{ border: 0, pointerEvents: "none" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
