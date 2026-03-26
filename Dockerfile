# ---------- BUILD FRONTEND ----------
FROM node:20 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# ---------- BACKEND ----------
FROM node:20
WORKDIR /app

COPY backend/package*.json ./backend/
RUN npm install --prefix backend

COPY backend ./backend
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

WORKDIR /app/backend

EXPOSE 3000

CMD ["node", "src/server.js"]
