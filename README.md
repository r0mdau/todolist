# Todolist avec Node.js
Application hébergée sur un serveur Node.js. C'est un pense-bête des tâches que l'on doit faire avec une date et une heure associées.
Le but final est de créer un script automatisé qui envoit un sms à l'heure et la date précisés pour la tâche.

## Projet
* Langage de développement : `Javascript`
* Langage de templating : `EJS`
* Serveur : [Node.js](http://nodejs.org/)

## Auteur
* [Romain Dauby](https://github.com/r0mdau/)

## Date de début
* Début du projet : 20/05/2013

## Git Source du projet : 

[https://github.com/r0mdau/todolist](https://github.com/r0mdau/todolist)

## Contraintes techniques du projet :
* Spécialement conçu pour fonctionner sur un raspberry pi, j'ai choisi le moteur V8 de Node.js qui est à la fois peu consommateur de ressources et très performant.
* Fonctionne sur toute distribution possédant le serveur Node.js et le gestionnaire de paquets associés npm.
* Envoyer des sms, il faut disposer d'une carte sim ainsi qu'un lecteur usb de cartes sim.

## Démarrage rapide :
* Cloner le repo : `git clone http://git.romaindauby.fr/todolist`.
* Se placer dans le répertoire todolist : `cd todolist`
* Installer les paquets requis (dépendances) avec npm : `npm install`
* Créer un fichier vide nommé liste : `touch liste`
* Lancer le serveur : `node todolist.js`
* Pour accéder à l'application, ouvrez votre navigateur web et tapez l'adresse ip de votre machine suivi du port 8080, exemple : `127.0.0.1:8080`

## Bug tracker

Si vous avez des questions ou des bugs sur le projet, [merci d'ouvrir un ticket](https://github.com/r0mdau/todolist/issues). Avant d'ouvrir un ticket, merci de vérifier que la réponse à votre demande n'a jamais été traitée.

## Communauté

Rester à la page sur le développement du projet et les nouveautés de la communauté.

* Suivez [@r0mdau sur Twitter](http://twitter.com/r0mdau)

## Idée originale

[Site du zéro - Des applications ultra-rapides avec Node.js](http://www.siteduzero.com/informatique/tutoriels/des-applications-ultra-rapides-avec-node-js)

## Copyright and license

Copyright 2013 r0mdau, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this work except in compliance with the License.
You may obtain a copy of the License in the LICENSE file, or at:

  [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
