import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    // Ici tu peux appeler ton API pour envoyer un mail de reset
    // Exemple : API.post('password-reset/', { email })

    setMessage(`Si un compte existe avec ${email}, un email de réinitialisation a été envoyé.`);
    setEmail('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Mot de passe oublié</h2>

        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
          Entrez votre email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Envoyer
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-green-600">{message}</p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Retour à{' '}
          <Link to="/login" className="text-indigo-600 hover:underline">
            la page de connexion
          </Link>
        </p>
      </form>
    </div>
  );
}
