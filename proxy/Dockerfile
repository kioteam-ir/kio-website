FROM nginx:1.27-alpine

# Remove the image's default site so it can't shadow our configs.
RUN rm -f /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf        /etc/nginx/nginx.conf
COPY nginx/conf.d/           /etc/nginx/conf.d/
COPY nginx/snippets/         /etc/nginx/snippets/

EXPOSE 80 443

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost/ -T 3 >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
