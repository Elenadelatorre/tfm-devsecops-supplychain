# Etapa 1: Instalación de dependencias
FROM node:22-alpine3.21 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --omit=dev

# Etapa 2: Imagen mínima endurecida para producción
FROM node:22-alpine3.21

WORKDIR /usr/src/app

# Eliminar gestores de paquetes no necesarios en runtime (reduce superficie de ataque)
RUN rm -rf /usr/local/lib/node_modules/npm \
           /usr/local/bin/npm \
           /usr/local/bin/npx \
           /opt/yarn* \
           /usr/local/bin/yarn* \
           /usr/local/lib/node_modules/corepack

# Copia de dependencias limpias y código fuente
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package*.json ./
COPY src/ ./src/

USER node

EXPOSE 3000

CMD ["node", "src/index.js"]