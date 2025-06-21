import React, { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function Login({ onLogin }) {
  // On utilise email et password dans le formulaire
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Mise à jour des champs du formulaire
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Toggle affichage mot de passe
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoi au backend des champs email et password
      const response = await API.post("token/", formData);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      setMessage("Connexion réussie !");
      if (onLogin) onLogin();
    } catch (err) {
      console.error("Erreur API login:", err.response?.data || err.message);
      setMessage("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Se connecter
        </h2>

        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Votre email"
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-700 relative"
        >
          Mot de passe
        </label>
        <div className="relative mb-4">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Votre mot de passe"
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-green-600 focus:outline-none"
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {showPassword ? (
              /* Icône œil ouvert */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              /* Icône œil barré */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.969 9.969 0 012.121-3.292M15 12a3 3 0 00-3-3M3 3l18 18" />
              </svg>
            )}
          </button>
        </div>

        <div className="flex justify-between items-center mb-6 text-sm">
          <Link to="/forgot-password" className="text-green-600 hover:underline">
            Mot de passe oublié ?
          </Link>
          <Link to="/register" className="text-green-600 hover:underline">
            Créer un compte
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Se connecter
        </button>

        {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
      </form>
    </div>
  );
}
