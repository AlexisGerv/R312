// Code simple pour piloter les carrousels Personnages et Images

function initialiserCarrousel(sectionSelector, pisteSelector) {
  const section = document.querySelector(sectionSelector);
  if (!section) return;

  const piste = section.querySelector(pisteSelector);
  const boutonsPrev = section.querySelectorAll('.prev');
  const boutonsNext = section.querySelectorAll('.next');
  if (!piste || boutonsPrev.length === 0 || boutonsNext.length === 0) return;

  let position = 0;

  function largeurDiapo() {
    const conteneur = piste.parentElement;
    return conteneur ? conteneur.offsetWidth : piste.offsetWidth;
  }

  function afficherDiapo() {
    const largeur = largeurDiapo();
    if (!largeur) return;
    piste.style.transform = `translateX(-${position * largeur}px)`;
  }

  function changerDiapo(delta) {
    const total = piste.children.length;
    if (!total) return;
    position = (position + delta + total) % total;
    afficherDiapo();
  }

  boutonsPrev.forEach((bouton) =>
    bouton.addEventListener('click', (event) => {
      event.preventDefault();
      changerDiapo(-1);
    })
  );

  boutonsNext.forEach((bouton) =>
    bouton.addEventListener('click', (event) => {
      event.preventDefault();
      changerDiapo(1);
    })
  );

  window.addEventListener('resize', afficherDiapo);
  afficherDiapo();
}

function lancerCarrousels() {
  initialiserCarrousel('#personnages', '.carrousel-personnages');
  initialiserCarrousel('#image', '.carrousel-images');
}

document.addEventListener('DOMContentLoaded', lancerCarrousels);
