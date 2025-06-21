import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubscribe = e => {
    e.preventDefault();
    // TODO: envoyer email à backend / service newsletter
    setMsg("Merci pour votre inscription !");
    setEmail("");
  };

  return (
    <footer className="bg-gray-800 text-gray-300 py-10 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
          <p>123 Rue Exemple, Bamako, Mali</p>
          <p>Téléphone : +223 00 00 00 00</p>
          <p>Email : contact@cochef.com</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Liens rapides</h3>
          <ul>
            <li><Link to="/" className="hover:text-green-400">Accueil</Link></li>
            <li><Link to="/menu" className="hover:text-green-400">Menu / Carte</Link></li>
            <li><Link to="/order" className="hover:text-green-400">Commande en ligne</Link></li>
            <li><Link to="/events" className="hover:text-green-400">Événements</Link></li>
            <li><Link to="/chef" className="hover:text-green-400">Chef de la semaine</Link></li>
            <li><Link to="/about" className="hover:text-green-400">À propos</Link></li>
            <li><Link to="/contact" className="hover:text-green-400">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Suivez-nous</h3>
          <div className="flex space-x-4 text-white text-xl">
            {/* Icônes réseaux sociaux SVG */}
            <a href="#" aria-label="Facebook" className="hover:text-green-400">📘</a>
            <a href="#" aria-label="Twitter" className="hover:text-green-400">🐦</a>
            <a href="#" aria-label="Instagram" className="hover:text-green-400">📸</a>
            <a href="#" aria-label="LinkedIn" className="hover:text-green-400">🔗</a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
          <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="px-3 py-2 rounded text-gray-900"
              required
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
            >
              S'inscrire
            </button>
          </form>
          {msg && <p className="mt-2 text-green-400">{msg}</p>}
        </div>

      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Cochef. Tous droits réservés.
      </div>
    </footer>
  );
}
