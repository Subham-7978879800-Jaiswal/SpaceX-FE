FROM node:lts-alpine

COPY . .

RUN npm install serve

RUN npm install --only=production

RUN npm run build

USER node

EXPOSE 3000

CMD ["npx", "serve", "-s", "build"]