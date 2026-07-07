# kioteam.ir reverse proxy

A modular Nginx reverse-proxy setup that routes traffic to multiple
services by domain/subdomain. This repo only contains the proxy — it
routes to your existing backend/frontend/other services rather than
running them itself.

## Layout

```
proxy/
├── Dockerfile                # Builds the Nginx reverse-proxy image
├── docker-compose.yml        # Runs just the proxy container
└── nginx/
    ├── nginx.conf            # Main Nginx config (logging, gzip, includes conf.d/*)
    ├── conf.d/
    │   ├── frontend.conf     # kioteam.ir, www.kioteam.ir -> frontend service
    │   ├── backend.conf      # api.kioteam.ir             -> backend service
    │   └── yasin.conf        # yasin.kioteam.ir           -> yasin service
    └── snippets/
        └── proxy-params.conf # Shared proxy_set_header / timeout settings
```

## Domains

| Domain               | Config              |
|----------------------|----------------------|
| `kioteam.ir`, `www.kioteam.ir` | `conf.d/frontend.conf` |
| `api.kioteam.ir`     | `conf.d/backend.conf`  |
| `yasin.kioteam.ir`   | `conf.d/yasin.conf`    |

Point DNS A records for all of these hostnames at your server's public
IP before starting the proxy.

## Pointing at your services

Each `conf.d/*.conf` file has an `upstream` block with a placeholder
target:

```nginx
upstream frontend_upstream {
    server frontend:3000;
}
```

Change `frontend:3000` to wherever your service actually lives:

- **Docker container on the same host** — use its container name and
  port, and make sure it's attached to the `kioteam_network` network
  (see below), e.g. `server my-frontend-container:3000;`.
- **Different host/server, or a bare-metal/VM process** — use its
  IP or hostname and port, e.g. `server 192.168.1.10:3000;`.

## Running it

If your other services are Docker containers, create a shared network
once and attach them to it:

```bash
docker network create kioteam_network
```

Add `kioteam_network` to the `networks:` section of your other
services' compose files, then start the proxy:

```bash
docker compose up -d --build
```

If your services aren't on Docker (or are on another machine), you can
skip the shared network — just use real host/IP:port values in the
`upstream` blocks and remove the `networks:` section from
`docker-compose.yml` if you like.

## Adding a new domain/service

1. Add `nginx/conf.d/<name>.conf`:
   ```nginx
   upstream shop_upstream {
       server shop:6000; # or e.g. 192.168.1.10:6000
   }

   server {
       listen 80;
       server_name shop.kioteam.ir;

       location / {
           proxy_pass http://shop_upstream;
           include /etc/nginx/snippets/proxy-params.conf;
       }
   }
   ```
2. Point DNS for `shop.kioteam.ir` at your server.
3. `docker compose up -d --build` to reload the proxy with the new config.

No existing config needs to change — that's the whole point of the
per-service `conf.d` files.

## HTTPS (recommended next step)

This setup ships with plain HTTP (port 80) to keep it simple. For
production, terminate TLS at the proxy, e.g. with certbot:

1. Add a `certbot` service (using the `certbot/certbot` image) that
   shares the `./certbot/www` and `./certbot/conf` volumes with
   `nginx-proxy`.
2. Add an ACME challenge `location /.well-known/acme-challenge/` to
   each server block, pointing at `/var/www/certbot`.
3. Once certificates are issued, add a `listen 443 ssl;` server block
   per domain (or extend the existing ones) referencing the certs in
   `/etc/letsencrypt/live/<domain>/`, and redirect port 80 to 443.
