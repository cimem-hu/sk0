# Stage 1: Build for local development
FROM node:20-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Run
FROM node:20-alpine

ENV PORT=3000

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/node_modules ./node_modules

EXPOSE $PORT

CMD ["node", "dist/main"]