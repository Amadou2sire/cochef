# Installation du projet CoChef

## Prérequis

- Python 3.x
- Node.js et npm
- Virtualenv (optionnel)
- Base de données SQLite (ou autre)

## Backend (Django)
1. Cloner le dépôt :
2. git clone https://github.com/Amadou2sire/cochef
3. Aller dans le dossier backend : cd backend
4. Créer un environnement virtuel et l’activer : python -m venv venv
5. venv\Scripts\activate # sur Windows
6. Installer les dépendances : pip install -r requirements.txt
7. Faire les migrations : python manage.py migrate
8. Lancer le serveur : python manage.py runserver

## Frontend (React)

Aller dans le dossier frontend (ou racine si c’est un monorepo) : cd frontend
Installer les dépendances :npm install
Lancer le serveur dev : npm start
