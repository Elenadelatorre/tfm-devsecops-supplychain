# Etapa 1: Instalación de dependencias
FROM node:22-alpine3.21 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --omit=dev

# Etapa 2: Imagen mínima endurecida para producción
FROM node:22-alpine3.21

WORKDIR /usr/src/app

# Copia de artefactos mínimos
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package*.json ./
COPY src/ ./src/

# Usuario sin privilegios
USER node

EXPOSE 3000

CMD ["node", "src/index.js"]