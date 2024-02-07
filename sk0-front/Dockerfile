FROM node:20 AS build
WORKDIR /app
COPY . /app/
RUN npm install
RUN npm run build

FROM nginx:alpine AS nginx
COPY --from=build /app/www/ /usr/share/nginx/html
EXPOSE 80
