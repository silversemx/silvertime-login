FROM node:alpine

ENV REACT_APP_RUNTIME=Production

ENV REACT_APP_SERVER_URL=https://login.time.silverse.mx
ENV REACT_APP_JWT_KEY=silvertime-jwt
ENV REACT_APP_LOGIN=https://login.time.silverse.mx
ENV REACT_APP_NAME="Silvertime Login"

ENV NODE_OPTIONS=--openssl-legacy-provider

WORKDIR "/home/silvertime"

COPY . .
RUN npm install
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /home/percepthor/build /usr/share/nginx/html
