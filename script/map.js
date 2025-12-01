// Version minimale et lisible pour initialiser la carte et ajouter des marqueurs
// Requirements: Leaflet chargé via CDN dans `dune.html` (objet global `L`).

const carte = L.map("carte").setView([47.322, 5.041], 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(carte);

L.control.scale().addTo(carte);

const cinemas = [
  {
    name: "Pathé Dijon",
    addr: "12 Parvis de l’UNESCO, 21000 Dijon",
    lat: 47.31792,
    lon: 5.02988,
  },
  {
    name: "Cinéma Olympia",
    addr: "16 Av. Maréchal Foch, 21000 Dijon",
    lat: 47.32363,
    lon: 5.03009,
  },
  {
    name: "Cinéma Le Darcy",
    addr: "8 Place Darcy, 21000 Dijon",
    lat: 47.32354,
    lon: 5.03411,
  },
  {
    name: "Cinéma L’Eldorado",
    addr: "21 Rue Alfred-de-Musset, 21000 Dijon",
    lat: 47.31446,
    lon: 5.04882,
  },
  {
    name: "Cinéma Devosge",
    addr: "6 Rue Devosge, 21000 Dijon",
    lat: null,
    lon: null,
  },
  {
    name: "Cinéma Cap Vert Quetigny",
    addr: "Cinéma Cap Vert, 21800 Quetigny",
    lat: null,
    lon: null,
  },
];

// Les deux <li> déjà présents dans la page pour afficher latitude/longitude
const latLi = document.querySelector("#cinema .coordonnée ul li:first-child");
const lonLi = document.querySelector("#cinema .coordonnée ul li:nth-child(2)");
function updateCoordList(lat, lon) {
  if (!latLi || !lonLi) return;
  latLi.textContent = `Latitude : ${Number(lat).toFixed(5)}`;
  lonLi.textContent = `Longitude : ${Number(lon).toFixed(5)}`;
}

// Ajoute un marqueur simple
function addMarker(name, addr, lat, lon) {
  const m = L.marker([lat, lon]).addTo(carte);
  m.bindPopup(`<strong>${name}</strong><br>${addr}`);
  m.on("click", () => updateCoordList(lat, lon));
  return [lat, lon];
}

// Géocodage minimal via Nominatim (retourne {lat, lon} ou null)
async function geocode(address) {
  try {
    const res = await fetch(
      "https://nominatim.openstreetmap.org/search?format=json&q=" +
        encodeURIComponent(address) +
        "&limit=1"
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data[0])
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
  } catch (e) {
    console.warn("geocode error", e);
  }
  return null;
}

// Ajout simple des cinémas: si coords présentes on ajoute, sinon on tente un géocodage
(async function placeCinemas() {
  const positions = [];
  for (const c of cinemas) {
    if (typeof c.lat === "number" && typeof c.lon === "number") {
      positions.push(addMarker(c.name, c.addr, c.lat, c.lon));
    } else {
      const g = await geocode(c.addr);
      if (g) positions.push(addMarker(c.name, c.addr, g.lat, g.lon));
      else console.warn("Pas de coordonnées pour", c.name);
    }
  }
  if (positions.length) carte.fitBounds(positions, { padding: [20, 20] });
})();

// Cliquer sur la carte met à jour les deux <li>
carte.on("click", (e) => updateCoordList(e.latlng.lat, e.latlng.lng));
