FROM node:lts-alpine
COPY . .
USER node
RUN npm install --only=production
RUN npm run build

EXPOSE 3000
CMD ["serve","-p","3000","build/"]
