# Etapa 1: Construcción
FROM node:22 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios para instalar las dependencias
COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


FROM nginx:stable-alpine


COPY --from=build /app/build /usr/share/nginx/html

# Copia un archivo de configuración personalizado (opcional)
# Si necesitas personalizar Nginx, descomenta y asegúrate de tener un archivo nginx.conf
# COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto que usará Nginx
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
