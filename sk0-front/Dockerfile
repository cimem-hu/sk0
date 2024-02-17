FROM node:20 AS build
WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine AS nginx
COPY --from=build /app/www/ /usr/share/nginx/html
EXPOSE 8080
