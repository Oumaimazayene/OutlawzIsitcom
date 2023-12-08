# Outil de Remplacement de Liens dans les Documents

Ce script Google Code.gs a pour objectif de faciliter le remplacement automatique de certaines occurrences de texte dans un document Google par des liens correspondants obtenus à partir d'une API externe. De plus, il génère des statistiques concernant les liens remplacés.

## Utilisation

### Fonctions

main() : Active le processus de récupération des données depuis l'API et le remplacement des occurrences de texte dans le document Google actif.
showSidebar() : Ouvre une barre latérale dans l'interface du document permettant de déclencher manuellement la fonction main().
generateStats() : Génère un tableau dans le document affichant des statistiques sur les liens remplacés.

## Installation

Ouvrez le document Google dans lequel vous souhaitez effectuer le remplacement de texte.
Accédez à Extensions > Compléments > Outil de Remplacement de Liens dans les Documents > Ouvrir la barre latérale pour ouvrir la barre latérale.
Cliquez sur le bouton dans la barre latérale pour exécuter la fonction main() et remplacer les occurrences de texte par des liens récupérés depuis l'API.

### Remarque

La fonction main() récupère les données depuis l'API, remplaçant les occurrences de texte par des liens correspondants.
La barre latérale fournit une interface pour déclencher manuellement la fonction main() et afficher l'état du processus.
Des statistiques sur les liens remplacés peuvent être générées et ajoutées au document en utilisant la fonction generateStats().

### Fichiers

Code.gs : Contient les principales fonctions du script Google pour le remplacement de texte et la génération de statistiques.
sidebar.html : Fournit un bouton pour activer la fonction main() via la barre latérale.

### Configuration

Avant d'utiliser le script, assurez-vous de :

Vérifier que la fonction getCanonicalUrlFromApi() dans Code.gs récupère correctement les données depuis l'API externe et renvoie les informations de lien désirées.
Ajuster l'endpoint de l'API et la logique d'analyse en fonction de vos besoins dans getCanonicalUrlFromApi().
