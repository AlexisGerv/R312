let etatLecteur;

function lecteurPret(event) {
  // event.target = lecteur
  event.target.setVolume(50);
}

function changementLecteur(event) {
  // event.data = état du lecteur
  etatLecteur = event.data;
}

let lecteur;

function onYouTubeIframeAPIReady() {
  lecteur = new YT.Player("video", {
    height: "390",
    width: "640",
    videoId: "QKlblLVG9qY",
    playerVars: {
      color: "white",
      enablejsapi: 1,
      modestbranding: 1,
      rel: 0,
    },
    events: {
      onReady: lecteurPret,
      onStateChange: changementLecteur,
    },
  });
}

// Hauteur de la vidéo
const hauteurVideo = $("#video").height();
// Position Y de la vidéo
const posYVideo = $("#video").offset().top;
// Valeur declenchant la modification de l'affichage (choix "esthétique")
const seuil = posYVideo + 0.75 * hauteurVideo;

// Gestion du défilement
$(window).scroll(function () {
  // Récupération de la valeur du défilement vertical
  const scroll = $(window).scrollTop();

  // Classe permettant l'exécution du CSS
  $("#video").toggleClass(
    "scroll",
    etatLecteur === YT.PlayerState.PLAYING && scroll > seuil
  );
});
