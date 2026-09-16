# FATBICAM — Site web

Site statique (HTML/CSS/JS) de la Faculté de Théologie Biblique du Cameroun.

## Structure

```
site/              → tout le contenu du site (HTML, css/, js/, images/)
Dockerfile         → image de production (Nginx + site statique)
nginx.conf         → configuration Nginx (routes propres, cache, 404)
docker-compose.yml → lancement local en un clic
.github/workflows/ → build & publication automatique de l'image Docker
```

## Lancer le site en local (sans Docker)

Avec Python déjà installé :

```bash
cd site
python -m http.server 8420
```

Puis ouvrir http://localhost:8420

## Lancer avec Docker

```bash
docker compose up --build
```

Le site est alors accessible sur http://localhost:8080

Ou sans docker-compose :

```bash
docker build -t fatbicam-site .
docker run --rm -p 8080:80 fatbicam-site
```

## Déploiement continu (GitHub Actions)

À chaque `push` sur `main`, le workflow `.github/workflows/docker-publish.yml`
construit l'image Docker et la publie sur GitHub Container Registry (GHCR) :

```
ghcr.io/<utilisateur-github>/<nom-du-repo>:latest
```

Aucune configuration supplémentaire n'est nécessaire : le workflow utilise
automatiquement le token GitHub du dépôt (`GITHUB_TOKEN`).

### Déployer l'image publiée sur un serveur

Sur n'importe quel serveur avec Docker installé :

```bash
docker pull ghcr.io/<utilisateur-github>/<nom-du-repo>:latest
docker run -d --name fatbicam -p 80:80 --restart unless-stopped \
  ghcr.io/<utilisateur-github>/<nom-du-repo>:latest
```

Ceci fonctionne sur un VPS classique, ou sur toute plateforme qui sait
exécuter une image Docker (Render, Railway, Coolify, Fly.io, etc.).

> Note : la première fois, il faut rendre le package GHCR public (ou
> s'authentifier avec `docker login ghcr.io`) depuis les paramètres du
> dépôt GitHub → Packages.

## Remarques

- Le sous-dossier `site/` est la seule source de vérité pour le contenu
  publié — c'est lui qui est copié dans l'image Docker.
- Les formulaires (inscription, contact) sont pour l'instant visuels
  uniquement : ils devront être connectés à un service d'envoi
  (email, backend) avant la mise en production.
