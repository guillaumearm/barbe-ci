FROM node:8-slim

# See https://crbug.com/795759
RUN apt-get update && apt-get install -yq libgconf-2-4

# Install latest chrome dev package.
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
RUN apt-get update && apt-get install -y wget --no-install-recommends \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get purge --auto-remove -y curl \
    && rm -rf /src/*.deb

# Add pptr user.
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && mkdir -p /home/pptruser/e2e \
    && chown -R pptruser:pptruser /home/pptruser

WORKDIR /home/pptruser/e2e

ENV NODE_ENV=development
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

ADD . .

# Run user as non privileged.
RUN chown -R pptruser:pptruser .
USER pptruser

### Client install
WORKDIR packages/client
RUN npm install
WORKDIR ../../

### Server install
WORKDIR packages/server
RUN npm install
WORKDIR ../../

### e2e tools install
RUN npm install

ENV NODE_ENV=production
USER root
ENTRYPOINT node e2e
