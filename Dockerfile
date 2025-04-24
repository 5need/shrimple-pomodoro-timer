FROM node:20-slim

# Install Python for http.server
RUN apt-get update && apt-get install -y watchman python3 curl

WORKDIR /app

# Install browser-sync globally
RUN npm install -g browser-sync

# Install tailwindcss
RUN curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-x64
RUN chmod +x tailwindcss-linux-x64
RUN mv tailwindcss-linux-x64 /usr/local/bin/tailwindcss

# Expose the port
EXPOSE 3000

CMD ["/app/docker-entrypoint.sh"]
