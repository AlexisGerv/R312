document.addEventListener("DOMContentLoaded", () => {

    // 1. Initialisation de la carte
    const map = L.map('carte').setView([46.603354, 1.888334], 6);

    // 2. Ajout du fond de carte
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // 3. Création du bouton "Me Localiser"
    const locateControl = L.control({ position: 'topright' }); // Position en haut à droite

    locateControl.onAdd = function(map) {
        // Création d'un div avec les styles de base de Leaflet pour s'intégrer visuellement
        const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        
        // Style du bouton (blanc, curseur main, icône, taille)
        div.innerHTML = `
            <a href="#" title="Me localiser" role="button" aria-label="Me localiser" 
               style="background-color: white; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; text-decoration: none; color: black; font-size: 18px;">
               📍
            </a>
        `;

        // Action au clic sur le bouton
        div.onclick = (e) => {
            e.preventDefault(); // Empêche le comportement par défaut du lien
            e.stopPropagation(); // Empêche de cliquer sur la carte à travers le bouton
            
            // Fonction magique de Leaflet pour trouver la position et zoomer
            map.locate({ setView: true, maxZoom: 12 });
        };

        return div;
    };

    // Ajout du bouton à la carte
    locateControl.addTo(map);

    // 4. Gestion de la localisation 
    map.on('locationfound', (e) => {
        // On ajoute un cercle bleu pour montrer la position de l'utilisateur
        // On supprime l'ancien marqueur s'il existe déjà pour éviter les doublons
        if (window.userMarker) {
            map.removeLayer(window.userMarker);
        }
        
        window.userMarker = L.circle(e.latlng, {
            radius: e.accuracy / 2, // Le rayon dépend de la précision du GPS
            color: '#C19A6B',       // Couleur sable/Dune
            fillColor: '#C19A6B',
            fillOpacity: 0.5
        }).addTo(map).bindPopup("Vous êtes ici !").openPopup();
    });

    // 5. Gestion des erreurs de localisation (ex: utilisateur refuse la géolocalisation)
    map.on('locationerror', (e) => {
        alert("Impossible de vous localiser. Veuillez autoriser la géolocalisation.");
    });

    // 6. Chargement des cinémas 
    fetch('./media/cinema_fr.geojson')
        .then(response => {
            if (!response.ok) throw new Error("Erreur JSON");
            return response.json();
        })
        .then(data => {
            L.geoJSON(data, {
                onEachFeature: (feature, layer) => {
                    if (feature.properties) {
                        const nom = feature.properties.NOM_ETABLISSEMENT || "Cinéma";
                        const ville = feature.properties.COMMUNE || "";
                        const ecrans = feature.properties.ECRANS || "?";
                        
                        layer.bindPopup(`
                            <strong>${nom}</strong><br>
                            📍 ${ville}<br>
                            🎬 Écrans : ${ecrans}
                        `);
                    }
                }
            }).addTo(map);
        })
        .catch(error => console.error("Erreur:", error));
});