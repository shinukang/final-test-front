# 빌드
FROM node:24.12.0-slim AS builder
WORKDIR /app

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

COPY package.json ./
RUN npm install
COPY ./ ./
RUN npm run build


# 실행
FROM nginx:alpine
# 빌드된 결과물을 복사
COPY --from=builder /app/dist /usr/share/nginx/html
# Nginx 커스텀 설정을 복사
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]