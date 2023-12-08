let tableStat = [["keys", "occurences", "link"]];

// Fonction qui récupère l'URL canonique à partir de l'API en utilisant une clé
function getCanonicalUrlFromApi(key) {
  // Effectue une requête à l'API et parse la réponse JSON
  const response = JSON.parse(
    UrlFetchApp.fetch("https://ww1.requirementyogi.cloud/nuitdelinfo/search")
  );
  return response.results;
}

// Fonction asynchrone qui remplace le texte correspondant à la clé par un lien dans le corps du document
async function replaceByLink(key, link, body) {
  // Recherche du texte correspondant à la clé dans le corps du document
  let element = body.findText(key);
  let occurence = 0;
  return new Promise((resolve, reject) => {
    while (element != null) {
      // Récupération des offsets de début et de fin du texte trouvé
      const startOffset = element.getStartOffset();
      const endOffset = element.getEndOffsetInclusive();
      // Ajout d'un lien à la plage de texte trouvée
      element
        .getElement()
        .asText()
        .editAsText()
        .setLinkUrl(startOffset, endOffset, link);
      // Recherche du texte correspondant à la clé suivante
      element = body.findText(key, element);

      occurence++;
    }
    tableStat.push([key, occurence, link]);
    resolve();
  });
}

// Fonction asynchrone qui recherche et remplace une liste d'éléments dans le document
async function searchAndReplace(array) {
  // Récupération du document actif
  const currentDoc = DocumentApp.getActiveDocument();
  const documentBody = currentDoc.getBody();
  return new Promise((resolve, reject) => {
    // Pour chaque élément dans la liste, remplace le texte correspondant par un lien dans le document
    array.forEach((i) => {
      replaceByLink(i.key, i.canonicalUrl, documentBody);
    });
    resolve();
  });
}

// Fonction principale qui exécute le processus de recherche et remplacement dans le document
function main() {
  // Récupération des données nécessaires depuis l'API
  const requirements = getCanonicalUrlFromApi();
  // Recherche et remplacement des liens dans le document
  searchAndReplace(requirements);
  // Générer un rapport et les afficher dans un tableau
  generateStats();
}

// Fonction qui affiche la barre latérale dans le document
function showSidebar() {
  // Création d'un contenu HTML pour la barre latérale
  const html =
    HtmlService.createHtmlOutputFromFile("sidebar").setTitle("SideBar");
  // Affichage de la barre latérale dans le document
  DocumentApp.getUi().showSidebar(html);
}

function generateStats() {
  const currentDoc = DocumentApp.getActiveDocument();
  const documentBody = currentDoc.getBody();

  // Insérer le tableau dans le document
  documentBody.appendTable(tableStat);
}

// Fonction déclenchée lors de l'ouverture du document
function onOpen(e) {
  // Création d'un menu d'extension
  const addOnMenu = DocumentApp.getUi().createAddonMenu();
  // Ajout d'éléments de menu pour ouvrir la barre latérale et exécuter la fonction principale
  addOnMenu.addItem("Ouvrir la barre latérale", "showSidebar").addToUi();
  addOnMenu.addItem("Remplacer", "main").addToUi();
}

// Fonction déclenchée lors de l'installation de l'extension
function onInstall(e) {
  // Appelle la fonction onOpen pour configurer le menu d'extension
  onOpen(e);
}
