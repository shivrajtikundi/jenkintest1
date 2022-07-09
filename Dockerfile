FROM node:16 AS builder
ENV NODE_ENV dev
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .

RUN npm install --f
# Copy app files
COPY . .
# Build the app
RUN npm run build:dev

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as dev
ENV NODE_ENV dev
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
