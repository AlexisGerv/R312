export default class Carrousel {
  /** Constructeur de la classe */
  constructor(selector, alt) {
    // selector est un sélecteur css permettant d'attraper
    // la balise contenant le carrousel (flèches et images)
    this.container = document.querySelector(selector);
    // on choisit si on souhaite afficher le contenu de l'attribut alt
    this.textFlag = alt;
    // un querySelector() s'applique sur un élément du DOM, qui n'est pas obligatoirement le document
    this.slides = this.container.querySelectorAll(`${selector} img`);
    this.index = 0; // index correspond à l'image à afficher
    // attraper les flèches
    this.prevBtn = this.container.querySelector(`${selector} .prev`);
    this.nextBtn = this.container.querySelector(`${selector} .next`);
    // initialisation du carrousel
    this.init();
  }
  /** Initialisation du carrousel
   * Afficher la première image et attacher les événements aux flèches
   */
  init() {
    // afficher la première image
    this.showSlide(this.index);
    /** Evénements attachés aux flèches */
    this.prevBtn.addEventListener("click", () => this.prev());
    this.nextBtn.addEventListener("click", () => this.next());
  }

  /**
   * Affichage de la nouvelle classe
   * @param {*} i : numéro de l'image à afficher
   */
  showSlide(i) {
    // Pour afficher l'image courante
    // Masquer toutes les slides
    this.slides.forEach((slide) => slide.classList.remove("active"));
    // Afficher la diapositive choisie
    this.slides[i].classList.add("active");
    if (this.textFlag) {
      const altText = this.slides[i].getAttribute("alt");
      this.slides[i].parentNode.style.setProperty("--alt-text", `"${altText}"`);
    }
  }
  /** Pour mettre à jour l'image vers la précédente */
  prev() {
    this.index = (this.index - 1 + this.slides.length) % this.slides.length;
    this.showSlide(this.index);
  }
  /** Pour mettre à jour l'image vers la suivante */
  next() {
    console.log("suivant");
    this.index = (this.index + 1) % this.slides.length;
    this.showSlide(this.index);
  }
}
