# Image de production — site statique FATBICAM servi par Nginx
FROM nginx:1.27-alpine

# Config Nginx dédiée (cache, routes propres)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Contenu du site (le dossier site/ est la racine du site publié)
COPY site/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
