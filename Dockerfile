FROM gcr.io/distroless/nodejs18-debian12

WORKDIR /app
COPY ./dist_production build
COPY ./src/backend server

WORKDIR /app/server

ENV NODE_ENV production
EXPOSE 3000

CMD ["--experimental-modules", "--es-module-specifier-resolution=node", "build/server.js"]
