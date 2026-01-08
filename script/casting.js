/**
 * Configuration de la requête API.
 */
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjA3YmNjMWFhMmM1NjNhZTI0YzIwZjMwMDE0NjhlYiIsIm5iZiI6MTc2MzU1MDAyMC41NzEsInN1YiI6IjY5MWRhMzQ0ZjFmYjM3NmIxZDJlMTllZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qk4mFId7DtIDrHa26ABAPkU7Vk5Rfs6Aml_76DhYpxE",
  },
};

/**
 * Fonction principale asynchrone pour générer la liste des acteurs.
 * Elle récupère les données de l'API et crée les éléments HTML (images).
 */
async function genererCasting() {
  // Sélection des conteneurs HTML où seront injectés les images et les infos
  const castContainer = document.querySelector(".cast");
  const infoBox = document.querySelector(".info");

  try {
    // Appel à l'API TMDB pour récupérer les crédits du film Dune (ID 438631)
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/438631/credits?language=en-US",
      options 
    );
    // Conversion de la réponse brute en format JSON utilisable
    const data = await response.json();
    
    // On extrait seulement les 15 premiers acteurs de la liste reçue
    const top15 = data.cast.slice(0, 15);

    // Nettoyage du conteneur pour éviter les doublons si la fonction est relancée
    castContainer.innerHTML = "";

    // Boucle sur chaque acteur pour créer et ajouter son image
    top15.forEach((actor) => {
      const img = document.createElement("img");

      // Condition ternaire : Si l'acteur a une photo, on utilise l'URL TMDB,
      // sinon on utilise une image générique (placeholder)
      img.src = actor.profile_path
        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
        : "https://placehold.co/200x300?text=Inconnu";

      // Ajout de l'attribut ALT et d'une info-bulle (title) avec le nom du rôle
      img.alt = actor.name;
      img.title = `${actor.name} joue ${actor.character}`;

      // Ajout d'un écouteur d'événement : au clic sur l'image, on lance l'affichage de la bio
      img.addEventListener("click", () => afficherBio(actor.id, infoBox));

      // Insertion de l'image créée dans le conteneur HTML
      castContainer.appendChild(img);
    });
  } catch (error) {
    // Gestion des erreurs (ex: problème de réseau ou clé API invalide)
    console.error("Erreur récupération casting:", error);
  }
}

/**
 * Fonction asynchrone pour afficher les détails d'un acteur spécifique.
 * @param {number} actorId - L'identifiant TMDB de l'acteur
 * @param {HTMLElement} container - L'élément HTML où afficher les infos
 */
async function afficherBio(actorId, container) {
  try {
    // Affichage temporaire d'un message de chargement
    container.innerHTML = "<h3 style='color:#C19A6B'>Chargement...</h3>";
    container.classList.add("active"); // Ajoute une classe CSS pour gérer l'apparence

    // Appel API pour récupérer les détails de la personne via son ID
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${actorId}?language=en-US`,
      options
    );
    const data = await response.json();
    
    // Injection du HTML final avec les données récupérées (Photo, Nom, Dates, Bio)
    container.innerHTML = `
            <div style="text-align: center; margin-bottom: 15px;">
                <img src="https://image.tmdb.org/t/p/w200${
                  data.profile_path
                }" style="width:100px; border-radius:50%; border:2px solid #C19A6B;">
            </div>
            <h3 style="color:#C19A6B; margin-top:0;">${data.name}</h3>
            <p><strong>Né(e) le :</strong> ${data.birthday || "Inconnu"}</p>
            <p><strong>Lieu :</strong> ${data.place_of_birth || "Inconnu"}</p>
            <hr style="border-color: #C19A6B; opacity: 0.3;">
            <p style="font-size: 0.9em; line-height: 1.5; max-height: 300px; overflow-y: auto;">
                ${data.biography || "Biographie non disponible."}
            </p>
        `;
  } catch (error) {
    // Message affiché à l'utilisateur en cas d'échec de la requête
    container.innerHTML = "<p>Impossible d'afficher les détails.</p>";
  }
}

// Appel initial de la fonction pour charger le casting dès le chargement du script
genererCasting();