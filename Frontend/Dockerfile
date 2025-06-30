FROM node:18

WORKDIR /frontend

COPY . .

RUN npm install

EXPOSE 5173

# Reemplazar a utilizarlo en produccion
CMD ["npm", "run", "dev"]
