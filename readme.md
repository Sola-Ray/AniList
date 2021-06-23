# Anime list

Le projet est une application permettant de gérer une liste d'animes / mangas en local, l'application se base sur l'api gratuite et ouverte à tous du site [Anilist](https://anilist.co/home).

L'application permet à l'utilisateur, de feuilleter les animes et mangas du site, de consulter leurs fiches, d'ajouter ceux qu'ils préfèrent à ses favoris, et enfin de les partager. De plus, des filtres sont disponibles pour trier les animes et les mangas sur leur saison de sortie (hiver, printemps, etc...) ou encore leur genre (action, aventure, etc ...), ainsi que leur année de sortie pour faciliter la recherche.


## Scroll "Infini"

L'utilisateur peut scroller à l'infini (dans la limite du contenu existant dans l'API) afin de pouvoir consulter un anime ou un manga de son choix.


## Filtres

Il est possible de filtrer la liste des animés ou des mangas en appuyant sur le bouton de filtres en haut à droite. Ce dernier ouvre une fenêtre modale permettant la sélection d'une année à l'aide d'un slider et d'une saison pour les animés ou un genre pour les mangas à l'aide d'un picker. Il est également possible de filtrer uniquement sur l'année pour les animés. Si aucune donnée est trouvée lorsqu'on utilise à la fois le filtre des saisons et de l'année pour les animés, l'application se charge d'appeler automatiquement le filtre de l'année uniquement.
Les filtres sélectionnés sont affichés en haut de la page filtrée.

La modal de filtre d'animes : 

![Exemple d'un filtre](https://cdn.discordapp.com/attachments/483622123798003712/857228696746459166/chrome_GfMW7NwU3n.png)

Exemple des genres disponible pour filtrer les mangas : 

![Exemple des tags pour les mangas](https://cdn.discordapp.com/attachments/483622123798003712/857228705712439326/chrome_c3ORauasyA.png)


## Toast

Des toasts sont présents dans l'application et avertissent l'utilisateur lorsqu'il effectue une action au niveau des filtres. Par exemple, si aucun filtre est renseigné et qu'il valide, un toast va apparaître pour le prévenir qu'il doit renseigner des champs.

## Mettre en favoris

Sur tous les animes et mangas nous avons mis la possibilité de les ajouter à une liste de favoris en cliquant sur la petite étoile dans le détail d'un média. Pour ensuite dans l'onglet "Profile" de consulter d'une part la liste des animes que nous avons mis en favoris ainsi que la liste des mangas mis en favoris.

Bouton partage et ajout en favoris des médias :

![Exemple du bouton de favoris](https://cdn.discordapp.com/attachments/483622123798003712/857228702970281984/chrome_YOC4aJUwLr.png)



Exemple d'une liste d'animes favoris : 


![Exemple d'une liste d'anime favoris](https://cdn.discordapp.com/attachments/483622123798003712/857228701510008862/chrome_C96DqECyMR.png)


## Partager un média

Sur chaque média, nous avons ajouté un bouton "partager" qui permet de partager un média si l'on souhaite le faire découvrir à quelqu'un d'autre par exemple, le format du partage est de telle manière : 

![Exemple du partage d'un média](https://cdn.discordapp.com/attachments/483622123798003712/857228814051835964/explorer_XZe5NLHLlk.png)

Avec comme Objet le nom du média (ici Monster) en corps du mail, la description du média, et enfin un lien de redirection vers le site web.