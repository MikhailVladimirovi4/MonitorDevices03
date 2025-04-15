FROM node:20.18.0-alpine
WORKDIR /app/react-app
COPY ./package.json .
RUN npm install --force 
RUN apk update 
RUN apk add busybox-extras
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]