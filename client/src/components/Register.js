import React, { useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone_number: '',
    first_name: '',
    last_name: ''
  });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Ajout automatique du role 'client'
      const dataToSend = { ...formData, role: 'client' };
      await API.post('register/', dataToSend);
      setMessage('Inscription réussie ! Connectez-vous.');
    } catch (err) {
      setMessage("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 py-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Créer un compte
        </h2>

        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Nom
        </label>
        <input
          id="first_name"
          name="first_name"
          type="text"
          placeholder="Votre nom"
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label
          htmlFor="last_name"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Prénom
        </label>
        <input
          id="last_name"
          name="last_name"
          type="text"
          placeholder="Votre prénom"
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Nom d'utilisateur
        </label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Votre nom d'utilisateur"
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

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
          className="border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label
          htmlFor="phone_number"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Numéro de téléphone
        </label>
        <input
          id="phone_number"
          name="phone_number"
          type="tel"
          placeholder="Votre numéro de téléphone"
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-700 relative"
        >
          Mot de passe
        </label>
        <div className="relative mb-6">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Votre mot de passe"
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-blue-600 focus:outline-none"
            aria-label={
              showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'
            }
          >
            {showPassword ? (
              // Icône œil ouvert
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              // Icône œil barré
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.969 9.969 0 012.121-3.292M15 12a3 3 0 00-3-3M3 3l18 18"
                />
              </svg>
            )}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          S'inscrire
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message}</p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Connectez-vous
          </Link>
        </p>
      </form>
    </div>
  );
}
