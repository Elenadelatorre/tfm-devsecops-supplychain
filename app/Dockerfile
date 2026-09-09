# Etapa 1: Compilación / Instalación de dependencias
FROM node:20-alpine3.19 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --omit=dev

# Etapa 2: Imagen final mínima para producción
FROM node:20-alpine3.19

WORKDIR /usr/src/app

# Copiamos solo los artefactos necesarios desde builder
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package*.json ./
COPY src/ ./src/

# Seguridad: Ejecutar siempre bajo un usuario sin privilegios (no-root)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

CMD ["node", "src/index.js"]