FROM node:lts-alpine
       
COPY . .

RUN npm install --only=production
RUN npm run build
RUN npm install -g serve
USER node
EXPOSE 80

CMD cd build && serve -p 80