FROM denoland/deno:1.29.1

EXPOSE 8000
EXPOSE 443

WORKDIR /app

RUN mkdir /app/data/

VOLUME [ "/app/data" ]

COPY server.ts ./server.ts
COPY known_shares.json ./known_shares.json

USER deno

CMD ["run", "--allow-all", "server.ts"]
