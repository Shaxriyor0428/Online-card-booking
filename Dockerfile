FROM node:alpine as builder

WORKDIR /app
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build --prod && npm cache clean --force

FROM node:alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist

COPY package*.json ./
RUN npm ci --omit=dev
CMD [ "node","./dist/main.js" ]
