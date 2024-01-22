SERVER

Authentification et Autorisation :
- Utiliser JWT pour générer des tokens lors de l'authentification (auth.controller.js).
- Les rôles définis (user, admin) dans ROLES (models/index.js).
- Les tokens JWT contiennent des informations sur l'utilisateur et ses rôles (auth.controller.js).

Contrôleurs pour les utilisateurs, les likes de publications et les publications :
- auth.controller.js : Gère l'enregistrement et la connexion des utilisateurs.
- user.controller.js : Contient des exemples de routes accessibles par différents rôles.
- post-like.controller.js : Gère l'ajout et la suppression de likes sur des publications.
- post.controller.js : Gère la récupération de toutes les publications et l'ajout de nouvelles publications.

Middleware pour la gestion des rôles :
- authJwt.js : Vérifie si un utilisateur a le rôle d'administrateur avant d'autoriser l'accès à certaines routes.

Routes :
- auth.routes.js : Définit les routes pour l'inscription et la connexion.
- user.router.js : Définit les routes pour les différentes ressources en fonction des rôles.
- post-like.routers.js : Définit les routes pour l'ajout et la suppression de likes sur des publications.
- post.routers.js : Définit les routes pour la récupération de toutes les publications et l'ajout de nouvelles publications.

Modèles MongoDB :
- Les modèles pour les utilisateurs (user.model.js), les rôles (authority.model.js), les publications (post.model.js), et les likes de publications (post-like.model.js).

Utilisation de bcrypt pour le hachage des mots de passe :
- Le hachage des mots de passe lors de l'enregistrement des utilisateurs (auth.controller.js).

Vérification de doublons et validation des rôles lors de l'enregistrement :
- verifySignUp.js : Middleware pour vérifier les doublons d'username ou d'email, ainsi que la validation des rôles lors de l'enregistrement des utilisateurs.

Gestion des likes de publications :
- post-like.controller.js : Implémente des fonctionnalités pour ajouter et supprimer des likes, mettant à jour le nombre total de likes sur une publication.

Gestion des publications :
- post.controller.js : Gère l'enregistrement de nouvelles publications et la récupération de toutes les publications.
