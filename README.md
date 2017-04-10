# RWTH-iCal-Abo

Das ist ein kleines Skript, um den Kalender, der in CampusOffice als Datei exportiert werden kann, abonnementfähig zu machen. So kann dein Kalender mögliche Änderungen direkt übernehmen.

> Dieses Skript ist natürlich nicht kommentiert oder getestet !!! Es wurde in 1 1/2 Vorlesungen gecodet !

## Installation

Benötigt ist ein NodeJS-Server. Zudem erfordert es das Plugin 'needle' welches über npm heruntergeladen werden kann. Zudem ist ein Dienst wie 'forever' (ebenfalls im npm erhältlich) sinnvoll.

## Configuration

Es muss eine datei ```config.js``` mit den erforderlichen Nutzerdaten (Matrikelnummer und Passwort) für das CampusOffice vorhanden sein. Die datei ```config.dummy.js``` zeigt den Aufbau.

<aside class="notice">
ACHTUNG! Auch wenn eine Serverseitige Configurationsdatei sicherer ist, als eine unverschlüsselte Übertragung der Login-Informationen über die URL hat jeder der die Datei ```config.js``` in die Finger bekommt Zugriff auf **dein** CampusOffice.
Du handelst auf deine eigene Verantwortung!
</aside>

## Nutzung

Einfach das Skript starten. Danach kann in einem beliebigen Kalender folgender Link genutzt werden:

> ht<span></span>tp://localhost:2014

(Läuft das Script auf einem entfernten Rechner ```localhost``` durch die richtige IP/URL ersetzen.)

Dein Kalenderprogramm wird nun immer den aktuellsten Stand deiner Termine anzeigen.
