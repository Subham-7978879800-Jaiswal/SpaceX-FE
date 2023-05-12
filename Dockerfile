FROM node:lts-alpine
COPY . .

RUN npm install --only=production
RUN npm run build
RUN npm install -g serve
USER node
EXPOSE 3000
CMD ["serve","-p","3000","build/"]
