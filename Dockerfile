FROM nginx:alpine
WORKDIR /app
COPY . .
COPY ./config/nginx.conf /etc/nginx/nginx.conf