FROM node:12-alpine AS my-app-build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install -g @angular/cli

COPY package.json /app/package.json

RUN npm install

COPY . /app

RUN ng build --prod --output-path=dist


FROM nginx:1.16.0-alpine

COPY --from=my-app-build /app/dist /usr/share/nginx/html