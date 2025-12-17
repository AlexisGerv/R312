import Carrousel from "./carrousel.class.mjs";

document.addEventListener("DOMContentLoaded", () => {
  new Carrousel("#carrousel1", true);
  new Carrousel("#carrousel2", false);
});