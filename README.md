# M223: Punchclock

## Loslegen
Folgende Schritte befolgen um loszulegen:
1. Sicherstellen, dass JDK 12 installiert und in der Umgebungsvariable `path` definiert ist.
1. Ins Verzeichnis der Applikation wechseln und über die Kommandozeile mit `./gradlew bootRun` oder `./gradlew.bat bootRun` starten
1. Unittest mit `./gradlew test` oder `./gradlew.bat test` ausführen.
1. Ein ausführbares JAR kann mit `./gradlew bootJar` oder `./gradlew.bat bootJar` erstellt werden.

Folgende Dienste stehen während der Ausführung im Profil `dev` zur Verfügung:
- REST-Schnittstelle der Applikation: http://localhost:8081
- Dashboard der H2 Datenbank: http://localhost:8081/h2-console


Dies ist mein Projekt zum Arbeitszeitverwalten.

Man kann sich zurzeit auf der localhost:8081/register.html Seite registrieren und auf der Login Seite Anmelden.
Nun gelangt man zum User Dashboard wenn man die Role User auch hat.
Die verzweigung zum Admin Dashboarrd funktioniert leider noch nicht. deshalb muss man auch hier Manuell darauf zugreifen :

localhost:8081/adminDashboard.html

Auf dieser Seite kann der Admin alles Users verwalten(Create, Edit and Delete).

Viel spass mit meinem Projekt :).






Version: 1
Kristopher Concha
