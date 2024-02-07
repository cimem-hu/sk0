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

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/.env.development ./

EXPOSE $PORT

CMD ["node", "dist/main", "127.0.0.1"]