FROM gcr.io/distroless/nodejs20-debian12

WORKDIR /app
COPY ./dist_production build
COPY ./src/backend server

WORKDIR /app/server

ENV NODE_ENV production
EXPOSE 3000

CMD ["--es-module-specifier-resolution=node", "build/server.js"]
