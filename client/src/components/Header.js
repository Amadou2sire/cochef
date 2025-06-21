import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiLogIn, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logoSV.png"; // Si tu veux garder le logo image, sinon utilise l'icône

export default function Header({ isLoggedIn, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { to: "/", label: "Accueil" },
    { to: "/menu", label: "Menus" },
    { to: "/events", label: "Événements" },
    { to: "/chef", label: "Chef de la semaine" },
    { to: "/about", label: "À propos" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <div className="flex justify-between h-16">
          {/* Logo ou icône utilisateur */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" aria-label="Accueil" className="flex items-center space-x-2">
              {/* Si tu veux garder l’image logo, remets la ligne ci-dessous et commente l’icône */}
              <img className="h-10 w-auto" src={logo} alt="Logo Cochef" />
              {/* <FiUser size={36} className="text-green-600" /> */}
              {/* <span className="font-bold text-xl text-green-600">Cochef</span> */}
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:space-x-10 md:items-center">
            {menuItems.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-gray-700 hover:text-green-600 font-medium transition"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {/* Commander */}
            {/* <Link
              to="/order"
              className="inline-flex items-center px-6 py-2 border border-transparent text-base font-semibold rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 transition"
            >
              Commander
            </Link> */}

            {/* Auth buttons */}
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="inline-flex items-center space-x-2 text-gray-700 hover:text-green-600 font-semibold"
              >
                <FiLogIn size={20} />
                <span>Connexion</span>
              </Link>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="inline-flex items-center space-x-2 text-gray-700 hover:text-green-600 font-semibold"
                >
                  <FiUser size={20} />
                  <span>Profil</span>
                </Link>
                <button
                  onClick={onLogout}
                  className="inline-flex items-center space-x-2 px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 font-semibold transition"
                >
                  <FiLogOut size={20} />
                  <span>Déconnexion</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-600"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Ouvrir le menu principal</span>
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden mt-2 space-y-4 pb-6 border-t border-gray-200">
            {menuItems.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
              >
                {label}
              </Link>
            ))}

            <Link
              to="/order"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition"
            >
              Commander
            </Link>

            {!isLoggedIn ? (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 px-4 py-2 rounded-md font-semibold text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
              >
                <FiLogIn size={20} />
                <span>Connexion</span>
              </Link>
            ) : (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 px-4 py-2 rounded-md font-semibold text-gray-700 hover:bg-green-50 hover:text-green-600 transition"
                >
                  <FiUser size={20} />
                  <span>Profil</span>
                </Link>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 font-semibold transition"
                >
                  <FiLogOut size={20} />
                  <span>Déconnexion</span>
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
