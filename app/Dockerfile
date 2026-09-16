# Etapa 1: Instalación de dependencias de la app
FROM node:22-alpine3.21 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --omit=dev

# Etapa 2: Imagen mínima endurecida y parcheada para producción
FROM node:22-alpine3.21

WORKDIR /usr/src/app

# 1. Parchear vulnerabilidades del SO (OpenSSL / libcrypto3 / libssl3)
# 2. Eliminar herramientas de compilación/gestores innecesarios en runtime
RUN apk update && apk upgrade --no-cache && \
    rm -rf /usr/local/lib/node_modules/npm \
           /usr/local/bin/npm \
           /usr/local/bin/npx \
           /opt/yarn* \
           /usr/local/bin/yarn* \
           /usr/local/lib/node_modules/corepack

# Copia de artefactos
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package*.json ./
COPY src/ ./src/

USER node

EXPOSE 3000

CMD ["node", "src/index.js"]