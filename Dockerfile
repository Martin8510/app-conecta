# Etapa 1: Construcción
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
ENV VITE_API_BASE_URL=http://localhost:8080/api/v1
RUN yarn build

# Etapa 2: Servidor NGINX
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Reemplaza el archivo default de NGINX
#COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
