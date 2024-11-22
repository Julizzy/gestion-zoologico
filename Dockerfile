# Etapa 1: Construcción
FROM node:22 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala las dependencias de producción
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Construye el proyecto Next.js
RUN npm run build

# Instala dependencias de producción (limpiando las de desarrollo)
RUN npm install --production

# Etapa 2: Servidor de producción
FROM node:22

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios desde la etapa de construcción
COPY --from=build /app ./

# Exponer el puerto que Next.js usa por defecto
EXPOSE 3000

# Comando para iniciar el servidor de Next.js
CMD ["npm", "start"]
