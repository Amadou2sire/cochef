import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleConsent = (accepted) => {
    localStorage.setItem("cookie_consent", accepted ? "accepted" : "refused");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 px-6 py-4 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-700 text-center md:text-left">
          Ce site utilise des cookies pour améliorer votre expérience.{" "}
          <Link
            to="/privacy"
            className="underline text-green-600 hover:text-green-800"
          >
            En savoir plus
          </Link>
        </p>

        <div className="flex gap-3 justify-center md:justify-end">
          <button
            onClick={() => handleConsent(false)}
            className="px-4 py-2 border border-gray-300 text-sm text-gray-700 rounded hover:bg-gray-100 transition"
          >
            Refuser
          </button>
          <button
            onClick={() => handleConsent(true)}
            className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
          >
            J'accepte
          </button>
        </div>
      </div>
    </div>
  );
}
