<div style="background: linear-gradient(90deg, rgba(252,176,69,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)">
<h1 style="text-align: center">Fennext</h1>

<div style="display: flex; align-items: center; height: 160px; overflow-y: scroll; margin-top: 15px">
    <div style="float: left; margin-right: 10px; min-height: 160px; min-width: 160px; max-height:160px; max-width:160px">
        <img src="https://firebasestorage.googleapis.com/v0/b/loreact-666d4.appspot.com/o/Others%2FOIG3_2-removebg-preview.png?alt=media&token=50545b6e-dbae-43a6-aa59-1d322a936d71" alt="Logo">
    </div>
    <p style="text-align: justify;">
        Fennext est une application qui permet de lister tous les films existant ainsi que leurs acteurs, résumés, la note attribuée par les utilisateurs...
        Une fonction de recherche avancée est disponible pour trouver un film en particulier. Une recherche par nom est aussi présente
    </p>
</div>

## <p style="background: #F3ECE5; color:black">Fonctionnalités 🛠️ </p>

- Inscription/Connexion avec JWT et cookies.
-  Recherche par filtres
- Recherche par nom
- Visualisation des détails d'un film empowered by Ambilight.
- Listes "Trending" (Populaire aujourd'hui), "Discover" (Les derniers films récents), "Top Rated" (Les mieux notés de tous les temps).

## <p style="background: #F3ECE5; color:black">Technologies 🚀</p>

Projet réalisé avec NextJS (router pages), l'API TMDB et MongoDB.

Librairies utilisées : React, Typescript, 

Librairies UI : TailwindCSS, DaisyUI, MaterialUI.

## <p style="background: #F3ECE5; color:black">Utilisation 🖥️</p>

-  Cloner le repository dans un dossier de votre choix (un workspace de préférence)
```bash
cd mon-super-workspace
git clone https://github.com/Siri-Progamming/next-project.git
cd next-project
```

### Configuration des variables d'environnement

- Copier le contenu du fichier `env.local.example` dans le fichier `.env.local`

```bash
cp .env.local.example .env.local
```

### Installer et démarrer l'application

- Installer toutes les dépendances utiles au fonctionnement du projet
```bash
npm install
# or
yarn install
```
- Lancer le projet
```bash
npm run dev
# or
yarn dev
```
- Aller sur l'URL renseignée dans la console, en principe [localhost](http://localhost:3000)

## <p style="background: #F3ECE5; color:black">Evolutions 🔄</p>

- ### Utilisateur connecté

  - Affichage des recommandations personnalisées d'un user (code API prêt)
  - Ajout de la possibilité de liker un film (ajout dans la liste des films aimés)
  - Ajout de l'option "A regarder plus tard" (ajout dans la liste des films à regarder plus tard
  - Ajout de l'option "Déjà vu" (ajout dans la liste des films déjà vus)
  - Ajout de la possibilité de noter un film (Réflexion sur la façon dont je peux combiner ça avec la note TMDB existante)

- ### Acteurs 

  - Page dédiée à un acteur avec les films dans lesquels il a joué

- ### Séries
  - Intégration des mêmes fonctionnalités que pour les films

- ### Langue
  - Ajout de la possibilité de changer la langue de l'application (toggle EN/FR pour commencer)

## <p style="background: #F3ECE5; color:black">Bugs connus 🐞</p>

- Tests non fonctionnels (montée en compétence à prévoir sur ce module)


<p style="text-align: right">Auteur : HILAIRE Sirika.</p>
</div>
