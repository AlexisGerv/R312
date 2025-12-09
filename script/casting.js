const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjA3YmNjMWFhMmM1NjNhZTI0YzIwZjMwMDE0NjhlYiIsIm5iZiI6MTc2MzU1MDAyMC41NzEsInN1YiI6IjY5MWRhMzQ0ZjFmYjM3NmIxZDJlMTllZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qk4mFId7DtIDrHa26ABAPkU7Vk5Rfs6Aml_76DhYpxE",
  },
};

async function genererCasting() {
  const castContainer = document.querySelector(".cast");
  const infoBox = document.querySelector(".info");

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/438631/credits?language=en-US",
      options
    );
    const data = await response.json();
    console.log(data);
    const top15 = data.cast.slice(0, 15);

    castContainer.innerHTML = "";

    top15.forEach((actor) => {
      const img = document.createElement("img");

      img.src = actor.profile_path
        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
        : "https://placehold.co/200x300?text=Inconnu";

      img.alt = actor.name;
      img.title = `${actor.name} joue ${actor.character}`;

      img.addEventListener("click", () => afficherBio(actor.id, infoBox));

      castContainer.appendChild(img);
    });
  } catch (error) {
    console.error("Erreur récupération casting:", error);
  }
}

async function afficherBio(actorId, container) {
  try {
    container.innerHTML = "<h3 style='color:#C19A6B'>Chargement...</h3>";
    container.classList.add("active");

    const response = await fetch(
      `https://api.themoviedb.org/3/person/${actorId}?language=en-US`,
      options
    );
    const data = await response.json();
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
    container.innerHTML = "<p>Impossible d'afficher les détails.</p>";
  }
}
genererCasting();
